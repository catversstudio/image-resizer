// Download utility functions

/**
 * Download canvas as image
 */
export const downloadCanvas = (
  canvas: HTMLCanvasElement,
  filename: string,
  format: 'jpeg' | 'png' | 'webp' = 'jpeg',
  quality: number = 0.95
): void => {
  const mimeType = `image/${format}`;

  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${sanitizeFilename(filename)}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    mimeType,
    quality
  );
};

/**
 * Download multiple files as ZIP
 */
export const downloadAsZip = async (
  canvases: HTMLCanvasElement[],
  filenames: string[]
): Promise<void> => {
  try {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    for (let i = 0; i < canvases.length; i++) {
      const blob = await new Promise<Blob>((resolve) => {
        canvases[i].toBlob((b) => resolve(b || new Blob()), 'image/jpeg', 0.95);
      });
      zip.file(`${sanitizeFilename(filenames[i])}.jpg`, blob);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error creating ZIP:', error);
  }
};

/**
 * Download blob file
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Get file size in human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Sanitize filename
 */
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .replace(/^\s+|\s+$/g, '')
    .substring(0, 255);
};

/**
 * Generate filename with timestamp
 */
export const generateFilename = (prefix: string = 'image'): string => {
  const timestamp = new Date().getTime();
  return `${sanitizeFilename(prefix)}_${timestamp}`;
};

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

/**
 * Copy image to clipboard
 */
export const copyImageToClipboard = async (
  canvas: HTMLCanvasElement
): Promise<boolean> => {
  try {
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b || new Blob()), 'image/png');
    });

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob }),
    ]);
    return true;
  } catch (error) {
    console.error('Error copying image to clipboard:', error);
    return false;
  }
};

/**
 * Share image
 */
export const shareImage = async (canvas: HTMLCanvasElement, title: string): Promise<void> => {
  try {
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b || new Blob()), 'image/png');
    });

    const file = new File([blob], 'image.png', { type: 'image/png' });

    if (navigator.share) {
      await navigator.share({
        title,
        files: [file],
      });
    }
  } catch (error) {
    console.error('Error sharing image:', error);
  }
};