
import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { TOOLS, CATEGORIES } from './constants';
import { Tool, ToolCategory, ChatMessage } from './types';

// Tool Components
import QrCodeMaker from './components/tools/QrCodeMaker';
import WordCounter from './components/tools/WordCounter';
import PasswordGenerator from './components/tools/PasswordGenerator';
import ImageCompressor from './components/tools/ImageCompressor';
import UnitConverter from './components/tools/UnitConverter';
import InvoiceGenerator from './components/tools/InvoiceGenerator';
import ColorPaletteExtractor from './components/tools/ColorPaletteExtractor';
import BmiCalculator from './components/tools/BmiCalculator';

// Student Kit Tools
import PdfMerger from './components/tools/student/PdfMerger';
import ImagesToPdf from './components/tools/student/ImagesToPdf';
import ZipCreator from './components/tools/student/ZipCreator';
import ScientificCalculator from './components/tools/student/ScientificCalculator';
import ExamCountdown from './components/tools/student/ExamCountdown';
import TimetableMaker from './components/tools/student/TimetableMaker';

// Reusable Components
import AuthModal from './components/common/AuthModal';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthMode, setInitialAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: chatInput,
        config: { systemInstruction: 'You are ToolNest Student Assistant. Help students with PDF merging, class schedules, and calculators.' }
      });
      setChatMessages(prev => [...prev, { role: 'model', text: response.text || "I'm here to help!" }]);
    } catch (e) {
      setChatMessages(prev => [...prev, { role: 'model', text: "AI is busy, but your tools are ready!" }]);
    } finally { setIsTyping(false); }
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setInitialAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const renderActiveTool = () => {
    switch (activeToolId) {
      case 'qr-generator': return <QrCodeMaker />;
      case 'image-compressor': return <ImageCompressor />;
      case 'password-checker': return <PasswordGenerator />;
      case 'unit-converter': return <UnitConverter />;
      case 'invoice-generator': return <InvoiceGenerator />;
      case 'color-palette': return <ColorPaletteExtractor />;
      case 'word-counter': return <WordCounter />;
      case 'bmi-calculator': return <BmiCalculator />;
      // Student Kit
      case 'pdf-merger': return <PdfMerger />;
      case 'images-to-pdf': return <ImagesToPdf />;
      case 'zip-creator': return <ZipCreator />;
      case 'scientific-calc': return <ScientificCalculator />;
      case 'exam-countdown': return <ExamCountdown />;
      case 'timetable-gen': return <TimetableMaker />;
      default: return null;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 px-4 py-4 md:px-8 bg-[#f0f4ff]/80 dark:bg-[#0f172a]/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveToolId(null)}>
            <div className="size-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-400 text-white shadow-lg transform transition-transform group-hover:rotate-6">
              <span className="material-symbols-outlined">construction</span>
            </div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">ToolNest</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <button onClick={() => setDarkMode(!darkMode)} className="hidden sm:flex items-center justify-center size-10 rounded-full bg-[#f0f4ff] dark:bg-[#1e293b] shadow-clay-btn text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => openAuth('login')}
                className="px-5 h-10 rounded-full text-sm font-bold text-slate-600 dark:text-slate-300 shadow-clay-btn dark:shadow-clay-card-dark hover:text-primary transition-all active:scale-95"
              >
                Log In
              </button>
              <button 
                onClick={() => openAuth('signup')}
                className="hidden sm:flex items-center justify-center h-10 px-6 rounded-full bg-primary text-white font-bold text-sm shadow-[4px_4px_8px_rgba(19,127,236,0.3),-4px_-4px_8px_rgba(255,255,255,0.5)] hover:shadow-[6px_6px_12px_rgba(19,127,236,0.4),-6px_-6px_12px_rgba(255,255,255,0.6)] transition-all transform hover:-translate-y-0.5"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        {activeToolId ? (
          <div className="w-full max-w-4xl">
            <button onClick={() => setActiveToolId(null)} className="mb-6 flex items-center gap-2 font-bold text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">arrow_back</span> Back
            </button>
            {renderActiveTool()}
          </div>
        ) : (
          <div className="w-full max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary font-bold text-xs uppercase tracking-widest mb-4 animate-fadeIn">
                <span className="material-symbols-outlined text-sm">school</span>
                Student Kit v1.0
              </div>
              <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-4">Master Your Studies</h2>
              <p className="text-slate-500 text-lg">Powerful student tools, crafted with elegance and privacy.</p>
              <div className="mt-8 max-w-xl mx-auto relative group">
                <input 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-[#f0f4ff] dark:bg-[#1e293b] shadow-clay-pressed border-none text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all"
                  placeholder="Search student tools..."
                />
                <span className="material-symbols-outlined absolute left-4 top-4 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar mb-10 pb-2">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat as ToolCategory)}
                  className={`px-6 h-10 rounded-full text-sm font-bold transition-all shrink-0 ${activeCategory === cat ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-slate-800 shadow-clay-btn text-slate-500 hover:text-primary'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredTools.map(tool => (
                <div 
                  key={tool.id} 
                  className="p-6 rounded-[2rem] bg-white dark:bg-slate-800 shadow-clay-card dark:shadow-clay-card-dark group hover:scale-[1.02] transition-all cursor-pointer border border-transparent hover:border-primary/20" 
                  onClick={() => setActiveToolId(tool.id)}
                >
                  <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 transition-transform group-hover:rotate-6 shadow-inner">
                    <span className="material-symbols-outlined text-3xl">{tool.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-slate-500 mb-6 line-clamp-2 h-10">{tool.description}</p>
                  <button className="w-full h-10 rounded-full bg-[#f0f4ff] dark:bg-slate-700 text-primary font-bold group-hover:bg-primary group-hover:text-white transition-all shadow-clay-btn">
                    Open Tool
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={initialAuthMode} 
      />

      <footer className="w-full px-6 py-12 mt-auto bg-[#f0f4ff] dark:bg-[#1e293b]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-lg">
              <span className="material-symbols-outlined text-primary">construction</span>
              ToolNest
            </div>
            <p className="text-sm text-slate-500">© 2024 ToolNest. Student-first, Privacy-always.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
             <div className="flex gap-4">
               <button className="px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">Privacy Policy</button>
               <button className="px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">Terms of Use</button>
             </div>
          </div>
        </div>
      </footer>

      <div className={`fixed bottom-24 right-6 w-80 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 transform ${isChatOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="bg-primary p-4 text-white font-bold flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">smart_toy</span>
            <span>Study Assistant</span>
          </div>
          <button onClick={() => setIsChatOpen(false)} className="hover:rotate-90 transition-transform"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="h-64 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-800 space-y-3 no-scrollbar">
          {chatMessages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-xs shadow-sm ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && <div className="text-[10px] text-slate-400 animate-pulse">Assistant is typing...</div>}
        </div>
        <div className="p-3 border-t dark:border-slate-700 flex gap-2">
          <input 
            value={chatInput} 
            onChange={e => setChatInput(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()} 
            className="flex-grow rounded-full text-xs bg-slate-100 dark:bg-slate-800 border-none px-4" 
            placeholder="Type your study question..." 
          />
          <button onClick={handleSendMessage} className="bg-primary text-white p-2 rounded-full"><span className="material-symbols-outlined text-sm">send</span></button>
        </div>
      </div>
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)} 
        className="fixed bottom-6 right-6 size-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[60]"
      >
        <span className="material-symbols-outlined">{isChatOpen ? 'close' : 'chat_bubble'}</span>
      </button>
    </>
  );
};

export default App;
