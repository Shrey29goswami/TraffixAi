
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
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-indigo-500 p-2 rounded-lg">
          <i className="fas fa-traffic-light text-xl"></i>
        </div>
        <span className="font-bold text-xl tracking-tight">TRAFFIX AI</span>
      </div>
      
      <nav className="flex-1 mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <i className={`fas ${item.icon} w-5`}></i>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800">
          <img src="https://picsum.photos/40/40" className="rounded-full" alt="User" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">Admin User</p>
            <p className="text-xs text-slate-400">Deep Learning Ops</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
