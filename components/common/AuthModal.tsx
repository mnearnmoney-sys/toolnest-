
import React, { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
      // Small delay to trigger entry animation
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(authMode === 'login' ? 'Successfully logged in!' : 'Successfully registered!');
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div 
        className={`relative w-full max-w-md bg-[#f0f4ff] dark:bg-[#1e293b] rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark p-8 transition-all duration-500 ease-out transform ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-12'
        }`}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-slate-400 hover:text-primary transition-colors size-8 flex items-center justify-center rounded-full hover:bg-white/50 dark:hover:bg-black/20"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        
        {/* Brand/Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="size-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-400 text-white shadow-lg mb-4 transform transition-transform hover:rotate-6">
            <span className="material-symbols-outlined text-3xl">construction</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Join thousands of creators on ToolNest
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex bg-[#e8f0fe] dark:bg-[#0f172a] p-1.5 rounded-2xl shadow-clay-pressed dark:shadow-clay-pressed-dark mb-8">
          <button 
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-grow py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
              authMode === 'login' 
                ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' 
                : 'text-slate-400 hover:text-slate-500'
            }`}
          >
            Log In
          </button>
          <button 
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-grow py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
              authMode === 'signup' 
                ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' 
                : 'text-slate-400 hover:text-slate-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {authMode === 'signup' && (
              <div className="animate-fadeIn">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">person</span>
                  <input 
                    required 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full h-12 pl-12 rounded-xl bg-white dark:bg-slate-900 shadow-clay-pressed dark:shadow-clay-pressed-dark border-none focus:ring-2 focus:ring-primary/50 dark:text-white placeholder:text-slate-300 text-sm" 
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">mail</span>
                <input 
                  required 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full h-12 pl-12 rounded-xl bg-white dark:bg-slate-900 shadow-clay-pressed dark:shadow-clay-pressed-dark border-none focus:ring-2 focus:ring-primary/50 dark:text-white placeholder:text-slate-300 text-sm" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Password</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">lock</span>
                <input 
                  required 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full h-12 pl-12 rounded-xl bg-white dark:bg-slate-900 shadow-clay-pressed dark:shadow-clay-pressed-dark border-none focus:ring-2 focus:ring-primary/50 dark:text-white placeholder:text-slate-300 text-sm" 
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full h-14 rounded-full bg-primary text-white font-black text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all transform"
            >
              {authMode === 'login' ? 'Log In' : 'Get Started Free'}
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-slate-400 text-center">
              By continuing, you agree to our <span className="text-primary font-bold cursor-pointer hover:underline">Terms</span> and <span className="text-primary font-bold cursor-pointer hover:underline">Privacy Policy</span>
            </p>
            <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
            <button 
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-xs font-bold text-slate-500 hover:text-primary transition-colors"
            >
              {authMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
