import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, Image as ImageIcon, Sliders, CheckCircle, Shield } from 'lucide-react';

export const ImageCompressorTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp'>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, or WebP).');
      return;
    }
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    const url = URL.createObjectURL(selectedFile);
    setOriginalUrl(url);
  };

  // Re-compress when file, quality, format, or maxWidth changes
  useEffect(() => {
    if (!file || !originalUrl) return;

    let isMounted = true;
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = originalUrl;

    img.onload = () => {
      if (!isMounted) return;

      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // Scale if exceeds maxWidth
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        blob => {
          if (!isMounted) return;
          if (blob) {
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            const newUrl = URL.createObjectURL(blob);
            setCompressedUrl(newUrl);
            setCompressedSize(blob.size);
          }
          setIsProcessing(false);
        },
        format,
        quality / 100
      );
    };

    return () => {
      isMounted = false;
    };
  }, [file, originalUrl, quality, maxWidth, format]);

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setFile(null);
    setOriginalUrl(null);
    setCompressedUrl(null);
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownload = () => {
    if (!compressedUrl || !file) return;
    const link = document.createElement('a');
    link.href = compressedUrl;
    const extension = format === 'image/webp' ? 'webp' : 'jpg';
    const originalName = file.name.replace(/\.[^/.]+$/, '');
    link.download = `${originalName}-compressed.${extension}`;
    link.click();
  };

  const savingsPercent =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  return (
    <div className="space-y-6">
      {/* Upload Dropzone if no file selected */}
      {!file ? (
        <div
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-900/40"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            Click to upload or drag &amp; drop an image
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Supports JPG, PNG, and WebP up to 50MB. Processed 100% locally in your browser.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Never uploaded to any server</span>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Compression Results Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500">Original Size</span>
              <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                {formatFileSize(originalSize)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
              <span className="text-xs text-emerald-700 dark:text-emerald-300">Compressed Size</span>
              <div className="text-lg sm:text-xl font-bold text-emerald-950 dark:text-emerald-200 mt-1">
                {isProcessing ? 'Compressing...' : formatFileSize(compressedSize)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
              <span className="text-xs text-blue-700 dark:text-blue-300">Total Savings</span>
              <div className="text-lg sm:text-xl font-bold text-blue-950 dark:text-blue-200 mt-1">
                {savingsPercent}% Saved
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
              <span className="text-xs text-indigo-700 dark:text-indigo-300">Target Format</span>
              <div className="text-lg sm:text-xl font-bold text-indigo-950 dark:text-indigo-200 mt-1">
                {format === 'image/webp' ? 'WebP' : 'JPEG'}
              </div>
            </div>
          </div>

          {/* Controls: Quality Slider & Options */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Compression Settings
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500">Output Format:</span>
                <button
                  type="button"
                  onClick={() => setFormat('image/jpeg')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    format === 'image/jpeg'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  JPEG
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('image/webp')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    format === 'image/webp'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  WebP (Smaller)
                </button>
              </div>
            </div>

            {/* Quality Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Compression Quality: <strong>{quality}%</strong>
                </span>
                <span className="text-slate-500">
                  {quality > 85 ? 'High Quality' : quality > 65 ? 'Balanced (Recommended)' : 'Maximum Compression'}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={95}
                value={quality}
                onChange={e => setQuality(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Image Previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-950 flex flex-col">
              <div className="p-2.5 bg-slate-200/60 dark:bg-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Original Image</span>
                <span>{formatFileSize(originalSize)}</span>
              </div>
              <div className="p-4 flex items-center justify-center min-h-[220px]">
                {originalUrl && (
                  <img
                    src={originalUrl}
                    alt="Original Upload"
                    className="max-h-64 max-w-full object-contain rounded-lg shadow-sm"
                  />
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-950 flex flex-col">
              <div className="p-2.5 bg-slate-200/60 dark:bg-slate-800/80 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex justify-between">
                <span>Compressed Preview</span>
                <span>{formatFileSize(compressedSize)}</span>
              </div>
              <div className="p-4 flex items-center justify-center min-h-[220px]">
                {compressedUrl && (
                  <img
                    src={compressedUrl}
                    alt="Compressed Preview"
                    className="max-h-64 max-w-full object-contain rounded-lg shadow-sm"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                disabled={!compressedUrl || isProcessing}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Compressed Image</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            <span className="text-xs text-slate-400">
              {file.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
