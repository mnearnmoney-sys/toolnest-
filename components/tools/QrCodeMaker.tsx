
import React, { useState } from 'react';

const QrCodeMaker: React.FC = () => {
  const [content, setContent] = useState('');
  const [fgColor, setFgColor] = useState('#137fec');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(300);
  
  const qrUrl = content ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(content)}&color=${fgColor.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}` : '';

  const downloadQR = async () => {
    if (!qrUrl) return;
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
        </div>
        <div>
          <h2 className="text-2xl font-black dark:text-white">Brand QR Studio</h2>
          <p className="text-sm text-slate-500">Customized codes for modern marketing</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Destination URL or Text</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="e.g. https://yourportfolio.com"
              className="w-full h-32 p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border-none shadow-clay-pressed dark:shadow-clay-pressed-dark text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-2">Primary Color</label>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-inner">
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded-lg border-none bg-transparent cursor-pointer" />
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-2">Background</label>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-inner">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg border-none bg-transparent cursor-pointer" />
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">{bgColor}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-3">Resolution: {size}px</label>
            <input type="range" min="100" max="1000" step="100" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full accent-primary" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full aspect-square max-w-[340px] rounded-[3rem] bg-slate-50 dark:bg-slate-900 shadow-clay-card dark:shadow-clay-card-dark flex items-center justify-center p-8 overflow-hidden relative group">
            {qrUrl ? (
              <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center text-slate-400 space-y-2">
                <span className="material-symbols-outlined text-5xl">input</span>
                <p className="text-xs font-bold uppercase">Waiting for input...</p>
              </div>
            )}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
          
          <button 
            disabled={!content}
            onClick={downloadQR}
            className="mt-8 w-full max-w-[340px] h-14 rounded-full bg-primary text-white font-black text-lg shadow-xl hover:scale-[1.02] disabled:opacity-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">download</span>
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodeMaker;
