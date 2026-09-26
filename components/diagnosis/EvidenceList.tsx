'use client';

import React from 'react';

import { FIXED_ASSESSMENT_ITEMS } from '@/lib/engine';
import { StudentResponse } from '@/lib/types';
import { cn } from '@/lib/utils';

interface EvidenceListProps {
  responses: StudentResponse[];
}

export function EvidenceList({ responses }: EvidenceListProps) {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
        <div>
          <h3 className="font-black text-base text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <span>🔍</span> Student Mathematical Trace & Evidence
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Breakdown of student answers against expected difference and identified error signatures.
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 shadow-2xs">
          {responses.filter((r) => r.isCorrect).length} of {responses.length} Correct
        </span>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
        {responses.map((resp, idx) => {
          const item = FIXED_ASSESSMENT_ITEMS.find((q) => q.id === resp.questionId);
          const isGoldenDemoError = item?.id === 'q3' && resp.studentAnswer === 46;

          return (
            <div
              key={resp.questionId}
              className={cn(
                'py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl px-3.5 transition-all',
                isGoldenDemoError && 'bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 my-1 shadow-2xs',
                !isGoldenDemoError && !resp.isCorrect && 'hover:bg-rose-50/40 dark:hover:bg-rose-950/20'
              )}
            >
              <div className="flex items-start gap-3.5">
                <span
                  className={cn(
                    'w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-2xs',
                    resp.isCorrect
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-rose-600 text-white shadow-rose-600/20'
                  )}
                >
                  {resp.isCorrect ? '✓' : '✗'}
                </span>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm text-zinc-900 dark:text-zinc-100 font-mono">
                      Q{idx + 1}: {item?.prompt}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      Expected: <strong className="font-mono text-zinc-700 dark:text-zinc-300 font-bold">{item?.correctAnswer}</strong>
                    </span>
                    {item?.type === 'warmup' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold">
                        Warm-up
                      </span>
                    )}
                    {isGoldenDemoError && (
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-black tracking-wide shadow-2xs animate-pulse">
                        Demo Regrouping Slip
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1.5 leading-relaxed font-normal">
                    {resp.errorExplanation}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-1.5 pl-11 sm:pl-0">
                <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  Student Answer:{' '}
                  <span
                    className={cn(
                      'font-mono font-black text-base px-2.5 py-0.5 rounded-lg border shadow-2xs',
                      resp.isCorrect
                        ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300/60 dark:border-emerald-800'
                        : 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 border-rose-300/60 dark:border-rose-800'
                    )}
                  >
                    {resp.studentAnswer !== null ? resp.studentAnswer : 'Unattempted'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  {resp.detectedError}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

