
import React, { useState } from 'react';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError('');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    alert('Copied to clipboard!');
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined">data_object</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold dark:text-white">JSON Formatter</h2>
          <p className="text-slate-500 dark:text-slate-400">Prettify, minify, and validate JSON</p>
        </div>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-64 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none shadow-clay-pressed dark:shadow-clay-pressed-dark text-slate-800 dark:text-white font-mono text-sm focus:ring-2 focus:ring-primary/50"
        placeholder="Paste your JSON here..."
      />

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
          Error: {error}
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-8">
        <button onClick={format} className="h-12 px-8 rounded-full bg-primary text-white font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
          Format (Prettify)
        </button>
        <button onClick={minify} className="h-12 px-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:scale-105 transition-all">
          Minify
        </button>
        <button onClick={copyToClipboard} className="h-12 px-8 rounded-full border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
          Copy Result
        </button>
        <button onClick={() => setInput('')} className="h-12 px-8 rounded-full text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-950/20 transition-all">
          Clear
        </button>
      </div>
    </div>
  );
};

export default JsonFormatter;
