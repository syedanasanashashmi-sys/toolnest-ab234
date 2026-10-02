import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, CheckCircle, ShieldCheck } from 'lucide-react';

export const JpgToWebpTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jpgUrl, setJpgUrl] = useState<string | null>(null);
  const [webpUrl, setWebpUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [webpSize, setWebpSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(85);
  const [converting, setConverting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 KB';
    return (bytes / 1024).toFixed(1) + ' KB';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setOriginalSize(selected.size);
      const url = URL.createObjectURL(selected);
      setJpgUrl(url);
    }
  };

  useEffect(() => {
    if (!jpgUrl) return;

    let isMounted = true;
    setConverting(true);

    const img = new Image();
    img.src = jpgUrl;
    img.onload = () => {
      if (!isMounted) return;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(blob => {
        if (!isMounted || !blob) return;
        if (webpUrl) URL.revokeObjectURL(webpUrl);
        const url = URL.createObjectURL(blob);
        setWebpUrl(url);
        setWebpSize(blob.size);
        setConverting(false);
      }, 'image/webp', quality / 100);
    };

    return () => {
      isMounted = false;
    };
  }, [jpgUrl, quality]);

  const handleReset = () => {
    if (jpgUrl) URL.revokeObjectURL(jpgUrl);
    if (webpUrl) URL.revokeObjectURL(webpUrl);
    setFile(null);
    setJpgUrl(null);
    setWebpUrl(null);
    setOriginalSize(0);
    setWebpSize(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownload = () => {
    if (!webpUrl || !file) return;
    const link = document.createElement('a');
    link.href = webpUrl;
    link.download = `${file.name.replace(/\.[^/.]+$/, '')}.webp`;
    link.click();
  };

  const savings = originalSize > 0 && webpSize > 0
    ? Math.max(0, Math.round(((originalSize - webpSize) / originalSize) * 100))
    : 0;

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
            accept="image/jpeg,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            Select JPG / JPEG Image to Convert
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Converts JPG to next-gen WebP instantly in your browser.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Comparison Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500">Original JPG Size</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {formatSize(originalSize)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
              <span className="text-xs text-emerald-700 dark:text-emerald-300">WebP File Size</span>
              <div className="text-lg font-bold text-emerald-950 dark:text-emerald-200 mt-1">
                {converting ? 'Converting...' : formatSize(webpSize)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 col-span-2 sm:col-span-1">
              <span className="text-xs text-blue-700 dark:text-blue-300">Reduction</span>
              <div className="text-lg font-bold text-blue-950 dark:text-blue-200 mt-1">
                {savings}% Smaller
              </div>
            </div>
          </div>

          {/* Quality Slider */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                WebP Quality: <strong>{quality}%</strong>
              </span>
              <span className="text-slate-500">85% recommended for web balance</span>
            </div>
            <input
              type="range"
              min={20}
              max={98}
              value={quality}
              onChange={e => setQuality(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Image Preview */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center min-h-[220px]">
            {webpUrl && (
              <img
                src={webpUrl}
                alt="Converted WebP Preview"
                className="max-h-64 max-w-full object-contain rounded-lg shadow-sm"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!webpUrl || converting}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download .webp</span>
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
