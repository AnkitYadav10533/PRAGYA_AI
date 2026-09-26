'use client';

import Link from 'next/link';
import React from 'react';

import { GapBadge } from '@/components/shared/StatusBadge';
import { RemedialActivity, RemedialGroup, Student } from '@/lib/types';
import { cn } from '@/lib/utils';

interface GroupCardProps {
  group: RemedialGroup;
  students: Student[];
  activity?: RemedialActivity;
}

export function GroupCard({ group, students, activity }: GroupCardProps) {
  const groupStudents = students.filter((s) => group.studentIds.includes(s.id));
  const hasGoldenDemo = group.studentIds.includes('s-01');

  return (
    <div
      className={cn(
        'glass-card rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5 transition-all duration-200 hover:-translate-y-0.5',
        hasGoldenDemo
          ? 'border-indigo-400 dark:border-indigo-600 ring-2 ring-indigo-200/60 dark:ring-indigo-900/60'
          : 'border-zinc-200/80 dark:border-zinc-800/80'
      )}
    >
      <div className="space-y-3.5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                {group.id.split('-')[1]?.toUpperCase() || 'REMEDIAL GROUP'}
              </span>
              {hasGoldenDemo && (
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-600 text-white shadow-2xs">
                  ⭐ Demo Group
                </span>
              )}
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight mt-1">
              {group.name}
            </h3>
          </div>
          <GapBadge gap={group.focusError} />
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
          {group.title}
        </p>

        {/* Assigned CPA Activity */}
        {activity && (
          <div className="bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/70 rounded-2xl p-4 space-y-1.5 shadow-2xs">
            <span className="text-[10px] uppercase font-black text-indigo-700 dark:text-indigo-300 tracking-wider">
              Assigned CPA Activity
            </span>
            <h4 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100">
              🛠 {activity.title}
            </h4>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-normal line-clamp-2">
              {activity.description}
            </p>
            <div className="pt-1.5 flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono font-medium">
              <span>⏱ {activity.durationMinutes} mins</span>
              <span>•</span>
              <span>Pedagogy: {activity.pedagogy}</span>
            </div>
          </div>
        )}

        {/* Student Roster in Group */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2.5">
            <span>Allocated Students</span>
            <span className="font-mono text-zinc-400 font-semibold">{groupStudents.length} Students</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {groupStudents.map((s) => (
              <Link
                key={s.id}
                href={`/diagnose?studentId=${s.id}`}
                className={cn(
                  'text-xs px-2.5 py-1.5 rounded-xl border font-bold transition-all flex items-center gap-1.5 shadow-2xs',
                  s.id === 's-01'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-600/20'
                    : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-indigo-400'
                )}
              >
                <span className="font-mono text-[11px] opacity-75">#{s.rollNumber}</span>
                <span>{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
          Status: {group.status.replace('_', ' ')}
        </span>

        <Link
          href={`/intervene?studentId=${group.studentIds[0] || 's-01'}&groupId=${group.id}`}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 hover:scale-[1.02]"
        >
          <span>Launch Activity</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

