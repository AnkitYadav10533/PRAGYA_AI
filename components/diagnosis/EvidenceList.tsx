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
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div>
          <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>🔍</span> Student Mathematical Trace & Evidence
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Breakdown of student answers against expected difference and identified error signatures.
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
          {responses.filter((r) => r.isCorrect).length} of {responses.length} Correct
        </span>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {responses.map((resp, idx) => {
          const item = FIXED_ASSESSMENT_ITEMS.find((q) => q.id === resp.questionId);
          const isGoldenDemoError = item?.id === 'q3' && resp.studentAnswer === 46;

          return (
            <div
              key={resp.questionId}
              className={cn(
                'py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl px-3 transition-colors',
                isGoldenDemoError && 'bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 my-1',
                !isGoldenDemoError && !resp.isCorrect && 'hover:bg-rose-50/40 dark:hover:bg-rose-950/10'
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5',
                    resp.isCorrect
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
                  )}
                >
                  {resp.isCorrect ? '✓' : '✗'}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 font-mono">
                      Q{idx + 1}: {item?.prompt}
                    </span>
                    <span className="text-xs text-zinc-400">
                      Expected: <strong className="font-mono text-zinc-700 dark:text-zinc-300">{item?.correctAnswer}</strong>
                    </span>
                    {item?.type === 'warmup' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 font-medium">
                        Warm-up
                      </span>
                    )}
                    {isGoldenDemoError && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold tracking-wide">
                        Demo Regrouping Slip
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                    {resp.errorExplanation}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-1 pl-10 sm:pl-0">
                <div className="text-xs">
                  Student Answer:{' '}
                  <span
                    className={cn(
                      'font-mono font-bold text-sm px-2 py-0.5 rounded',
                      resp.isCorrect
                        ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60'
                        : 'text-rose-700 bg-rose-50 dark:bg-rose-950/60'
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
