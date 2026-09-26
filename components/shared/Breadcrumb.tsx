'use client';

import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

export type JourneyStep = 'class' | 'assess' | 'diagnose' | 'intervene' | 'reassess';

interface BreadcrumbProps {
  studentName?: string;
  studentId?: string;
  currentStep: JourneyStep;
  className?: string;
}

const STEPS: { key: JourneyStep; label: string; getHref: (id?: string) => string }[] = [
  { key: 'class', label: 'Class 3-A', getHref: () => '/class' },
  { key: 'assess', label: 'Assessment', getHref: (id) => (id ? `/assess?studentId=${id}` : '/assess') },
  { key: 'diagnose', label: 'Diagnosis', getHref: (id) => (id ? `/diagnose?studentId=${id}` : '/diagnose') },
  { key: 'intervene', label: 'Intervention', getHref: (id) => (id ? `/intervene?studentId=${id}` : '/intervene') },
  { key: 'reassess', label: 'Progress', getHref: (id) => (id ? `/reassess?studentId=${id}` : '/reassess') },
];

export function Breadcrumb({ studentName = 'Aarav Patel', studentId = 's-01', currentStep, className }: BreadcrumbProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <nav
      aria-label="Student Journey"
      className={cn(
        'w-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 py-3 shadow-2xs',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3 text-xs sm:text-sm">
        <div className="flex items-center flex-wrap gap-2 text-zinc-600 dark:text-zinc-400">
          <Link
            href="/class"
            className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-semibold text-zinc-700 dark:text-zinc-200 transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <span>🏫</span> Class 3-A
          </Link>

          <span className="text-zinc-300 dark:text-zinc-700">/</span>

          <span className="px-2.5 py-1 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-bold border border-indigo-200/60 dark:border-indigo-800/50 flex items-center gap-1.5 shadow-2xs">
            <span>👤</span> {studentName}
          </span>

          <span className="text-zinc-300 dark:text-zinc-700">/</span>

          {/* Stepper Pipeline */}
          <div className="flex items-center gap-1 flex-wrap">
            {STEPS.filter((s) => s.key !== 'class').map((step, idx) => {
              const stepIndex = idx + 1;
              const isCurrent = step.key === currentStep;
              const isCompleted = stepIndex < currentIndex;

              return (
                <React.Fragment key={step.key}>
                  {idx > 0 && <span className="text-zinc-300 dark:text-zinc-700 mx-0.5">›</span>}
                  <Link
                    href={step.getHref(studentId)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg transition-all text-xs font-semibold flex items-center gap-1.5',
                      isCurrent &&
                        'bg-indigo-600 text-white shadow-xs shadow-indigo-600/25 ring-2 ring-indigo-600/20 font-bold scale-[1.02]',
                      isCompleted &&
                        'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60',
                      !isCurrent &&
                        !isCompleted &&
                        'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                    )}
                  >
                    {isCompleted && <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>}
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    <span>{step.label}</span>
                  </Link>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60 font-medium">
            <span>✨</span> Demo Case: Aarav Patel (Roll 1)
          </span>
        </div>
      </div>
    </nav>
  );
}

