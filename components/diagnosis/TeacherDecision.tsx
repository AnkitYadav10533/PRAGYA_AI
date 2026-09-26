'use client';

import React, { useState } from 'react';

import { GapBadge } from '@/components/shared/StatusBadge';
import { Diagnosis, TeacherDecision as TeacherDecisionType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TeacherDecisionProps {
  diagnosis: Diagnosis;
  studentName: string;
  onDecisionSave: (decision: TeacherDecisionType, finalVerdict: string) => void;
}

export function TeacherDecision({
  diagnosis,
  studentName,
  onDecisionSave,
}: TeacherDecisionProps) {
  const [isChanging, setIsChanging] = useState(false);
  const [selectedGap, setSelectedGap] = useState<string>('Regrouping');
  const [teacherNotes, setTeacherNotes] = useState<string>(diagnosis.teacherDecision?.notes || '');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const decisionStatus = diagnosis.teacherDecision?.status || 'pending';

  const handleAccept = () => {
    const decision: TeacherDecisionType = {
      status: 'accepted',
      decidedAt: new Date().toISOString(),
      notes: 'Teacher verified and accepted engine diagnosis.',
    };
    onDecisionSave(decision, diagnosis.suggestedVerdict);
    triggerToast('✓ Accepted! Diagnosis locked into student record.');
  };

  const handleReject = () => {
    const decision: TeacherDecisionType = {
      status: 'rejected',
      decidedAt: new Date().toISOString(),
      notes: teacherNotes || 'Teacher rejected automated diagnosis as isolated slip.',
    };
    onDecisionSave(decision, 'General Practice (No Severe Gap Identified)');
    triggerToast('✗ Rejected. Marked for standard classroom observation.');
  };

  const handleSaveChange = () => {
    const decision: TeacherDecisionType = {
      status: 'changed',
      customVerdict: selectedGap,
      decidedAt: new Date().toISOString(),
      notes: teacherNotes || `Teacher altered gap to ${selectedGap}`,
    };
    onDecisionSave(decision, selectedGap);
    setIsChanging(false);
    triggerToast(`⚙ Changed! Diagnosis updated to "${selectedGap}".`);
  };

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border-2 border-indigo-200 dark:border-indigo-900/80 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            🟪 Abhinav — Decision Layer (Section 13 Compliance)
          </span>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
            Teacher Verification & Final Decision
          </h3>
          <p className="text-xs text-zinc-500">
            PRAGYA empowers the teacher with ultimate authority over the diagnosed learning gap.
          </p>
        </div>

        <div>
          <span
            className={cn(
              'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
              decisionStatus === 'accepted' && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
              decisionStatus === 'rejected' && 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
              decisionStatus === 'changed' && 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
              decisionStatus === 'pending' && 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse'
            )}
          >
            {decisionStatus === 'pending' ? '⚠ Decision Pending' : `Decision: ${decisionStatus}`}
          </span>
        </div>
      </div>

      {/* Suggested Diagnosis Breakdown */}
      <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-xl p-4 space-y-2 border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase">Engine Suggested Gap:</span>
            <GapBadge gap={diagnosis.suggestedVerdict} />
          </div>
          <span className="text-xs font-mono text-zinc-500">
            Engine Confidence: <strong className="text-indigo-600 dark:text-indigo-400 uppercase">{diagnosis.confidence}</strong>
          </span>
        </div>

        <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
          Root Cause: <span className="font-normal text-zinc-600 dark:text-zinc-400">{diagnosis.rootCause}</span>
        </p>

        {diagnosis.finalVerdict && (
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 text-xs">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Current Confirmed Gap: </span>
            <strong className="text-indigo-700 dark:text-indigo-300 font-mono">{diagnosis.finalVerdict}</strong>
          </div>
        )}
      </div>

      {/* Decision Controls: [ Accept ] [ Reject ] [ Change ] */}
      {!isChanging ? (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Select Teacher Action for {studentName}:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Accept Button */}
            <button
              onClick={handleAccept}
              className={cn(
                'py-3 px-4 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 border-2',
                decisionStatus === 'accepted'
                  ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300 dark:ring-emerald-800'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
              )}
            >
              <span>✓</span>
              <span>Accept Suggestion</span>
            </button>

            {/* Change Button */}
            <button
              onClick={() => setIsChanging(true)}
              className={cn(
                'py-3 px-4 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 border-2',
                decisionStatus === 'changed'
                  ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-300 dark:ring-indigo-800'
                  : 'bg-indigo-50 text-indigo-800 border-indigo-300 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800'
              )}
            >
              <span>⚙</span>
              <span>Change Gap</span>
            </button>

            {/* Reject Button */}
            <button
              onClick={handleReject}
              className={cn(
                'py-3 px-4 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 border-2',
                decisionStatus === 'rejected'
                  ? 'bg-zinc-800 text-white border-zinc-800'
                  : 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
              )}
            >
              <span>✗</span>
              <span>Reject (No Gap)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Change Gap Inline Panel */
        <div className="bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-200">
              Change Learning Gap Classification
            </h4>
            <button
              onClick={() => setIsChanging(false)}
              className="text-xs text-zinc-500 hover:text-zinc-800 font-medium"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Select Correct Learning Gap (Standard Vocabulary):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { val: 'Regrouping', desc: 'Borrowing without decrementing tens' },
                { val: 'Place Value', desc: 'Reverse digit directionality (7-3=4)' },
                { val: 'Subtraction Facts', desc: 'Basic arithmetic recall slip' },
              ].map((gap) => (
                <button
                  key={gap.val}
                  type="button"
                  onClick={() => setSelectedGap(gap.val)}
                  className={cn(
                    'p-3 rounded-lg border text-left transition-all',
                    selectedGap === gap.val
                      ? 'border-indigo-600 bg-white dark:bg-zinc-900 shadow-xs ring-2 ring-indigo-200 dark:ring-indigo-800'
                      : 'border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/40 text-zinc-600'
                  )}
                >
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{gap.val}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{gap.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
              Teacher Clinical Notes (Optional):
            </label>
            <textarea
              rows={2}
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              placeholder="e.g. Student demonstrated proper bundling in oral check..."
              className="w-full text-xs p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveChange}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all"
            >
              Save Changed Diagnosis
            </button>
            <button
              onClick={() => setIsChanging(false)}
              className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {successToast && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold text-center animate-fade-in">
          {successToast}
        </div>
      )}
    </div>
  );
}
