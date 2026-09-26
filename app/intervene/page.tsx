'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

import { StudentSelector } from '@/components/assessment/StudentSelector';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { GapBadge } from '@/components/shared/StatusBadge';
import { REMEDIAL_ACTIVITIES } from '@/lib/activities';
import { FIXED_ASSESSMENT_ITEMS } from '@/lib/engine';
import { speakText } from '@/lib/i18n';
import { SEED_DIAGNOSES, SEED_STUDENTS } from '@/lib/mock';
import { Diagnosis, RemedialActivity, Student } from '@/lib/types';
import {
  getStoredDiagnoses,
  getStoredStudents,
  getStoredSubmissions,
  updateStudentStatus,
} from '@/lib/utils';

function InterveneContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentIdParam = searchParams.get('studentId') || 's-01';

  const [students, setStudents] = useState<Student[]>(SEED_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student>(SEED_STUDENTS[0]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [activity, setActivity] = useState<RemedialActivity>(REMEDIAL_ACTIVITIES[0]);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [targetQuestionId, setTargetQuestionId] = useState<string>('q3');
  const [studentErrors, setStudentErrors] = useState<string[]>(['q3', 'q5']);
  const [tensCount, setTensCount] = useState<number>(8);
  const [onesCount, setOnesCount] = useState<number>(3);
  const [hasRegrouped, setHasRegrouped] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const loadedStudents = getStoredStudents();
    setStudents(loadedStudents);

    const found = loadedStudents.find((s) => s.id === studentIdParam) || loadedStudents[0];
    setSelectedStudent(found);

    const diagnoses = getStoredDiagnoses();
    const currentDiag = diagnoses.find((d) => d.studentId === found.id) || SEED_DIAGNOSES[0];
    setDiagnosis(currentDiag);

    // Pick activity based on diagnosis primary error or final verdict
    const matched =
      REMEDIAL_ACTIVITIES.find((a) => a.targetedError === currentDiag.primaryErrorType) ||
      REMEDIAL_ACTIVITIES[0];
    setActivity(matched);

    // Check student's submission to highlight their specific error questions
    const submissions = getStoredSubmissions();
    const sub = submissions.find((s) => s.studentId === found.id);
    const errors = sub ? sub.responses.filter((r) => !r.isCorrect).map((r) => r.questionId) : ['q3', 'q5'];
    setStudentErrors(errors);

    const defaultQId = errors.length > 0 ? errors[0] : 'q3';
    setTargetQuestionId(defaultQId);

    const targetItem = FIXED_ASSESSMENT_ITEMS.find((q) => q.id === defaultQId) || FIXED_ASSESSMENT_ITEMS[2];
    setTensCount(Math.floor(targetItem.num1 / 10));
    setOnesCount(targetItem.num1 % 10);
    setHasRegrouped(false);
  }, [studentIdParam]);

  const activeQuestion =
    FIXED_ASSESSMENT_ITEMS.find((q) => q.id === targetQuestionId) || FIXED_ASSESSMENT_ITEMS[2];
  const num1 = activeQuestion.num1;
  const num2 = activeQuestion.num2;
  const tens1 = Math.floor(num1 / 10);
  const ones1 = num1 % 10;
  const tens2 = Math.floor(num2 / 10);
  const ones2 = num2 % 10;
  const correctAnswer = activeQuestion.correctAnswer;
  const expectedTens = Math.floor(correctAnswer / 10);
  const expectedOnes = correctAnswer % 10;

  const handleSelectQuestion = (qId: string) => {
    setTargetQuestionId(qId);
    const q = FIXED_ASSESSMENT_ITEMS.find((item) => item.id === qId) || FIXED_ASSESSMENT_ITEMS[2];
    setTensCount(Math.floor(q.num1 / 10));
    setOnesCount(q.num1 % 10);
    setHasRegrouped(false);
  };

  // Manipulative simulation actions
  const handleRegroup = () => {
    if (tensCount > 0 && !hasRegrouped) {
      setTensCount(tens1 - 1);
      setOnesCount(ones1 + 10);
      setHasRegrouped(true);
    }
  };

  const handleResetManipulatives = () => {
    setTensCount(tens1);
    setOnesCount(ones1);
    setHasRegrouped(false);
  };

  const handleCompleteIntervention = () => {
    updateStudentStatus(selectedStudent.id, 'intervened');
    setIsCompleted(true);
    setTimeout(() => {
      router.push(`/reassess?studentId=${selectedStudent.id}`);
    }, 400);
  };

  return (
    <div className="w-full flex flex-col flex-1">
      {/* Breadcrumb Persistent Journey Context */}
      <Breadcrumb
        studentName={selectedStudent.name}
        studentId={selectedStudent.id}
        currentStep="intervene"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full space-y-6 flex-1">
        {/* Header & Student Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                🟪 Abhinav — Action Layer
              </span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-zinc-500">Conveyor Belt Step 6</span>
            </div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
              CPA Remedial Activity — {activity.title}
            </h1>
          </div>

          <StudentSelector
            students={students}
            currentStudentId={selectedStudent.id}
            targetRoute="/intervene"
          />
        </div>

        {/* Activity Overview Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Targeted Learning Gap
                </span>
                <GapBadge gap={diagnosis?.finalVerdict || diagnosis?.suggestedVerdict || 'Regrouping'} />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {activity.title}
              </h2>
              <p className="text-xs text-zinc-500 max-w-2xl">
                {activity.description}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 shrink-0">
              <span>⏱ Estimated: {activity.durationMinutes} Mins</span>
              <span>•</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">{activity.pedagogy}</span>
            </div>
          </div>

          {/* Physical Materials Required */}
          <div>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-2">
              Physical Manipulative Materials:
            </span>
            <div className="flex flex-wrap gap-2">
              {activity.materials.map((mat) => (
                <span
                  key={mat}
                  className="text-xs px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5"
                >
                  <span>📦</span> {mat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Practice Problem Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
              Remedial Practice Problem
            </span>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              Select problem to model with Base-10 manipulatives:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {FIXED_ASSESSMENT_ITEMS.map((item) => {
              const isSelected = targetQuestionId === item.id;
              const isErr = studentErrors.includes(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectQuestion(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isErr
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 hover:bg-rose-100'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <span>Item #{item.order} ({item.prompt})</span>
                  {isErr && (
                    <span className="text-rose-600 dark:text-rose-400 font-extrabold text-[10px] uppercase">
                      Slip
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive CPA Manipulative Simulation & Step Walkthrough */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Interactive Base-10 Manipulative Board */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <span>🧱</span> Interactive Place Value Board ({num1} − {num2})
                </h3>
                <p className="text-xs text-zinc-500">
                  Simulate physical exchange: unbundle 1 ten rod into 10 unit cubes before subtracting.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetManipulatives}
                  className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 underline font-medium"
                >
                  Reset
                </button>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {num1} − {num2}
                </span>
              </div>
            </div>

            {/* Place Value Mat (Tens | Ones) */}
            <div className="grid grid-cols-2 gap-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-5 bg-zinc-50/50 dark:bg-zinc-800/20 min-h-[220px]">
              {/* Tens Column */}
              <div className="border-r border-zinc-200 dark:border-zinc-700 pr-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-zinc-500">Tens Column</span>
                  <span className="font-mono text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                    {tensCount} Tens ({tensCount * 10})
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {Array.from({ length: tensCount }).map((_, i) => (
                    <div
                      key={`ten-${i}`}
                      title="10-rod"
                      className="w-3.5 h-16 bg-gradient-to-b from-indigo-500 to-indigo-700 rounded-sm shadow-xs border border-indigo-400"
                    />
                  ))}
                </div>
              </div>

              {/* Ones Column */}
              <div className="pl-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-zinc-500">Ones Column</span>
                  <span className="font-mono text-base font-extrabold text-amber-600 dark:text-amber-400">
                    {onesCount} Ones ({onesCount})
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {Array.from({ length: onesCount }).map((_, i) => (
                    <div
                      key={`one-${i}`}
                      title="1-cube"
                      className="w-3.5 h-3.5 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-xs shadow-xs border border-amber-300"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Exchange Action Button */}
            <div className="space-y-2">
              <button
                onClick={handleRegroup}
                disabled={hasRegrouped}
                className={`w-full py-3 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 ${
                  !hasRegrouped
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer hover:scale-[1.01]'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                }`}
              >
                {!hasRegrouped ? (
                  <>
                    <span>🔄</span>
                    <span>Exchange 1 Ten Rod for 10 Ones (Regroup)</span>
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    <span>Exchanged! Now {tens1 - 1} Tens and {ones1 + 10} Ones. Decrement tens recorded!</span>
                  </>
                )}
              </button>

              {hasRegrouped && (
                <p className="text-xs text-center text-emerald-700 dark:text-emerald-400 font-medium">
                  Result: {ones1 + 10} − {ones2} = {expectedOnes} ones, and {tens1 - 1} − {tens2} = {expectedTens} tens → <strong>Difference = {correctAnswer}</strong>!
                </p>
              )}
            </div>

            {/* Synchronized Concrete -> Abstract Scratchpad */}
            <div className="border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl p-4 flex flex-col items-center justify-center font-mono text-center">
              <span className="text-[10px] uppercase font-sans font-bold text-zinc-500 mb-2">
                Synchronized Abstract Written Notation (CPA Bridge)
              </span>
              <div className="text-2xl font-bold tracking-widest text-zinc-900 dark:text-zinc-100">
                <div className="flex justify-center gap-4 text-xs font-semibold pb-1">
                  <span className={hasRegrouped ? 'text-rose-600 font-bold animate-pulse' : 'text-transparent'}>
                    {tens1 - 1}
                  </span>
                  <span className={hasRegrouped ? 'text-emerald-600 font-bold animate-pulse' : 'text-transparent'}>
                    {ones1 + 10}
                  </span>
                </div>
                <div className="flex justify-center gap-4">
                  <span className={hasRegrouped ? 'line-through text-zinc-400 decoration-rose-500 decoration-2' : ''}>
                    {tens1}
                  </span>
                  <span className={hasRegrouped ? 'line-through text-zinc-400 decoration-emerald-500 decoration-2' : ''}>
                    {ones1}
                  </span>
                </div>
                <div className="flex justify-center gap-4 text-zinc-500">
                  <span>−</span>
                  <span>{tens2}</span>
                  <span>{ones2}</span>
                </div>
                <div className="w-28 h-0.5 bg-zinc-800 dark:bg-zinc-200 mx-auto my-1.5" />
                <div className="flex justify-center gap-4 text-emerald-600 dark:text-emerald-400 font-extrabold">
                  <span>{expectedTens}</span>
                  <span>{expectedOnes}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Step-by-Step Teacher Script Walkthrough */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  Pedagogical Step Walkthrough
                </h3>
                <span className="text-xs font-semibold text-zinc-500">
                  Step {activeStep} of {activity.steps.length}
                </span>
              </div>

              <div className="space-y-4 pt-4">
                {activity.steps.map((step) => {
                  const isActive = step.stepNumber === activeStep;
                  return (
                    <div
                      key={step.stepNumber}
                      onClick={() => setActiveStep(step.stepNumber)}
                      className={`cursor-pointer rounded-xl p-4 border transition-all ${
                        isActive
                          ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-xs'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                              isActive
                                ? 'bg-indigo-600 text-white'
                                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}
                          >
                            {step.stepNumber}
                          </span>
                          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                            {step.title}
                          </h4>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(step.teacherPrompt, 'en');
                          }}
                          title="Listen with Web Speech"
                          className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-100 dark:hover:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span>🔊</span>
                          <span>Audio</span>
                        </button>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 pl-8">
                        {step.instruction}
                      </p>

                      <div className="mt-2.5 ml-8 p-2.5 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs">
                        <span className="font-semibold text-indigo-700 dark:text-indigo-300 block mb-0.5">
                          🗣 Teacher Prompt:
                        </span>
                        <p className="italic text-zinc-700 dark:text-zinc-300">
                          &quot;{step.teacherPrompt}&quot;
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Complete Activity and Advance to Reassessment */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={handleCompleteIntervention}
                disabled={isCompleted}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isCompleted ? (
                  <span>Recording Intervention Completion...</span>
                ) : (
                  <>
                    <span>✓ Complete Intervention & Proceed to Reassessment</span>
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

export default function IntervenePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-500 text-sm">Loading intervention...</div>}>
      <InterveneContent />
    </Suspense>
  );
}
