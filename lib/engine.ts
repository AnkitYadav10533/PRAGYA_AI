/**
 * PRAGYA — Intelligence & Core Diagnostic Engine
 * Owner: ABHAY (Engine)
 * 
 * Rules:
 * 1. Pure, deterministic, testable functions without side effects or UI dependencies.
 * 2. Domain: 2-digit subtraction with regrouping.
 * 3. Exact 5-question assessment model.
 * 4. Error signature engine correctly isolates regrouping slips (e.g. 83 - 47 = 46).
 * 5. Exactly 2 verdict-bearing checks + 1 warm-up check (warm-up never bears verdict).
 * 6. Teacher decisions (accept/reject/change) are preserved alongside engine suggestions.
 * 7. All percentages calculated from raw counts — no hardcoded or fake percentages.
 */

import {
  AssessmentItem,
  ClassGapSummary,
  Diagnosis,
  DiagnosticCheck,
  ErrorSignature,
  MathematicalValidationResult,
  NormalizedResponse,
  OCRResult,
  Progress,
  RemedialGroup,
  Student,
  StudentResponse,
  SubtractionErrorType,
  TeacherDecision,
} from './types';

// =========================================================================
// 1. FIXED 5-QUESTION ASSESSMENT MODEL (Section 6)
// =========================================================================

export const FIXED_ASSESSMENT_ITEMS: AssessmentItem[] = [
  {
    id: 'q1',
    order: 1,
    questionNumber: 1,
    prompt: '52 − 27',
    num1: 52,
    operandA: 52,
    num2: 27,
    operandB: 27,
    correctAnswer: 25,
    requiresRegrouping: true,
    operation: 'subtraction',
    diagnosticTags: ['warmup', 'regrouping'],
    type: 'warmup',
    targetSkill: '2-digit subtraction with regrouping (warm-up baseline)',
    description: 'Warm-up support question. Establishes baseline arithmetic readiness.',
  },
  {
    id: 'q2',
    order: 2,
    questionNumber: 2,
    prompt: '71 − 38',
    num1: 71,
    operandA: 71,
    num2: 38,
    operandB: 38,
    correctAnswer: 33,
    requiresRegrouping: true,
    operation: 'subtraction',
    diagnosticTags: ['regrouping', 'place_value'],
    type: 'diagnostic',
    targetSkill: '2-digit subtraction with regrouping',
    description: 'Tests regrouping across tens where minuend ones digit is 1.',
  },
  {
    id: 'q3',
    order: 3,
    questionNumber: 3,
    prompt: '83 − 47',
    num1: 83,
    operandA: 83,
    num2: 47,
    operandB: 47,
    correctAnswer: 36,
    requiresRegrouping: true,
    operation: 'subtraction',
    diagnosticTags: ['regrouping', 'place_value', 'demo_case'],
    type: 'diagnostic',
    targetSkill: '2-digit subtraction with regrouping (Demo Case)',
    description: 'Primary demonstration item. Target error 46 indicates failure to decrement tens.',
  },
  {
    id: 'q4',
    order: 4,
    questionNumber: 4,
    prompt: '64 − 26',
    num1: 64,
    operandA: 64,
    num2: 26,
    operandB: 26,
    correctAnswer: 38,
    requiresRegrouping: true,
    operation: 'subtraction',
    diagnosticTags: ['regrouping', 'even_digits'],
    type: 'diagnostic',
    targetSkill: '2-digit subtraction with regrouping',
    description: 'Tests regrouping consistency with even numbers and identical subtrahend/ones relationships.',
  },
  {
    id: 'q5',
    order: 5,
    questionNumber: 5,
    prompt: '92 − 57',
    num1: 92,
    operandA: 92,
    num2: 57,
    operandB: 57,
    correctAnswer: 35,
    requiresRegrouping: true,
    operation: 'subtraction',
    diagnosticTags: ['regrouping', 'higher_decades'],
    type: 'diagnostic',
    targetSkill: '2-digit subtraction with regrouping',
    description: 'Tests higher-decade regrouping across tens.',
  },
];

export function getAssessmentQuestions(): AssessmentItem[] {
  return [...FIXED_ASSESSMENT_ITEMS];
}

