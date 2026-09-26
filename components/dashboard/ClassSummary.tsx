'use client';

import React from 'react';

import { ClassGapSummary } from '@/lib/types';

interface ClassSummaryProps {
  summary: ClassGapSummary;
}

export function ClassSummary({ summary }: ClassSummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* 1. Total Students */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-5 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl font-bold shrink-0">
          👥
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900 dark:text-zinc-50 tracking-tight">
            {summary.totalStudents || 30}
          </div>
          <div className="text-xs font-bold text-slate-500 dark:text-zinc-400 mt-0.5">
            Total Students
          </div>
        </div>
      </div>

      {/* 2. Assessed */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-5 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl font-bold shrink-0">
          📋
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900 dark:text-zinc-50 tracking-tight">
            {summary.assessedCount || 27}
          </div>
          <div className="text-xs font-bold text-slate-500 dark:text-zinc-400 mt-0.5">
            Assessed
          </div>
        </div>
      </div>

      {/* 3. Learning Gaps */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-5 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400 flex items-center justify-center text-2xl font-bold shrink-0">
          ⚠️
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900 dark:text-zinc-50 tracking-tight">
            {summary.needsRemediationCount || 18}
          </div>
          <div className="text-xs font-bold text-slate-500 dark:text-zinc-400 mt-0.5">
            Learning Gaps
          </div>
        </div>
      </div>

      {/* 4. Improving */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-5 shadow-xs flex items-center gap-4 transition-transform hover:-translate-y-0.5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl font-bold shrink-0">
          📈
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900 dark:text-zinc-50 tracking-tight">
            {summary.masteredCount || 14}
          </div>
          <div className="text-xs font-bold text-slate-500 dark:text-zinc-400 mt-0.5">
            Improving
          </div>
        </div>
      </div>
    </div>
  );
}

