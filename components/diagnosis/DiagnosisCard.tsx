'use client';

import React from 'react';

import { GapBadge, StatusBadge } from '@/components/shared/StatusBadge';
import { Diagnosis, Student } from '@/lib/types';

interface DiagnosisCardProps {
  student: Student;
  diagnosis: Diagnosis;
}

export function DiagnosisCard({ student, diagnosis }: DiagnosisCardProps) {
  const isGoldenDemo = student.id === 's-01';

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all">
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono font-bold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg">
            Roll #{student.rollNumber}
          </span>
          <StatusBadge status={student.status} />
          {isGoldenDemo && (
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/60 dark:to-orange-950/60 text-amber-800 dark:text-amber-300 font-bold border border-amber-200/80 dark:border-amber-800/80 shadow-2xs">
              ⭐ Canonical Golden Demo Case
            </span>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          Diagnosis for {student.name}
        </h2>

        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-0.5 font-medium flex-wrap">
          <span>Class: <strong className="text-zinc-800 dark:text-zinc-200">Class 3-A</strong></span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span>Skill: <strong className="text-zinc-800 dark:text-zinc-200">2-Digit Subtraction with Regrouping</strong></span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span>Confidence: <strong className="text-indigo-600 dark:text-indigo-400 uppercase font-black">{diagnosis.confidence}</strong></span>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-5 flex flex-col items-start sm:items-end w-full md:w-auto shrink-0 space-y-1.5 shadow-2xs border border-indigo-200/80 dark:border-indigo-900/60">
        <span className="text-[10px] uppercase font-black text-indigo-700 dark:text-indigo-300 tracking-wider">
          Suggested Learning Gap
        </span>
        <GapBadge gap={diagnosis.finalVerdict || diagnosis.suggestedVerdict} />
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono font-medium">
          Signature: <span className="font-bold text-zinc-700 dark:text-zinc-300">{diagnosis.primaryErrorType}</span>
        </span>
      </div>
    </div>
  );
}

