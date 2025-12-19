
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PdfMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `merged_${Date.now()}.pdf`;
      link.click();
    } catch (err) {
      alert("Error merging PDFs. Ensure files are valid and not password-protected.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark animate-fadeIn">
      <h2 className="text-2xl font-black mb-6 dark:text-white flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-4xl">merge_type</span>
        PDF Merger
      </h2>

      <div className="mb-8">
        <label className="flex flex-col items-center justify-center w-full h-48 rounded-[2rem] bg-[#f0f4ff] dark:bg-slate-900 shadow-clay-pressed dark:shadow-clay-pressed-dark border-2 border-dashed border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-[#e8f0fe] transition-all">
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-2">upload_file</span>
          <span className="text-slate-500 font-bold">Upload PDF files to merge</span>
          <input type="file" multiple accept="application/pdf" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      <div className="space-y-3 mb-8">
        {files.map((file, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-clay-btn dark:shadow-clay-card-dark border border-slate-50 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-slate-300">#0{i+1}</span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{file.name}</span>
            </div>
            <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-500 transition-colors">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ))}
      </div>

      <button 
        disabled={files.length < 2 || isMerging}
        onClick={mergePdfs}
        className="w-full h-14 rounded-full bg-primary text-white font-black text-lg shadow-xl hover:scale-[1.02] disabled:opacity-50 active:scale-[0.98] transition-all"
      >
        {isMerging ? 'Merging Documents...' : files.length < 2 ? 'Upload at least 2 files' : 'Merge and Download'}
      </button>
      <p className="mt-4 text-center text-xs text-slate-400">Files are processed 100% in your browser. Privacy guaranteed.</p>
    </div>
  );
};

export default PdfMerger;
