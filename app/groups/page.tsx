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
      <div className="glass-card p-6 sm:p-8 relative overflow-hidden border border-white/60 dark:border-white/10 shadow-xl shadow-purple-500/5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/10 via-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                🟪 Abhinav — Action Layer
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Conveyor Belt Step 5 of 7 · Remedial Grouping
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Remedial Groups & Targeted Interventions
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Deterministic grouping based on teacher-verified learning gaps. Cohorts correspond to targeted Concrete-Representational-Abstract (CPA) pedagogical activities.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/intervene?studentId=s-01"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-md shadow-indigo-500/20 text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>🛠</span>
              <span>Launch Demo Intervention (Borrow & Build) →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Cohort KPI Chips Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-xl border border-white/60 dark:border-white/10 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-lg border border-purple-200 dark:border-purple-800">
            👥
          </div>
          <div>
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Active Cohorts</div>
            <div className="text-lg font-black text-zinc-900 dark:text-zinc-100">{groups.length} Remedial Groups</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/60 dark:border-white/10 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-lg border border-indigo-200 dark:border-indigo-800">
            ⭐
          </div>
          <div>
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Golden Demo Focus</div>
            <div className="text-lg font-black text-zinc-900 dark:text-zinc-100">Regrouping & Tens</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/60 dark:border-white/10 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg border border-emerald-200 dark:border-emerald-800">
            🎯
          </div>
          <div>
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Pedagogy Model</div>
            <div className="text-lg font-black text-zinc-900 dark:text-zinc-100">3-Step CPA Approach</div>
          </div>
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
