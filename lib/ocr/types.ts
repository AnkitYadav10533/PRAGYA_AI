/**
 * PRAGYA AI — Mathematics OCR Module Types
 * Owner: Intelligence Layer (Abhay)
 * 
 * Strict Result Schema and Service Contracts for Handwritten Math Assessment.
 */

export type MathOCRStatus = 'COMPLETED' | 'REVIEW_REQUIRED' | 'FAILED';

export type MathOCRErrorType =
  | 'none'
  | 'correct'
  | 'incorrect'
  | 'blank'
  | 'OCR_uncertain'
  | 'unsupported_expression';

export type SupportedOperation = 'addition' | 'subtraction' | 'multiplication' | 'division';

export interface PreprocessingOptions {
  contrastStretch?: boolean;
  denoise?: boolean;
  binarize?: boolean;
  targetWidth?: number;
  targetHeight?: number;
  cropPadding?: number;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface PreprocessedImage {
  width: number;
  height: number;
  data: Uint8Array | number[]; // Greyscale pixel array (0-255)
  base64Thumbnail?: string;
  preprocessingApplied: string[];
}

export interface RawOCROutput {
  rawText: string;
  ocrConfidence: number;        // 0.0 to 1.0
  isAmbiguous: boolean;
  detectedLines?: string[];
  providerName: string;
  metadata?: Record<string, unknown>;
}

export interface MathOCRProvider {
  readonly providerName: string;
  extractText(image: PreprocessedImage | string): Promise<RawOCROutput>;
}

export interface ParsedMathExpression {
  rawInput: string;
  questionNumber: number | null;
  extractedAnswer: number | null;
  detectedOperator: SupportedOperation | null;
  operandA: number | null;
  operandB: number | null;
  cleanExpression: string;
  isAmbiguous: boolean;
  syntaxValid: boolean;
}

export interface MathItemDefinition {
  question_id: string;
  skill: string;
  prompt?: string;
  expected_answer: number;
  operation?: SupportedOperation;
  tolerance?: number;
}

/**
 * EXACT REQUIRED RESULT SCHEMA
 */
export interface MathOCRResult {
  question_id: string;
  skill: string;
  student_response: string | number | null;
  expected_answer: string | number;
  is_correct: boolean;
  score: number;                          // 1 for correct, 0 for incorrect/blank/uncertain
  ocr_confidence: number;                 // 0.0 to 1.0
  evaluation_confidence: number;          // 0.0 to 1.0
  error_type: MathOCRErrorType;
  status: MathOCRStatus;
  notes?: string;
  trace?: {
    operandA?: number | null;
    operandB?: number | null;
    operator?: string | null;
    normalizedInput?: string;
    rawText?: string;
  };
}
