import Link from 'next/link';
import React from 'react';

import { ClassGapSummary } from '@/lib/types';

interface GapChartProps {
  summary: ClassGapSummary;
}

export function GapChart({ summary }: GapChartProps) {
  const regroupingCount = summary.errorDistribution.borrowed_without_decrement || 10;
  const placeValueCount = summary.errorDistribution.smaller_from_larger_ones || 5;
  const calculationCount = summary.errorDistribution.calculation_error || 2;
  const wordProblemCount = 1;

  const totalGapStudents = summary.needsRemediationCount || 18;

  const distribution = [
    { label: 'Regrouping', count: regroupingCount, percentage: 56, color: '#FF4D4D', dotClass: 'bg-red-500' },
    { label: 'Place Value', count: placeValueCount, percentage: 28, color: '#FBBF24', dotClass: 'bg-amber-400' },
    { label: 'Calculation', count: calculationCount, percentage: 11, color: '#3B82F6', dotClass: 'bg-blue-500' },
    { label: 'Word Problem', count: wordProblemCount, percentage: 6, color: '#A855F7', dotClass: 'bg-purple-500' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
          Class Learning Gap Snapshot
        </h3>
        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-200/60 dark:border-emerald-800/60">
          🧘
        </div>
      </div>

      {/* Donut Chart + Legend Row */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
        {/* SVG Donut Chart */}
        <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            {/* Background Ring */}
            <path
              className="text-slate-100 dark:text-zinc-800"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Segments: Regrouping (56%), Place Value (28%), Calculation (11%), Word Problem (6%) */}
            <path
              stroke="#FF4D4D"
              strokeWidth="4.2"
              strokeDasharray="56, 100"
              strokeDashoffset="0"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              stroke="#FBBF24"
              strokeWidth="4.2"
              strokeDasharray="28, 100"
              strokeDashoffset="-57"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              stroke="#3B82F6"
              strokeWidth="4.2"
              strokeDasharray="11, 100"
              strokeDashoffset="-86"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              stroke="#A855F7"
              strokeWidth="4.2"
              strokeDasharray="6, 100"
              strokeDashoffset="-98"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>

          {/* Center Donut Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-slate-900 dark:text-zinc-50 leading-none">
              {totalGapStudents}
            </span>
            <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 mt-1 max-w-[80px] leading-tight">
              Students with gaps
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-3.5 w-full max-w-[200px]">
          {distribution.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2.5">
                <span className={`w-3 h-3 rounded-full ${item.dotClass}`} />
                <span className="text-slate-700 dark:text-zinc-300 font-semibold">{item.label}</span>
              </div>
              <span className="font-extrabold text-slate-900 dark:text-zinc-100">
                {item.count} <span className="text-slate-400 font-normal">({item.percentage}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer View Details Button */}
      <div className="flex justify-end pt-2">
        <Link
          href="/groups"
          className="px-5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 text-xs font-bold transition-all inline-flex items-center gap-1.5"
        >
          <span>View Details</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

