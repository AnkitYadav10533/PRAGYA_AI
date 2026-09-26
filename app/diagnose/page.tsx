'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

import { StudentSelector } from '@/components/assessment/StudentSelector';
import { DiagnosisCard } from '@/components/diagnosis/DiagnosisCard';
import { DiagnosticChecks } from '@/components/diagnosis/DiagnosticChecks';
import { EvidenceList } from '@/components/diagnosis/EvidenceList';
import { TeacherDecision } from '@/components/diagnosis/TeacherDecision';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
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
        <div className="glass-card p-6 sm:p-7 relative overflow-hidden backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl shadow-amber-500/5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-purple-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  🟨 Abhay Intelligence → 🟪 Abhinav Action
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Conveyor Belt Steps 3 & 4 · Diagnose & Teacher Verify
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Diagnostic Report & Verification
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
                Section 8 & 9 Compliance: Pure deterministic diagnostic trace with rule-based verification checks. Teacher holds final decision authority.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <StudentSelector
                students={students}
                currentStudentId={selectedStudent.id}
                targetRoute="/diagnose"
              />
            </div>
          </div>
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
            <div className="glass-card p-6 relative overflow-hidden backdrop-blur-xl border border-indigo-200/80 dark:border-indigo-800/60 shadow-xl shadow-indigo-500/5 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white/60 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-zinc-900/60">
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mb-1.5">
                    NEXT CONVEYOR BELT ACTION
                  </div>
                  <h4 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">
                    Ready for Targeted Remediation?
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 max-w-md">
                    Confirm teacher decision above and route {selectedStudent.name} into remedial grouping and the interactive CPA Place-Value Board.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Link
                    href="/groups"
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all shadow-xs"
                  >
                    View Groups
                  </Link>
                  <Link
                    href={`/intervene?studentId=${selectedStudent.id}`}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold transition-all shadow-md shadow-indigo-500/20 hover:scale-[1.02] flex items-center gap-1.5"
                  >
                    <span>Launch CPA Board</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

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
