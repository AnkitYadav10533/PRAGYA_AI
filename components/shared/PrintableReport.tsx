'use client';

import React from 'react';

import { Progress, Student } from '@/lib/types';

interface PrintableReportProps {
  student: Student;
  progress: Progress;
  gapName?: string;
  onClose: () => void;
}

export function PrintableReport({
  student,
  progress,
  gapName = 'Regrouping (पुनर्समूहन)',
  onClose,
}: PrintableReportProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-zinc-900 rounded-2xl max-w-2xl w-full p-8 shadow-2xl space-y-6 print:p-0 print:shadow-none print:max-w-none print:w-full">
        {/* Screen Action Bar (Hidden when printing) */}
        <div className="flex items-center justify-between border-b pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-lg">🖨</span>
            <span className="font-bold text-sm">Parent Progress Card Preview (Print-Ready)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>🖨 Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 border rounded-xl text-xs font-medium text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* PRINTABLE CARD CONTENT (Follows Official Indian FLN School Format) */}
        <div className="border-4 border-double border-zinc-900 p-6 rounded-xl space-y-6 font-sans">
          {/* Official Header */}
          <div className="text-center border-b-2 border-zinc-900 pb-4 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
              Department of Primary Education • NIPUN Bharat FLN Assessment
            </span>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900">
              PRAGYA FLN LEARNING PROGRESS REPORT
            </h1>
            <p className="text-xs text-zinc-600">
              Foundational Numeracy Diagnostic & Remedial Tracking — Grade 3
            </p>
          </div>

          {/* Student Profile Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-lg border text-xs">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Student Name</span>
              <strong className="text-sm font-bold text-zinc-900">{student.name}</strong>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Roll Number</span>
              <strong className="text-sm font-bold text-zinc-900">#{student.rollNumber}</strong>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Class & Section</span>
              <strong className="text-sm font-bold text-zinc-900">Class 3-A</strong>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Academic Focus</span>
              <strong className="text-sm font-bold text-zinc-900">2-Digit Subtraction</strong>
            </div>
          </div>

          {/* Performance Growth Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
              1. Learning Growth Comparison (Raw Counts):
            </h3>
            <table className="w-full text-left border text-xs">
              <thead className="bg-zinc-100 border-b font-bold text-zinc-700">
                <tr>
                  <th className="p-2.5">Assessment Stage</th>
                  <th className="p-2.5 text-center">Correct Count</th>
                  <th className="p-2.5 text-center">Percentage</th>
                  <th className="p-2.5 text-right">Mastery Status</th>
                </tr>
              </thead>
              <tbody className="divide-y text-zinc-800">
                <tr>
                  <td className="p-2.5 font-medium">Initial Baseline Assessment</td>
                  <td className="p-2.5 text-center font-mono font-bold">{progress.beforeCorrect} / {progress.beforeTotal}</td>
                  <td className="p-2.5 text-center font-mono">{progress.beforePercentage}%</td>
                  <td className="p-2.5 text-right text-rose-600 font-semibold">Needs Support</td>
                </tr>
                <tr className="bg-emerald-50/50">
                  <td className="p-2.5 font-medium text-emerald-900">Post-CPA Remedial Reassessment</td>
                  <td className="p-2.5 text-center font-mono font-bold text-emerald-800">{progress.afterCorrect} / {progress.afterTotal}</td>
                  <td className="p-2.5 text-center font-mono text-emerald-800 font-bold">{progress.afterPercentage}%</td>
                  <td className="p-2.5 text-right text-emerald-700 font-bold">✓ Mastered</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Diagnostic Gap & Pedagogical Intervention */}
          <div className="border rounded-lg p-4 bg-zinc-50/50 space-y-2 text-xs">
            <h3 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">
              2. Identified Learning Gap & Intervention:
            </h3>
            <p className="text-zinc-700">
              <strong>Learning Gap Diagnosed:</strong> {gapName}
            </p>
            <p className="text-zinc-600 leading-relaxed">
              <strong>Teacher Action:</strong> Student completed <em>Borrow & Build</em> using concrete base-10 manipulatives. The student practiced physically unbundling 1 tens rod into 10 loose ones cubes and explicitly crossing out the tens digit before subtracting.
            </p>
            <p className="text-zinc-900 font-bold pt-1">
              Net Student Growth: +{progress.improvement}% improvement in 2-digit subtraction with regrouping.
            </p>
          </div>

          {/* Home Support Tips for Parents */}
          <div className="border-t pt-4 space-y-1 text-xs text-zinc-600">
            <h4 className="font-bold text-zinc-900">🏠 Recommendations for Parents at Home (अभिभावकों के लिए सुझाव):</h4>
            <ul className="list-disc list-inside space-y-0.5 text-[11px]">
              <li>Practice bundling 10 matchsticks or pencils with a rubber band. Ask your child to unbundle when subtraction requires more ones.</li>
              <li>Encourage the child to always write the new tens number on top immediately after taking one ten.</li>
            </ul>
          </div>

          {/* Signature Footer */}
          <div className="pt-8 flex items-end justify-between text-xs font-semibold text-zinc-800">
            <div className="text-center">
              <div className="w-36 border-b border-zinc-900 pb-1 font-mono text-[11px] text-zinc-500">Sunita Sharma</div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-1">Class Teacher Signature</span>
            </div>
            <div className="text-center">
              <div className="w-36 border-b border-zinc-900 pb-1 font-mono text-[11px] text-zinc-400">Date: {new Date().toLocaleDateString()}</div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-1">Date Issued</span>
            </div>
            <div className="text-center">
              <div className="w-36 border-b border-zinc-900 pb-1">&nbsp;</div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-1">Parent / Guardian Signature</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
