'use client';

import React from 'react';

import { ClassGapSummary } from '@/lib/types';

interface ClassSummaryProps {
  summary: ClassGapSummary;
}

export function ClassSummary({ summary }: ClassSummaryProps) {
  const completionPercentage = Math.round(summary.completionRate * 100);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass-card rounded-2xl p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Class Cohort</p>
          <span className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs">🏫</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-black text-zinc-900 dark:text-zinc-50">
            {summary.totalStudents}
          </span>
          <span className="text-xs text-zinc-400 font-medium">Students</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span>Class 3-A FLN Subtraction</span>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Assessment Status</p>
          <span className="p-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs">📝</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {summary.assessedCount}
          </span>
          <span className="text-xs text-zinc-400 font-medium">/ {summary.totalStudents} ({completionPercentage}%)</span>
        </div>
        <div className="mt-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-indigo-500 to-violet-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Needs Remediation</p>
          <span className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs">🛠</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-black text-rose-600 dark:text-rose-400">
            {summary.needsRemediationCount}
          </span>
          <span className="text-xs text-zinc-400 font-medium">Students</span>
        </div>
        <p className="mt-3 text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
          <span>●</span> Targeted for small-group CPA
        </p>
      </div>

      <div className="glass-card rounded-2xl p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Mastered</p>
          <span className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs">⭐</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {summary.masteredCount}
          </span>
          <span className="text-xs text-zinc-400 font-medium">Students</span>
        </div>
        <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
          <span>✓</span> Accurate 2-digit regrouping
        </p>
      </div>
    </div>
  );
}

