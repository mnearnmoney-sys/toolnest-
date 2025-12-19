
import React, { useState } from 'react';
import JSZip from 'jszip';

const ZipCreator: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isZipping, setIsZipping] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]);
  };

  const createZip = async () => {
    if (files.length === 0) return;
    setIsZipping(true);
    const zip = new JSZip();
    files.forEach(f => zip.file(f.name, f));
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assignment_${Date.now()}.zip`;
    link.click();
    setIsZipping(false);
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark animate-fadeIn">
      <h2 className="text-2xl font-black mb-6 dark:text-white flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-4xl">folder_zip</span>
        ZIP Creator
      </h2>

      <div className="mb-8">
        <label className="flex flex-col items-center justify-center w-full h-40 rounded-[2rem] bg-indigo-50 dark:bg-slate-900 shadow-clay-pressed border-2 border-dashed border-indigo-200 cursor-pointer">
          <span className="material-symbols-outlined text-4xl text-indigo-300">create_new_folder</span>
          <span className="text-sm font-bold text-slate-500">Pick files for your ZIP</span>
          <input type="file" multiple className="hidden" onChange={handleUpload} />
        </label>
      </div>

      <div className="space-y-2 mb-8 max-h-60 overflow-y-auto pr-2 no-scrollbar">
        {files.map((f, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm">
            <span className="truncate">{f.name}</span>
            <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-red-400">
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
        ))}
      </div>

      <button 
        disabled={files.length === 0 || isZipping}
        onClick={createZip}
        className="w-full h-14 rounded-full bg-primary text-white font-black text-lg shadow-xl hover:scale-[1.02] disabled:opacity-50 transition-all"
      >
        {isZipping ? 'Packing ZIP...' : 'Create ZIP Archive'}
      </button>
    </div>
  );
};

export default ZipCreator;
