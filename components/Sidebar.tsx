
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-line', label: 'Live Dashboard' },
    { id: 'upload', icon: 'fa-video', label: 'Video Analysis' },
    { id: 'records', icon: 'fa-database', label: 'Vehicle Database' },
    { id: 'settings', icon: 'fa-cog', label: 'System Settings' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-800">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-yellow-400 p-2 rounded-lg text-black">
          <i className="fas fa-traffic-light text-xl"></i>
        </div>
        <span className="font-black text-xl tracking-tighter">TRAFFIX AI</span>
      </div>
      
      <nav className="flex-1 mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/10' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${activeTab === item.id ? 'bg-black/10' : ''}`}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <img src="https://picsum.photos/40/40" className="rounded-full border-2 border-slate-700" alt="User" />
          <div className="overflow-hidden">
            <p className="text-xs font-black truncate text-white uppercase tracking-wider">Admin User</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Forensic Ops</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
