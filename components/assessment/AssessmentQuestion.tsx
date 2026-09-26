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

  const operationSymbol =
    item.operation === 'addition'
      ? '+'
      : item.operation === 'multiplication'
      ? '×'
      : item.operation === 'division'
      ? '÷'
      : '−';

  return (
    <div className="glass-card hover:border-indigo-300 dark:hover:border-indigo-700/80 rounded-2xl p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between group">
      {/* Question Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white text-xs font-black flex items-center justify-center shadow-xs shadow-indigo-500/20">
            {item.order}
          </span>
          <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
            Question #{item.order}
          </span>
        </div>
        {item.type === 'warmup' ? (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900/60 shadow-2xs">
            ○ Warm-up Baseline
          </span>
        ) : (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-900/60 shadow-2xs">
            ⚡ Diagnostic Item
          </span>
        )}
      </div>

      {/* Math Alignment Display */}
      <div className="py-6 flex flex-col items-center justify-center font-mono">
        {item.num1 >= 10 && item.num2 >= 10 && (item.operation === 'subtraction' || item.operation === 'addition' || !item.operation) ? (
          <div className="bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 rounded-2xl p-4 shadow-2xs">
            <div className="grid grid-cols-3 text-3xl font-extrabold tracking-widest text-zinc-900 dark:text-zinc-50 gap-x-3 w-36">
              {/* Column labels */}
              <div className="text-[10px] uppercase font-sans text-zinc-400 text-center"></div>
              <div className="text-[10px] uppercase font-sans text-indigo-500 text-center font-extrabold bg-indigo-50/80 dark:bg-indigo-950/40 rounded py-0.5">T</div>
              <div className="text-[10px] uppercase font-sans text-violet-500 text-center font-extrabold bg-violet-50/80 dark:bg-violet-950/40 rounded py-0.5">O</div>

              {/* Row 1 (Minuend) */}
              <div></div>
              <div className="text-center pt-2">{tens1}</div>
              <div className="text-center pt-2">{ones1}</div>

              {/* Row 2 (Subtrahend) */}
              <div className="text-indigo-500 text-center font-sans font-bold">{operationSymbol}</div>
              <div className="text-center">{tens2}</div>
              <div className="text-center">{ones2}</div>
            </div>

            {/* Divider bar */}
            <div className="w-full h-0.5 bg-zinc-800 dark:bg-zinc-200 my-2.5 rounded-full" />

            {/* Answer Input Field */}
            <div className="w-full flex flex-col items-center">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={studentAnswer}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  onAnswerChange(val);
                }}
                placeholder="? ?"
                className={cn(
                  'w-28 text-center text-3xl font-black font-mono py-1.5 px-2 rounded-xl border-2 transition-all outline-none shadow-2xs',
                  studentAnswer !== ''
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                    : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-300 dark:placeholder-zinc-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
                )}
              />
            </div>
          </div>
        ) : (
          <div className="w-full text-center space-y-4">
            <div className="text-3xl font-black tracking-wider text-zinc-900 dark:text-zinc-50 my-2 font-mono">
              {item.prompt}
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={studentAnswer}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                onAnswerChange(val);
              }}
              placeholder="?"
              className={cn(
                'w-28 text-center text-3xl font-black font-mono py-1.5 px-2 rounded-xl border-2 transition-all outline-none shadow-2xs mx-auto block',
                studentAnswer !== ''
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                  : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-300 dark:placeholder-zinc-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
              )}
            />
          </div>
        )}
      </div>

      {/* Multiple Choice Options (MCQ) when available */}
      {item.options && item.options.length > 0 && (
        <div className="mt-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-purple-600 dark:text-purple-400 block text-center">
            MCQ Options (Gemini 3.5 Flash Lite)
          </span>
          <div className="grid grid-cols-2 gap-2">
            {item.options.map((opt) => {
              const isSelected = studentAnswer === opt.value.toString() || studentAnswer === opt.text;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onAnswerChange(opt.value.toString())}
                  className={cn(
                    'px-2.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center justify-between cursor-pointer',
                    isSelected
                      ? 'border-indigo-600 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/20 scale-[1.02]'
                      : 'border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200 hover:border-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  )}
                >
                  <span
                    className={cn(
                      'text-[10px] font-sans px-1.5 py-0.5 rounded-lg font-bold',
                      isSelected ? 'bg-white/20 text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    {opt.id}
                  </span>
                  <span className="text-sm font-extrabold">{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
