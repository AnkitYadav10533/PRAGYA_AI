/**
 * PRAGYA AI — Image Preprocessor for Handwritten Mathematics
 * Owner: Intelligence Layer (Abhay)
 * 
 * Capabilities:
 * 1. Grayscale & Luminance extraction.
 * 2. Contrast enhancement via adaptive linear stretching.
 * 3. 3x3 Median Denoising (preserves pencil strokes and mathematical symbols).
 * 4. Binarization with stroke preservation.
 * 5. Margin auto-cropping.
 * Pure TypeScript — runs reliably in Node.js and Browser with zero native dependencies.
 */

import { PreprocessedImage, PreprocessingOptions } from './types';

export class ImagePreprocessor {
  /**
   * Preprocesses raw grayscale pixel data or synthetic matrix.
   */
  public static preprocess(
    width: number,
    height: number,
    pixels: Uint8Array | number[],
    options: PreprocessingOptions = {}
  ): PreprocessedImage {
    const applied: string[] = [];
    let currentPixels: Uint8Array = new Uint8Array(pixels);
    let currentWidth = width;
    let currentHeight = height;

    // 1. Contrast Enhancement
    if (options.contrastStretch !== false) {
      currentPixels = this.enhanceContrast(currentPixels);
      applied.push('contrast_stretch');
    }

    // 2. Denoising (Median Filter to preserve fine lines like '-' and '+')
    if (options.denoise !== false && currentWidth >= 3 && currentHeight >= 3) {
      currentPixels = this.denoiseMedian3x3(currentWidth, currentHeight, currentPixels);
      applied.push('denoise_median_3x3');
    }

    // 3. Auto-crop active handwriting region
    if (options.cropPadding !== undefined && options.cropPadding >= 0) {
      const cropped = this.cropBoundingBox(currentWidth, currentHeight, currentPixels, options.cropPadding);
      currentWidth = cropped.width;
      currentHeight = cropped.height;
      currentPixels = cropped.pixels;
      applied.push(`crop_bbox_padding_${options.cropPadding}`);
    }

    // 4. Binarization (preserve mathematical symbols)
    if (options.binarize) {
      currentPixels = this.binarizeOtsu(currentPixels);
      applied.push('binarize_otsu');
    }

    return {
      width: currentWidth,
      height: currentHeight,
      data: currentPixels,
      preprocessingApplied: applied,
    };
  }

  /**
   * Enhances contrast by clipping 2% darkest and 2% brightest pixels,
   * then stretching the dynamic range to [0, 255].
   */
  public static enhanceContrast(pixels: Uint8Array): Uint8Array {
    const output = new Uint8Array(pixels.length);
    const histogram = new Array(256).fill(0);

    for (let i = 0; i < pixels.length; i++) {
      histogram[pixels[i]]++;
    }

    // Find 2% low and 98% high quantiles
    const total = pixels.length;
    let lowBound = 0;
    let highBound = 255;
    let acc = 0;

    for (let i = 0; i < 256; i++) {
      acc += histogram[i];
      if (acc >= total * 0.02 && lowBound === 0) {
        lowBound = i;
      }
      if (acc >= total * 0.98) {
        highBound = i;
        break;
      }
    }

    if (highBound <= lowBound) {
      highBound = 255;
      lowBound = 0;
    }

    const range = highBound - lowBound;
    for (let i = 0; i < pixels.length; i++) {
      const p = pixels[i];
      if (p <= lowBound) output[i] = 0;
      else if (p >= highBound) output[i] = 255;
      else output[i] = Math.round(((p - lowBound) / range) * 255);
    }

    return output;
  }

  /**
   * 3x3 Median filter: effectively eliminates salt-and-pepper scan noise
   * while keeping edges and thin pencil marks (e.g. subtraction signs) intact.
   */
  public static denoiseMedian3x3(
    width: number,
    height: number,
    pixels: Uint8Array
  ): Uint8Array {
    const output = new Uint8Array(pixels.length);
    const window = new Uint8Array(9);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let k = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            window[k++] = pixels[(y + dy) * width + (x + dx)];
          }
        }
        window.sort();
        output[y * width + x] = window[4]; // median value
      }
    }

    // Copy borders
    for (let x = 0; x < width; x++) {
      output[x] = pixels[x];
      output[(height - 1) * width + x] = pixels[(height - 1) * width + x];
    }
    for (let y = 0; y < height; y++) {
      output[y * width] = pixels[y * width];
      output[y * width + (width - 1)] = pixels[y * width + (width - 1)];
    }

    return output;
  }

  /**
   * Otsu's Global Thresholding algorithm for adaptive binarization.
   */
  public static binarizeOtsu(pixels: Uint8Array): Uint8Array {
    const histogram = new Array(256).fill(0);
    for (let i = 0; i < pixels.length; i++) {
      histogram[pixels[i]]++;
    }

    const total = pixels.length;
    let sum = 0;
    for (let t = 0; t < 256; t++) sum += t * histogram[t];

    let sumB = 0;
    let weightB = 0;
    let maxVariance = 0;
    let threshold = 128;

    for (let t = 0; t < 256; t++) {
      weightB += histogram[t];
      if (weightB === 0) continue;
      const weightF = total - weightB;
      if (weightF === 0) break;

      sumB += t * histogram[t];
      const meanB = sumB / weightB;
      const meanF = (sum - sumB) / weightF;

      const variance = weightB * weightF * Math.pow(meanB - meanF, 2);
      if (variance > maxVariance) {
        maxVariance = variance;
        threshold = t;
      }
    }

    const output = new Uint8Array(pixels.length);
    for (let i = 0; i < pixels.length; i++) {
      output[i] = pixels[i] < threshold ? 0 : 255;
    }
    return output;
  }

  /**
   * Identifies ink bounding box and crops excessive white margins.
   */
  public static cropBoundingBox(
    width: number,
    height: number,
    pixels: Uint8Array,
    padding: number = 4
  ): { width: number; height: number; pixels: Uint8Array } {
    let minX = width, minY = height, maxX = 0, maxY = 0;
    let hasInk = false;

    // Ink is typically darker than paper background (< 200 in 0-255 scale)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (pixels[y * width + x] < 200) {
          hasInk = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!hasInk) {
      return { width, height, pixels };
    }

    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(width - 1, maxX + padding);
    maxY = Math.min(height - 1, maxY + padding);

    const croppedWidth = maxX - minX + 1;
    const croppedHeight = maxY - minY + 1;
    const croppedPixels = new Uint8Array(croppedWidth * croppedHeight);

    for (let y = 0; y < croppedHeight; y++) {
      for (let x = 0; x < croppedWidth; x++) {
        croppedPixels[y * croppedWidth + x] = pixels[(minY + y) * width + (minX + x)];
      }
    }

    return {
      width: croppedWidth,
      height: croppedHeight,
      pixels: croppedPixels,
    };
  }

  /**
   * Helper to parse an ASCII or binary matrix for rapid unit testing.
   */
  public static fromAsciiArt(art: string[]): { width: number; height: number; pixels: Uint8Array } {
    const height = art.length;
    const width = Math.max(...art.map((l) => l.length));
    const pixels = new Uint8Array(width * height);

    for (let y = 0; y < height; y++) {
      const line = art[y];
      for (let x = 0; x < width; x++) {
        const char = line[x] ?? ' ';
        // '#' is ink (black, 0), ' ' is paper (white, 255)
        pixels[y * width + x] = char === '#' ? 0 : char === '.' ? 128 : 255;
      }
    }

    return { width, height, pixels };
  }
}
