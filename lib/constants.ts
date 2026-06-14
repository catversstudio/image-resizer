// App constants

export const APP_NAME = 'Image Resizer';
export const APP_DESCRIPTION = 'Advanced AI Image Editing Platform for Government Applications';
export const APP_URL = 'https://image-resizer.vercel.app';

// File size limits (in bytes)
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_BATCH_SIZE = 100; // 100 images
export const MAX_BATCH_TOTAL_SIZE = 500 * 1024 * 1024; // 500MB

// Supported formats
export const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/bmp',
  'image/tiff',
  'image/heic',
  'image/avif',
];

export const EXPORT_FORMATS = [
  { value: 'jpeg', label: 'JPEG', mimeType: 'image/jpeg' },
  { value: 'png', label: 'PNG', mimeType: 'image/png' },
  { value: 'webp', label: 'WEBP', mimeType: 'image/webp' },
  { value: 'bmp', label: 'BMP', mimeType: 'image/bmp' },
  { value: 'tiff', label: 'TIFF', mimeType: 'image/tiff' },
];

// Common preset sizes
export const PRESET_SIZES = [
  { label: '10 KB', size: 10 },
  { label: '20 KB', size: 20 },
  { label: '30 KB', size: 30 },
  { label: '50 KB', size: 50 },
  { label: '100 KB', size: 100 },
  { label: '200 KB', size: 200 },
  { label: '500 KB', size: 500 },
];

export const PRESET_PIXELS = [
  { label: '100×100', width: 100, height: 100 },
  { label: '200×200', width: 200, height: 200 },
  { label: '300×300', width: 300, height: 300 },
  { label: '600×600', width: 600, height: 600 },
  { label: '1200×1200', width: 1200, height: 1200 },
];

export const COMPRESSION_LEVELS = {
  low: { quality: 95, description: 'Best quality, larger file' },
  medium: { quality: 85, description: 'Good quality, moderate file' },
  high: { quality: 70, description: 'Good balance' },
  smart: { quality: 'auto', description: 'AI-optimized' },
  lossless: { quality: 100, description: 'No quality loss' },
};

export const COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Gray', value: '#808080' },
  { name: 'Transparent', value: 'transparent' },
];

export const CROP_PRESETS = [
  { name: 'Free', ratio: null },
  { name: 'Square', ratio: 1 },
  { name: '3:2', ratio: 1.5 },
  { name: '4:3', ratio: 1.333 },
  { name: '16:9', ratio: 1.777 },
  { name: 'Instagram', ratio: 1 },
  { name: 'Facebook', ratio: 1.91 },
  { name: 'LinkedIn', ratio: 1.5 },
];

export const FILTERS = [
  { name: 'None', key: 'none' },
  { name: 'Black & White', key: 'bw' },
  { name: 'Sepia', key: 'sepia' },
  { name: 'Vintage', key: 'vintage' },
  { name: 'Grayscale', key: 'grayscale' },
  { name: 'Cool', key: 'cool' },
  { name: 'Warm', key: 'warm' },
];

export const WATERMARK_POSITIONS = [
  { name: 'Top Left', value: 'tl' },
  { name: 'Top Right', value: 'tr' },
  { name: 'Bottom Left', value: 'bl' },
  { name: 'Bottom Right', value: 'br' },
  { name: 'Center', value: 'center' },
];

export const TOAST_DURATION = 3000;
