// Core image processing functions

import { ImageDimensions, ProcessingOptions } from '@/types';
import { ResizeOptions, CropOptions, CompressionOptions, EnhancementOptions, WatermarkOptions } from '@/types/image';

/**
 * Draw image on canvas
 */
export const drawImageOnCanvas = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
): void => {
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
};

/**
 * Resize image
 */
export const resizeImage = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  options: ResizeOptions
): { width: number; height: number } => {
  let width = img.width;
  let height = img.height;

  if (options.percentage) {
    width = Math.round(width * (options.percentage / 100));
    height = Math.round(height * (options.percentage / 100));
  } else if (options.width && options.height) {
    if (options.mode === 'fit') {
      const ratio = Math.min(options.width / width, options.height / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    } else if (options.mode === 'fill') {
      const ratio = Math.max(options.width / width, options.height / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    } else if (options.maintainAspectRatio) {
      const ratio = options.width / width;
      width = options.width;
      height = Math.round(height * ratio);
    } else {
      width = options.width;
      height = options.height;
    }
  } else if (options.width && options.maintainAspectRatio) {
    const ratio = options.width / width;
    width = options.width;
    height = Math.round(height * ratio);
  } else if (options.height && options.maintainAspectRatio) {
    const ratio = options.height / height;
    height = options.height;
    width = Math.round(width * ratio);
  }

  canvas.width = width;
  canvas.height = height;
  drawImageOnCanvas(ctx, img, width, height);

  return { width, height };
};

/**
 * Crop image
 */
export const cropImage = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  options: CropOptions
): HTMLCanvasElement => {
  const newCanvas = document.createElement('canvas');
  const newCtx = newCanvas.getContext('2d');
  if (!newCtx) throw new Error('Failed to get canvas context');

  newCanvas.width = options.width;
  newCanvas.height = options.height;

  newCtx.drawImage(
    canvas,
    options.x,
    options.y,
    options.width,
    options.height,
    0,
    0,
    options.width,
    options.height
  );

  return newCanvas;
};

/**
 * Compress image
 */
export const compressImage = (
  canvas: HTMLCanvasElement,
  options: CompressionOptions
): Blob => {
  const qualityMap = {
    low: 0.95,
    medium: 0.85,
    high: 0.7,
    smart: 0.8,
    lossless: 1.0,
  };

  const quality = options.quality ?? (qualityMap[options.level] || 0.8);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    }, 'image/jpeg', quality);
  }) as any;
};

/**
 * Apply brightness adjustment
 */
export const adjustBrightness = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  brightness: number
): void => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, data[i] + brightness));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + brightness));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + brightness));
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Apply contrast adjustment
 */
export const adjustContrast = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  contrast: number
): void => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
    data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
    data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Apply saturation adjustment
 */
export const adjustSaturation = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  saturation: number
): void => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const factor = saturation / 100;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    if (max === min) {
      data[i] = data[i + 1] = data[i + 2] = l;
    } else {
      const s = l < 128 ? (max - min) / (max + min) : (max - min) / (510 - max - min);
      const c = (1 - Math.abs(2 * l / 255 - 1)) * s;

      let newR = r + (r - l) * factor;
      let newG = g + (g - l) * factor;
      let newB = b + (b - l) * factor;

      data[i] = Math.min(255, Math.max(0, newR));
      data[i + 1] = Math.min(255, Math.max(0, newG));
      data[i + 2] = Math.min(255, Math.max(0, newB));
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Apply sharpness filter
 */
export const applySharpness = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  amount: number
): void => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;

  // Simplified sharpness kernel
  const kernel = [-1, -1, -1, -1, 9, -1, -1, -1, -1];
  const factor = amount / 100;

  for (let i = 0; i < data.length; i += 4) {
    if (i % (width * 4) < 4 || i % (width * 4) > width * 4 - 8) continue;

    let r = 0, g = 0, b = 0;
    for (let j = 0; j < 9; j++) {
      const idx = i + (Math.floor(j / 3) - 1) * width * 4 + (j % 3 - 1) * 4;
      r += data[idx] * kernel[j];
      g += data[idx + 1] * kernel[j];
      b += data[idx + 2] * kernel[j];
    }

    data[i] = Math.min(255, Math.max(0, data[i] + r * factor));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + g * factor));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + b * factor));
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Apply filter (grayscale, sepia, etc.)
 */
export const applyFilter = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  filter: string
): void => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    switch (filter) {
      case 'grayscale':
      case 'bw':
        const gray = r * 0.299 + g * 0.587 + b * 0.114;
        data[i] = data[i + 1] = data[i + 2] = gray;
        break;
      case 'sepia':
        data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        break;
      case 'cool':
        data[i] = Math.max(0, r - 30);
        data[i + 2] = Math.min(255, b + 30);
        break;
      case 'warm':
        data[i] = Math.min(255, r + 30);
        data[i + 2] = Math.max(0, b - 30);
        break;
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Rotate image
 */
export const rotateImage = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  degrees: number
): void => {
  const radians = (degrees * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const newWidth = Math.abs(canvas.width * cos) + Math.abs(canvas.height * sin);
  const newHeight = Math.abs(canvas.width * sin) + Math.abs(canvas.height * cos);

  const newCanvas = document.createElement('canvas');
  newCanvas.width = newWidth;
  newCanvas.height = newHeight;
  const newCtx = newCanvas.getContext('2d');
  if (!newCtx) return;

  newCtx.translate(newWidth / 2, newHeight / 2);
  newCtx.rotate(radians);
  newCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

  canvas.width = newWidth;
  canvas.height = newHeight;
  ctx.drawImage(newCanvas, 0, 0);
};

/**
 * Flip image horizontally or vertically
 */
export const flipImage = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  direction: 'horizontal' | 'vertical'
): void => {
  if (direction === 'horizontal') {
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, -canvas.width, 0);
  } else {
    ctx.scale(1, -1);
    ctx.drawImage(canvas, 0, -canvas.height);
  }
};

/**
 * Convert image to specific file size
 */
export const convertToFileSize = async (
  canvas: HTMLCanvasElement,
  targetSize: number
): Promise<Blob> => {
  let quality = 0.8;
  let blob: Blob | null = null;
  const targetSizeBytes = targetSize * 1024;

  // Binary search for optimal quality
  let low = 0.1;
  let high = 1.0;
  let iterations = 0;
  const maxIterations = 10;

  while (iterations < maxIterations) {
    blob = await new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b || new Blob()), 'image/jpeg', quality);
    });

    if (blob.size <= targetSizeBytes) {
      low = quality;
    } else {
      high = quality;
    }

    quality = (low + high) / 2;
    iterations++;
  }

  return blob || new Blob();
};

/**
 * Remove background and replace with color
 */
export const removeBackground = async (
  canvas: HTMLCanvasElement,
  bgColor: string
): Promise<HTMLCanvasElement> => {
  const newCanvas = document.createElement('canvas');
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;
  const ctx = newCanvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
  ctx.drawImage(canvas, 0, 0);

  return newCanvas;
};
