
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LiveFeed from './components/LiveFeed';
import VideoUploader from './components/VideoUploader';
import DatabaseTable from './components/DatabaseTable';
import Settings from './components/Settings';
import ChatBot from './components/ChatBot';
import LandingPage from './components/LandingPage';
import AuthFlow from './components/AuthFlow';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <LiveFeed />;
      case 'upload': return <VideoUploader />;
      case 'records': return <DatabaseTable />;
      case 'settings': return <Settings />;
      default: return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage onLogin={() => setShowAuth(true)} onSignUp={() => setShowAuth(true)} />
        {showAuth && <AuthFlow onSuccess={handleAuthSuccess} onCancel={() => setShowAuth(false)} />}
      </>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-x-hidden">
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed/Drawer behavior */}
      <div className={`
        fixed inset-y-0 left-0 z-[60] w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setIsSidebarOpen(false); }} />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0 p-4 md:p-8 relative">
        {/* Mobile Sidebar Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-6 left-6 z-[70] bg-slate-900 text-yellow-400 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 border border-slate-700"
          aria-label="Toggle Menu"
        >
          <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>

        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="animate-slide-in">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
              {activeTab === 'dashboard' ? 'Real-Time Operations' : 
               activeTab === 'upload' ? 'Forensic Suite' : 
               activeTab === 'records' ? 'Vehicle Registry' : 'System Configuration'}
            </h1>
            <p className="text-slate-500 font-medium text-xs md:text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Neural Network Online
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
               <div className="relative">
                 <div className="bg-yellow-400 w-2 h-2 rounded-full absolute -top-0.5 -right-0.5 border border-white"></div>
                 <i className="fas fa-bell text-slate-400 text-sm"></i>
               </div>
               <span className="text-[10px] md:text-xs font-bold text-slate-600 whitespace-nowrap">3 System Alerts</span>
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="bg-slate-900 text-yellow-400 px-4 md:px-6 py-2.5 rounded-xl font-black text-xs md:text-sm hover:bg-yellow-400 hover:text-black transition-all shadow-md active:scale-95"
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className="animate-fade-in relative z-10">
          {renderContent()}
        </div>

        <ChatBot />
      </main>

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-in { animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default App;
