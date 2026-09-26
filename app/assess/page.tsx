'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

import { AssessmentProgress } from '@/components/assessment/AssessmentProgress';
import { AssessmentQuestion } from '@/components/assessment/AssessmentQuestion';
import { GeminiOCRModal } from '@/components/assessment/GeminiOCRModal';
import { StudentSelector } from '@/components/assessment/StudentSelector';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import {
  analyzeResponse,
  FIXED_ASSESSMENT_ITEMS,
  generateDiagnosis,
} from '@/lib/engine';
import { generateDynamicQuestionsWithGemini, MathOperationType } from '@/lib/gemini';
import { SEED_STUDENTS } from '@/lib/mock';
import { AssessmentItem, AssessmentSubmission, Student, StudentResponse } from '@/lib/types';
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
  const [currentQuestions, setCurrentQuestions] = useState<AssessmentItem[]>(FIXED_ASSESSMENT_ITEMS);
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });

  // Gemini dynamic generation states
  const [selectedOperation, setSelectedOperation] = useState<MathOperationType>('sub');
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState<boolean>(false);
  const [isDynamicMode, setIsDynamicMode] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Gemini Vision OCR states
  const [showOCRModal, setShowOCRModal] = useState<boolean>(false);
  const [ocrSuccessMsg, setOcrSuccessMsg] = useState<string | null>(null);

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
    const perfect: Record<string, string> = {};
    currentQuestions.forEach((q) => {
      perfect[q.id] = q.correctAnswer.toString();
    });
    setAnswers(perfect);
  };

  // Generate dynamic MCQ questions using Gemini 3.5 Flash Lite
  const handleGenerateDynamicQuestions = async () => {
    setIsGeneratingQuestions(true);
    setGenerationError(null);

    try {
      const generated = await generateDynamicQuestionsWithGemini(selectedOperation);
      setCurrentQuestions(generated);
      setIsDynamicMode(true);
      // Clear answers for fresh questions
      const freshAnswers: Record<string, string> = {};
      generated.forEach((q) => {
        freshAnswers[q.id] = '';
      });
      setAnswers(freshAnswers);
    } catch (err: unknown) {
      console.error('Gemini question generation error:', err);
      setGenerationError(err instanceof Error ? err.message : 'Failed to generate questions with Gemini API');
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleResetToStandard = () => {
    setCurrentQuestions(FIXED_ASSESSMENT_ITEMS);
    setIsDynamicMode(false);
    setAnswers({ q1: '', q2: '', q3: '', q4: '', q5: '' });
  };

  // Apply OCR extracted answers from Gemini Vision
  const handleApplyOCRAnswers = (extracted: Record<string, string>) => {
    setAnswers((prev) => ({ ...prev, ...extracted }));
    setOcrSuccessMsg('✓ Successfully transcribed handwritten answers via Gemini 3.5 Flash Lite Vision!');
    setTimeout(() => {
      setOcrSuccessMsg(null);
    }, 6000);
  };

  const answeredCount = Object.values(answers).filter((a) => a.trim() !== '').length;

  const handleSubmit = () => {
    if (answeredCount < currentQuestions.length) {
      if (!confirm(`You have answered ${answeredCount} of ${currentQuestions.length} items. Submit remaining as unattempted?`)) {
        return;
      }
    }

    setIsSubmitting(true);

    const analyzedResponses: StudentResponse[] = currentQuestions.map((item) => {
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
      totalCount: currentQuestions.length,
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
              <span className="text-xs text-zinc-500">
                {isDynamicMode ? `Dynamic Gemini ${selectedOperation.toUpperCase()} MCQs` : '2-Digit Subtraction with Regrouping'}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
              Student Assessment — {selectedStudent.name}
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Input student answers manually, scan worksheets with Gemini Vision OCR, or generate dynamic MCQ questions with Gemini 3.5 Flash Lite.
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
          <div className="flex flex-wrap items-center gap-2">
            {!isDynamicMode && (
              <button
                type="button"
                onClick={handleFillGoldenDemo}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <span>⭐</span>
                <span>Fill Golden Demo (Aarav: 46 on Q3)</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleFillAllCorrect}
              className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium transition-colors"
            >
              Fill 100% Correct
            </button>

            {/* Gemini Vision OCR Scanner Button */}
            <button
              type="button"
              onClick={() => setShowOCRModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
            >
              <span>📷</span>
              <span>Gemini Vision OCR Scanner</span>
            </button>
          </div>
        </div>

        {/* OCR Success Alert */}
        {ocrSuccessMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">✓</span>
              <span>{ocrSuccessMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setOcrSuccessMsg(null)}
              className="text-emerald-600 hover:text-emerald-800 text-sm font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Gemini Dynamic MCQ Generator Section */}
        <div className="bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-blue-50/70 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-blue-950/30 border border-indigo-200 dark:border-indigo-800/80 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  ✨ Gemini 3.5 Flash Lite
                </span>
                {isDynamicMode && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    ● Dynamic MCQ Active
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                Dynamic Question Generator (Changes only on button click)
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Choose question type (Add, Sub, Div, Mult) and generate 5 diagnostic MCQs using the Gemini API key.
              </p>
            </div>

            {isDynamicMode && (
              <button
                type="button"
                onClick={handleResetToStandard}
                className="px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 shadow-xs"
              >
                🔄 Reset to Standard Bank
              </button>
            )}
          </div>

          {/* Operation Type Selector Pills & Trigger Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-indigo-100 dark:border-indigo-900/60">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mr-1">
                Operation Type:
              </span>
              {[
                { type: 'sub', label: '➖ Subtraction' },
                { type: 'add', label: '➕ Addition' },
                { type: 'multiplication', label: '✖ Multiplication' },
                { type: 'div', label: '➗ Division' },
              ].map((t) => (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => setSelectedOperation(t.type as MathOperationType)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedOperation === t.type
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleGenerateDynamicQuestions}
              disabled={isGeneratingQuestions}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isGeneratingQuestions ? (
                <>
                  <span className="animate-spin text-sm">⏳</span>
                  <span>Generating with Gemini 3.5 Flash Lite...</span>
                </>
              ) : (
                <>
                  <span>🎲 Generate 5 Dynamic Questions with Gemini</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>

          {/* Error notice if generation fails */}
          {generationError && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
              ⚠️ {generationError}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <AssessmentProgress
          answeredCount={answeredCount}
          totalCount={currentQuestions.length}
        />

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentQuestions.map((item) => (
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

      {/* Gemini Vision OCR Modal */}
      {showOCRModal && (
        <GeminiOCRModal
          onApplyAnswers={handleApplyOCRAnswers}
          onClose={() => setShowOCRModal(false)}
        />
      )}
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