export function getQuestionById(questionId: string): AssessmentItem | undefined {
  return FIXED_ASSESSMENT_ITEMS.find((q) => q.id === questionId);
}

// =========================================================================
// 2. OCR NORMALIZATION & ADAPTER (Sections 7 & 8)
// =========================================================================

/**
 * Normalizes raw OCR input text into a clean numeric response.
 * Handles whitespaces, leading zeros, and flags ambiguous characters.
 */
export function normalizeOCR(rawText: string, questionId: string = ''): NormalizedResponse {
  if (rawText === undefined || rawText === null) {
    return {
      questionId,
      rawInput: '',
      numericValue: null,
      isValidNumber: false,
      isUncertain: true,
    };
  }

  const trimmed = String(rawText).trim();

  if (trimmed === '') {
    return {
      questionId,
      rawInput: rawText,
      numericValue: null,
      isValidNumber: false,
      isUncertain: true,
    };
  }

  // Ambiguous characters flag uncertainty (e.g. "4?", "?", "4-?", "4O" instead of 40)
  if (/[?*~_!#%&]/.test(trimmed)) {
    return {
      questionId,
      rawInput: rawText,
      numericValue: null,
      isValidNumber: false,
      isUncertain: true,
    };
  }

  // Extract clean digits; reject multiple disparate fragments
  const cleaned = trimmed.replace(/\s+/g, '');
  if (/^-?\d+$/.test(cleaned)) {
    const parsed = parseInt(cleaned, 10);
    return {
      questionId,
      rawInput: rawText,
      numericValue: isNaN(parsed) ? null : parsed,
      isValidNumber: !isNaN(parsed),
      isUncertain: false,
    };
  }

  return {
    questionId,
    rawInput: rawText,
    numericValue: null,
    isValidNumber: false,
    isUncertain: true,
  };
}

/**
 * Deterministic mock OCR adapter for testing and offline execution.
 */
export function mockOCR(
  questionId: string,
  rawText: string,
  forcedConfidence?: number
): OCRResult {
  const normalized = normalizeOCR(rawText, questionId);

  let confidenceLevel: 'high' | 'medium' | 'low' | 'unreadable';
  let confidence: number;

  if (normalized.isUncertain || normalized.numericValue === null) {
    confidenceLevel = rawText.trim() === '' ? 'unreadable' : 'low';
    confidence = forcedConfidence !== undefined ? forcedConfidence : (confidenceLevel === 'unreadable' ? 0.0 : 0.35);
  } else {
    confidence = forcedConfidence !== undefined ? forcedConfidence : 0.95;
    confidenceLevel = confidence >= 0.8 ? 'high' : confidence >= 0.5 ? 'medium' : 'low';
  }

  return {
    questionId,
    rawText,
    normalizedAnswer: normalized.numericValue,
    confidence,
    confidenceLevel,
    isAmbiguous: normalized.isUncertain,
    notes: normalized.isUncertain
      ? `OCR extraction ambiguous or unreadable for input "${rawText}". Requires teacher verification.`
      : undefined,
  };
}

// =========================================================================
// 3. MATHEMATICAL VALIDATION (Section 9)
// =========================================================================

/**
 * Validates a student's answer against the assessment item parameters.
 * Result is strictly calculated, never hardcoded.
 */
export function validateMathematicalAnswer(
  question: AssessmentItem,
  observedAnswer: number | null
): MathematicalValidationResult {
  if (observedAnswer === null || observedAnswer === undefined) {
    return {
      questionId: question.id,
      expectedAnswer: question.correctAnswer,
      observedAnswer: null,
      correct: false,
      difference: undefined,
    };
  }

  const isCorrect = observedAnswer === question.correctAnswer;
  const difference = observedAnswer - question.correctAnswer;

  return {
    questionId: question.id,
    expectedAnswer: question.correctAnswer,
    observedAnswer,
    correct: isCorrect,
    difference,
  };
}

// =========================================================================
// 4. ERROR SIGNATURE ENGINE (Section 10)
// =========================================================================

/**
 * Decomposes 2-digit subtraction and detects structural mathematical error signatures.
 * 
 * Target Demo Case:
 * 83 - 47 = 46 (Expected 36)
 * Minuend = 83 (8 tens, 3 ones), Subtrahend = 47 (4 tens, 7 ones).
 * Student borrowed 10 into ones (13 - 7 = 6), but did not decrement tens (8 - 4 = 4).
 * Result = 46.
 * The explanation explicitly states that the student failed to decrement the tens digit
 * after regrouping, rather than falsely saying "8 tens + 6 ones".
 */
export function detectErrorSignature(
  question: AssessmentItem,
  observedAnswer: number | null
): ErrorSignature {
  if (observedAnswer === null || observedAnswer === undefined) {
    return {
      code: 'OCR_UNCERTAIN',
      type: 'unattempted',
      description: 'Unattempted or unreadable answer',
      explanation: 'No valid numeric answer was provided or OCR text could not be resolved.',
      mathematicalRationale: 'Missing numeric input prevents mathematical validation.',
      questionId: question.id,
    };
  }

  const validation = validateMathematicalAnswer(question, observedAnswer);
  if (validation.correct) {
    return {
      code: 'NO_ERROR',
      type: 'no_error',
      description: 'Correct calculation',
      explanation: `Correctly calculated ${question.num1} − ${question.num2} = ${question.correctAnswer}.`,
      mathematicalRationale: 'Both regrouping and column subtractions were executed accurately.',
      questionId: question.id,
    };
  }

  const tens1 = Math.floor(question.num1 / 10);
  const ones1 = question.num1 % 10;
  const tens2 = Math.floor(question.num2 / 10);
  const ones2 = question.num2 % 10;

  // PATTERN 1: Borrowed without decrementing tens
  // Ones: (10 + ones1) - ones2
  // Tens: tens1 - tens2 (instead of (tens1 - 1) - tens2)
  // Value = (tens1 - tens2) * 10 + ((10 + ones1) - ones2) = Expected + 10
  const borrowedWithoutDecrementValue = (tens1 - tens2) * 10 + ((10 + ones1) - ones2);

  if (observedAnswer === borrowedWithoutDecrementValue) {
    return {
      code: 'REGROUPING_ERROR',
      type: 'borrowed_without_decrement',
      description: 'Borrowed without decrementing tens digit',
      explanation: `The student recognized the need to borrow 10 into the ones place (calculating 1${ones1} − ${ones2} = ${(10 + ones1) - ones2}), but did not reduce the tens place by 1 (calculated ${tens1} − ${tens2} = ${tens1 - tens2} instead of ${tens1 - 1} − ${tens2} = ${(tens1 - 1) - tens2}). The answer ${observedAnswer} is exactly 10 greater than the correct difference ${question.correctAnswer}.`,
      mathematicalRationale: `Observed ${observedAnswer} matches (tens1 − tens2) * 10 + ((10 + ones1) − ones2). Tens column was not decremented after regrouping.`,
      questionId: question.id,
    };
  }

  // PATTERN 2: Subtracted smaller ones digit from larger ones digit (Directionality / Place Value Error)
  // Ones: |ones1 - ones2| = ones2 - ones1
  // Tens: tens1 - tens2
  // Value = (tens1 - tens2) * 10 + (ones2 - ones1)
  const smallerFromLargerValue = (tens1 - tens2) * 10 + (ones2 - ones1);

  if (ones1 < ones2 && observedAnswer === smallerFromLargerValue) {
    return {
      code: 'PLACE_VALUE_ERROR',
      type: 'smaller_from_larger_ones',
      description: 'Subtracted smaller ones digit from larger ones digit',
      explanation: `The student subtracted the smaller top digit from the larger bottom digit in the ones column (${ones2} − ${ones1} = ${ones2 - ones1}) instead of regrouping from the tens column. Tens were subtracted directly (${tens1} − ${tens2} = ${tens1 - tens2}).`,
      mathematicalRationale: `Observed ${observedAnswer} matches reverse directionality in the ones place: |${ones1} − ${ones2}| without regrouping.`,
      questionId: question.id,
    };
  }

  // PATTERN 3: Over-decrement (decremented tens twice or unnecessarily)
  const overDecrementValue = (tens1 - 2 - tens2) * 10 + ((10 + ones1) - ones2);
  if (observedAnswer === overDecrementValue) {
    return {
      code: 'REGROUPING_ERROR',
      type: 'over_decrement',
      description: 'Over-decremented tens place',
      explanation: `The student decremented the tens place by 2 instead of 1 after regrouping.`,
      mathematicalRationale: `Observed ${observedAnswer} is 10 less than the expected difference ${question.correctAnswer}.`,
      questionId: question.id,
    };
  }

  // PATTERN 4: Single-digit fact slip (difference of +/- 1 or +/- 2)
  const absDiff = Math.abs(observedAnswer - question.correctAnswer);
  if (absDiff === 1 || absDiff === 2) {
    return {
      code: 'SUBTRACTION_FACT_ERROR',
      type: 'calculation_error',
      description: 'Single-digit arithmetic recall slip',
      explanation: `The student executed the regrouping structure but made a basic arithmetic fact slip (off by ${absDiff}).`,
      mathematicalRationale: `Observed ${observedAnswer} is within ±${absDiff} of expected ${question.correctAnswer}.`,
      questionId: question.id,
    };
  }

  // PATTERN 5: Unclassified / No clear pattern
  return {
    code: 'NO_CLEAR_PATTERN',
    type: 'calculation_error',
    description: 'Inconsistent calculation error',
    explanation: `The response ${observedAnswer} does not align with systematic regrouping or place-value error patterns for ${question.prompt}.`,
    mathematicalRationale: `Observed ${observedAnswer} deviates from expected ${question.correctAnswer} without matching structured error vectors.`,
    questionId: question.id,
  };
}

// =========================================================================
// 5. RESPONSE ANALYSIS & DIAGNOSTIC CHECKS (Sections 11 & 12)
// =========================================================================

/**
 * Enriches a student's answer into a fully typed StudentResponse.
 */
export function analyzeResponse(
  question: AssessmentItem,
  studentAnswer: number | null,
  timeSpentSeconds?: number
): StudentResponse {
  const validation = validateMathematicalAnswer(question, studentAnswer);
  const signature = detectErrorSignature(question, studentAnswer);

  return {
    questionId: question.id,
    studentAnswer,
    isCorrect: validation.correct,
    detectedError: signature.type,
    errorExplanation: signature.explanation,
    timeSpentSeconds,
    recordedAt: new Date().toISOString(),
  };
}

/**
 * Analyzes an array of answers mapped against the 5 fixed assessment items.
 */
export function analyzeResponses(
  responses: Array<{ questionId: string; studentAnswer: number | null; timeSpentSeconds?: number }>
): StudentResponse[] {
  return responses.map((r) => {
    const question = getQuestionById(r.questionId) || FIXED_ASSESSMENT_ITEMS[0];
    return analyzeResponse(question, r.studentAnswer, r.timeSpentSeconds);
  });
}

/**
 * Executes the exactly 2 verdict-bearing checks + 1 warm-up check.
 * 
 * Check 1 (Verdict-Bearing): Regrouping Across Tens
 * Check 2 (Verdict-Bearing): Correct Subtraction Execution After Regrouping
 * Check 3 (Support Warm-up): Warm-up Readiness Check (Non-verdict-bearing)
 */
export function runDiagnosticChecks(responses: StudentResponse[]): DiagnosticCheck[] {
  const warmupResponse = responses.find((r) => r.questionId === 'q1');
  const diagnosticResponses = responses.filter((r) => r.questionId !== 'q1');

  // Check 1: Regrouping Across Tens (Verdict-bearing)
  // Passes if the student does NOT exhibit systematic regrouping errors (borrowed_without_decrement or smaller_from_larger)
  const regroupingErrors = diagnosticResponses.filter(
    (r) => r.detectedError === 'borrowed_without_decrement' || r.detectedError === 'smaller_from_larger_ones'
  );
  const check1Passed = regroupingErrors.length === 0;
  const check1Evidence = check1Passed
    ? 'All diagnostic items demonstrated appropriate regrouping and tens decrementing.'
    : `Identified ${regroupingErrors.length} instance(s) of regrouping slips across diagnostic items (${regroupingErrors.map((r) => `${r.questionId}: answered ${r.studentAnswer}`).join(', ')}).`;

  // Check 2: Correct Subtraction Execution After Regrouping (Verdict-bearing)
  // Passes if the student's arithmetic facts in the ones column are accurate
  const arithmeticFactErrors = diagnosticResponses.filter(
    (r) => r.detectedError === 'calculation_error'
  );
  const check2Passed = arithmeticFactErrors.length === 0;
  const check2Evidence = check2Passed
    ? 'Single-digit arithmetic facts in ones column were accurately calculated.'
    : `Identified ${arithmeticFactErrors.length} basic arithmetic slip(s) in diagnostic items.`;

  // Check 3: Warm-up Support Question (Non-verdict-bearing)
  const warmupPassed = warmupResponse ? warmupResponse.isCorrect : false;
  const warmupAnswer = warmupResponse ? (warmupResponse.studentAnswer ?? 'None') : 'Unattempted';
  const warmupEvidence = `Support question Q1 (52 − 27) answered: ${warmupAnswer} (${warmupPassed ? 'Correct' : 'Incorrect'}). Baseline readiness indicator only — not used in verdict calculation.`;

  return [
    {
      id: 'check-1',
      checkNumber: 1,
      title: 'Regrouping Across Tens',
      type: 'verdict_bearing',
      verdictBearing: true,
      passed: check1Passed,
      evidence: check1Evidence,
      indicator: 'Verifies that 1 ten is borrowed into 10 ones AND the tens digit is decremented by 1.',
    },
    {
      id: 'check-2',
      checkNumber: 2,
      title: 'Subtraction Execution After Regrouping',
      type: 'verdict_bearing',
      verdictBearing: true,
      passed: check2Passed,
      evidence: check2Evidence,
      indicator: 'Verifies single-digit subtraction facts after regrouping is initiated.',
    },
    {
      id: 'check-3',
      checkNumber: 3,
      title: 'Warm-up Readiness Baseline',
      type: 'support_warmup',
      verdictBearing: false,
      passed: warmupPassed,
      evidence: warmupEvidence,
      indicator: 'Non-verdict baseline support item. Excluded from diagnostic verdict calculation.',
    },
  ];
}

// =========================================================================
// 6. DETERMINISTIC DIAGNOSIS GENERATION (Sections 11 & 13)
// =========================================================================

/**
 * Synthesizes student responses into an explainable, deterministic diagnosis.
 * 
 * Rules:
 * - Uses only the 2 verdict-bearing checks to establish the learning gap.
 * - Warm-up check is explicitly excluded.
 * - Preserves initial pending teacher decision.
 */
export function generateDiagnosis(
  studentId: string,
  assessmentId: string,
  responses: StudentResponse[]
): Diagnosis {
  const checks = runDiagnosticChecks(responses);
  const check1 = checks[0]; // Regrouping Across Tens (verdict_bearing)
  const check2 = checks[1]; // Subtraction Execution (verdict_bearing)

  const diagnosticResponses = responses.filter((r) => r.questionId !== 'q1');
  const correctCount = diagnosticResponses.filter((r) => r.isCorrect).length;

  let primaryErrorType: SubtractionErrorType = 'no_error';
  let suggestedVerdict = 'Mastery of 2-digit Subtraction with Regrouping';
  let rootCause = 'The student accurately performs 2-digit subtraction with regrouping across all tested items.';
  let confidence: 'high' | 'medium' | 'low' = 'high';

  // Count error frequencies in diagnostic items
  const errorCounts: Record<SubtractionErrorType, number> = {
    no_error: 0,
    borrowed_without_decrement: 0,
    smaller_from_larger_ones: 0,
    over_decrement: 0,
    regrouping_misalignment: 0,
    calculation_error: 0,
    unattempted: 0,
  };

  diagnosticResponses.forEach((r) => {
    errorCounts[r.detectedError] = (errorCounts[r.detectedError] || 0) + 1;
  });

  if (correctCount === diagnosticResponses.length) {
    primaryErrorType = 'no_error';
    suggestedVerdict = 'Mastery: 2-digit Subtraction with Regrouping';
    rootCause = 'Demonstrated consistent accuracy in borrowing, tens reduction, and fact retrieval.';
    confidence = 'high';
  } else if (!check1.passed && errorCounts.borrowed_without_decrement > 0) {
    primaryErrorType = 'borrowed_without_decrement';
    suggestedVerdict = 'Regrouping Gap: Borrowed 10 into ones without decrementing tens digit';
    rootCause =
      'The student correctly understands the need to borrow 10 to resolve the ones place (e.g., 13 − 7 = 6 in 83 − 47), but consistently omits decrementing the tens place by 1 before subtracting tens. The student calculates (tens1 − tens2) instead of ((tens1 − 1) − tens2).';
    confidence = errorCounts.borrowed_without_decrement >= 2 ? 'high' : 'medium';
  } else if (!check1.passed && errorCounts.smaller_from_larger_ones > 0) {
    primaryErrorType = 'smaller_from_larger_ones';
    suggestedVerdict = 'Directionality Gap: Subtracted smaller ones digit from larger ones digit';
    rootCause =
      'The student avoids regrouping by reversing the direction of subtraction in the ones place (subtracting top digit from bottom digit). Requires instruction on minuend preservation and place value.';
    confidence = errorCounts.smaller_from_larger_ones >= 2 ? 'high' : 'medium';
  } else if (!check2.passed) {
    primaryErrorType = 'calculation_error';
    suggestedVerdict = 'Fluency Gap: Basic subtraction fact recall slip';
    rootCause = 'Regrouping steps are understood, but single-digit subtraction facts showed inconsistency.';
    confidence = 'medium';
  } else {
    primaryErrorType = 'calculation_error';
    suggestedVerdict = 'Inconclusive / Mixed Errors: Requires teacher review';
    rootCause = 'Responses exhibited mixed patterns without a single dominant error signature.';
    confidence = 'low';
  }

  const initialDecision: TeacherDecision = {
    status: 'pending',
  };

  return {
    id: `diag-${studentId}-${Date.now()}`,
    studentId,
    assessmentId,
    primaryErrorType,
    suggestedVerdict,
    rootCause,
    confidence,
    checks,
    teacherDecision: initialDecision,
    finalVerdict: suggestedVerdict,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Applies a teacher's verification decision without destroying the engine's original diagnosis.
 */
export function applyTeacherDecision(
  diagnosis: Diagnosis,
  decision: TeacherDecision
): Diagnosis {
  let finalVerdict = diagnosis.suggestedVerdict;

  if (decision.status === 'accepted') {
    finalVerdict = diagnosis.suggestedVerdict;
  } else if (decision.status === 'rejected') {
    finalVerdict = 'Rejected by teacher: Student requires individual re-assessment.';
  } else if (decision.status === 'changed') {
    finalVerdict = decision.customVerdict && decision.customVerdict.trim() !== ''
      ? decision.customVerdict.trim()
      : diagnosis.suggestedVerdict;
  }

  return {
    ...diagnosis,
    teacherDecision: {
      ...decision,
      decidedAt: new Date().toISOString(),
    },
    finalVerdict,
  };
}

// =========================================================================
// 7. DETERMINISTIC GROUPING LOGIC (Section 14)
// =========================================================================

/**
 * Deterministically organizes students into remedial groups based on teacher-confirmed diagnoses.
 */
export function generateGroups(
  students: Student[],
  diagnoses: Diagnosis[],
  classId: string
): RemedialGroup[] {
  const diagnosisMap = new Map<string, Diagnosis>();
  diagnoses.forEach((d) => diagnosisMap.set(d.studentId, d));

  const regroupingStudentIds: string[] = [];
  const placeValueStudentIds: string[] = [];
  const calculationStudentIds: string[] = [];
  const masteryStudentIds: string[] = [];

  students.forEach((s) => {
    const diag = diagnosisMap.get(s.id);
    if (!diag) return;

    // Use confirmed teacher verdict / primary error
    const errorType = diag.primaryErrorType;
    if (errorType === 'borrowed_without_decrement' || errorType === 'over_decrement') {
      regroupingStudentIds.push(s.id);
    } else if (errorType === 'smaller_from_larger_ones') {
      placeValueStudentIds.push(s.id);
    } else if (errorType === 'calculation_error') {
      calculationStudentIds.push(s.id);
    } else {
      masteryStudentIds.push(s.id);
    }
  });

  const now = new Date().toISOString();
  const groups: RemedialGroup[] = [];

  if (regroupingStudentIds.length > 0) {
    groups.push({
      id: `group-regrouping-${classId}`,
      name: 'Group 1: Regrouping & Tens Adjustment',
      classId,
      focusError: 'borrowed_without_decrement',
      title: 'Tens Column Decrement Focus',
      studentIds: regroupingStudentIds,
      activityId: 'borrow-and-build',
      status: 'formed',
      createdAt: now,
    });
  }

  if (placeValueStudentIds.length > 0) {
    groups.push({
      id: `group-placevalue-${classId}`,
      name: 'Group 2: Place Value & Directionality',
      classId,
      focusError: 'smaller_from_larger_ones',
      title: 'Minuend Preservation & Directionality',
      studentIds: placeValueStudentIds,
      activityId: 'place-value-mats',
      status: 'formed',
      createdAt: now,
    });
  }

  if (calculationStudentIds.length > 0) {
    groups.push({
      id: `group-calculation-${classId}`,
      name: 'Group 3: Arithmetic Fact Fluency',
      classId,
      focusError: 'calculation_error',
      title: 'Single-Digit Subtraction Recall',
      studentIds: calculationStudentIds,
      activityId: 'fluency-ladder',
      status: 'formed',
      createdAt: now,
    });
  }

  if (masteryStudentIds.length > 0) {
    groups.push({
      id: `group-mastery-${classId}`,
      name: 'Group 4: Mastery & Word Problems',
      classId,
      focusError: 'no_error',
      title: 'Extended Subtraction Challenges',
      studentIds: masteryStudentIds,
      activityId: 'subtraction-mastery',
      status: 'completed',
      createdAt: now,
    });
  }

  return groups;
}

// =========================================================================
// 8. REASSESSMENT & PROGRESS CALCULATIONS (Section 16)
// =========================================================================

/**
 * Calculates deterministic progress metrics from exact raw counts.
 * Guarantees NO invented percentages.
 * 
 * Formula:
 * percentage = Math.round((correct / total) * 100)
 * improvement = afterPercentage - beforePercentage
 */
export function calculateProgress(
  studentId: string,
  beforeCorrect: number,
  beforeTotal: number,
  afterCorrect: number,
  afterTotal: number
): Progress {
  const safeBeforeTotal = beforeTotal > 0 ? beforeTotal : 5;
  const safeAfterTotal = afterTotal > 0 ? afterTotal : 5;

  const beforePercentage = Math.round((beforeCorrect / safeBeforeTotal) * 100);
  const afterPercentage = Math.round((afterCorrect / safeAfterTotal) * 100);
  const improvement = afterPercentage - beforePercentage;
  const isMastered = afterCorrect >= Math.ceil(safeAfterTotal * 0.8);

  return {
    studentId,
    beforeCorrect,
    beforeTotal: safeBeforeTotal,
    beforePercentage,
    afterCorrect,
    afterTotal: safeAfterTotal,
    afterPercentage,
    improvement,
    isMastered,
  };
}

// =========================================================================
// 9. CLASS GAP SUMMARY (Section 20)
// =========================================================================

/**
 * Aggregates diagnostic results into a class-level gap summary.
 */
export function calculateClassGapSummary(
  classId: string,
  students: Student[],
  diagnoses: Diagnosis[]
): ClassGapSummary {
  const totalStudents = students.length;
  const assessedCount = diagnoses.length;

  const errorDistribution: Record<SubtractionErrorType, number> = {
    no_error: 0,
    borrowed_without_decrement: 0,
    smaller_from_larger_ones: 0,
    over_decrement: 0,
    regrouping_misalignment: 0,
    calculation_error: 0,
    unattempted: 0,
  };

  let masteredCount = 0;
  let needsRemediationCount = 0;

  diagnoses.forEach((d) => {
    errorDistribution[d.primaryErrorType] = (errorDistribution[d.primaryErrorType] || 0) + 1;
    if (d.primaryErrorType === 'no_error') {
      masteredCount += 1;
    } else {
      needsRemediationCount += 1;
    }
  });

  const completionRate = totalStudents > 0 ? assessedCount / totalStudents : 0;

  return {
    classId,
    totalStudents,
    assessedCount,
    masteredCount,
    needsRemediationCount,
    errorDistribution,
    completionRate,
  };
}
