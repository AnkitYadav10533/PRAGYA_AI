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
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono font-bold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
            Roll #{student.rollNumber}
          </span>
          <StatusBadge status={student.status} />
          {isGoldenDemo && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200 font-bold">
              ⭐ Primary Golden Demo Case
            </span>
          )}
        </div>

        <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
          Diagnosis for {student.name}
        </h2>

        <div className="flex items-center gap-3 text-xs text-zinc-500 pt-1">
          <span>Class: <strong>Class 3-A</strong></span>
          <span>•</span>
          <span>Skill: <strong className="text-zinc-700 dark:text-zinc-300">2-Digit Subtraction with Regrouping</strong></span>
          <span>•</span>
          <span>Engine Confidence: <strong className="text-indigo-600 dark:text-indigo-400 uppercase">{diagnosis.confidence}</strong></span>
        </div>
      </div>

      <div className="bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 rounded-xl p-4 flex flex-col items-start sm:items-end w-full md:w-auto shrink-0 space-y-1">
        <span className="text-[11px] uppercase font-bold text-indigo-700 dark:text-indigo-300 tracking-wider">
          Suggested Learning Gap
        </span>
        <GapBadge gap={diagnosis.finalVerdict || diagnosis.suggestedVerdict} />
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
          Signature: {diagnosis.primaryErrorType}
        </span>
      </div>
    </div>
  );
}
