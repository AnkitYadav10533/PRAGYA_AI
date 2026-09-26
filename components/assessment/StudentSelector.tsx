'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Student } from '@/lib/types';

interface StudentSelectorProps {
  students: Student[];
  currentStudentId: string;
  targetRoute?: string; // e.g. "/assess" or "/diagnose"
}

export function StudentSelector({
  students,
  currentStudentId,
  targetRoute = '/assess',
}: StudentSelectorProps) {
  const router = useRouter();

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs">
      <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
        👤
      </div>
      <label htmlFor="student-select" className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
        Student:
      </label>
      <select
        id="student-select"
        value={currentStudentId}
        onChange={(e) => {
          const newId = e.target.value;
          router.push(`${targetRoute}?studentId=${newId}`);
        }}
        className="text-xs font-bold bg-transparent border-0 focus:outline-none focus:ring-0 text-zinc-900 dark:text-zinc-100 cursor-pointer pr-2"
      >
        {students.map((s) => (
          <option key={s.id} value={s.id} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
            Roll {s.rollNumber}: {s.name} {s.id === 's-01' ? '⭐ (Demo)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
}
