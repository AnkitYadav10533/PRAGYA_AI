/**
 * PRAGYA AI — Handwritten Mathematics OCR Module Entrypoint
 * Owner: Intelligence Layer (Abhay)
 * 
 * Modular pipeline orchestrator:
 * IMAGE / INPUT
 *   ↓
 * Image Preprocessing (contrast, denoise, crop, symbol preservation)
 *   ↓
 * OCR Service Abstraction
 *   ↓
 * Mathematical Parser (syntax, question numbers, operands, answer extraction)
 *   ↓
 * Mathematical Evaluator (+, -, *, / comparison)
 *   ↓
 * Error Classifier & Status (COMPLETED | REVIEW_REQUIRED | FAILED)
 *   ↓
 * Structured Result Schema
 */

export * from './types';
export * from './preprocessor';
export * from './ocr-service';
export * from './math-parser';
export * from './math-evaluator';

import { ImagePreprocessor } from './preprocessor';
import { MathOCRService } from './ocr-service';
import { MathParser } from './math-parser';
import { MathEvaluator } from './math-evaluator';
import {
  MathItemDefinition,
  MathOCRResult,
  PreprocessedImage,
  PreprocessingOptions,
} from './types';

export class MathematicsOCRPipeline {
  /**
   * Processes a single handwritten math item end-to-end.
   */
  public static async processItem(
    item: MathItemDefinition,
    input: PreprocessedImage | string | { width: number; height: number; pixels: Uint8Array | number[] },
    options: PreprocessingOptions = {}
  ): Promise<MathOCRResult> {
    try {
      let ocrInput: PreprocessedImage | string;

      // 1. Preprocessing Stage (if raw pixels provided)
      if (typeof input === 'object' && 'pixels' in input) {
        ocrInput = ImagePreprocessor.preprocess(
          input.width,
          input.height,
          input.pixels,
          options
        );
      } else {
        ocrInput = input;
      }

      // 2. OCR Recognition Stage
      const ocrOutput = await MathOCRService.scan(ocrInput);

      // 3. Mathematical Parser Stage
      const parsed = MathParser.parse(ocrOutput.rawText);

      // 4. Mathematical Evaluator & Error Classification Stage
      const result = MathEvaluator.evaluate(item, ocrOutput, parsed);

      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        question_id: item.question_id,
        skill: item.skill,
        student_response: null,
        expected_answer: item.expected_answer,
        is_correct: false,
        score: 0,
        ocr_confidence: 0.0,
        evaluation_confidence: 0.0,
        error_type: 'unsupported_expression',
        status: 'FAILED',
        notes: `Pipeline processing error: ${errorMessage}`,
      };
    }
  }

  /**
   * Processes an entire assessment worksheet batch.
   */
  public static async processWorksheet(
    items: MathItemDefinition[],
    inputs: Array<PreprocessedImage | string | { width: number; height: number; pixels: Uint8Array | number[] }>,
    options: PreprocessingOptions = {}
  ): Promise<MathOCRResult[]> {
    const results: MathOCRResult[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const input = inputs[i] ?? '';
      const res = await this.processItem(item, input, options);
      results.push(res);
    }
    return results;
  }
}
