
import React, { useState } from 'react';

interface AuthFlowProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ onSuccess, onCancel }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slide-in">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded text-white"><i className="fas fa-traffic-light"></i></div>
              <span className="font-bold text-slate-900">TRAFFIX AI</span>
            </div>
            <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
          </h2>
          <p className="text-slate-500 mb-8">
            {mode === 'login' ? 'Access your dashboard' : mode === 'signup' ? 'Start managing traffic today' : 'Enter your email to continue'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input required type="email" placeholder="name@city.gov" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  {mode === 'login' && (
                    <button type="button" onClick={() => setMode('forgot')} className="text-xs text-indigo-600 font-bold hover:underline">Forgot?</button>
                  )}
                </div>
                <input required type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center"
            >
              {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : (mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Send Instructions')}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <button 
            onClick={onSuccess}
            className="mt-6 w-full py-3 border border-slate-200 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all font-bold text-slate-600"
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>
        </div>

        <div className="bg-slate-50 p-6 text-center text-sm font-medium text-slate-500">
          {mode === 'login' ? (
            <p>Don't have an account? <button onClick={() => setMode('signup')} className="text-indigo-600 font-bold hover:underline">Sign Up</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setMode('login')} className="text-indigo-600 font-bold hover:underline">Login</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthFlow;
