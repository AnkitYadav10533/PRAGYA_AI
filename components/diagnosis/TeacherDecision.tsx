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
    <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-sm space-y-6 border border-indigo-200/90 dark:border-indigo-900/80">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
            🟪 Abhinav — Decision Layer (Section 13 Compliance)
          </span>
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight mt-1.5">
            Teacher Verification & Final Decision
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            PRAGYA empowers the teacher with sovereign authority over the diagnosed learning gap.
          </p>
        </div>

        <div>
          <span
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs border',
              decisionStatus === 'accepted' && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300/80',
              decisionStatus === 'rejected' && 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-300',
              decisionStatus === 'changed' && 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300/80',
              decisionStatus === 'pending' && 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 animate-pulse'
            )}
          >
            {decisionStatus === 'pending' ? '⚠ Decision Pending' : `Decision: ${decisionStatus}`}
          </span>
        </div>
      </div>

      {/* Suggested Diagnosis Breakdown */}
      <div className="glass-panel rounded-2xl p-5 space-y-2.5 shadow-2xs border border-zinc-200/70 dark:border-zinc-700/60">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Engine Suggested Gap:</span>
            <GapBadge gap={diagnosis.suggestedVerdict} />
          </div>
          <span className="text-xs font-mono font-medium text-zinc-500">
            Engine Confidence: <strong className="text-indigo-600 dark:text-indigo-400 uppercase font-black">{diagnosis.confidence}</strong>
          </span>
        </div>

        <p className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold leading-relaxed">
          Root Cause: <span className="font-normal text-zinc-600 dark:text-zinc-400">{diagnosis.rootCause}</span>
        </p>

        {diagnosis.finalVerdict && (
          <div className="pt-2.5 border-t border-zinc-200/60 dark:border-zinc-700/60 text-xs flex items-center gap-2">
            <span className="font-bold text-zinc-800 dark:text-zinc-200">Current Confirmed Gap: </span>
            <strong className="text-indigo-700 dark:text-indigo-300 font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200/60 dark:border-indigo-800/60">{diagnosis.finalVerdict}</strong>
          </div>
        )}
      </div>

      {/* Decision Controls: [ Accept ] [ Reject ] [ Change ] */}
      {!isChanging ? (
        <div className="space-y-3">
          <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Select Teacher Action for {studentName}:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Accept Button */}
            <button
              onClick={handleAccept}
              className={cn(
                'py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all duration-150 flex items-center justify-center gap-2 border-2 hover:-translate-y-0.5',
                decisionStatus === 'accepted'
                  ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300 dark:ring-emerald-800'
                  : 'bg-emerald-50/80 text-emerald-800 border-emerald-300 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
              )}
            >
              <span>✓</span>
              <span>Accept Suggestion</span>
            </button>

            {/* Change Button */}
            <button
              onClick={() => setIsChanging(true)}
              className={cn(
                'py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all duration-150 flex items-center justify-center gap-2 border-2 hover:-translate-y-0.5',
                decisionStatus === 'changed'
                  ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-300 dark:ring-indigo-800'
                  : 'bg-indigo-50/80 text-indigo-800 border-indigo-300 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800'
              )}
            >
              <span>⚙</span>
              <span>Change Gap</span>
            </button>

            {/* Reject Button */}
            <button
              onClick={handleReject}
              className={cn(
                'py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all duration-150 flex items-center justify-center gap-2 border-2 hover:-translate-y-0.5',
                decisionStatus === 'rejected'
                  ? 'bg-zinc-800 text-white border-zinc-800'
                  : 'bg-zinc-100/80 text-zinc-700 border-zinc-300 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
              )}
            >
              <span>✗</span>
              <span>Reject (No Gap)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Change Gap Inline Panel */
        <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-indigo-950 dark:text-indigo-200">
              Change Learning Gap Classification
            </h4>
            <button
              onClick={() => setIsChanging(false)}
              className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-bold"
            >
              ✕ Cancel
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Select Correct Learning Gap (Standard Vocabulary):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
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
                    'p-3.5 rounded-xl border text-left transition-all',
                    selectedGap === gap.val
                      ? 'border-indigo-600 bg-white dark:bg-zinc-900 shadow-sm ring-2 ring-indigo-200 dark:ring-indigo-800'
                      : 'border-zinc-200/80 dark:border-zinc-700/80 bg-white/70 dark:bg-zinc-800/40 text-zinc-600'
                  )}
                >
                  <p className="text-xs font-black text-zinc-900 dark:text-zinc-100">{gap.val}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-tight">{gap.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
              Teacher Clinical Notes (Optional):
            </label>
            <textarea
              rows={2}
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              placeholder="e.g. Student demonstrated proper bundling in oral check..."
              className="w-full text-xs p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            <button
              onClick={handleSaveChange}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            >
              Save Changed Diagnosis
            </button>
            <button
              onClick={() => setIsChanging(false)}
              className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {successToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold text-center shadow-xs">
          {successToast}
        </div>
      )}
    </div>
  );
}

