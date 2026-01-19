
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [theme, setTheme] = useState('Light High-Contrast');
  const [sound, setSound] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3">
          <i className="fas fa-user-circle text-yellow-400"></i>
          Account Configuration
        </h3>
        <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <img src="https://picsum.photos/80/80" className="w-20 h-20 rounded-full border-4 border-white shadow-md" alt="Admin" />
          <div className="flex-1">
            <h4 className="text-lg font-bold text-slate-900">Administrator Access</h4>
            <p className="text-slate-400 text-sm">Deep Learning Engineering Team (Municipal ID: #4402)</p>
          </div>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
            Update Profile
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6 tracking-tight">App Preferences</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800 text-sm">Interface Color</p>
                <p className="text-xs text-slate-400">Primary dashboard accents</p>
              </div>
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none"
              >
                <option>Yellow & Black</option>
                <option>Indigo Corporate</option>
                <option>Dark Mode Forensic</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800 text-sm">System Sounds</p>
                <p className="text-xs text-slate-400">Violation audio alerts</p>
              </div>
              <button 
                onClick={() => setSound(!sound)}
                className={`w-12 h-6 rounded-full relative transition-all ${sound ? 'bg-yellow-400' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${sound ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6 tracking-tight">Database Operations</h3>
          <div className="space-y-4">
            <button className="w-full text-left p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-yellow-50 transition-all flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">Clear Daily Cache</span>
              <i className="fas fa-trash-alt text-slate-400"></i>
            </button>
            <button className="w-full text-left p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-yellow-50 transition-all flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">Audit Fine Logs</span>
              <i className="fas fa-clipboard-list text-slate-400"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
