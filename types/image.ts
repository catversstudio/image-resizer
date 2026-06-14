// Image-specific types

export interface ImageFile {
  file: File;
  preview: string;
  dimensions: {
    width: number;
    height: number;
  };
  size: number;
  format: string;
  name: string;
}

export interface ResizeOptions {
  width?: number;
  height?: number;
  percentage?: number;
  maintainAspectRatio: boolean;
  mode: 'stretch' | 'fit' | 'fill';
}

export interface CropOptions {
  type: 'free' | 'square' | 'circle' | 'passport' | 'aadhaar' | 'signature' | 'instagram' | 'facebook' | 'linkedin' | 'custom';
  aspectRatio?: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CompressionOptions {
  level: 'low' | 'medium' | 'high' | 'smart' | 'lossless';
  targetSize?: number; // in KB
  quality?: number; // 0-100
}

export interface EnhancementOptions {
  brightness: number; // -100 to 100
  contrast: number; // -100 to 100
  saturation: number; // -100 to 100
  sharpness: number; // 0 to 100
  blur: number; // 0 to 100
}

export interface WatermarkOptions {
  type: 'text' | 'image';
  content: string | File;
  opacity: number; // 0-1
  position: 'tl' | 'tr' | 'bl' | 'br' | 'center';
  rotation: number; // in degrees
  scale: number; // 0.1 to 2
}

export interface MetadataInfo {
  make?: string;
  model?: string;
  orientation?: number;
  dateTime?: string;
  latitude?: number;
  longitude?: number;
  software?: string;
  [key: string]: any;
}
