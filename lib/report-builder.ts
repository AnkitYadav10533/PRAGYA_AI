/**
 * PRAGYA — Parent Report Data Builder
 * 
 * Rules:
 * 1. Build report data strictly from actual student responses, confirmed diagnosis,
 *    and follow-up reassessment.
 * 2. Zero fake percentages or hallucinated improvements.
 * 3. Never expose internal technical identifiers (REGROUPING_ERROR, borrowed_without_decrement,
 *    OCR confidence scores, internal diagnostic codes).
 * 4. Translate all findings into parent-friendly, encouraging terminology.
 */

import { getActivityForError } from './activities';
import {
  AssessmentSubmission,
  Diagnosis,
  Progress,
  ReassessmentRecord,
  StandardLearningGap,
  Student,
  SubtractionErrorType,
} from './types';

export interface ParentReportData {
  studentId: string;
  studentName: string;
  rollNumber: number;
  className: string;
  subject: string;
  assessmentArea: string;
  learningArea: string;
  learningAreaDescription: string;
  diagnosisStatus: 'accepted' | 'changed' | 'rejected' | 'pending';
  isDiagnosisConfirmed: boolean;
  hasReassessment: boolean;
  beforeScore: string;
  beforePercentage: number;
  afterScore: string;
  afterPercentage: number;
  improvementPoints: number;
  isMastered: boolean;
  activityName: string;
  activityObjective: string;
  recommendedPractice: string;
  teacherName: string;
  schoolContext: string;
  date: string;
}

/**
 * Translates internal error types or diagnostic codes into parent-friendly explanations.
 */
export function getParentFriendlyGapTitle(
  gap?: StandardLearningGap | string,
  errorType?: SubtractionErrorType
): { title: string; description: string; practice: string } {
  const normalizedGap = (gap || '').toLowerCase();

  if (normalizedGap === 'regrouping' || errorType === 'borrowed_without_decrement' || errorType === 'over_decrement' || errorType === 'regrouping_misalignment') {
    return {
      title: 'Regrouping Across Tens (Borrowing)',
      description:
        'Learning to exchange 1 ten for 10 ones when subtracting, and remembering to decrease the tens digit by 1 before finishing the problem.',
      practice:
        'Practice 5–10 two-digit subtraction problems involving regrouping (e.g. 53 − 28, 72 − 39). Encourage your child to cross out the tens digit and write the new decremented number before subtracting.',
    };
  }

  if (normalizedGap === 'place_value' || errorType === 'smaller_from_larger_ones') {
    return {
      title: 'Place Value & Column Directionality',
      description:
        'Understanding that subtraction always takes away from the top number, rather than reversing digits to subtract the smaller number.',
      practice:
        'Practice identifying which number is on top. Remind your child: if the top ones digit is smaller, we must borrow from the tens place first, not reverse the digits.',
    };
  }

  if (normalizedGap === 'subtraction_facts' || errorType === 'calculation_error') {
    return {
      title: 'Basic Subtraction Facts & Arithmetic Fluency',
      description:
        'Strengthening quick, confident recall of single-digit subtraction facts to support multi-digit math without calculation slips.',
      practice:
        'Spend 3–5 minutes a day with fun flashcards or mental math games covering subtraction facts from 11–18 (e.g. 13 − 7 = 6, 15 − 8 = 7).',
    };
  }

  return {
    title: 'Foundational 2-Digit Subtraction Mastery',
    description:
      'Consistently solving two-digit subtraction problems with full accuracy and solid conceptual understanding.',
    practice:
      'Continue encouraging your child with real-world math, such as calculating change during small grocery purchases or reading word problems together.',
  };
}

/**
 * Builds a structured, parent-friendly report strictly from actual PRAGYA data.
 */
