
import React, { useState } from 'react';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  
  const handleClick = (val: string) => {
    if (display === '0' || display === 'Error') setDisplay(val);
    else setDisplay(display + val);
  };

  const calculate = () => {
    try {
      const sanitized = display
        .replace('sin', 'Math.sin')
        .replace('cos', 'Math.cos')
        .replace('tan', 'Math.tan')
        .replace('π', 'Math.PI')
        .replace('√', 'Math.sqrt')
        .replace('^', '**');
      
      const result = eval(sanitized);
      const formattedResult = Number.isInteger(result) ? result : result.toFixed(6);
      setHistory(prev => [`${display} = ${formattedResult}`, ...prev].slice(0, 10));
      setDisplay(String(formattedResult));
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => setDisplay('0');

  const buttons = [
    { label: 'sin', val: 'sin(' }, { label: 'cos', val: 'cos(' }, { label: 'tan', val: 'tan(' }, { label: '√', val: '√(' },
    { label: 'π', val: 'π' }, { label: '^', val: '^' }, { label: '(', val: '(' }, { label: ')', val: ')' },
    { label: '7', val: '7' }, { label: '8', val: '8' }, { label: '9', val: '9' }, { label: '/', val: '/' },
    { label: '4', val: '4' }, { label: '5', val: '5' }, { label: '6', val: '6' }, { label: '×', val: '*' },
    { label: '1', val: '1' }, { label: '2', val: '2' }, { label: '3', val: '3' }, { label: '-', val: '-' },
    { label: '0', val: '0' }, { label: '.', val: '.' }, { label: '=', val: '=' }, { label: '+', val: '+' }
  ];

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-3xl">calculate</span>
        </div>
        <div>
          <h2 className="text-2xl font-black dark:text-white">Study Calc Pro</h2>
          <p className="text-sm text-slate-500">Advanced math & scientific notation</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="w-full mb-6 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 shadow-clay-pressed dark:shadow-clay-pressed-dark text-right overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Output Module</div>
            <div className="text-4xl font-mono font-black text-primary truncate tracking-tighter">{display}</div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <button onClick={clear} className="col-span-2 h-14 rounded-2xl bg-red-100 dark:bg-red-950/30 text-red-500 font-black shadow-clay-btn transition-transform active:scale-95">ALL CLEAR</button>
            <button onClick={() => setDisplay(display.length > 1 ? display.slice(0, -1) : '0')} className="col-span-2 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-black shadow-clay-btn transition-transform active:scale-95">DELETE</button>
            
            {buttons.map(btn => (
              <button 
                key={btn.label}
                onClick={() => btn.val === '=' ? calculate() : handleClick(btn.val)}
                className={`h-14 rounded-2xl font-black text-lg shadow-clay-btn transition-all active:scale-90 ${btn.val === '=' ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900 shadow-clay-card dark:shadow-clay-card-dark border border-slate-100 dark:border-slate-800 h-full min-h-[400px]">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">history</span> History Log
            </h3>
            <div className="space-y-3">
              {history.length > 0 ? history.map((h, i) => (
                <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-50 dark:border-slate-700 animate-fadeIn" style={{ animationDelay: `${i * 0.05}s` }}>
                  <p className="text-[10px] font-mono text-slate-400 mb-1">{h.split('=')[0]}</p>
                  <p className="text-sm font-mono font-black text-primary">={h.split('=')[1]}</p>
                </div>
              )) : (
                <div className="py-20 text-center text-slate-300">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-20">history_edu</span>
                  <p className="text-xs font-bold uppercase tracking-tighter">No History Yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
