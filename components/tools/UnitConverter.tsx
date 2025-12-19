
import React, { useState } from 'react';

const UNITS = {
  Length: { meters: 1, km: 0.001, miles: 0.000621371, feet: 3.28084, inches: 39.3701 },
  Weight: { kg: 1, grams: 1000, lbs: 2.20462, oz: 35.274 },
  Temperature: { celsius: 'C', fahrenheit: 'F', kelvin: 'K' }
};

const UnitConverter: React.FC = () => {
  const [type, setType] = useState<'Length' | 'Weight' | 'Temperature'>('Length');
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('km');

  const convert = () => {
    if (type === 'Temperature') {
      if (fromUnit === toUnit) return value;
      let c = value;
      if (fromUnit === 'fahrenheit') c = (value - 32) * 5/9;
      if (fromUnit === 'kelvin') c = value - 273.15;
      
      if (toUnit === 'celsius') return c;
      if (toUnit === 'fahrenheit') return (c * 9/5) + 32;
      if (toUnit === 'kelvin') return c + 273.15;
      return value;
    }

    const units = UNITS[type] as Record<string, number>;
    const base = value / units[fromUnit];
    return base * units[toUnit];
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark">
      <h2 className="text-2xl font-bold mb-8 dark:text-white flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">sync_alt</span> Unit Converter
      </h2>

      <div className="flex gap-2 mb-8 bg-slate-50 dark:bg-slate-900 p-2 rounded-2xl">
        {['Length', 'Weight', 'Temperature'].map(t => (
          <button 
            key={t} onClick={() => { setType(t as any); setFromUnit(Object.keys(UNITS[t as keyof typeof UNITS])[0]); setToUnit(Object.keys(UNITS[t as keyof typeof UNITS])[1]); }}
            className={`flex-grow h-10 rounded-xl font-bold text-xs transition-all ${type === t ? 'bg-primary text-white' : 'text-slate-400'}`}
          >{t}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <input type="number" value={value} onChange={e => setValue(parseFloat(e.target.value) || 0)} className="w-full h-14 rounded-2xl bg-[#f0f4ff] dark:bg-slate-900 shadow-inner border-none text-xl font-black text-primary px-4" />
          <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full h-12 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-sm font-bold">
            {Object.keys(UNITS[type]).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
          </select>
        </div>
        <div className="text-center md:text-left">
           <span className="material-symbols-outlined text-slate-300 md:rotate-90">swap_vert</span>
        </div>
        <div className="space-y-4">
          <div className="h-14 rounded-2xl bg-primary/5 dark:bg-slate-900 flex items-center px-4 text-xl font-black text-primary">{convert().toFixed(4)}</div>
          <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="w-full h-12 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-sm font-bold">
            {Object.keys(UNITS[type]).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
