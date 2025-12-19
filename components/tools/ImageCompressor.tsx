
import React, { useState, useRef } from 'react';

const ImageCompressor: React.FC = () => {
  const [original, setOriginal] = useState<{ name: string; size: number; url: string } | null>(null);
  const [compressed, setCompressed] = useState<{ size: number; url: string } | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setOriginal({ name: file.name, size: file.size, url });
    setCompressed(null);
  };

  const compressImage = () => {
    if (!original) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = original.url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressed({
              size: blob.size,
              url: URL.createObjectURL(blob),
            });
          }
          setIsProcessing(false);
        },
        'image/jpeg',
        quality
      );
    };
  };

  const formatSize = (bytes: number) => (bytes / 1024).toFixed(1) + ' KB';

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark">
      <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">compress</span> Image Compressor
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-inner flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
          {original ? (
            <>
              <img src={original.url} className="max-h-48 rounded-lg mb-4" alt="Original" />
              <p className="text-xs font-bold text-slate-400">Original: {formatSize(original.size)}</p>
            </>
          ) : (
            <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-2">upload_file</span>
              <span className="text-sm font-bold">Select JPG/PNG</span>
            </button>
          )}
          <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" className="hidden" />
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-inner flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
          {compressed ? (
            <>
              <img src={compressed.url} className="max-h-48 rounded-lg mb-4" alt="Compressed" />
              <p className="text-xs font-bold text-green-500">Compressed: {formatSize(compressed.size)}</p>
              <p className="text-xs text-slate-400 mt-1">Saved: {((1 - compressed.size / original!.size) * 100).toFixed(0)}%</p>
            </>
          ) : (
            <div className="flex flex-col items-center text-slate-300">
              <span className="material-symbols-outlined text-4xl mb-2">auto_fix_high</span>
              <span className="text-sm font-bold">Compress to see result</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">Quality: {Math.round(quality * 100)}%</label>
          <input 
            type="range" min="0.1" max="1" step="0.1" value={quality}
            onChange={e => setQuality(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="flex gap-4">
          <button 
            disabled={!original || isProcessing}
            onClick={compressImage}
            className="flex-grow h-12 bg-primary text-white rounded-full font-bold shadow-lg disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Compress Now'}
          </button>
          {compressed && (
            <a href={compressed.url} download={`compressed-${original?.name}`} className="h-12 px-8 flex items-center bg-green-500 text-white rounded-full font-bold shadow-lg">
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
