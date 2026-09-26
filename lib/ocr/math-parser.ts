/**
 * PRAGYA AI — Mathematical Parser
 * Owner: Intelligence Layer (Abhay)
 * 
 * Capabilities:
 * 1. Identifies mathematical expressions and arithmetic operators (+, -, *, /).
 * 2. Extracts question numbers from worksheet prefixes (e.g. "Q3.", "3)", "Question 3:").
 * 3. Extracts student answers (from "= X", "Ans: X", or isolated digits).
 * 4. Cleans OCR-specific typographical confusions (e.g. 'O' -> '0', 'l' -> '1', '−' -> '-').
 */

import { ParsedMathExpression, SupportedOperation } from './types';

export class MathParser {
  /**
   * Main parsing entrypoint.
   */
  public static parse(rawInput: string): ParsedMathExpression {
    if (!rawInput || typeof rawInput !== 'string') {
      return {
        rawInput: '',
        questionNumber: null,
        extractedAnswer: null,
        detectedOperator: null,
        operandA: null,
        operandB: null,
        cleanExpression: '',
        isAmbiguous: true,
        syntaxValid: false,
      };
    }

    const trimmed = rawInput.trim();
    if (trimmed === '') {
      return {
        rawInput,
        questionNumber: null,
        extractedAnswer: null,
        detectedOperator: null,
        operandA: null,
        operandB: null,
        cleanExpression: '',
        isAmbiguous: false,
        syntaxValid: false,
      };
    }

    // 1. Detect ambiguity markers (excluding multiplication sign '*')
    const hasAmbiguousChars = /[?~_#%]/.test(trimmed);

    // 2. Extract Question Number if present
    let questionNumber: number | null = null;
    let textWithoutQNum = trimmed;

    const qNumRegex = /^(?:q(?:uestion)?\.?\s*(\d+)[:.)\s]|(\d+)[:.)]\s+)/i;
    const qMatch = trimmed.match(qNumRegex);
    if (qMatch) {
      questionNumber = parseInt(qMatch[1] || qMatch[2], 10);
      textWithoutQNum = trimmed.replace(qNumRegex, '').trim();
    }

    // 3. Normalize Unicode & OCR character confusions
    const cleanedText = this.normalizeCharacters(textWithoutQNum);

    // 4. Identify Answer & Equation structure
    let extractedAnswer: number | null = null;
    let detectedOperator: SupportedOperation | null = null;
    let operandA: number | null = null;
    let operandB: number | null = null;
    let syntaxValid = true;

    // Check for Equation with equals sign: e.g. "83 - 47 = 46"
    if (cleanedText.includes('=')) {
      const parts = cleanedText.split('=');
      const lhs = parts[0].trim();
      const rhs = parts.slice(1).join('=').trim();

      // Right-hand side is the student's answer
      extractedAnswer = this.parseNumericValue(rhs);

      // Left-hand side is the equation prompt: "A [op] B"
      const exprMatch = this.parseEquationLHS(lhs);
      if (exprMatch) {
        operandA = exprMatch.operandA;
        operandB = exprMatch.operandB;
        detectedOperator = exprMatch.operator;
      }
    } else {
      // Check if it's "Ans: 46" or just an isolated number "46"
      const ansPrefixMatch = cleanedText.match(/^(?:ans(?:wer)?[:\s]*)?(-?\d+(?:\.\d+)?)/i);
      if (ansPrefixMatch) {
        extractedAnswer = parseFloat(ansPrefixMatch[1]);
      } else {
        // Maybe it's an equation without equals sign e.g. "83 - 47"
        const exprMatch = this.parseEquationLHS(cleanedText);
        if (exprMatch) {
          operandA = exprMatch.operandA;
          operandB = exprMatch.operandB;
          detectedOperator = exprMatch.operator;
        } else {
          // Fallback numeric extraction
          const fallbackNum = cleanedText.match(/-?\d+/);
          if (fallbackNum) {
            extractedAnswer = parseInt(fallbackNum[0], 10);
          } else {
            syntaxValid = false;
          }
        }
      }
    }

    // Double check for malformed mathematical syntax (e.g. "++", "+-", "/0")
    if (/(\+\+|--|\*\*|\/\/)/.test(cleanedText)) {
      syntaxValid = false;
    }

    return {
      rawInput,
      questionNumber,
      extractedAnswer,
      detectedOperator,
      operandA,
      operandB,
      cleanExpression: cleanedText,
      isAmbiguous: hasAmbiguousChars,
      syntaxValid,
    };
  }

  /**
   * Cleans OCR substitutions and unicode mathematical signs.
   */
  public static normalizeCharacters(text: string): string {
    return text
      // Minus / Subtraction variants
      .replace(/[\u2212\u2013\u2014\u2015\uFE63\uFF0D]/g, '-')
      // Multiplication variants
      .replace(/[\u00D7\u2715\u2716]/g, '*')
      // Division variants
      .replace(/[\u00F7\u2215]/g, '/')
      // Equals variants
      .replace(/[\uFE66\uFF1D]/g, '=')
      // OCR letter-digit confusions in numeric expressions
      // (e.g., "8O - 47" -> "80 - 47", "l3 - 7" -> "13 - 7")
      .replace(/(\d)[oO]/g, '$10')
      .replace(/[oO](\d)/g, '0$1')
      .replace(/(?:^|\s)[lI](\d)/g, ' 1$1')
      .replace(/(\d)[lI](?:\s|$)/g, '$11 ')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Parses LHS of an equation like "83 - 47" into operands and operator.
   */
  private static parseEquationLHS(lhs: string): {
    operandA: number;
    operandB: number;
    operator: SupportedOperation;
  } | null {
    // Regex matching: (number) (operator) (number)
    const match = lhs.match(/(-?\d+(?:\.\d+)?)\s*([+\-*xX/÷])\s*(-?\d+(?:\.\d+)?)/);
    if (!match) return null;

    const operandA = parseFloat(match[1]);
    const rawOp = match[2];
    const operandB = parseFloat(match[3]);

    let operator: SupportedOperation = 'addition';
    if (rawOp === '-' || rawOp === '−') operator = 'subtraction';
    else if (rawOp === '*' || rawOp === 'x' || rawOp === 'X' || rawOp === '×') operator = 'multiplication';
    else if (rawOp === '/' || rawOp === '÷') operator = 'division';

    return { operandA, operandB, operator };
  }

  /**
   * Extracts clean numeric value or returns null.
   */
  private static parseNumericValue(text: string): number | null {
    const cleaned = text.replace(/[^0-9.-]/g, '');
    if (cleaned === '' || cleaned === '-' || cleaned === '.') return null;
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
  }
}
