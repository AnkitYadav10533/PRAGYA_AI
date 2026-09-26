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
        'bg-white dark:bg-zinc-900 border rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-5 transition-all',
        hasGoldenDemo
          ? 'border-indigo-400 dark:border-indigo-700 ring-2 ring-indigo-100 dark:ring-indigo-950/60'
          : 'border-zinc-200 dark:border-zinc-800'
      )}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                {group.id.split('-')[1]?.toUpperCase() || 'REMEDIAL GROUP'}
              </span>
              {hasGoldenDemo && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                  ⭐ Demo Group
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">
              {group.name}
            </h3>
          </div>
          <GapBadge gap={group.focusError} />
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {group.title}
        </p>

        {/* Assigned CPA Activity */}
        {activity && (
          <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-300 tracking-wider">
              Assigned CPA Activity
            </span>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              🛠 {activity.title}
            </h4>
            <p className="text-[11px] text-zinc-500 leading-normal line-clamp-2">
              {activity.description}
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
              <span>⏱ {activity.durationMinutes} mins</span>
              <span>•</span>
              <span>Pedagogy: {activity.pedagogy}</span>
            </div>
          </div>
        )}

        {/* Student Roster in Group */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            <span>Allocated Students</span>
            <span className="font-mono text-zinc-400">{groupStudents.length} Students</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {groupStudents.map((s) => (
              <Link
                key={s.id}
                href={`/diagnose?studentId=${s.id}`}
                className={cn(
                  'text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors flex items-center gap-1',
                  s.id === 's-01'
                    ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                    : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-indigo-400'
                )}
              >
                <span>#{s.rollNumber}</span>
                <span>{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
          Status: {group.status.replace('_', ' ')}
        </span>

        <Link
          href={`/intervene?studentId=${group.studentIds[0] || 's-01'}&groupId=${group.id}`}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
        >
          <span>Launch Activity</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
