// Format utility functions

export const MIME_TO_EXTENSION: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/bmp': 'bmp',
  'image/tiff': 'tiff',
  'image/heic': 'heic',
  'image/avif': 'avif',
};

/**
 * Get file extension from MIME type
 */
export const getExtensionFromMime = (mimeType: string): string => {
  return MIME_TO_EXTENSION[mimeType] || 'jpg';
};

/**
 * Format bytes to human-readable size
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * Math.pow(10, dm)) / Math.pow(10, dm) + ' ' + sizes[i];
};

/**
 * Format image dimensions
 */
export const formatDimensions = (width: number, height: number): string => {
  return `${width}×${height}`;
};

/**
 * Calculate aspect ratio
 */
export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

/**
 * Format aspect ratio as string
 */
export const formatAspectRatio = (width: number, height: number): string => {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
};

/**
 * Calculate new dimensions maintaining aspect ratio
 */
export const calculateNewDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth?: number,
  maxHeight?: number
): { width: number; height: number } => {
  if (!maxWidth && !maxHeight) {
    return { width: originalWidth, height: originalHeight };
  }

  const aspectRatio = originalWidth / originalHeight;

  if (maxWidth && maxHeight) {
    const maxRatio = maxWidth / maxHeight;
    if (aspectRatio > maxRatio) {
      return {
        width: maxWidth,
        height: Math.round(maxWidth / aspectRatio),
      };
    } else {
      return {
        width: Math.round(maxHeight * aspectRatio),
        height: maxHeight,
      };
    }
  } else if (maxWidth) {
    return {
      width: maxWidth,
      height: Math.round(maxWidth / aspectRatio),
    };
  } else if (maxHeight) {
    return {
      width: Math.round(maxHeight * aspectRatio),
      height: maxHeight,
    };
  }

  return { width: originalWidth, height: originalHeight };
};

/**
 * Check if format is lossless
 */
export const isLosslessFormat = (format: string): boolean => {
  return ['png', 'gif', 'bmp', 'tiff'].includes(format.toLowerCase());
};

/**
 * Check if format supports transparency
 */
export const supportsTransparency = (format: string): boolean => {
  return ['png', 'gif', 'webp', 'heic'].includes(format.toLowerCase());
};

/**
 * Get format display name
 */
export const getFormatDisplayName = (format: string): string => {
  const names: Record<string, string> = {
    jpeg: 'JPEG',
    jpg: 'JPEG',
    png: 'PNG',
    webp: 'WebP',
    bmp: 'BMP',
    tiff: 'TIFF',
    heic: 'HEIC',
    avif: 'AVIF',
  };
  return names[format.toLowerCase()] || format.toUpperCase();
};