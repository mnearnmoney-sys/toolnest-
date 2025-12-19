
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const ImagesToPdf: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            setImages(prev => [...prev, ev.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    const pdf = new jsPDF();
    
    images.forEach((img, i) => {
      if (i > 0) pdf.addPage();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(img, 'JPEG', 10, 10, pageWidth - 20, pageHeight - 20);
    });

    pdf.save(`images_to_pdf_${Date.now()}.pdf`);
    setIsProcessing(false);
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark animate-fadeIn">
      <h2 className="text-2xl font-black mb-6 dark:text-white flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-4xl">picture_as_pdf</span>
        Images to PDF
      </h2>

      <div className="mb-8">
        <label className="flex flex-col items-center justify-center w-full h-40 rounded-[2rem] bg-[#f0f4ff] dark:bg-slate-900 shadow-clay-pressed dark:shadow-clay-pressed-dark cursor-pointer border-2 border-dashed border-slate-200">
          <span className="material-symbols-outlined text-4xl text-slate-300">add_photo_alternate</span>
          <span className="text-sm font-bold text-slate-500">Add JPG/PNG Photos</span>
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-clay-btn">
            <img src={src} className="w-full h-full object-cover" alt="Preview" />
            <button 
              onClick={() => setImages(images.filter((_, idx) => idx !== i))}
              className="absolute top-2 right-2 size-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}
      </div>

      <button 
        disabled={images.length === 0 || isProcessing}
        onClick={generatePdf}
        className="w-full h-14 rounded-full bg-primary text-white font-black text-lg shadow-xl hover:scale-[1.02] disabled:opacity-50 transition-all"
      >
        {isProcessing ? 'Generating PDF...' : 'Convert Images to PDF'}
      </button>
    </div>
  );
};

export default ImagesToPdf;
