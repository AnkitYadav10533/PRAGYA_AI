'use client';

import React from 'react';

import { SubtractionErrorType } from '@/lib/types';
import { cn } from '@/lib/utils';

export type BadgeStatusType =
  | 'verified'
  | 'needs_review'
  | 'not_assessed'
  | 'diagnosed'
  | 'grouped'
  | 'intervened'
  | 'reassessed';

interface StatusBadgeProps {
  status: BadgeStatusType | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  switch (status) {
    case 'verified':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
            className
          )}
        >
          <span className="font-bold">✓</span> Verified
        </span>
      );

    case 'needs_review':
    case 'diagnosed':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
            className
          )}
        >
          <span className="font-bold">⚠</span> Needs review
        </span>
      );

    case 'not_assessed':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700',
            className
          )}
        >
          <span>○</span> Not assessed
        </span>
      );

    case 'grouped':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
            className
          )}
        >
          <span>👥</span> Grouped
        </span>
      );

    case 'intervened':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
            className
          )}
        >
          <span>🛠</span> In Remediation
        </span>
      );

    case 'reassessed':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
            className
          )}
        >
          <span>📈</span> Reassessed
        </span>
      );

    default:
      return (
        <span
          className={cn(
            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700',
            className
          )}
        >
          {status}
        </span>
      );
  }
}

interface GapBadgeProps {
  gap: SubtractionErrorType | string;
  className?: string;
}

export function GapBadge({ gap, className }: GapBadgeProps) {
  // Vocabulary enforcement: Regrouping, Place Value, Subtraction Facts, Mastery
  if (gap === 'borrowed_without_decrement' || gap === 'Regrouping' || gap === 'regrouping') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-900',
          className
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        Regrouping
      </span>
    );
  }

  if (gap === 'smaller_from_larger_ones' || gap === 'Place Value' || gap === 'place_value') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900',
          className
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        Place Value
      </span>
    );
  }

  if (gap === 'calculation_error' || gap === 'Subtraction Facts' || gap === 'subtraction_facts') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/30 dark:text-sky-300 dark:border-sky-900',
          className
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
        Subtraction Facts
      </span>
    );
  }

  if (gap === 'no_error' || gap === 'Mastery' || gap === 'none') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900',
          className
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Mastery
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-700',
        className
      )}
    >
      {gap}
    </span>
  );
}
