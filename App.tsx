
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
    <div className="min-h-screen flex bg-slate-50">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-[60] bg-slate-900 text-yellow-400 w-14 h-14 rounded-full shadow-xl flex items-center justify-center"
      >
        <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
      </button>

      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 fixed z-50 lg:relative`}>
        <Sidebar activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setIsSidebarOpen(false); }} />
      </div>
      
      <main className="flex-1 w-full lg:ml-64 p-4 md:p-8">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="animate-slide-in">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
              {activeTab === 'dashboard' ? 'Real-Time Operations' : 
               activeTab === 'upload' ? 'Forensic Suite' : 
               activeTab === 'records' ? 'Vehicle Registry' : 'System Configuration'}
            </h1>
            <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Neural Network Online
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
               <div className="relative">
                 <div className="bg-yellow-400 w-2.5 h-2.5 rounded-full absolute -top-1 -right-1 border-2 border-white"></div>
                 <i className="fas fa-bell text-slate-400"></i>
               </div>
               <span className="text-xs font-bold text-slate-600">3 Alerts</span>
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="bg-slate-900 text-yellow-400 px-6 py-2.5 rounded-2xl font-black text-sm hover:bg-yellow-400 hover:text-black transition-all shadow-lg"
            >
              Logoff
            </button>
          </div>
        </header>

        <div className="animate-fade-in relative">
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
