// Input validation functions

import { SUPPORTED_FORMATS, MAX_FILE_SIZE, MAX_BATCH_SIZE } from './constants';

/**
 * Validate image file
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!SUPPORTED_FORMATS.includes(file.type)) {
    return { valid: false, error: `Unsupported file format: ${file.type}` };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` };
  }

  return { valid: true };
};

/**
 * Validate batch upload
 */
export const validateBatchUpload = (
  files: File[]
): { valid: boolean; error?: string } => {
  if (!files || files.length === 0) {
    return { valid: false, error: 'No files provided' };
  }

  if (files.length > MAX_BATCH_SIZE) {
    return { valid: false, error: `Cannot upload more than ${MAX_BATCH_SIZE} files` };
  }

  let totalSize = 0;
  for (const file of files) {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return validation;
    }
    totalSize += file.size;
  }

  if (totalSize > 500 * 1024 * 1024) {
    return { valid: false, error: 'Total batch size exceeds 500MB limit' };
  }

  return { valid: true };
};

/**
 * Validate dimensions
 */
export const validateDimensions = (
  width: number,
  height: number
): { valid: boolean; error?: string } => {
  if (width <= 0 || height <= 0) {
    return { valid: false, error: 'Dimensions must be positive numbers' };
  }

  if (width > 10000 || height > 10000) {
    return { valid: false, error: 'Dimensions cannot exceed 10000px' };
  }

  return { valid: true };
};

/**
 * Validate crop area
 */
export const validateCropArea = (
  x: number,
  y: number,
  width: number,
  height: number,
  imageWidth: number,
  imageHeight: number
): { valid: boolean; error?: string } => {
  if (x < 0 || y < 0) {
    return { valid: false, error: 'Crop position cannot be negative' };
  }

  if (width <= 0 || height <= 0) {
    return { valid: false, error: 'Crop dimensions must be positive' };
  }

  if (x + width > imageWidth || y + height > imageHeight) {
    return { valid: false, error: 'Crop area exceeds image boundaries' };
  }

  return { valid: true };
};

/**
 * Sanitize filename
 */
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .substring(0, 255);
};

/**
 * Validate quality value
 */
export const validateQuality = (quality: number): { valid: boolean; error?: string } => {
  if (quality < 0 || quality > 100) {
    return { valid: false, error: 'Quality must be between 0 and 100' };
  }

  return { valid: true };
};
