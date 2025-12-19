
import React, { useState, useRef } from 'react';

const ColorPaletteExtractor: React.FC = () => {
  const [palette, setPalette] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImgUrl(url);
    const img = new Image();
    img.src = url;
    img.onload = () => extract(img);
  };

  const extract = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;
    ctx?.drawImage(img, 0, 0, 100, 100);
    const data = ctx?.getImageData(0, 0, 100, 100).data;
    if (!data) return;

    const colors: Record<string, number> = {};
    for (let i = 0; i < data.length; i += 40) { // Sample every 10th pixel
      const rgb = `rgb(${data[i]}, ${data[i+1]}, ${data[i+2]})`;
      const hex = '#' + ((1 << 24) + (data[i] << 16) + (data[i+1] << 8) + data[i+2]).toString(16).slice(1);
      colors[hex] = (colors[hex] || 0) + 1;
    }

    const sorted = Object.entries(colors).sort((a,b) => b[1] - a[1]).slice(0, 6).map(e => e[0]);
    setPalette(sorted);
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark">
      <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">palette</span> Palette Extractor
      </h2>

      <div className="flex flex-col items-center gap-8">
        <div 
          onClick={() => document.getElementById('palette-input')?.click()}
          className="w-full h-64 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer"
        >
          {imgUrl ? <img src={imgUrl} className="w-full h-full object-cover" /> : <span className="text-slate-400 font-bold">Upload Image</span>}
          <input id="palette-input" type="file" onChange={handleUpload} className="hidden" />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full">
          {palette.length > 0 ? palette.map(color => (
            <div key={color} className="flex flex-col items-center">
              <div 
                className="w-full aspect-square rounded-2xl shadow-clay-btn mb-2 transition-transform hover:scale-110 cursor-pointer" 
                style={{ backgroundColor: color }}
                onClick={() => {navigator.clipboard.writeText(color); alert('Copied: ' + color)}}
              />
              <span className="text-[10px] font-mono font-bold text-slate-400">{color.toUpperCase()}</span>
            </div>
          )) : <div className="col-span-full text-center text-slate-300 py-10">Palette will appear here</div>}
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ColorPaletteExtractor;
