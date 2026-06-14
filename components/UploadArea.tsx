import React, { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateImageFile } from '@/lib/validators';
import { MAX_FILE_SIZE } from '@/lib/constants';

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
  multiple?: boolean;
  disabled?: boolean;
}

export const UploadArea: React.FC<UploadAreaProps> = ({
  onFilesSelected,
  multiple = false,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    },
    [disabled]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.currentTarget.files || []);
      processFiles(files);
    },
    []
  );

  const processFiles = (files: File[]) => {
    const filesToAdd: File[] = [];

    for (const file of files) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast.error(validation.error || 'Invalid file');
        continue;
      }
      filesToAdd.push(file);
    }

    if (filesToAdd.length === 0) return;

    if (!multiple && filesToAdd.length > 0) {
      setSelectedFiles([filesToAdd[0]]);
      onFilesSelected([filesToAdd[0]]);
    } else {
      setSelectedFiles((prev) => [...prev, ...filesToAdd]);
      onFilesSelected([...selectedFiles, ...filesToAdd]);
    }

    toast.success(`${filesToAdd.length} file(s) selected`);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`dropzone ${
          isDragging ? 'active' : ''
        } ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <Upload className="w-12 h-12 text-primary dark:text-secondary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Drop your image here</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            or click to browse from your device
          </p>
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileInput}
            disabled={disabled}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="btn btn-primary cursor-pointer"
          >
            Select Images
          </label>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
            Max file size: {MAX_FILE_SIZE / 1024 / 1024}MB
          </p>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-3">Selected Files ({selectedFiles.length})</h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-blue-50 dark:bg-slate-700 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm truncate">{file.name}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;