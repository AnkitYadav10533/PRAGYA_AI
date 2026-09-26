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
        'w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 shadow-xs',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm">
        <div className="flex items-center flex-wrap gap-1.5 text-zinc-600 dark:text-zinc-400">
          <Link
            href="/class"
            className="font-medium hover:text-indigo-600 transition-colors flex items-center gap-1"
          >
            <span>🏫</span> Class 3-A
          </Link>
          <span className="text-zinc-400">›</span>

          <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
            <span>👤</span> {studentName}
          </span>
          <span className="text-zinc-400">›</span>

          {STEPS.filter((s) => s.key !== 'class').map((step, idx) => {
            const stepIndex = idx + 1;
            const isCurrent = step.key === currentStep;
            const isCompleted = stepIndex < currentIndex;

            return (
              <React.Fragment key={step.key}>
                {idx > 0 && <span className="text-zinc-300 dark:text-zinc-700">›</span>}
                <Link
                  href={step.getHref(studentId)}
                  className={cn(
                    'px-2 py-0.5 rounded-md transition-all font-medium',
                    isCurrent && 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold ring-1 ring-indigo-200 dark:ring-indigo-800',
                    isCompleted && 'text-emerald-700 hover:text-emerald-800 dark:text-emerald-400',
                    !isCurrent && !isCompleted && 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  )}
                >
                  {isCompleted ? '✓ ' : ''}
                  {step.label}
                </Link>
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-mono">
            Demo: Aarav Patel (Roll 1)
          </span>
        </div>
      </div>
    </nav>
  );
}
