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
    <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
        <div>
          <h3 className="font-black text-base text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <span>🛡</span> Diagnostic Verification Checks
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Two verdict-bearing mathematical checks and one separate warm-up baseline check.
          </p>
        </div>
        <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 shadow-2xs">
          Section 12 Compliance
        </span>
      </div>

      {/* Verdict-Bearing Checks */}
      <div className="space-y-3.5">
        <div className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Verdict-Bearing Checks (Drive Engine Diagnosis)
        </div>

        {verdictChecks.map((check, idx) => (
          <div
            key={check.id}
            className={cn(
              'border rounded-2xl p-4.5 transition-all shadow-2xs',
              check.passed
                ? 'border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-900/60 dark:bg-emerald-950/20'
                : 'border-rose-200/80 bg-rose-50/50 dark:border-rose-900/60 dark:bg-rose-950/20'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-2xs',
                    check.passed
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-rose-600 text-white shadow-rose-600/20'
                  )}
                >
                  {check.passed ? '✓' : '✗'}
                </span>
                <div>
                  <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-50">
                    Check #{idx + 1}: {check.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1.5 leading-relaxed font-normal">
                    {check.evidence}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
                    Pattern Observed: <span className="font-bold text-zinc-700 dark:text-zinc-200">{check.indicator}</span>
                  </p>
                </div>
              </div>

              <span
                className={cn(
                  'text-xs font-bold px-2.5 py-1 rounded-full shrink-0 shadow-2xs',
                  check.passed
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border border-emerald-300/60'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 border border-rose-300/60'
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
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2.5">
          <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Support Question (Non-Verdict-Bearing)
          </div>

          <div className="border border-blue-200/80 bg-blue-50/40 dark:border-blue-900/60 dark:bg-blue-950/20 rounded-2xl p-4.5 shadow-2xs">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-2xs">
                  ○
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-50">
                      Check #3: {warmupCheck.title}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-bold">
                      Support Only
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1.5 leading-relaxed font-normal">
                    {warmupCheck.evidence}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 italic">
                    Note: Warm-up readiness item does not influence the diagnostic verdict.
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-200/60 shrink-0 shadow-2xs">
                {warmupCheck.passed ? 'Ready' : 'Review Basic Facts'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

