import React, { useState } from 'react';
import { Copy, Check, ArrowRightLeft, Trash2, Upload, AlertCircle, FileText, Image as ImageIcon } from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const [tab, setTab] = useState<'text' | 'file'>('text');
  
  // Text mode states
  const [textInput, setTextInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // File mode states
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileBase64, setFileBase64] = useState<string>('');
  const [isImage, setIsImage] = useState(false);

  // Proper UTF-8 safe encode (handles emojis and international characters)
  const encodeUtf8Base64 = (str: string) => {
    try {
      const bytes = new TextEncoder().encode(str);
      const binString = Array.from(bytes, b => String.fromCharCode(b)).join('');
      return btoa(binString);
    } catch (e: any) {
      throw new Error('Failed to encode to Base64: ' + e.message);
    }
  };

  // Proper UTF-8 safe decode
  const decodeUtf8Base64 = (b64: string) => {
    try {
      const cleanB64 = b64.trim().replace(/\s+/g, '');
      const binString = atob(cleanB64);
      const bytes = Uint8Array.from(binString, m => m.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch (e: any) {
      throw new Error('Invalid Base64 string. Please check the format.');
    }
  };

  const handleEncode = () => {
    if (!textInput.trim()) {
      setError('Please enter text to encode.');
      return;
    }
    try {
      const encoded = encodeUtf8Base64(textInput);
      setTextOutput(encoded);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDecode = () => {
    if (!textInput.trim()) {
      setError('Please enter Base64 string to decode.');
      return;
    }
    try {
      const decoded = decodeUtf8Base64(textInput);
      setTextOutput(decoded);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSwap = () => {
    const temp = textInput;
    setTextInput(textOutput);
    setTextOutput(temp);
    setError(null);
  };

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsImage(file.type.startsWith('image/'));

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFileBase64(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Navigation */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 w-fit">
        <button
          onClick={() => setTab('text')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
            tab === 'text'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Text Encoder / Decoder</span>
        </button>

        <button
          onClick={() => setTab('file')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
            tab === 'file'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>File to Base64 Data URL</span>
        </button>
      </div>

      {tab === 'text' ? (
        <div className="space-y-4">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={handleEncode}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
              >
                Encode &rarr;
              </button>

              <button
                onClick={handleDecode}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
              >
                Decode &rarr;
              </button>

              <button
                onClick={handleSwap}
                disabled={!textInput && !textOutput}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition disabled:opacity-40"
                title="Swap Input and Output"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Swap</span>
              </button>
            </div>

            <button
              onClick={() => {
                setTextInput('');
                setTextOutput('');
                setError(null);
              }}
              className="flex items-center gap-1 text-xs text-rose-600 hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Dual Textareas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Input
              </label>
              <textarea
                value={textInput}
                onChange={e => {
                  setTextInput(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter plain text or Base64 to convert..."
                rows={9}
                className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-xs leading-relaxed focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Output Result
                </label>
                {textOutput && (
                  <button
                    onClick={() => handleCopy(textOutput)}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                )}
              </div>
              <textarea
                readOnly
                value={textOutput}
                placeholder="Conversion result will appear here..."
                rows={9}
                className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 font-mono text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>
      ) : (
        /* File Mode */
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center bg-slate-50/50 dark:bg-slate-900/40">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="base64-file-upload"
            />
            <label
              htmlFor="base64-file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {fileName ? fileName : 'Choose an image or document to convert to Base64'}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Generates ready-to-use Data URL data:image/...;base64,...
              </span>
            </label>
          </div>

          {fileBase64 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Data URL String ({Math.round(fileBase64.length / 1024)} KB)
                </span>
                <button
                  onClick={() => handleCopy(fileBase64)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Data URL' : 'Copy Data URL'}</span>
                </button>
              </div>

              <textarea
                readOnly
                value={fileBase64}
                rows={6}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-[11px] break-all leading-tight"
              />

              {isImage && (
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex flex-col items-center">
                  <span className="text-xs text-slate-500 mb-2">Live Image Preview:</span>
                  <img
                    src={fileBase64}
                    alt="Base64 preview"
                    className="max-h-48 object-contain rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
