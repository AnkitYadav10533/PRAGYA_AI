'use client';

import React from 'react';

interface AssessmentProgressProps {
  answeredCount: number;
  totalCount: number;
}

export function AssessmentProgress({ answeredCount, totalCount }: AssessmentProgressProps) {
  const percentage = Math.round((answeredCount / totalCount) * 100);

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2">
        <span>Assessment Progress</span>
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
          {answeredCount} of {totalCount} items answered ({percentage}%)
        </span>
      </div>
      <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
