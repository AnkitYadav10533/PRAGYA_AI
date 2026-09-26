'use client';

import React, { useState } from 'react';

import { AssessmentItem, ErrorSignature } from '@/lib/types';

interface CauseGraphProps {
  question: AssessmentItem;
  studentAnswer: number | null;
  errorSignature: ErrorSignature;
}

export function CauseGraph({ question, studentAnswer, errorSignature }: CauseGraphProps) {
  const [selectedNode, setSelectedNode] = useState<'ones' | 'tens' | 'outcome'>('tens');

  const num1 = question.num1;
  const num2 = question.num2;
  const tens1 = Math.floor(num1 / 10);
  const ones1 = num1 % 10;
  const tens2 = Math.floor(num2 / 10);
  const ones2 = num2 % 10;

  const correctAnswer = question.correctAnswer;
  const expectedTens = Math.floor(correctAnswer / 10);
  const expectedOnes = correctAnswer % 10;

  const isCorrect = studentAnswer === correctAnswer;
  const studentTens = studentAnswer !== null ? Math.floor(studentAnswer / 10) : null;
  const studentOnes = studentAnswer !== null ? studentAnswer % 10 : null;

  // Determine error category details dynamically
  const errorType = errorSignature.type;

  // Dynamic explanation generators
  let onesObservedTitle = '1. Ones Column Step';
  let onesObservedStatus = '✓ Accurate';
  let onesObservedText = '';
  let onesIsSlip = false;

  let tensObservedTitle = '2. Tens Column Step';
  let tensObservedStatus = '✓ Accurate';
  let tensObservedText = '';
  let tensIsSlip = false;

  let clinicalInsight = '';

  if (isCorrect) {
    onesObservedText = `Regrouped 1 ten into 10 ones: ${10 + ones1} − ${ones2} = ${expectedOnes} ones.`;
    tensObservedText = `Decremented tens to ${tens1 - 1}: ${tens1 - 1} − ${tens2} = ${expectedTens} tens.`;
    clinicalInsight = `The student correctly executed both the regrouping exchange in the ones place and the subsequent decrement in the tens place.`;
  } else if (errorType === 'borrowed_without_decrement') {
    onesObservedTitle = '1. Ones Step: Regroup & Subtract';
    onesObservedStatus = '✓ Accurate';
    onesObservedText = `Borrowed 10 into ones: 1${ones1} (${10 + ones1}) − ${ones2} = ${expectedOnes} ones. Single-digit fact is 100% correct!`;

    tensObservedTitle = '2. Tens Step: Decrement Adjustment';
    tensObservedStatus = '✗ Critical Slip Point';
    tensIsSlip = true;
    tensObservedText = `Failed to decrement tens place: Subtracted original ${tens1} − ${tens2} = ${tens1 - tens2} instead of decremented (${tens1} − 1) − ${tens2} = ${expectedTens}!`;

    clinicalInsight = `The student understands the need to borrow (ones column ${10 + ones1} − ${ones2} = ${expectedOnes} is correct), but omitted the procedural step of crossing out and reducing the minuend tens digit from ${tens1} to ${tens1 - 1}. This confirms a targeted Regrouping (Tens Adjustment) gap rather than a basic facts error.`;
  } else if (errorType === 'smaller_from_larger_ones') {
    onesObservedTitle = '1. Ones Step: Directionality Reversal';
    onesObservedStatus = '✗ Misconception Slip';
    onesIsSlip = true;
    onesObservedText = `Subtracted smaller top digit from larger bottom digit: ${ones2} − ${ones1} = ${ones2 - ones1} instead of borrowing from tens column.`;

    tensObservedTitle = '2. Tens Step: Direct Subtraction';
    tensObservedStatus = '— No Borrowing';
    tensObservedText = `Direct subtraction without regrouping: ${tens1} − ${tens2} = ${tens1 - tens2} tens.`;

    clinicalInsight = `The student reversed the subtraction order in the ones place (${ones2} − ${ones1}) to avoid regrouping. This indicates a conceptual gap in understanding place value and why smaller digits cannot simply be flipped.`;
  } else if (errorType === 'over_decrement') {
    onesObservedTitle = '1. Ones Step: Regroup & Subtract';
    onesObservedStatus = '✓ Accurate';
    onesObservedText = `Borrowed 10 into ones: ${10 + ones1} − ${ones2} = ${expectedOnes} ones.`;

    tensObservedTitle = '2. Tens Step: Over-decrement';
    tensObservedStatus = '✗ Over-reduced';
    tensIsSlip = true;
    tensObservedText = `Decremented tens twice: computed (${tens1} − 2) − ${tens2} = ${tens1 - 2 - tens2} instead of ${expectedTens}.`;

    clinicalInsight = `The student understands regrouping but over-adjusted the tens column, resulting in an answer 10 less than expected.`;
  } else {
    // Arithmetic / general slip
    const onesDiff = studentOnes !== null && studentOnes !== expectedOnes;
    const tensDiff = studentTens !== null && studentTens !== expectedTens;

    if (onesDiff) {
      onesObservedTitle = '1. Ones Column Arithmetic';
      onesObservedStatus = '✗ Fact Slip';
      onesIsSlip = true;
      onesObservedText = `Expected ${10 + ones1} − ${ones2} = ${expectedOnes}, but student recorded ${studentOnes}.`;
    } else {
      onesObservedText = `Calculated ones accurately: ${expectedOnes}.`;
    }

    if (tensDiff) {
      tensObservedTitle = '2. Tens Column Arithmetic';
      tensObservedStatus = '✗ Tens Slip';
      tensIsSlip = true;
      tensObservedText = `Expected ${expectedTens} tens, but student recorded ${studentTens}.`;
    } else {
      tensObservedText = `Calculated tens accurately: ${expectedTens}.`;
    }

    clinicalInsight = `The student made a computational slip during column subtraction. Review whether regrouping was attempted or if single-digit subtraction facts require reinforcement.`;
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Cognitive Error Decomposition
          </span>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>🧠</span> Mental Model & Cause Graph ({num1} − {num2})
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {question.prompt}
          </span>
          <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
            isCorrect
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
          }`}>
            {errorSignature.code}
          </span>
        </div>
      </div>

      {/* Side-by-Side Mental Model Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Child's Observed Path */}
        <div className="border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Student Observed Thought Path
            </span>
            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded">
              Answer: {studentAnswer !== null ? studentAnswer : 'Unanswered'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Step 1: Ones */}
            <div
              onClick={() => setSelectedNode('ones')}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                onesIsSlip
                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 shadow-xs ring-1 ring-rose-300'
                  : selectedNode === 'ones'
                  ? 'border-emerald-500 bg-white dark:bg-zinc-800 shadow-xs'
                  : 'border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{onesObservedTitle}</span>
                <span className={onesIsSlip ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                  {onesObservedStatus}
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-1 font-mono">
                {onesObservedText}
              </p>
            </div>

            {/* Step 2: Tens */}
            <div
              onClick={() => setSelectedNode('tens')}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                tensIsSlip
                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 shadow-xs ring-2 ring-rose-300 dark:ring-rose-800'
                  : selectedNode === 'tens'
                  ? 'border-emerald-500 bg-white dark:bg-zinc-800 shadow-xs'
                  : 'border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{tensObservedTitle}</span>
                <span className={tensIsSlip ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                  {tensObservedStatus}
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-1 font-mono">
                {tensObservedText}
              </p>
            </div>

            {/* Step 3: Result */}
            <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/40">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">3. Result Produced</span>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-1 font-mono">
                Tens: {studentTens !== null ? studentTens : '?'} | Ones: {studentOnes !== null ? studentOnes : '?'} → <strong>{studentAnswer}</strong>
                {!isCorrect && studentAnswer !== null && (
                  <span className="text-rose-600 dark:text-rose-400 ml-1">
                    ({studentAnswer > correctAnswer ? `+${studentAnswer - correctAnswer}` : studentAnswer - correctAnswer} from expected {correctAnswer})
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Target Standard Algorithmic Path */}
        <div className="border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Target Standard Algorithm
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
              Expected: {correctAnswer}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/40">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">1. Inspect Ones & Regroup 1 Ten</span>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-1 font-mono">
                Cannot subtract {ones2} from {ones1} → Exchange 1 ten for 10 ones: {10 + ones1} − {ones2} = {expectedOnes} ones.
              </p>
            </div>

            <div className="p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/40">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">2. Decrement Tens Column</span>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1 font-mono">
                Cross out {tens1}, write {tens1 - 1}. Then ({tens1} − 1) − {tens2} = {expectedTens} tens.
              </p>
            </div>

            <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/40">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">3. Combined Difference</span>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-1 font-mono">
                Tens: {expectedTens} | Ones: {expectedOnes} → <strong>{correctAnswer}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory Clinical Callout */}
      <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs space-y-1">
        <span className="font-bold text-indigo-900 dark:text-indigo-200 block">
          💡 Teacher Clinical Insight ({question.prompt}):
        </span>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {clinicalInsight}
        </p>
      </div>
    </div>
  );
}
