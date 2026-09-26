'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { GroupCard } from '@/components/groups/GroupCard';
import { REMEDIAL_ACTIVITIES } from '@/lib/activities';
import { SEED_GROUPS, SEED_STUDENTS } from '@/lib/mock';
import { RemedialGroup, Student } from '@/lib/types';
import { getStoredGroups, getStoredStudents } from '@/lib/utils';

export default function GroupsPage() {
  const [groups, setGroups] = useState<RemedialGroup[]>(SEED_GROUPS);
  const [students, setStudents] = useState<Student[]>(SEED_STUDENTS);

  useEffect(() => {
    setGroups(getStoredGroups());
    setStudents(getStoredStudents());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              🟪 Abhinav — Action Layer
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs text-zinc-500">Conveyor Belt Step 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Remedial Groups & Targeted Interventions
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Deterministic grouping based on teacher-verified learning gaps. Groups correspond to specific Concrete-Representational-Abstract (CPA) pedagogical activities.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/intervene?studentId=s-01"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-xs text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <span>🛠</span>
            <span>Launch Demo Intervention (Borrow & Build)</span>
          </Link>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => {
          const matchedActivity = REMEDIAL_ACTIVITIES.find(
            (a) => a.id === group.activityId || a.targetedError === group.focusError
          );

          return (
            <GroupCard
              key={group.id}
              group={group}
              students={students}
              activity={matchedActivity}
            />
          );
        })}
      </div>
    </div>
  );
}
