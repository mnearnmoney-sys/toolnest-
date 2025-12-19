
import React, { useState } from 'react';

const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LoremIpsumGenerator: React.FC = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState('');

  const generate = () => {
    const result = Array(paragraphs).fill(LOREM_TEXT).join('\n\n');
    setOutput(result);
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined">description</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Lorem Ipsum</h2>
          <p className="text-slate-500 dark:text-slate-400">Generate dummy text for designs</p>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <div className="flex-grow">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Paragraphs</label>
          <input 
            type="number" min="1" max="20" value={paragraphs} 
            onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
            className="w-full h-12 rounded-xl border-none bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white shadow-inner focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button 
          onClick={generate}
          className="h-12 px-8 rounded-full bg-primary text-white font-bold shadow-lg hover:scale-105 transition-all mt-6"
        >
          Generate
        </button>
      </div>

      {output && (
        <div className="relative">
          <textarea
            readOnly
            value={output}
            className="w-full h-80 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none shadow-clay-pressed dark:shadow-clay-pressed-dark text-slate-600 dark:text-slate-300 text-sm leading-relaxed"
          />
          <button 
            onClick={() => {navigator.clipboard.writeText(output); alert('Copied!');}}
            className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md text-primary hover:scale-110 transition-transform"
          >
            <span className="material-symbols-outlined text-xl">content_copy</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LoremIpsumGenerator;