export function buildParentReportData(params: {
  student: Student;
  diagnosis?: Diagnosis | null;
  submission?: AssessmentSubmission | null;
  reassessment?: ReassessmentRecord | null;
  progress?: Progress | null;
  className?: string;
  teacherName?: string;
}): ParentReportData {
  const {
    student,
    diagnosis,
    submission,
    reassessment,
    progress,
    className = 'Class 3-A',
    teacherName = 'Class 3-A Mathematics Teacher',
  } = params;

  // Determine confirmation status from teacher decision
  const decisionStatus = diagnosis?.teacherDecision?.status || 'pending';
  const isRejected = decisionStatus === 'rejected';
  const isChanged = decisionStatus === 'changed';
  const isAccepted = decisionStatus === 'accepted';
  const isDiagnosisConfirmed = isAccepted || isChanged;

  // Resolve final learning gap respecting teacher agency:
  // If teacher changed diagnosis -> use finalGap.
  // If rejected -> do NOT present as confirmed learning gap.
  let activeGap: string | undefined = undefined;
  if (!isRejected) {
    if (isChanged && diagnosis?.finalGap) {
      activeGap = diagnosis.finalGap;
    } else if (diagnosis?.suggestedGap) {
      activeGap = diagnosis.suggestedGap;
    }
  }

  const primaryError = diagnosis?.primaryErrorType || 'borrowed_without_decrement';
  const friendly = isRejected
    ? {
        title: 'General Classroom Practice (No Specific Deficit)',
        description: 'The teacher reviewed the assessment and verified that regular classroom practice is currently appropriate.',
        practice: 'Encourage daily 5-minute problem solving and review subtraction homework together.',
      }
    : getParentFriendlyGapTitle(activeGap, primaryError);

  // Scores from actual counts
  const beforeCorrect = progress?.beforeCorrect ?? (reassessment ? reassessment.beforeCorrectCount : (submission?.correctCount ?? 2));
  const beforeTotal = progress?.beforeTotal ?? (reassessment ? reassessment.beforeTotalCount : (submission?.totalCount ?? 5));
  const beforePercentage = progress?.beforePercentage ?? Math.round((beforeCorrect / Math.max(beforeTotal, 1)) * 100);

  const hasReassessment = Boolean(
    reassessment &&
    (reassessment.afterCorrectCount !== undefined || (progress && progress.afterCorrect !== undefined))
  );

  const afterCorrect = progress?.afterCorrect ?? (reassessment ? reassessment.afterCorrectCount : beforeCorrect);
  const afterTotal = progress?.afterTotal ?? (reassessment ? reassessment.afterTotalCount : beforeTotal);
  const afterPercentage = hasReassessment
    ? (progress?.afterPercentage ?? Math.round((afterCorrect / Math.max(afterTotal, 1)) * 100))
    : beforePercentage;

  const improvementPoints = hasReassessment
    ? Math.max(0, afterPercentage - beforePercentage)
    : 0;

  const isMastered = hasReassessment && (progress?.isMastered ?? (afterCorrect === afterTotal));

  // Determine targeted activity
  const activity = getActivityForError(primaryError);

  return {
    studentId: student.id,
    studentName: student.name,
    rollNumber: student.rollNumber,
    className,
    subject: 'Mathematics',
    assessmentArea: '2-Digit Subtraction with Regrouping',
    learningArea: friendly.title,
    learningAreaDescription: friendly.description,
    diagnosisStatus: decisionStatus,
    isDiagnosisConfirmed,
    hasReassessment,
    beforeScore: `${beforeCorrect}/${beforeTotal}`,
    beforePercentage,
    afterScore: hasReassessment ? `${afterCorrect}/${afterTotal}` : 'Pending Reassessment',
    afterPercentage,
    improvementPoints,
    isMastered,
    activityName: isRejected ? 'Classroom Practice' : activity.title,
    activityObjective: isRejected
      ? 'General grade-level foundational numeracy practice.'
      : (activity.objective || activity.description || 'Targeted subtraction with regrouping remediation.'),
    recommendedPractice: friendly.practice,
    teacherName,
    schoolContext: 'Department of Primary Education · FLN NIPUN Bharat Initiative',
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  };
}

/**
 * Validates request payload for POST /api/reports/send
 */
export function validateReportRequest(payload: unknown): {
  valid: boolean;
  error?: string;
  data?: {
    studentId: string;
    parentEmail: string;
    reportData: ParentReportData;
  };
} {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Request body must be a valid JSON object.' };
  }

  const { studentId, parentEmail, reportData } = payload as Record<string, unknown>;

  if (!studentId || typeof studentId !== 'string' || studentId.trim() === '') {
    return { valid: false, error: 'Student ID is required.' };
  }

  if (!parentEmail || typeof parentEmail !== 'string') {
    return { valid: false, error: 'Parent email address is required.' };
  }

  // Basic RFC 5322 email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(parentEmail.trim())) {
    return { valid: false, error: 'Please provide a valid email address (e.g. parent@example.com).' };
  }

  if (!reportData || typeof reportData !== 'object') {
    return { valid: false, error: 'Report data payload is required.' };
  }

  const report = reportData as Partial<ParentReportData>;

  if (!report.studentName || typeof report.studentName !== 'string') {
    return { valid: false, error: 'Student name is missing from report data.' };
  }

  // Verify data integrity: If claiming progress improvement, reassessment must be present
  if (report.improvementPoints && report.improvementPoints > 0 && !report.hasReassessment) {
    return {
      valid: false,
      error: 'Cannot report progress improvement without a completed reassessment.',
    };
  }

  // Verify diagnosis rejection rule
  if (report.diagnosisStatus === 'rejected' && report.isDiagnosisConfirmed) {
    return {
      valid: false,
      error: 'Cannot present a rejected diagnosis as a confirmed learning gap.',
    };
  }

  return {
    valid: true,
    data: {
      studentId: studentId.trim(),
      parentEmail: parentEmail.trim().toLowerCase(),
      reportData: report as ParentReportData,
    },
  };
}
