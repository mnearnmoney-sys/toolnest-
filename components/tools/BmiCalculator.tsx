
import React, { useState } from 'react';

const BmiCalculator: React.FC = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState(1.2);

  const bmi = weight / ((height/100) * (height/100));
  const bmr = gender === 'male' ? 
    (10 * weight) + (6.25 * height) - (5 * age) + 5 :
    (10 * weight) + (6.25 * height) - (5 * age) - 161;
  const tdee = bmr * activity;

  const getBmiStatus = (v: number) => {
    if (v < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (v < 25) return { label: 'Normal', color: 'text-green-500' };
    if (v < 30) return { label: 'Overweight', color: 'text-orange-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  const status = getBmiStatus(bmi);

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark">
      <h2 className="text-2xl font-bold mb-8 dark:text-white flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">monitor_weight</span> Health Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Weight (kg): {weight}</label>
            <input type="range" min="30" max="200" value={weight} onChange={e => setWeight(parseInt(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Height (cm): {height}</label>
            <input type="range" min="100" max="250" value={height} onChange={e => setHeight(parseInt(e.target.value))} className="w-full accent-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Age</label>
              <input type="number" value={age} onChange={e => setAge(parseInt(e.target.value))} className="w-full h-12 rounded-xl bg-slate-50 border-none shadow-inner" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value)} className="w-full h-12 rounded-xl bg-slate-50 border-none shadow-inner">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-primary/5 dark:bg-slate-900 space-y-8 text-center">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Your BMI</p>
            <h4 className="text-5xl font-black text-primary">{bmi.toFixed(1)}</h4>
            <p className={`font-bold mt-2 ${status.color}`}>{status.label}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-clay-btn">
              <p className="text-[10px] text-slate-400 font-bold uppercase">BMR</p>
              <p className="text-xl font-black text-primary">{Math.round(bmr)}</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-clay-btn">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Daily Cals</p>
              <p className="text-xl font-black text-primary">{Math.round(tdee)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;
