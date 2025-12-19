
import React, { useState, useMemo } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const analysis = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/) : [];
    const wordCount = words.length;
    const charCount = text.length;
    
    // Keyword density
    const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'that', 'with', 'as', 'for', 'was', 'on']);
    const frequencies: Record<string, number> = {};
    words.forEach(w => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '');
      if (clean && clean.length > 3 && !stopWords.has(clean)) {
        frequencies[clean] = (frequencies[clean] || 0) + 1;
      }
    });
    const keywords = Object.entries(frequencies)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Reading time (200 words per minute average)
    const readingTime = Math.ceil(wordCount / 200);

    return {
      words: wordCount,
      chars: charCount,
      sentences: trimmed.split(/[.!?]+/).filter(Boolean).length,
      paragraphs: trimmed.split(/\n+/).filter(Boolean).length,
      readingTime,
      keywords
    };
  }, [text]);

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-3xl">analytics</span>
        </div>
        <div>
          <h2 className="text-2xl font-black dark:text-white">Pro Word Analyst</h2>
          <p className="text-sm text-slate-500">Real-time stats and content insights</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Words', value: analysis.words, icon: ' spellcheck' },
          { label: 'Characters', value: analysis.chars, icon: 'text_fields' },
          { label: 'Reading Time', value: `${analysis.readingTime}m`, icon: 'schedule' },
          { label: 'Sentences', value: analysis.sentences, icon: 'subject' },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-clay-pressed dark:shadow-clay-pressed-dark text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-primary/40 text-sm mb-1">{stat.icon}</span>
            <div className="text-2xl font-black text-primary">{stat.value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here for deep analysis..."
            className="w-full h-96 p-6 rounded-3xl bg-white dark:bg-slate-900 border-none shadow-clay-pressed dark:shadow-clay-pressed-dark text-slate-800 dark:text-white text-base focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />
        </div>
        
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-primary/5 dark:bg-slate-900 shadow-clay-card dark:shadow-clay-card-dark">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">key</span> Key Keywords
            </h3>
            {analysis.keywords.length > 0 ? (
              <div className="space-y-3">
                {analysis.keywords.map(([word, count]) => (
                  <div key={word} className="flex justify-between items-center group">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{word}</span>
                    <span className="text-[10px] px-2 py-1 rounded-lg bg-white dark:bg-slate-800 shadow-sm font-black text-primary">{count}x</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Analysis will appear here...</p>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-slate-900 shadow-clay-card dark:shadow-clay-card-dark">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Complexity</h3>
             <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
               <div className="h-full bg-primary" style={{ width: `${Math.min(100, (analysis.words / 10))}%` }}></div>
             </div>
             <p className="text-[10px] mt-2 text-slate-500 font-bold uppercase">Paragraphs: {analysis.paragraphs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
