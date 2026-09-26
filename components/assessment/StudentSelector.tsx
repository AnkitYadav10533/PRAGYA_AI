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
    <div className="flex items-center gap-2">
      <label htmlFor="student-select" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        Student:
      </label>
      <select
        id="student-select"
        value={currentStudentId}
        onChange={(e) => {
          const newId = e.target.value;
          router.push(`${targetRoute}?studentId=${newId}`);
        }}
        className="text-xs font-semibold bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100"
      >
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            Roll {s.rollNumber}: {s.name} ({s.status})
          </option>
        ))}
      </select>
    </div>
  );
}
