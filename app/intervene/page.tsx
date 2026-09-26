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
import { AssessmentItem, Diagnosis, RemedialActivity, Student } from '@/lib/types';
import {
  getQuestionsForStudent,
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
  const [questions, setQuestions] = useState<AssessmentItem[]>(FIXED_ASSESSMENT_ITEMS);
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

    const studentQuestions = getQuestionsForStudent(found.id);
    setQuestions(studentQuestions);

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

    const defaultQId = errors.length > 0 ? errors[0] : (studentQuestions[0]?.id || 'q3');
    setTargetQuestionId(defaultQId);

    const targetItem = studentQuestions.find((q) => q.id === defaultQId) || studentQuestions[0] || FIXED_ASSESSMENT_ITEMS[0];
    setTensCount(Math.floor(targetItem.num1 / 10));
    setOnesCount(targetItem.num1 % 10);
    setHasRegrouped(false);
  }, [studentIdParam]);

  const activeQuestion =
    questions.find((q) => q.id === targetQuestionId) || questions[0] || FIXED_ASSESSMENT_ITEMS[0];
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
    const q = questions.find((item) => item.id === qId) || questions[0];
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
        <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/70 px-2.5 py-0.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
                🟪 Abhinav — Action Layer
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-xs text-zinc-500 font-medium">Conveyor Belt Step 6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
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
        <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80">
                  Targeted Learning Gap
                </span>
                <GapBadge gap={diagnosis?.finalVerdict || diagnosis?.suggestedVerdict || 'Regrouping'} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                {activity.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                {activity.description}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 shrink-0 bg-zinc-100 dark:bg-zinc-800/80 px-3.5 py-2 rounded-xl">
              <span>⏱ Estimated: {activity.durationMinutes} Mins</span>
              <span>•</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{activity.pedagogy}</span>
            </div>
          </div>

          {/* Physical Materials Required */}
          <div>
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2">
              Physical Manipulative Materials:
            </span>
            <div className="flex flex-wrap gap-2">
              {activity.materials.map((mat) => (
                <span
                  key={mat}
                  className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold border border-zinc-200/80 dark:border-zinc-700/80 flex items-center gap-1.5 shadow-2xs"
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
            {questions.map((item) => {
              const isSelected = targetQuestionId === item.id;
              const isErr = studentErrors.includes(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectQuestion(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
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
          <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3.5">
              <div>
                <h3 className="font-black text-base text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <span>🧱</span> Interactive Place Value Board ({activeQuestion.prompt})
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Simulate physical exchange: unbundle 1 ten rod into 10 unit cubes before subtracting.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetManipulatives}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold cursor-pointer"
                >
                  Reset
                </button>
                <span className="text-xs font-mono font-black px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-2xs">
                  {activeQuestion.prompt}
                </span>
              </div>
            </div>

            {/* Place Value Mat (Tens | Ones) */}
            <div className="grid grid-cols-2 gap-4 border-2 border-dashed border-indigo-200 dark:border-indigo-900/60 rounded-2xl p-5 bg-gradient-to-b from-indigo-50/40 to-white dark:from-zinc-900/60 dark:to-zinc-900/40 min-h-[230px]">
              {/* Tens Column */}
              <div className="border-r border-indigo-100 dark:border-zinc-800 pr-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">Tens Column</span>
                  <span className="font-mono text-sm sm:text-base font-black text-indigo-600 dark:text-indigo-400">
                    {tensCount} Tens ({tensCount * 10})
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {Array.from({ length: tensCount }).map((_, i) => (
                    <div
                      key={`ten-${i}`}
                      title="10-rod"
                      className="w-4 h-16 bg-gradient-to-b from-indigo-400 via-indigo-600 to-indigo-700 rounded-sm shadow-sm border border-indigo-300 transition-all hover:scale-105"
                    />
                  ))}
                </div>
              </div>

              {/* Ones Column */}
              <div className="pl-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">Ones Column</span>
                  <span className="font-mono text-sm sm:text-base font-black text-amber-600 dark:text-amber-400">
                    {onesCount} Ones ({onesCount})
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {Array.from({ length: onesCount }).map((_, i) => (
                    <div
                      key={`one-${i}`}
                      title="1-cube"
                      className="w-4 h-4 bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 rounded-xs shadow-sm border border-amber-300 transition-all hover:scale-110"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Exchange Action Button */}
            <div className="space-y-2.5">
              <button
                onClick={handleRegroup}
                disabled={hasRegrouped}
                className={`w-full py-3.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  !hasRegrouped
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white cursor-pointer shadow-indigo-600/20 hover:scale-[1.01]'
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
                <p className="text-xs text-center text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 py-2 px-3 rounded-xl border border-emerald-200/80 dark:border-emerald-800/80">
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
          <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3.5">
                <h3 className="font-black text-base text-zinc-900 dark:text-zinc-50">
                  Pedagogical Step Walkthrough
                </h3>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  Step {activeStep} of {activity.steps.length}
                </span>
              </div>

              <div className="space-y-3.5 pt-4">
                {activity.steps.map((step) => {
                  const isActive = step.stepNumber === activeStep;
                  return (
                    <div
                      key={step.stepNumber}
                      onClick={() => setActiveStep(step.stepNumber)}
                      className={`cursor-pointer rounded-2xl p-4.5 border transition-all ${
                        isActive
                          ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 shadow-sm ring-2 ring-indigo-500/20'
                          : 'border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white/50 dark:bg-zinc-800/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                              isActive
                                ? 'bg-indigo-600 text-white shadow-2xs'
                                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}
                          >
                            {step.stepNumber}
                          </span>
                          <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-50">
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
                          className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-100 dark:hover:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold flex items-center gap-1 transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-700"
                        >
                          <span>🔊</span>
                          <span>Audio</span>
                        </button>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 pl-8 leading-relaxed font-normal">
                        {step.instruction}
                      </p>

                      <div className="mt-3 ml-8 p-3 rounded-xl bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 text-xs shadow-2xs">
                        <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                          🗣 Teacher Script Prompt:
                        </span>
                        <p className="italic text-zinc-700 dark:text-zinc-300 font-medium">
                          &quot;{step.teacherPrompt}&quot;
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Complete Activity and Advance to Reassessment */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
              <button
                onClick={handleCompleteIntervention}
                disabled={isCompleted}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
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
