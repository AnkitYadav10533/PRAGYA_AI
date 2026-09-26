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

  const recentActivities = [
    {
      id: 's-02',
      name: 'Rahul Sharma',
      gap: 'Regrouping',
      status: 'Diagnosed',
      statusColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300',
      time: '2 mins ago',
      avatarBg: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300',
      avatarIcon: '👦',
    },
    {
      id: 's-03',
      name: 'Priya Verma',
      gap: 'Place Value',
      status: 'Needs Support',
      statusColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300',
      time: '8 mins ago',
      avatarBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
      avatarIcon: '👧',
    },
    {
      id: 's-04',
      name: 'Aman Khan',
      gap: 'Regrouping',
      status: 'Diagnosed',
      statusColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300',
      time: '15 mins ago',
      avatarBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
      avatarIcon: '👦',
    },
    {
      id: 's-05',
      name: 'Riya Singh',
      gap: 'Calculation',
      status: 'In Progress',
      statusColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300',
      time: '22 mins ago',
      avatarBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
      avatarIcon: '👧',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8">
      {/* Top Greeting Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
            <span>Good morning, Teacher!</span>
            <span className="text-2xl">👋</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-zinc-400 mt-1">
            Here&apos;s how your class ({classroom.name}) is progressing today.
          </p>
        </div>

        {/* Date Dropdown & Bell Icon */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs font-bold text-slate-700 dark:text-zinc-300 shadow-2xs flex items-center gap-2 cursor-pointer">
            <span>Mon, 12 Aug 2024</span>
            <span className="text-slate-400">▾</span>
          </div>

          <button className="w-9 h-9 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center text-sm font-bold shadow-2xs relative hover:bg-slate-50">
            <span>🔔</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          </button>
        </div>
      </div>

      {/* 4 Top KPI Stat Cards */}
      <ClassSummary summary={summary} />

      {/* 2-Column Core Dashboard Grid: Snapshot + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Class Learning Gap Snapshot */}
        <GapChart summary={summary} />

        {/* Right: Recent Activity */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3.5">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
              Recent Activity
            </h3>
            <Link
              href="/class"
              className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <span>→</span>
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl ${act.avatarBg} flex items-center justify-center text-lg font-bold shrink-0 border border-black/5`}
                  >
                    {act.avatarIcon}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
                      {act.name}
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 dark:text-zinc-400 mt-0.5">
                      {act.gap}
                    </p>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span
                    className={`inline-block px-3 py-1 rounded-xl text-xs font-extrabold shadow-2xs ${act.statusColor}`}
                  >
                    {act.status}
                  </span>
                  <p className="text-[10px] font-medium text-slate-400 dark:text-zinc-500">
                    {act.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Golden Demo Story Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-50/90 via-white to-purple-50/80 dark:from-zinc-900/90 dark:via-zinc-900/80 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/70 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-md">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-indigo-600 text-white shadow-2xs">
              Golden Demo Story
            </span>
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
              Aarav Patel (Roll 1) • Class 3-A
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-zinc-50 tracking-tight">
            Regrouping Slip Trace: 83 − 47 = 46 (Expected: 36)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
            The student borrowed 10 into ones ($13 − 7 = 6$) but failed to decrement the tens column ($8 − 4 = 4$). Ready for teacher verification, assignment to <em>Group 1: Regrouping & Tens Adjustment</em>, and CPA activity <em>Borrow & Build</em>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <Link
            href="/assess?studentId=s-01"
            className="flex-1 md:flex-initial text-center px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 font-bold shadow-2xs hover:border-indigo-500 transition-all hover:scale-[1.02]"
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
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/80 pb-3">
          <div>
            <h3 className="font-black text-base text-slate-900 dark:text-zinc-50 flex items-center gap-2">
              <span>📋</span> Student Action Roster
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
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
                className="bg-slate-50/70 dark:bg-zinc-800/40 hover:border-indigo-300 dark:hover:border-indigo-700 border border-slate-200/60 dark:border-zinc-700/50 rounded-2xl p-4.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Roll #{student.rollNumber}
                    </span>
                    <StatusBadge status={student.status} />
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-zinc-100 mt-2">
                    {student.name}
                  </h4>
                  <div className="mt-2.5">
                    {diag ? (
                      <GapBadge gap={diag.finalVerdict || diag.suggestedVerdict} />
                    ) : (
                      <span className="text-xs text-slate-400 italic">Not diagnosed</span>
                    )}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200/60 dark:border-zinc-700/50 flex items-center justify-between">
                  <Link
                    href={`/assess?studentId=${student.id}`}
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200 font-bold"
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

