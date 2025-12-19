
import React, { useState, useEffect } from 'react';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(18);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let retVal = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      retVal += charset.charAt(array[i] % charset.length);
    }
    setPassword(retVal);
  };

  useEffect(() => {
    generate();
  }, []);

  const getStrength = () => {
    if (!password) return { label: 'Empty', color: 'bg-slate-200', width: '0%' };
    let score = 0;
    if (password.length > 12) score += 1;
    if (password.length > 20) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;

    if (score < 2) return { label: 'Weak', color: 'bg-red-400', width: '25%' };
    if (score < 4) return { label: 'Medium', color: 'bg-orange-400', width: '50%' };
    if (score < 5) return { label: 'Strong', color: 'bg-blue-400', width: '75%' };
    return { label: 'Exceptional', color: 'bg-green-500', width: '100%' };
  };

  const strength = getStrength();

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-3xl">enhanced_encryption</span>
        </div>
        <div>
          <h2 className="text-2xl font-black dark:text-white">Secure Key Vault</h2>
          <p className="text-sm text-slate-500">Military-grade random generation</p>
        </div>
      </div>

      <div className="relative group mb-10">
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 shadow-clay-pressed dark:shadow-clay-pressed-dark flex flex-col gap-4 overflow-hidden">
          <div className="flex justify-between items-center">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Generated Password</span>
             <span className={`text-[10px] px-2 py-0.5 rounded-full font-black text-white ${strength.color}`}>{strength.label}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-2xl font-mono font-black text-primary break-all selection:bg-primary/20">{password}</span>
            <div className="flex gap-2">
              <button onClick={generate} className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-clay-btn hover:text-primary transition-all">
                <span className="material-symbols-outlined">refresh</span>
              </button>
              <button 
                onClick={() => {navigator.clipboard.writeText(password); alert('Password copied to clipboard');}} 
                className="p-3 rounded-2xl bg-primary text-white shadow-lg active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined">content_copy</span>
              </button>
            </div>
          </div>
          {/* Strength bar */}
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
            <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-4">
              <label className="text-sm font-black text-slate-600 dark:text-slate-300">Length: {length}</label>
              <span className="text-xs font-bold text-slate-400">Security: Optimal</span>
            </div>
            <input 
              type="range" min="8" max="100" value={length} 
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Numbers', state: includeNumbers, set: setIncludeNumbers },
              { label: 'Symbols', state: includeSymbols, set: setIncludeSymbols },
              { label: 'Uppercase', state: includeUpper, set: setIncludeUpper },
              { label: 'Lowercase', state: true, set: () => {}, disabled: true },
            ].map(opt => (
              <label key={opt.label} className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${opt.state ? 'border-primary/20 bg-primary/5' : 'border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-700'}`}>
                <input 
                  type="checkbox" checked={opt.state} disabled={opt.disabled}
                  onChange={(e) => opt.set(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary shadow-sm"
                />
                <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-blue-50 dark:bg-slate-900/50 flex flex-col justify-center border border-blue-100 dark:border-slate-800">
           <h3 className="text-xs font-black text-blue-400 uppercase mb-4 tracking-widest flex items-center gap-2">
             <span className="material-symbols-outlined text-sm">info</span> Security Tips
           </h3>
           <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
             <li className="flex gap-2"><span className="text-primary font-bold">•</span> Use at least 16 characters for critical accounts.</li>
             <li className="flex gap-2"><span className="text-primary font-bold">•</span> Mix letters, numbers, and symbols to maximize entropy.</li>
             <li className="flex gap-2"><span className="text-primary font-bold">•</span> Never reuse passwords across multiple sites.</li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
