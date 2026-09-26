'use client';

import React from 'react';

import { ClassGapSummary } from '@/lib/types';

interface GapChartProps {
  summary: ClassGapSummary;
}

export function GapChart({ summary }: GapChartProps) {
  const regroupingCount = summary.errorDistribution.borrowed_without_decrement || 0;
  const placeValueCount = summary.errorDistribution.smaller_from_larger_ones || 0;
  const factsCount = summary.errorDistribution.calculation_error || 0;
  const masteryCount = summary.errorDistribution.no_error || 0;
  const total = summary.totalStudents || 30;

  const gaps = [
    {
      title: 'Regrouping',
      count: regroupingCount,
      color: 'bg-rose-500',
      bgColor: 'bg-rose-50 dark:bg-rose-950/20',
      borderColor: 'border-rose-200 dark:border-rose-900',
      textColor: 'text-rose-700 dark:text-rose-300',
      desc: 'Borrowed 10 to ones but failed to decrement tens (83−47 = 46)',
      percentage: Math.round((regroupingCount / total) * 100),
    },
    {
      title: 'Place Value',
      count: placeValueCount,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-200 dark:border-amber-900',
      textColor: 'text-amber-700 dark:text-amber-300',
      desc: 'Subtracted smaller ones digit from larger ones digit (7−3 = 4)',
      percentage: Math.round((placeValueCount / total) * 100),
    },
    {
      title: 'Subtraction Facts',
      count: factsCount,
      color: 'bg-sky-500',
      bgColor: 'bg-sky-50 dark:bg-sky-950/20',
      borderColor: 'border-sky-200 dark:border-sky-900',
      textColor: 'text-sky-700 dark:text-sky-300',
      desc: 'Single-digit arithmetic recall slips (e.g. 13−7 = 5)',
      percentage: Math.round((factsCount / total) * 100),
    },
    {
      title: 'Mastery',
      count: masteryCount,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      borderColor: 'border-emerald-200 dark:border-emerald-900',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      desc: 'Demonstrated correct regrouping and subtraction facts across all items',
      percentage: Math.round((masteryCount / total) * 100),
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <span>📊</span> Visual Class Learning Gap Distribution
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Strict standardized vocabulary: <strong className="text-zinc-700 dark:text-zinc-300">Regrouping</strong>, <strong className="text-zinc-700 dark:text-zinc-300">Place Value</strong>, and <strong className="text-zinc-700 dark:text-zinc-300">Subtraction Facts</strong>.
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg">
          N = {total} Students
        </span>
      </div>

      {/* Cumulative Stacked Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-zinc-500 font-medium">
          <span>Class Cohort Composition</span>
          <span>100% Total</span>
        </div>
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-zinc-100 dark:bg-zinc-800">
          {gaps.map((g) => (
            <div
              key={g.title}
              title={`${g.title}: ${g.count} students (${g.percentage}%)`}
              className={`${g.color} transition-all duration-500`}
              style={{ width: `${g.percentage}%` }}
            />
          ))}
        </div>
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {gaps.map((g) => (
          <div
            key={g.title}
            className={`border rounded-xl p-4 ${g.bgColor} ${g.borderColor} flex flex-col justify-between space-y-3`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${g.textColor}`}>
                  {g.title}
                </span>
                <span className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400">
                  {g.percentage}%
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
                  {g.count}
                </span>
                <span className="text-xs text-zinc-500">Students</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200/50 dark:border-zinc-700/50 pt-2">
              {g.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
