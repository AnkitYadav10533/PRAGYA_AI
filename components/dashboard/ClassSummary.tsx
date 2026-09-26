'use client';

import React from 'react';

import { ClassGapSummary } from '@/lib/types';

interface ClassSummaryProps {
  summary: ClassGapSummary;
}

export function ClassSummary({ summary }: ClassSummaryProps) {
  const completionPercentage = Math.round(summary.completionRate * 100);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Class Cohort</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            {summary.totalStudents}
          </span>
          <span className="text-xs text-zinc-400">Total Students</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
          <span>Class 3-A FLN Subtraction</span>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Assessment Status</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {summary.assessedCount}
          </span>
          <span className="text-xs text-zinc-400">/ {summary.totalStudents} ({completionPercentage}%)</span>
        </div>
        <div className="mt-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Needs Remediation</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">
            {summary.needsRemediationCount}
          </span>
          <span className="text-xs text-zinc-400">Students</span>
        </div>
        <p className="mt-3 text-xs text-rose-600 dark:text-rose-400 font-medium">
          Targeted for small-group CPA activities
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Mastered</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {summary.masteredCount}
          </span>
          <span className="text-xs text-zinc-400">Students</span>
        </div>
        <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          Accurate 2-digit regrouping fluency
        </p>
      </div>
    </div>
  );
}
