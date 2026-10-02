import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, RefreshCw, Copy, Check, Link, Type, Mail, Phone, Wifi } from 'lucide-react';

export const QrGeneratorTool: React.FC = () => {
  const [mode, setMode] = useState<'url' | 'text' | 'email' | 'phone' | 'wifi'>('url');
  
  // Fields
  const [urlInput, setUrlInput] = useState('https://toolnest.netlify.app');
  const [textInput, setTextInput] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  // Customization
  const [darkColor, setDarkColor] = useState('#0f172a');
  const [lightColor, setLightColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState<number>(300);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Compute raw string to encode
  const getPayload = (): string => {
    switch (mode) {
      case 'url':
        return urlInput.trim() || 'https://';
      case 'text':
        return textInput.trim() || 'ToolNest';
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        return `tel:${phoneNumber.trim()}`;
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};H:${wifiHidden ? 'true' : 'false'};;`;
      default:
        return 'https://toolnest.netlify.app';
    }
  };

  useEffect(() => {
    const payload = getPayload();
    if (!canvasRef.current || !payload) return;

    QRCode.toCanvas(
      canvasRef.current,
      payload,
      {
        width: qrSize,
        margin: 2,
        color: {
          dark: darkColor,
          light: lightColor
        },
        errorCorrectionLevel: 'M'
      },
      err => {
        if (err) console.error('QR code generation error:', err);
      }
    );
  }, [
    mode,
    urlInput,
    textInput,
    emailTo,
    emailSubject,
    emailBody,
    phoneNumber,
    wifiSsid,
    wifiPassword,
    wifiEncryption,
    wifiHidden,
    darkColor,
    lightColor,
    qrSize
  ]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `qrcode-${mode}-${Date.now()}.png`;
    link.click();
  };

  const handleCopy = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async blob => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      });
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    setUrlInput('https://');
    setTextInput('');
    setEmailTo('');
    setEmailSubject('');
    setEmailBody('');
    setPhoneNumber('');
    setWifiSsid('');
    setWifiPassword('');
    setDarkColor('#0f172a');
    setLightColor('#ffffff');
    setQrSize(300);
  };

  const modes = [
    { key: 'url', label: 'Website URL', icon: Link },
    { key: 'text', label: 'Plain Text', icon: Type },
    { key: 'email', label: 'Email', icon: Mail },
    { key: 'phone', label: 'Phone', icon: Phone },
    { key: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
  ];

  return (
    <div className="space-y-6">
      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
        {modes.map(m => {
          const Icon = m.icon;
          const isActive = mode === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Form Inputs on Left, QR Live Canvas on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Inputs */}
        <div className="space-y-4">
          {mode === 'url' && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Target URL
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {mode === 'text' && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Plain Text
              </label>
              <textarea
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                placeholder="Enter any text, instructions, or coupon codes..."
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {mode === 'email' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={emailTo}
                  onChange={e => setEmailTo(e.target.value)}
                  placeholder="contact@company.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                  placeholder="Inquiry / Feedback"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Pre-filled Body
                </label>
                <textarea
                  value={emailBody}
                  onChange={e => setEmailBody(e.target.value)}
                  placeholder="Hello, I would like to ask about..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {mode === 'phone' && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 000-1234"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Include country code for universal mobile dialing.
              </span>
            </div>
          )}

          {mode === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Network SSID (Name)
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={e => setWifiSsid(e.target.value)}
                  placeholder="MyHome_WiFi"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Wi-Fi Password
                </label>
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={e => setWifiPassword(e.target.value)}
                  placeholder="SecretPassword123"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Security:</span>
                  <select
                    value={wifiEncryption}
                    onChange={e => setWifiEncryption(e.target.value as any)}
                    className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="WPA">WPA / WPA2 / WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (Open)</option>
                  </select>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wifiHidden}
                    onChange={e => setWifiHidden(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>Hidden Network</span>
                </label>
              </div>
            </div>
          )}

          {/* Color & Size Customization */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Styling &amp; Colors
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Foreground Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={darkColor}
                    onChange={e => setDarkColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                  />
                  <span className="text-xs font-mono">{darkColor}</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={lightColor}
                    onChange={e => setLightColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                  />
                  <span className="text-xs font-mono">{lightColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live QR Preview & Actions */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200">
            <canvas ref={canvasRef} className="max-w-full h-auto block rounded-lg" />
          </div>

          <p className="text-xs text-slate-500 mt-4 text-center">
            Scan with any smartphone camera to test immediately
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Image' : 'Copy Image'}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-xs font-medium transition cursor-pointer"
              title="Reset fields"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
