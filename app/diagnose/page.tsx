'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

import { StudentSelector } from '@/components/assessment/StudentSelector';
import { CauseGraph } from '@/components/diagnosis/CauseGraph';
import { DiagnosisCard } from '@/components/diagnosis/DiagnosisCard';
import { DiagnosticChecks } from '@/components/diagnosis/DiagnosticChecks';
import { EvidenceList } from '@/components/diagnosis/EvidenceList';
import { TeacherDecision } from '@/components/diagnosis/TeacherDecision';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { detectErrorSignature, FIXED_ASSESSMENT_ITEMS } from '@/lib/engine';
import { SEED_DIAGNOSES, SEED_STUDENTS, SEED_SUBMISSIONS } from '@/lib/mock';
import {
  AssessmentSubmission,
  Diagnosis,
  Student,
  TeacherDecision as TeacherDecisionType,
} from '@/lib/types';
import {
  getStoredDiagnoses,
  getStoredStudents,
  getStoredSubmissions,
  saveStoredDiagnosis,
  updateStudentStatus,
} from '@/lib/utils';

function DiagnoseContent() {
  const searchParams = useSearchParams();
  const studentIdParam = searchParams.get('studentId') || 's-01';

  const [students, setStudents] = useState<Student[]>(SEED_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student>(SEED_STUDENTS[0]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [submission, setSubmission] = useState<AssessmentSubmission | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('q3');

  useEffect(() => {
    const loadedStudents = getStoredStudents();
    setStudents(loadedStudents);

    const found = loadedStudents.find((s) => s.id === studentIdParam) || loadedStudents[0];
    setSelectedStudent(found);

    const diagnoses = getStoredDiagnoses();
    const currentDiag = diagnoses.find((d) => d.studentId === found.id) || SEED_DIAGNOSES[0];
    setDiagnosis(currentDiag);

    const submissions = getStoredSubmissions();
    const currentSub = submissions.find((s) => s.studentId === found.id) || SEED_SUBMISSIONS[0];
    setSubmission(currentSub);

    // Default to the student's first erroneous response, or q3
    const firstErr = currentSub.responses.find((r) => !r.isCorrect);
    if (firstErr) {
      setSelectedQuestionId(firstErr.questionId);
    } else {
      setSelectedQuestionId('q3');
    }
  }, [studentIdParam]);

  const handleDecisionSave = (decision: TeacherDecisionType, finalVerdict: string) => {
    if (!diagnosis) return;

    const updatedDiagnosis: Diagnosis = {
      ...diagnosis,
      teacherDecision: decision,
      finalVerdict,
    };

    setDiagnosis(updatedDiagnosis);
    saveStoredDiagnosis(updatedDiagnosis);

    const newStatus = decision.status === 'rejected' ? 'assessed' : 'verified';
    updateStudentStatus(selectedStudent.id, newStatus);
    setSelectedStudent((prev) => ({ ...prev, status: newStatus }));
  };

  if (!diagnosis || !submission) {
    return (
      <div className="p-8 text-center text-zinc-500 text-sm">
        Loading student diagnostic data...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col flex-1">
      {/* Breadcrumb Persistent Journey Context */}
      <Breadcrumb
        studentName={selectedStudent.name}
        studentId={selectedStudent.id}
        currentStep="diagnose"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full space-y-6 flex-1">
        {/* Top Header & Student Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                🟨 Abhay Intelligence → 🟪 Abhinav Action
              </span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-zinc-500">Diagnostic Verification</span>
            </div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
              Diagnostic Report & Verification
            </h1>
          </div>

          <StudentSelector
            students={students}
            currentStudentId={selectedStudent.id}
            targetRoute="/diagnose"
          />
        </div>

        {/* Diagnosis Header Card */}
        <DiagnosisCard student={selectedStudent} diagnosis={diagnosis} />

        {/* Two-Column Diagnostic Verification & Evidence Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Verification Checks (Section 12) */}
          <div className="space-y-6">
            <DiagnosticChecks checks={diagnosis.checks} />
          </div>

          {/* Right Column: Teacher Decision (Section 13) */}
          <div className="space-y-6">
            <TeacherDecision
              diagnosis={diagnosis}
              studentName={selectedStudent.name}
              onDecisionSave={handleDecisionSave}
            />

            {/* Next Step Action Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/20 border border-indigo-200 dark:border-indigo-900/60 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Ready for Action?
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                  Confirm teacher decision and route {selectedStudent.name} into remedial grouping and targeted CPA intervention.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/groups"
                  className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-indigo-500 transition-all shadow-xs"
                >
                  View Groups
                </Link>
                <Link
                  href={`/intervene?studentId=${selectedStudent.id}`}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Start Intervention</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Cause Graph & Mental Model with Dynamic Item Selector */}
        {(() => {
          const activeQuestion =
            FIXED_ASSESSMENT_ITEMS.find((q) => q.id === selectedQuestionId) || FIXED_ASSESSMENT_ITEMS[2];
          const activeResponse = submission.responses.find((r) => r.questionId === activeQuestion.id);
          const activeErrorSignature = detectErrorSignature(
            activeQuestion,
            activeResponse?.studentAnswer ?? null
          );

          return (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                    Inspect Student Error Breakdown
                  </span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    Click any item to view its cognitive mental model & algorithmic decomposition:
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {FIXED_ASSESSMENT_ITEMS.map((item) => {
                    const resp = submission.responses.find((r) => r.questionId === item.id);
                    const isSelected = selectedQuestionId === item.id;
                    const isErr = resp && !resp.isCorrect;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedQuestionId(item.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : isErr
                            ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 hover:bg-rose-100'
                            : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50'
                        }`}
                      >
                        <span>Item #{item.order} ({item.prompt})</span>
                        <span className={isErr ? 'text-rose-500 font-extrabold' : 'text-emerald-500 font-extrabold'}>
                          {isErr ? `✗ (${resp?.studentAnswer ?? '?'})` : '✓'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <CauseGraph
                question={activeQuestion}
                studentAnswer={activeResponse?.studentAnswer ?? null}
                errorSignature={activeErrorSignature}
              />
            </div>
          );
        })()}

        {/* Full Mathematical Evidence Breakdown */}
        <EvidenceList responses={submission.responses} />
      </div>
    </div>
  );
}

export default function DiagnosePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-500 text-sm">Loading diagnosis...</div>}>
      <DiagnoseContent />
    </Suspense>
  );
}
