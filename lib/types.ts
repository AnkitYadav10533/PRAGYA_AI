/**
 * PRAGYA — Shared Data Contract
 * Owner: ABHAY (Engine)
 * 
 * Rules:
 * 1. lib/types.ts is the frozen shared contract across the team.
 * 2. Any change requires explicit justification and alignment.
 * 3. Domain: 2-digit subtraction with regrouping.
 * 4. All metric calculations rely on raw counts (no fake percentages).
 */

// ==========================================
// 1. Core Error Signatures (Domain-specific)
// ==========================================

export type SubtractionErrorType =
  | 'no_error'                      // Correct subtraction
  | 'borrowed_without_decrement'     // 83 - 47 = 46: Borrowed 10 to ones (13-7=6), but forgot to decrement tens (8-4=4) [DEMO CASE]
  | 'smaller_from_larger_ones'      // 83 - 47 = 44: Subtracted smaller ones digit from larger ones digit (7-3=4, 8-4=4)
  | 'over_decrement'                 // Decremented tens digit more than once or when not needed
  | 'regrouping_misalignment'        // Digit alignment or place value confusion
  | 'calculation_error'              // Single-digit fact recall slip
  | 'unattempted';                   // No response recorded

// ==========================================
// 2. Student & Class Models
// ==========================================

export type StudentWorkflowStatus =
  | 'not_assessed'
  | 'assessed'
  | 'diagnosed'
  | 'verified'
  | 'grouped'
  | 'intervened'
  | 'reassessed';

export interface Student {
  id: string;
  name: string;
  rollNumber: number;
  classId: string;
  gender: 'M' | 'F';
  status: StudentWorkflowStatus;
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: string;
  section: string;
  subject: string;
  teacherName: string;
  academicYear: string;
  totalStudents: number;
}

// ==========================================
// 3. Assessment & Item Bank Models
// Exactly 5 predefined questions for MVP
// ==========================================

export type QuestionType = 'warmup' | 'diagnostic';

export interface AssessmentItem {
  id: string;
  order: number;                    // 1 through 5
  prompt: string;                   // e.g. "83 − 47"
  num1: number;                     // Minuend (e.g. 83)
  num2: number;                     // Subtrahend (e.g. 47)
  correctAnswer: number;            // Expected difference (e.g. 36)
  requiresRegrouping: boolean;
  type: QuestionType;               // Q1 = warmup; Q2-Q5 = diagnostic
  targetSkill: string;              // e.g. "2-digit subtraction with regrouping"
  description: string;
}

export interface StudentResponse {
  questionId: string;
  studentAnswer: number | null;
  isCorrect: boolean;
  detectedError: SubtractionErrorType;
  errorExplanation: string;
  timeSpentSeconds?: number;
  recordedAt: string;
}

export interface AssessmentSubmission {
  id: string;
  studentId: string;
  classId: string;
  type: 'baseline' | 'reassessment';
  responses: StudentResponse[];
  correctCount: number;
  totalCount: number;
  submittedAt: string;
}

// ==========================================
// 4. Diagnostic Checks & Rules
// Section 12: 2 verdict-bearing checks + 1 warm-up
// ==========================================

export type CheckType = 'verdict_bearing' | 'support_warmup';

export interface DiagnosticCheck {
  id: string;
  checkNumber: 1 | 2 | 3;
  title: string;
  type: CheckType;
  passed: boolean;                  // true if student mastered this check; false if gap detected
  evidence: string;                 // Concrete textual evidence from responses
  indicator: string;                // Specific mathematical pattern observed
}

// ==========================================
// 5. Teacher Verification & Decision
// Section 13: Accept | Reject | Change
// ==========================================

export type DecisionStatus = 'pending' | 'accepted' | 'rejected' | 'changed';

export interface TeacherDecision {
  status: DecisionStatus;
  customVerdict?: string;
  notes?: string;
  decidedAt?: string;
}

export interface Diagnosis {
  id: string;
  studentId: string;
  assessmentId: string;
  primaryErrorType: SubtractionErrorType;
  suggestedVerdict: string;
  rootCause: string;                // Mathematical explanation of error
  confidence: 'high' | 'medium' | 'low';
  checks: DiagnosticCheck[];        // 2 verdict-bearing + 1 warm-up
  teacherDecision: TeacherDecision;
  finalVerdict: string;             // Equal to suggestedVerdict or teacher's customVerdict
  createdAt: string;
}

// ==========================================
// 6. Remedial Activities & Grouping
// ==========================================

export interface ActivityStep {
  stepNumber: number;
  title: string;
  instruction: string;
  teacherPrompt: string;
}

export interface RemedialActivity {
  id: string;
  title: string;
  targetedError: SubtractionErrorType;
  description: string;
  materials: string[];
  pedagogy: string;                 // Concrete -> Representational -> Abstract (CPA)
  steps: ActivityStep[];
  durationMinutes: number;
}

export type GroupStatus = 'formed' | 'in_intervention' | 'ready_for_reassessment' | 'completed';

export interface RemedialGroup {
  id: string;
  name: string;
  classId: string;
  focusError: SubtractionErrorType;
  title: string;
  studentIds: string[];
  activityId: string;
  status: GroupStatus;
  createdAt: string;
}

// ==========================================
// 7. Reassessment & Progress Comparison
// Section 14 & 15: Counts first, calculate percentages
// ==========================================

export interface ReassessmentRecord {
  id: string;
  studentId: string;
  groupId: string;
  beforeCorrectCount: number;       // e.g. 1
  beforeTotalCount: number;         // e.g. 5
  afterCorrectCount: number;        // e.g. 4
  afterTotalCount: number;          // e.g. 5
  responses: StudentResponse[];
  isImproved: boolean;
  isMastered: boolean;
  completedAt: string;
}

// ==========================================
// 8. Class-Level Gap Analysis (Aggregates)
// ==========================================

export interface ClassGapSummary {
  classId: string;
  totalStudents: number;
  assessedCount: number;
  masteredCount: number;
  needsRemediationCount: number;
  errorDistribution: Record<SubtractionErrorType, number>;
  completionRate: number;           // Calculated: assessedCount / totalStudents
}
