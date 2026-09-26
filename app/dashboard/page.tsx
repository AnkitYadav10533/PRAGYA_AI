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
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              🟪 Abhinav — Action Layer
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs text-zinc-500 font-mono">Foundational Numeracy Diagnostic Report</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {classroom.name} — Teacher Decision Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Real-time FLN gap tracking for 2-digit subtraction with regrouping. Decomposes errors into actionable evidence, enables teacher verification, and coordinates remedial group allocations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/assess?studentId=s-01"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-xs text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <span>⭐</span>
            <span>Run Golden Demo (Aarav Patel)</span>
          </Link>
          <Link
            href="/groups"
            className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs transition-colors"
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
      <div className="bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-pink-50/40 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/10 border-2 border-indigo-200 dark:border-indigo-900/60 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-600 text-white">
              Golden Demo Story
            </span>
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              Aarav Patel (Roll 1) • Class 3-A
            </span>
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Regrouping Slip Trace: 83 − 47 = 46 (Expected: 36)
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
            The student borrowed 10 into ones ($13 − 7 = 6$) but failed to decrement the tens column ($8 − 4 = 4$). Ready for teacher verification, assignment to <em>Group 1: Regrouping & Tens Adjustment</em>, and CPA activity <em>Borrow & Build</em>.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Link
            href="/assess?studentId=s-01"
            className="flex-1 md:flex-initial text-center px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold shadow-xs hover:border-indigo-500 transition-all"
          >
            1. View Assessment
          </Link>
          <Link
            href="/diagnose?studentId=s-01"
            className="flex-1 md:flex-initial text-center px-4 py-2 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <span>2. Verify Diagnosis</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Student Action Roster Preview */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span>📋</span> Student Action Roster
            </h3>
            <p className="text-xs text-zinc-500">
              Students identified with learning gaps requiring teacher decision and remediation.
            </p>
          </div>
          <Link
            href="/class"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
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
                className="border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-xl p-4 transition-all flex flex-col justify-between space-y-3 bg-zinc-50/50 dark:bg-zinc-800/20"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-zinc-400">
                      Roll #{student.rollNumber}
                    </span>
                    <StatusBadge status={student.status} />
                  </div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mt-1">
                    {student.name}
                  </h4>
                  <div className="mt-2">
                    {diag ? (
                      <GapBadge gap={diag.finalVerdict || diag.suggestedVerdict} />
                    ) : (
                      <span className="text-xs text-zinc-400 italic">Not diagnosed</span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-200/50 dark:border-zinc-700/50 flex items-center justify-between">
                  <Link
                    href={`/assess?studentId=${student.id}`}
                    className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium"
                  >
                    Assessment
                  </Link>
                  <Link
                    href={`/diagnose?studentId=${student.id}`}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
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
