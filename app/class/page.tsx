'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { StatusBadge } from '@/components/shared/StatusBadge';
import { SEED_CLASS } from '@/lib/mock';
import { ClassRoom, Diagnosis, Student } from '@/lib/types';
import {
  getStoredClass,
  getStoredDiagnoses,
  getStoredStudents,
  resetPragyaStorage,
} from '@/lib/utils';

export default function ClassPage() {
  const [classroom, setClassroom] = useState<ClassRoom>(SEED_CLASS);
  const [students, setStudents] = useState<Student[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    setClassroom(getStoredClass());
    setStudents(getStoredStudents());
    setDiagnoses(getStoredDiagnoses());
  }, []);

  const handleReset = () => {
    if (confirm('Reset classroom data back to original 30-student seeded dataset?')) {
      setIsResetting(true);
      resetPragyaStorage();
      setTimeout(() => {
        setClassroom(getStoredClass());
        setStudents(getStoredStudents());
        setDiagnoses(getStoredDiagnoses());
        setIsResetting(false);
      }, 100);
    }
  };

  const getStudentDiagnosis = (studentId: string) => {
    return diagnoses.find((d) => d.studentId === studentId);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toString().includes(searchQuery);

    if (!matchesSearch) return false;
    if (filterStatus === 'all') return true;
    if (filterStatus === 'verified') return s.status === 'verified';
    if (filterStatus === 'needs_review') return s.status === 'diagnosed' || s.status === 'assessed';
    if (filterStatus === 'not_assessed') return s.status === 'not_assessed';
    return true;
  });

  const verifiedCount = students.filter((s) => s.status === 'verified').length;
  const needsReviewCount = students.filter((s) => s.status === 'diagnosed' || s.status === 'assessed').length;
  const notAssessedCount = students.filter((s) => s.status === 'not_assessed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {classroom.grade} • {classroom.section}
            </span>
            <span className="text-xs text-zinc-500 font-mono">Academic Year {classroom.academicYear}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {classroom.name} — Student Roster
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Teacher: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{classroom.teacherName}</span> • Focus: {classroom.subject}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/assess?studentId=s-01"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-xs text-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <span>⭐</span>
            <span>Golden Demo (Aarav Patel)</span>
          </Link>
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            {isResetting ? 'Resetting...' : '🔄 Reset Demo Data'}
          </button>
        </div>
      </div>

      {/* Classroom Status Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
          <p className="text-xs text-zinc-500 font-medium">Total Students</p>
          <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-1">{students.length}</p>
          <p className="text-[11px] text-zinc-400 mt-1">Class 3-A FLN cohort</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <span>✓</span> Verified & Closed
          </p>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{verifiedCount}</p>
          <p className="text-[11px] text-zinc-400 mt-1">Teacher approved diagnosis</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
            <span>⚠</span> Needs Review
          </p>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{needsReviewCount}</p>
          <p className="text-[11px] text-zinc-400 mt-1">Awaiting teacher decision</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
          <p className="text-xs text-zinc-500 font-medium flex items-center gap-1">
            <span>○</span> Not Assessed
          </p>
          <p className="text-2xl font-extrabold text-zinc-700 dark:text-zinc-300 mt-1">{notAssessedCount}</p>
          <p className="text-[11px] text-zinc-400 mt-1">Pending submission</p>
        </div>
      </div>

      {/* Featured Golden Demo Card */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 dark:from-indigo-950/20 dark:via-zinc-900 dark:to-purple-950/20 border-2 border-indigo-200 dark:border-indigo-900/60 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-600 text-white">
              Primary Demo Student
            </span>
            <span className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">Roll #1</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Aarav Patel — 2-Digit Subtraction with Regrouping
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Baseline response demonstrating the regrouping slip: <strong>83 − 47 = 46</strong> (borrowed 10 into ones without decrementing tens digit).
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Link
            href="/assess?studentId=s-01"
            className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs text-center transition-all"
          >
            Review Assessment
          </Link>
          <Link
            href="/diagnose?studentId=s-01"
            className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs text-center transition-all"
          >
            Verify Diagnosis →
          </Link>
        </div>
      </div>

      {/* Roster Controls: Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by student name or roll..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto pb-1 max-w-full">
          {[
            { key: 'all', label: 'All (30)' },
            { key: 'needs_review', label: `Needs Review (${needsReviewCount})` },
            { key: 'verified', label: `Verified (${verifiedCount})` },
            { key: 'not_assessed', label: `Not Assessed (${notAssessedCount})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                filterStatus === tab.key
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">Roll</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Suggested / Confirmed Gap</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredStudents.map((student) => {
                const diag = getStudentDiagnosis(student.id);
                return (
                  <tr
                    key={student.id}
                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-center font-mono font-medium text-zinc-500">
                      #{student.rollNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {student.name}
                      </div>
                      <div className="text-xs text-zinc-400">Class 3-A • {student.gender === 'M' ? 'Boy' : 'Girl'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={student.status} />
                    </td>
                    <td className="py-3.5 px-4">
                      {diag ? (
                        <div className="space-y-0.5">
                          <span className="font-medium text-xs text-zinc-800 dark:text-zinc-200">
                            {diag.finalVerdict || diag.suggestedVerdict}
                          </span>
                          <p className="text-[11px] text-zinc-400 line-clamp-1">{diag.rootCause}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-400 italic">Not diagnosed yet</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href={`/assess?studentId=${student.id}`}
                        className="inline-block px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors"
                      >
                        Assess
                      </Link>
                      <Link
                        href={`/diagnose?studentId=${student.id}`}
                        className="inline-block px-2.5 py-1 text-xs rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 font-semibold transition-colors"
                      >
                        Diagnose
                      </Link>
                    </td>
                  </tr>
                );
              })}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-500 text-sm">
                    No students match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
