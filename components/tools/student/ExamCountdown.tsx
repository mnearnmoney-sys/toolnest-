
import React, { useState, useEffect } from 'react';

const ExamCountdown: React.FC = () => {
  const [exams, setExams] = useState<{ id: string, name: string, date: string, color: string }[]>([
    { id: '1', name: 'Mathematics Final', date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0], color: 'primary' },
    { id: '2', name: 'Science Presentation', date: new Date(Date.now() + 86400000 * 12).toISOString().split('T')[0], color: 'indigo' }
  ]);
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');

  const addExam = () => {
    if (newName && newDate) {
      const colors = ['primary', 'indigo', 'rose', 'emerald', 'orange'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setExams([...exams, { id: Date.now().toString(), name: newName, date: newDate, color: randomColor }]);
      setNewName('');
      setNewDate('');
    }
  };

  const getDaysLeft = (date: string) => {
    const diff = new Date(date).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 2) return 'text-rose-500';
    if (days <= 7) return 'text-orange-500';
    return 'text-primary';
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-3xl">notification_important</span>
        </div>
        <div>
          <h2 className="text-2xl font-black dark:text-white">Exam Milestone Tracker</h2>
          <p className="text-sm text-slate-500">Stay ahead of your submission deadlines</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 shadow-clay-pressed dark:shadow-clay-pressed-dark">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Add New Milestone</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">Title</label>
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Final Project..." className="w-full h-12 rounded-xl bg-white dark:bg-slate-800 border-none shadow-sm dark:text-white text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">Deadline</label>
                <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full h-12 rounded-xl bg-white dark:bg-slate-800 border-none shadow-sm dark:text-white text-sm" />
              </div>
              <button onClick={addExam} className="w-full h-12 bg-primary text-white rounded-full font-black text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all mt-2">Add to Tracker</button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
          {exams.length > 0 ? exams.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(exam => {
            const days = getDaysLeft(exam.date);
            const urgencyColor = getUrgencyColor(days);
            return (
              <div key={exam.id} className="relative p-6 rounded-[2rem] bg-white dark:bg-slate-900 shadow-clay-card dark:shadow-clay-card-dark group border border-slate-50 dark:border-slate-800 overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-black text-slate-800 dark:text-white mb-1">{exam.name}</h4>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">event</span> {new Date(exam.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-4xl font-black ${urgencyColor}`}>{days}</span>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Days Left</p>
                  </div>
                </div>
                
                {/* Progress bar simulation */}
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full bg-${exam.color === 'primary' ? 'primary' : 'primary'} transition-all duration-1000`} style={{ width: `${Math.max(10, 100 - (days * 2))}%` }} />
                </div>

                <button 
                  onClick={() => setExams(exams.filter(e => e.id !== exam.id))} 
                  className="absolute right-4 top-4 size-8 rounded-full bg-red-50 dark:bg-red-950/20 text-red-400 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-red-500 hover:text-white"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            );
          }) : (
            <div className="h-full flex flex-col items-center justify-center py-20 text-slate-300">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-20">hourglass_empty</span>
              <p className="font-black uppercase tracking-widest text-sm">Your milestone list is clear</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamCountdown;
