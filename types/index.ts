// Global type definitions

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EditHistory {
  state: ImageState;
  timestamp: number;
}

export interface ImageState {
  src: string;
  width: number;
  height: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  brightness: number;
  contrast: number;
  saturation: number;
  sharpness: number;
}

export interface ProcessingOptions {
  format: 'jpeg' | 'png' | 'webp' | 'bmp' | 'tiff' | 'heic' | 'avif';
  quality: number;
  width?: number;
  height?: number;
  targetSize?: number; // in KB
}

export interface UploadResponse {
  success: boolean;
  data?: {
    url: string;
    size: number;
    dimensions: ImageDimensions;
    format: string;
  };
  error?: string;
}
