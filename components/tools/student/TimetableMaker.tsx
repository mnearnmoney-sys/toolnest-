
import React, { useState } from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const HOURS = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
const COLORS = [
  { bg: 'bg-blue-500', text: 'text-white' },
  { bg: 'bg-emerald-500', text: 'text-white' },
  { bg: 'bg-purple-500', text: 'text-white' },
  { bg: 'bg-orange-500', text: 'text-white' },
  { bg: 'bg-rose-500', text: 'text-white' },
  { bg: 'bg-indigo-500', text: 'text-white' },
];

const TimetableMaker: React.FC = () => {
  const [schedule, setSchedule] = useState<Record<string, { name: string, color: number }>>({});
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  const setSlot = (day: string, hour: string) => {
    const key = `${day}-${hour}`;
    const subject = prompt("Subject Name (leave empty to clear):", schedule[key]?.name || "");
    if (subject === null) return;
    if (subject === "") {
      const newSched = { ...schedule };
      delete newSched[key];
      setSchedule(newSched);
    } else {
      setSchedule(prev => ({ ...prev, [key]: { name: subject, color: activeColorIdx } }));
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-3xl">calendar_view_week</span>
          </div>
          <div>
            <h2 className="text-2xl font-black dark:text-white">Study Schedule Maker</h2>
            <p className="text-sm text-slate-500">Organize your academic life visually</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-clay-pressed dark:shadow-clay-pressed-dark">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Color:</span>
          <div className="flex gap-2">
            {COLORS.map((c, i) => (
              <button 
                key={i} 
                onClick={() => setActiveColorIdx(i)}
                className={`size-6 rounded-full transition-all border-2 ${c.bg} ${activeColorIdx === i ? 'border-primary ring-2 ring-primary/30 scale-125' : 'border-transparent'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar pb-6 print:overflow-visible">
        <div className="min-w-[800px] print:min-w-full">
          <div className="grid grid-cols-6 gap-4 mb-4">
            <div className="h-12"></div>
            {DAYS.map(day => (
              <div key={day} className="h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-black text-slate-500 text-xs uppercase tracking-[0.2em] shadow-sm">{day}</div>
            ))}
          </div>

          {HOURS.map(hour => (
            <div key={hour} className="grid grid-cols-6 gap-4 mb-4">
              <div className="h-24 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-xs font-black text-slate-400 shadow-clay-btn dark:shadow-clay-card-dark">{hour}</div>
              {DAYS.map(day => {
                const slot = schedule[`${day}-${hour}`];
                const color = slot ? COLORS[slot.color] : null;
                return (
                  <button 
                    key={`${day}-${hour}`}
                    onClick={() => setSlot(day, hour)}
                    className={`h-24 rounded-3xl transition-all shadow-clay-card dark:shadow-none flex flex-col items-center justify-center p-4 text-center group border border-transparent ${slot ? `${color?.bg} ${color?.text} scale-[1.03] z-10 shadow-xl` : 'bg-white dark:bg-slate-900/40 text-slate-300 hover:border-primary/30 hover:bg-primary/5'}`}
                  >
                    {slot ? (
                      <>
                        <span className="text-xs font-black leading-tight uppercase line-clamp-2">{slot.name}</span>
                        <span className="material-symbols-outlined text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
                      </>
                    ) : (
                      <span className="material-symbols-outlined text-2xl opacity-20 group-hover:opacity-100 transition-opacity">add_circle</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-4 print:hidden">
        <button 
          onClick={() => window.print()} 
          className="flex-grow h-14 rounded-full bg-primary text-white font-black text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined">print</span>
          Export to PDF / Print
        </button>
        <button 
          onClick={() => { if(confirm("Clear everything?")) setSchedule({}); }} 
          className="h-14 px-8 rounded-full bg-red-100 dark:bg-red-950/20 text-red-500 font-black shadow-clay-btn hover:bg-red-500 hover:text-white transition-all"
        >
          Reset Grid
        </button>
      </div>
    </div>
  );
};

export default TimetableMaker;
