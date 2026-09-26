'use client';

import React from 'react';

import { AssessmentItem } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AssessmentQuestionProps {
  item: AssessmentItem;
  studentAnswer: string;
  onAnswerChange: (value: string) => void;
}

export function AssessmentQuestion({
  item,
  studentAnswer,
  onAnswerChange,
}: AssessmentQuestionProps) {
  // Extract digits for vertical column alignment
  const tens1 = Math.floor(item.num1 / 10);
  const ones1 = item.num1 % 10;
  const tens2 = Math.floor(item.num2 / 10);
  const ones2 = item.num2 % 10;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between">
      {/* Question Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold flex items-center justify-center">
            {item.order}
          </span>
          <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
            Item #{item.order}
          </span>
        </div>
        {item.type === 'warmup' ? (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900">
            ○ Warm-up Baseline
          </span>
        ) : (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-900">
            ⚡ Diagnostic Item
          </span>
        )}
      </div>

      {/* Vertical Math Alignment */}
      <div className="py-6 flex flex-col items-center justify-center font-mono">
        <div className="grid grid-cols-3 text-2xl sm:text-3xl font-bold tracking-widest text-zinc-900 dark:text-zinc-100 gap-x-2 w-32">
          {/* Column labels */}
          <div className="text-[10px] uppercase font-sans text-zinc-400 text-center"></div>
          <div className="text-[10px] uppercase font-sans text-zinc-400 text-center font-semibold">T</div>
          <div className="text-[10px] uppercase font-sans text-zinc-400 text-center font-semibold">O</div>

          {/* Row 1 (Minuend) */}
          <div></div>
          <div className="text-center">{tens1}</div>
          <div className="text-center">{ones1}</div>

          {/* Row 2 (Subtrahend) */}
          <div className="text-zinc-500 text-center">−</div>
          <div className="text-center">{tens2}</div>
          <div className="text-center">{ones2}</div>
        </div>

        {/* Divider bar */}
        <div className="w-36 h-0.5 bg-zinc-800 dark:bg-zinc-200 my-2" />

        {/* Answer Input Field */}
        <div className="w-36 flex flex-col items-center">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={3}
            value={studentAnswer}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '');
              onAnswerChange(val);
            }}
            placeholder="? ?"
            className={cn(
              'w-28 text-center text-2xl font-bold font-mono py-1 px-2 rounded-lg border-2 transition-all outline-none',
              studentAnswer !== ''
                ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 dark:bg-indigo-950/30 dark:text-indigo-200'
                : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
            )}
          />
        </div>
      </div>
    </div>
  );
}
