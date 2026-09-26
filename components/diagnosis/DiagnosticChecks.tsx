'use client';

import React from 'react';

import { DiagnosticCheck } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DiagnosticChecksProps {
  checks: DiagnosticCheck[];
}

export function DiagnosticChecks({ checks }: DiagnosticChecksProps) {
  // Sort checks: verdict-bearing first, then warm-up support
  const verdictChecks = checks.filter((c) => c.type === 'verdict_bearing');
  const warmupCheck = checks.find((c) => c.type === 'support_warmup');

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div>
          <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>🛡</span> Diagnostic Verification Checks
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Two verdict-bearing mathematical checks and one separate warm-up baseline check.
          </p>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
          Section 12 Compliance
        </span>
      </div>

      {/* Verdict-Bearing Checks */}
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Verdict-Bearing Checks (Drive Engine Diagnosis)
        </div>

        {verdictChecks.map((check, idx) => (
          <div
            key={check.id}
            className={cn(
              'border rounded-xl p-4 transition-all',
              check.passed
                ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/60 dark:bg-emerald-950/20'
                : 'border-rose-200 bg-rose-50/50 dark:border-rose-900/60 dark:bg-rose-950/20'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5',
                    check.passed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  )}
                >
                  {check.passed ? '✓' : '✗'}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Check #{idx + 1}: {check.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                    {check.evidence}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
                    Pattern Observed: {check.indicator}
                  </p>
                </div>
              </div>

              <span
                className={cn(
                  'text-xs font-bold px-2 py-0.5 rounded-full shrink-0',
                  check.passed
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
                )}
              >
                {check.passed ? 'Passed' : 'Gap Detected'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Warm-up Support Check (Strictly Non-Verdict-Bearing) */}
      {warmupCheck && (
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Support Question (Non-Verdict-Bearing)
          </div>

          <div className="border border-blue-200 bg-blue-50/40 dark:border-blue-900/60 dark:bg-blue-950/20 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ○
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Check #3: {warmupCheck.title}
                    </h4>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium">
                      Support Only
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                    {warmupCheck.evidence}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1 italic">
                    Note: Warm-up readiness item does not influence the diagnostic verdict.
                  </p>
                </div>
              </div>

              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 shrink-0">
                {warmupCheck.passed ? 'Ready' : 'Review Basic Facts'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
