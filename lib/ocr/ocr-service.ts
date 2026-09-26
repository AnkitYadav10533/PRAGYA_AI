/**
 * PRAGYA AI — OCR Service Abstraction
 * Owner: Intelligence Layer (Abhay)
 * 
 * Abstraction layer decoupling OCR recognition engines from evaluation logic.
 * Supports swappable providers (Mock, Local Heuristic, Cloud Vision, etc.).
 * Rule: Never treats OCR uncertainty as student error.
 */

import { MathOCRProvider, PreprocessedImage, RawOCROutput } from './types';

export class MockMathOCRProvider implements MathOCRProvider {
  public readonly providerName = 'mock_mathematics_ocr';

  private cannedResponses: Map<string, { text: string; confidence: number }> = new Map();

  constructor(initialData?: Record<string, { text: string; confidence: number }>) {
    if (initialData) {
      Object.entries(initialData).forEach(([k, v]) => this.cannedResponses.set(k, v));
    }
  }

  public setResponse(key: string, text: string, confidence: number = 0.95): void {
    this.cannedResponses.set(key, { text, confidence });
  }

  public async extractText(input: PreprocessedImage | string): Promise<RawOCROutput> {
    // If input is a direct test string
    if (typeof input === 'string') {
      const match = this.cannedResponses.get(input);
      if (match) {
        return {
          rawText: match.text,
          ocrConfidence: match.confidence,
          isAmbiguous: match.confidence < 0.6 || /[?~_#]/.test(match.text),
          providerName: this.providerName,
        };
      }

      // Default string fallback with confidence estimation
      const trimmed = input.trim();
      const hasAmbiguous = /[?~_#]/.test(trimmed);
      const isBlank = trimmed === '';
      const confidence = isBlank ? 0.0 : hasAmbiguous ? 0.35 : 0.92;

      return {
        rawText: trimmed,
        ocrConfidence: confidence,
        isAmbiguous: hasAmbiguous || confidence < 0.6,
        providerName: this.providerName,
      };
    }

    // If input is preprocessed image
    // In a mock environment without external ML server, analyze basic pixel density
    let inkCount = 0;
    for (let i = 0; i < input.data.length; i++) {
      if (input.data[i] < 128) inkCount++;
    }
    const inkDensity = inkCount / input.data.length;

    if (inkDensity < 0.01) {
      return {
        rawText: '',
        ocrConfidence: 0.0,
        isAmbiguous: true,
        providerName: this.providerName,
        metadata: { reason: 'blank_or_no_ink_detected' },
      };
    }

    // Default simulation for active image
    return {
      rawText: '46',
      ocrConfidence: 0.94,
      isAmbiguous: false,
      providerName: this.providerName,
      metadata: { inkDensity },
    };
  }
}

export class MathOCRService {
  private static providers: Map<string, MathOCRProvider> = new Map();
  private static activeProviderName: string = 'mock_mathematics_ocr';

  static {
    // Register default mock provider
    const defaultMock = new MockMathOCRProvider();
    this.registerProvider(defaultMock);
    this.activeProviderName = defaultMock.providerName;
  }

  public static registerProvider(provider: MathOCRProvider): void {
    this.providers.set(provider.providerName, provider);
  }

  public static setActiveProvider(name: string): void {
    if (!this.providers.has(name)) {
      throw new Error(`OCR Provider "${name}" is not registered.`);
    }
    this.activeProviderName = name;
  }

  public static getActiveProvider(): MathOCRProvider {
    const provider = this.providers.get(this.activeProviderName);
    if (!provider) {
      throw new Error(`No active OCR Provider configured.`);
    }
    return provider;
  }

  public static async scan(image: PreprocessedImage | string): Promise<RawOCROutput> {
    const provider = this.getActiveProvider();
    return await provider.extractText(image);
  }
}
