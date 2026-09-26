'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

import { AssessmentProgress } from '@/components/assessment/AssessmentProgress';
import { AssessmentQuestion } from '@/components/assessment/AssessmentQuestion';
import { StudentSelector } from '@/components/assessment/StudentSelector';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import {
  analyzeResponse,
  FIXED_ASSESSMENT_ITEMS,
  generateDiagnosis,
} from '@/lib/engine';
import { SEED_STUDENTS } from '@/lib/mock';
import { AssessmentSubmission, Student, StudentResponse } from '@/lib/types';
import {
  getStoredStudents,
  getStoredSubmissions,
  saveStoredDiagnosis,
  saveStoredSubmission,
  updateStudentStatus,
} from '@/lib/utils';

function AssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentIdParam = searchParams.get('studentId') || 's-01';

  const [students, setStudents] = useState<Student[]>(SEED_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student>(SEED_STUDENTS[0]);
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const loadedStudents = getStoredStudents();
    setStudents(loadedStudents);

    const found = loadedStudents.find((s) => s.id === studentIdParam) || loadedStudents[0];
    setSelectedStudent(found);

    // If student already has a submission, load existing answers
    const submissions = getStoredSubmissions();
    const existing = submissions.find((sub) => sub.studentId === found.id);
    if (existing && existing.responses.length > 0) {
      const prefill: Record<string, string> = {};
      existing.responses.forEach((r) => {
        prefill[r.questionId] = r.studentAnswer !== null ? r.studentAnswer.toString() : '';
      });
      setAnswers(prefill);
    } else {
      // Default blank
      setAnswers({ q1: '', q2: '', q3: '', q4: '', q5: '' });
    }
  }, [studentIdParam]);

  const handleAnswerChange = (questionId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  // 1-Click Golden Demo Filler for Aarav Patel
  const handleFillGoldenDemo = () => {
    setAnswers({
      q1: '25', // 52 - 27 = 25 (✓ Warm-up Baseline)
      q2: '33', // 71 - 38 = 33 (✓ Correct)
      q3: '46', // 83 - 47 = 46 (✗ Demo Error: Borrowed without decrementing tens)
      q4: '38', // 64 - 26 = 38 (✓ Correct)
      q5: '45', // 92 - 57 = 45 (✗ Demo Error: Borrowed without decrementing tens)
    });
  };

  const handleFillAllCorrect = () => {
    setAnswers({
      q1: '25',
      q2: '33',
      q3: '36',
      q4: '38',
      q5: '35',
    });
  };

  const answeredCount = Object.values(answers).filter((a) => a.trim() !== '').length;

  const handleSubmit = () => {
    if (answeredCount < FIXED_ASSESSMENT_ITEMS.length) {
      if (!confirm(`You have answered ${answeredCount} of 5 items. Submit remaining as unattempted?`)) {
        return;
      }
    }

    setIsSubmitting(true);

    const analyzedResponses: StudentResponse[] = FIXED_ASSESSMENT_ITEMS.map((item) => {
      const raw = answers[item.id] || '';
      const parsed = raw.trim() !== '' ? parseInt(raw.trim(), 10) : null;
      return analyzeResponse(item, parsed, 20);
    });

    const correctCount = analyzedResponses.filter((r) => r.isCorrect).length;
    const submissionId = `sub-${selectedStudent.id}-${Date.now()}`;

    const submission: AssessmentSubmission = {
      id: submissionId,
      studentId: selectedStudent.id,
      classId: selectedStudent.classId,
      type: 'baseline',
      responses: analyzedResponses,
      correctCount,
      totalCount: FIXED_ASSESSMENT_ITEMS.length,
      submittedAt: new Date().toISOString(),
    };

    // Save submission
    saveStoredSubmission(submission);

    // Generate deterministic diagnosis
    const diagnosis = generateDiagnosis(selectedStudent.id, submissionId, analyzedResponses);
    saveStoredDiagnosis(diagnosis);

    // Update student status
    updateStudentStatus(selectedStudent.id, 'diagnosed');

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/diagnose?studentId=${selectedStudent.id}`);
    }, 300);
  };

  return (
    <div className="w-full flex flex-col flex-1">
      {/* Breadcrumb Persistent Context */}
      <Breadcrumb
        studentName={selectedStudent.name}
        studentId={selectedStudent.id}
        currentStep="assess"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full space-y-6 flex-1">
        {/* Header with Student Selector & Controls */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                🟦 Ankit — Input Layer
              </span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-zinc-500">2-Digit Subtraction with Regrouping</span>
            </div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
              Student Assessment — {selectedStudent.name}
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Fixed 5-item FLN diagnostic assessment. Input handwritten answers or simulate OCR capture.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StudentSelector
              students={students}
              currentStudentId={selectedStudent.id}
              targetRoute="/assess"
            />
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5">
          <div className="flex items-center gap-2">
            <button
              onClick={handleFillGoldenDemo}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
            >
              <span>⭐</span>
              <span>Fill Golden Demo (Aarav Patel: 46 on Q3)</span>
            </button>
            <button
              onClick={handleFillAllCorrect}
              className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium transition-colors"
            >
              Fill 100% Correct
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <AssessmentProgress
          answeredCount={answeredCount}
          totalCount={FIXED_ASSESSMENT_ITEMS.length}
        />

        {/* 5 Assessment Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FIXED_ASSESSMENT_ITEMS.map((item) => (
            <AssessmentQuestion
              key={item.id}
              item={item}
              studentAnswer={answers[item.id] || ''}
              onAnswerChange={(val) => handleAnswerChange(item.id, val)}
            />
          ))}

          {/* Submission Action Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-semibold text-indigo-200 tracking-wider">
                Conveyor Belt Step 1 → 2
              </span>
              <h3 className="text-lg font-bold mt-1">Submit & Execute Diagnostic Trace</h3>
              <p className="text-xs text-indigo-100 mt-2 leading-relaxed">
                Hands off responses to <strong>Abhay&apos;s Intelligence Engine</strong> to decompose error signatures, validate checks, and formulate suggested diagnosis for <strong>Abhinav&apos;s Teacher Verification</strong>.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin text-base">⏳</span>
                    <span>Running Diagnostic Engine...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Run Diagnosis</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-500 text-sm">Loading assessment...</div>}>
      <AssessmentContent />
    </Suspense>
  );
}
