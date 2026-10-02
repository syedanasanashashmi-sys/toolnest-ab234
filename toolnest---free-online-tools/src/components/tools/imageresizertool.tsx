import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, Lock, Unlock, Sliders, Image as ImageIcon } from 'lucide-react';

export const ImageResizerTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');
  const [resizedBlobUrl, setResizedBlobUrl] = useState<string | null>(null);
  const [resizedSize, setResizedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const presets = [
    { label: 'YouTube Thumbnail', w: 1280, h: 720 },
    { label: 'Instagram Square', w: 1080, h: 1080 },
    { label: 'Instagram Story', w: 1080, h: 1920 },
    { label: 'Twitter/X Header', w: 1500, h: 500 },
    { label: 'Facebook Cover', w: 820, h: 312 },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setTargetWidth(img.naturalWidth);
      setTargetHeight(img.naturalHeight);
    };
  };

  const handleWidthChange = (w: number) => {
    setTargetWidth(w);
    if (lockAspect && originalWidth > 0) {
      setTargetHeight(Math.round((w / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (h: number) => {
    setTargetHeight(h);
    if (lockAspect && originalHeight > 0) {
      setTargetWidth(Math.round((h / originalHeight) * originalWidth));
    }
  };

  const handlePercentageScale = (pct: number) => {
    if (originalWidth > 0 && originalHeight > 0) {
      const newW = Math.round((originalWidth * pct) / 100);
      const newH = Math.round((originalHeight * pct) / 100);
      setTargetWidth(newW);
      setTargetHeight(newH);
    }
  };

  const applyPreset = (w: number, h: number) => {
    setLockAspect(false);
    setTargetWidth(w);
    setTargetHeight(h);
  };

  // Generate resized preview
  useEffect(() => {
    if (!imageUrl || targetWidth <= 0 || targetHeight <= 0) return;

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      if (!isMounted) return;
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(blob => {
        if (!isMounted || !blob) return;
        if (resizedBlobUrl) URL.revokeObjectURL(resizedBlobUrl);
        const newUrl = URL.createObjectURL(blob);
        setResizedBlobUrl(newUrl);
        setResizedSize(blob.size);
      }, format, 0.92);
    };

    return () => {
      isMounted = false;
    };
  }, [imageUrl, targetWidth, targetHeight, format]);

  const handleReset = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    if (resizedBlobUrl) URL.revokeObjectURL(resizedBlobUrl);
    setFile(null);
    setImageUrl(null);
    setResizedBlobUrl(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setTargetWidth(0);
    setTargetHeight(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownload = () => {
    if (!resizedBlobUrl || !file) return;
    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
    const link = document.createElement('a');
    link.href = resizedBlobUrl;
    link.download = `${file.name.replace(/\.[^/.]+$/, '')}-${targetWidth}x${targetHeight}.${ext}`;
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 KB';
    return (bytes / 1024).toFixed(1) + ' KB';
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-900/40"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            Upload Image to Resize
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Resize photos by custom pixel dimensions, scaling percentage, or presets.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Container */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-4">
            {/* Dimension Inputs */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-3">
                Target Dimensions (Pixels)
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[120px]">
                  <label className="text-[11px] text-slate-500 block mb-1">Width (px)</label>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={targetWidth || ''}
                    onChange={e => handleWidthChange(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setLockAspect(prev => !prev)}
                  className={`mt-4 p-2.5 rounded-xl border transition ${
                    lockAspect
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'
                  }`}
                  title={lockAspect ? 'Unlock Aspect Ratio' : 'Lock Aspect Ratio'}
                >
                  {lockAspect ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </button>

                <div className="flex-1 min-w-[120px]">
                  <label className="text-[11px] text-slate-500 block mb-1">Height (px)</label>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={targetHeight || ''}
                    onChange={e => handleHeightChange(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="min-w-[120px]">
                  <label className="text-[11px] text-slate-500 block mb-1">Format</label>
                  <select
                    value={format}
                    onChange={e => setFormat(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium text-slate-900 dark:text-white"
                  >
                    <option value="image/png">PNG</option>
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Percentage Scaling */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 mr-1">Scale:</span>
              {[25, 50, 75, 100, 150, 200].map(pct => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => handlePercentageScale(pct)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300"
                >
                  {pct}%
                </button>
              ))}
            </div>

            {/* Social Media Presets */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 mr-1">Presets:</span>
              {presets.map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p.w, p.h)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-200/70 dark:bg-slate-700/60 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/50 text-slate-700 dark:text-slate-200 transition"
                >
                  {p.label} ({p.w}×{p.h})
                </button>
              ))}
            </div>
          </div>

          {/* Preview comparison */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950 flex flex-col items-center justify-center min-h-[260px]">
            {resizedBlobUrl && (
              <img
                src={resizedBlobUrl}
                alt="Resized preview"
                className="max-h-72 max-w-full object-contain rounded-lg shadow-sm"
              />
            )}
            <div className="mt-3 text-xs text-slate-500 flex items-center gap-3">
              <span>Original: {originalWidth}×{originalHeight} ({formatSize(file.size)})</span>
              <span>&rarr;</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                New: {targetWidth}×{targetHeight} ({formatSize(resizedSize)})
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!resizedBlobUrl}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resized Image</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
