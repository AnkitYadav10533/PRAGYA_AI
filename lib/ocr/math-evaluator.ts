/**
 * PRAGYA AI — Mathematical Evaluator & Error Classifier
 * Owner: Intelligence Layer (Abhay)
 * 
 * Capabilities:
 * 1. Mathematical equality comparison (arithmetic across +, -, *, /).
 * 2. Strict classification: correct, incorrect, blank, OCR_uncertain, unsupported_expression.
 * 3. Enforces Status: COMPLETED, REVIEW_REQUIRED, FAILED.
 * 4. Rule: Low OCR confidence or ambiguous scan ALWAYS yields REVIEW_REQUIRED without penalizing student.
 */

import {
  MathItemDefinition,
  MathOCRErrorType,
  MathOCRResult,
  MathOCRStatus,
  ParsedMathExpression,
  RawOCROutput,
} from './types';

export class MathEvaluator {
  /**
   * Evaluates student mathematical response against expected answer.
   */
  public static evaluate(
    item: MathItemDefinition,
    rawOcr: RawOCROutput,
    parsed: ParsedMathExpression
  ): MathOCRResult {
    const ocrConfidence = rawOcr.ocrConfidence;
    const studentResponse = parsed.extractedAnswer;
    const expectedAnswer = item.expected_answer;
    const tolerance = item.tolerance ?? 0.0001;

    // Default result scaffold
    let isCorrect = false;
    let score = 0;
    let evaluationConfidence = 1.0;
    let errorType: MathOCRErrorType = 'none';
    let status: MathOCRStatus = 'COMPLETED';
    let notes: string | undefined = undefined;

    // RULE 1: Blank / Unattempted response
    const rawTrimmed = rawOcr.rawText.trim();
    if (rawTrimmed === '') {
      errorType = 'blank';
      status = 'COMPLETED';
      isCorrect = false;
      score = 0;
      evaluationConfidence = 1.0;
      notes = 'No answer written in designated area (blank).';

      return {
        question_id: item.question_id,
        skill: item.skill,
        student_response: null,
        expected_answer: expectedAnswer,
        is_correct: false,
        score: 0,
        ocr_confidence: ocrConfidence,
        evaluation_confidence: evaluationConfidence,
        error_type: errorType,
        status,
        notes,
      };
    }

    // RULE 2: Low OCR confidence or ambiguous extraction (must NOT mark student wrong!)
    if (ocrConfidence < 0.6 || parsed.isAmbiguous || rawOcr.isAmbiguous) {
      errorType = 'OCR_uncertain';
      status = 'REVIEW_REQUIRED';
      isCorrect = false;
      score = 0;
      evaluationConfidence = 0.4;
      notes = `OCR confidence is low (${Math.round(ocrConfidence * 100)}%) or character extraction was ambiguous. Flagged for teacher review — answer is NOT automatically marked incorrect.`;

      return {
        question_id: item.question_id,
        skill: item.skill,
        student_response: studentResponse,
        expected_answer: expectedAnswer,
        is_correct: isCorrect,
        score,
        ocr_confidence: ocrConfidence,
        evaluation_confidence: evaluationConfidence,
        error_type: errorType,
        status,
        notes,
        trace: {
          operandA: parsed.operandA,
          operandB: parsed.operandB,
          operator: parsed.detectedOperator,
          normalizedInput: parsed.cleanExpression,
          rawText: rawOcr.rawText,
        },
      };
    }

    // RULE 3: Unsupported or malformed mathematical syntax
    if (!parsed.syntaxValid || studentResponse === null || isNaN(studentResponse)) {
      errorType = 'unsupported_expression';
      status = 'FAILED';
      isCorrect = false;
      score = 0;
      evaluationConfidence = 0.2;
      notes = `Extracted expression "${rawOcr.rawText}" does not conform to valid mathematical arithmetic syntax.`;

      return {
        question_id: item.question_id,
        skill: item.skill,
        student_response: rawOcr.rawText,
        expected_answer: expectedAnswer,
        is_correct: false,
        score: 0,
        ocr_confidence: ocrConfidence,
        evaluation_confidence: evaluationConfidence,
        error_type: errorType,
        status,
        notes,
        trace: {
          rawText: rawOcr.rawText,
        },
      };
    }

    // RULE 4: Mathematical Equality Comparison
    // Uses numerical comparison rather than simple string comparison
    const difference = Math.abs(studentResponse - expectedAnswer);
    if (difference <= tolerance) {
      isCorrect = true;
      score = 1;
      errorType = 'correct';
      status = 'COMPLETED';
      evaluationConfidence = 1.0;
      notes = `Mathematical match: ${studentResponse} == ${expectedAnswer}.`;
    } else {
      isCorrect = false;
      score = 0;
      errorType = 'incorrect';
      status = 'COMPLETED';
      evaluationConfidence = 0.95;
      notes = `Calculated difference is ${studentResponse - expectedAnswer} (observed ${studentResponse} vs expected ${expectedAnswer}).`;
    }

    return {
      question_id: item.question_id,
      skill: item.skill,
      student_response: studentResponse,
      expected_answer: expectedAnswer,
      is_correct: isCorrect,
      score,
      ocr_confidence: ocrConfidence,
      evaluation_confidence: evaluationConfidence,
      error_type: errorType,
      status,
      notes,
      trace: {
        operandA: parsed.operandA,
        operandB: parsed.operandB,
        operator: parsed.detectedOperator,
        normalizedInput: parsed.cleanExpression,
        rawText: rawOcr.rawText,
      },
    };
  }

  /**
   * Helper to verify an arithmetic formula result directly: A [op] B == expected.
   */
  public static verifyArithmetic(
    operandA: number,
    operandB: number,
    operation: 'addition' | 'subtraction' | 'multiplication' | 'division'
  ): number {
    switch (operation) {
      case 'addition':
        return operandA + operandB;
      case 'subtraction':
        return operandA - operandB;
      case 'multiplication':
        return operandA * operandB;
      case 'division':
        if (operandB === 0) throw new Error('Division by zero');
        return operandA / operandB;
    }
  }
}
