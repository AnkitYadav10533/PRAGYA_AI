'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { ClassSummary } from '@/components/dashboard/ClassSummary';
import { GapChart } from '@/components/dashboard/GapChart';
import { GapBadge, StatusBadge } from '@/components/shared/StatusBadge';
import { SEED_CLASS, SEED_CLASS_GAP_SUMMARY, SEED_STUDENTS } from '@/lib/mock';
import { ClassGapSummary, ClassRoom, Diagnosis, Student } from '@/lib/types';
import {
  getStoredClass,
  getStoredClassGapSummary,
  getStoredDiagnoses,
  getStoredStudents,
} from '@/lib/utils';

export default function DashboardPage() {
  const [classroom, setClassroom] = useState<ClassRoom>(SEED_CLASS);
  const [summary, setSummary] = useState<ClassGapSummary>(SEED_CLASS_GAP_SUMMARY);
  const [students, setStudents] = useState<Student[]>(SEED_STUDENTS);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    setClassroom(getStoredClass());
    setSummary(getStoredClassGapSummary());
    setStudents(getStoredStudents());
    setDiagnoses(getStoredDiagnoses());
  }, []);

  const getStudentDiagnosis = (studentId: string) => {
    return diagnoses.find((d) => d.studentId === studentId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8">
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/70 px-2.5 py-0.5 rounded-full border border-purple-200/80 dark:border-purple-800/80">
              🟪 Abhinav — Action Layer
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-xs text-zinc-500 font-medium">Foundational Numeracy Diagnostic Report</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            {classroom.name} — Teacher Decision Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Real-time FLN gap tracking for 2-digit subtraction with regrouping. Decomposes errors into actionable evidence, enables teacher verification, and coordinates remedial group allocations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/assess?studentId=s-01"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold shadow-md shadow-indigo-600/20 text-xs sm:text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <span className="text-amber-300">⭐</span>
            <span>Run Golden Demo (Aarav Patel)</span>
          </Link>
          <Link
            href="/groups"
            className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 shadow-2xs transition-all hover:-translate-y-0.5"
          >
            Remedial Groups →
          </Link>
        </div>
      </div>

      {/* Class Level Counts Overview */}
      <ClassSummary summary={summary} />

      {/* Visual Learning Gap Report */}
      <GapChart summary={summary} />

      {/* Featured Golden Demo Focus Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-50/90 via-white to-purple-50/80 dark:from-zinc-900/90 dark:via-zinc-900/80 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/70 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-md">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-indigo-600 text-white shadow-2xs">
              Golden Demo Story
            </span>
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
              Aarav Patel (Roll 1) • Class 3-A
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            Regrouping Slip Trace: 83 − 47 = 46 (Expected: 36)
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            The student borrowed 10 into ones ($13 − 7 = 6$) but failed to decrement the tens column ($8 − 4 = 4$). Ready for teacher verification, assignment to <em>Group 1: Regrouping & Tens Adjustment</em>, and CPA activity <em>Borrow & Build</em>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <Link
            href="/assess?studentId=s-01"
            className="flex-1 md:flex-initial text-center px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold shadow-2xs hover:border-indigo-500 transition-all hover:scale-[1.02]"
          >
            1. View Assessment
          </Link>
          <Link
            href="/diagnose?studentId=s-01"
            className="flex-1 md:flex-initial text-center px-4 py-2.5 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
          >
            <span>2. Verify Diagnosis</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Student Action Roster Preview */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
          <div>
            <h3 className="font-black text-base text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <span>📋</span> Student Action Roster
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Students identified with learning gaps requiring teacher decision and remediation.
            </p>
          </div>
          <Link
            href="/class"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View All 30 Students →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.slice(0, 6).map((student) => {
            const diag = getStudentDiagnosis(student.id);
            return (
              <div
                key={student.id}
                className="glass-panel hover:border-indigo-300 dark:hover:border-indigo-700 rounded-2xl p-4.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      Roll #{student.rollNumber}
                    </span>
                    <StatusBadge status={student.status} />
                  </div>
                  <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 mt-2">
                    {student.name}
                  </h4>
                  <div className="mt-2.5">
                    {diag ? (
                      <GapBadge gap={diag.finalVerdict || diag.suggestedVerdict} />
                    ) : (
                      <span className="text-xs text-zinc-400 italic">Not diagnosed</span>
                    )}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <Link
                    href={`/assess?studentId=${student.id}`}
                    className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-bold"
                  >
                    Assessment
                  </Link>
                  <Link
                    href={`/diagnose?studentId=${student.id}`}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <span>Verify</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

