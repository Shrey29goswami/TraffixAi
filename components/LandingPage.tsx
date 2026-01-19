
import React from 'react';

interface LandingPageProps {
  onLogin: () => void;
  onSignUp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onSignUp }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-500/30 scroll-smooth">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500 blur-md opacity-30 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 p-2.5 rounded-xl text-black shadow-xl">
              <i className="fas fa-traffic-light text-xl"></i>
            </div>
          </div>
          <span className="font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-yellow-500">TRAFFIX AI</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-yellow-500/60 font-bold text-xs uppercase tracking-[0.2em]">
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-yellow-400 transition-colors">Capabilities</a>
          <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-yellow-400 transition-colors">Process</a>
          <a href="#impact" onClick={(e) => scrollToSection(e, 'impact')} className="hover:text-yellow-400 transition-colors">Impact</a>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={onLogin} className="text-yellow-500/80 font-bold hover:text-white transition-colors text-sm uppercase tracking-widest">Login</button>
          <button onClick={onSignUp} className="relative group overflow-hidden bg-yellow-400 text-black px-8 py-3 rounded-full font-black text-sm uppercase tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            <span className="relative z-10">Get Access</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-xl px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400 mb-10 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            Real-Time Urban Neural Network
          </div>
          
          <h1 className="text-6xl md:text-[5.5rem] font-black leading-[1] tracking-tight mb-10 text-white">
            Autonomous Traffic <br/>
            <span className="italic font-serif font-light text-yellow-400">Governance.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-yellow-100/40 leading-relaxed max-w-2xl mx-auto mb-16 font-medium">
            Deploy deep-learning architectures to eliminate congestion. Traffix AI identifies, tracks, and penalizes traffic violations with sub-second latency.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button onClick={onSignUp} className="bg-yellow-400 text-black px-12 py-5 rounded-2xl font-black text-lg shadow-[0_20px_40px_rgba(250,204,21,0.15)] hover:bg-yellow-300 hover:-translate-y-1 transition-all active:scale-95">
              Launch Console
            </button>
            
            <div className="flex flex-col items-start border-l border-yellow-400/20 pl-8">
               <span className="text-yellow-400 font-black text-2xl tracking-tighter">45M+</span>
               <span className="text-yellow-600 text-[10px] font-bold uppercase tracking-widest">Active Violations Detected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Grid */}
      <section id="impact" className="relative z-10 py-20 px-8 border-y border-yellow-400/5 bg-yellow-400/[0.02] scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
           {[
             { label: 'Fuel Efficiency', val: '+22%', icon: 'fa-gas-pump' },
             { label: 'Congestion Reduction', val: '-38%', icon: 'fa-road-circle-xmark' },
             { label: 'Public Safety Index', val: '+55%', icon: 'fa-shield-heart' },
             { label: 'Emergency Flow', val: '3.1x', icon: 'fa-truck-medical' }
           ].map((stat, i) => (
             <div key={i} className="group text-center">
               <div className="text-yellow-600 mb-4 group-hover:text-yellow-400 transition-colors">
                 <i className={`fas ${stat.icon} text-xl`}></i>
               </div>
               <p className="text-4xl font-black text-yellow-400 tracking-tighter mb-1">{stat.val}</p>
               <p className="text-[10px] font-bold text-yellow-600/60 uppercase tracking-widest">{stat.label}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-sm font-black text-yellow-500 uppercase tracking-[0.4em] mb-4">Core Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-black max-w-3xl leading-tight">State-of-the-art vision for the digital city.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'fa-microchip',
                title: 'SOLO Instance Segmentation',
                desc: 'Real-time pixel-level masking of vehicles, pedestrians, and obstacles even in low-visibility environments.'
              },
              {
                icon: 'fa-expand',
                title: 'Dynamic ANPR OCR',
                desc: 'High-speed character recognition engine for automatic number plate detection across multi-lane highways.'
              },
              {
                icon: 'fa-gavel',
                title: 'Auto-Enforcement',
                desc: 'Intelligent violation logic that triggers electronic challans for speeding, lane splitting, and signal jumping.'
              },
              {
                icon: 'fa-satellite-dish',
                title: 'IoT Cloud Sync',
                desc: 'Edge-to-cloud synchronization for real-time traffic density heatmaps and centralized city command.'
              },
              {
                icon: 'fa-shield-halved',
                title: 'Evidence Archiving',
                desc: 'Cryptographically secured video evidence for every flagged violation, ready for legal auditing.'
              },
              {
                icon: 'fa-network-wired',
                title: 'Flow Optimization',
                desc: 'AI agents that adjust signal phases dynamically to prevent bottleneck formation at major intersections.'
              }
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-[32px] bg-white/[0.02] border border-yellow-400/5 hover:bg-white/[0.05] hover:border-yellow-400/20 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 mb-8 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <i className={`fas ${f.icon} text-lg`}></i>
                </div>
                <h4 className="text-xl font-bold mb-4 text-white">{f.title}</h4>
                <p className="text-yellow-100/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Procedure */}
      <section id="how-it-works" className="relative z-10 py-32 px-8 bg-yellow-400/[0.02] scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-sm font-black text-yellow-500 uppercase tracking-[0.4em] mb-4">The Procedure</h2>
            <h3 className="text-4xl font-black text-white">From Footage to Enforcement</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent -z-10"></div>
            {[
              { step: '01', title: 'Data Capture', desc: 'Secure ingestion of live 4K streams from existing IP traffic cameras.' },
              { step: '02', title: 'DL Processing', desc: 'Frame-by-frame analysis using SOLO segmentation and SSD detection models.' },
              { step: '03', title: 'Violation Logic', desc: 'Spatio-temporal checking against traffic laws to identify illegal maneuvers.' },
              { step: '04', title: 'Automated Fine', desc: 'Instant dispatch of e-citations to the registered vehicle owner via SMS/Email.' }
            ].map((p, i) => (
              <div key={i} className="bg-black border border-yellow-400/10 p-8 rounded-3xl text-center hover:border-yellow-500/50 transition-colors shadow-2xl group">
                <span className="text-5xl font-black text-yellow-400/25 group-hover:text-yellow-400/50 block mb-6 transition-colors tracking-tighter">{p.step}</span>
                <h5 className="text-lg font-bold mb-3 text-white">{p.title}</h5>
                <p className="text-yellow-600/60 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="relative z-10 py-32 px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-8">Ready to revolutionize city enforcement?</h2>
          <button onClick={onSignUp} className="bg-black text-yellow-400 px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-xl">
            Integrate National Registry
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-yellow-400/5 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
             <div className="flex items-center gap-2">
                <div className="bg-yellow-400 p-1.5 rounded text-black text-[10px]"><i className="fas fa-traffic-light"></i></div>
                <span className="font-bold tracking-tighter text-white">TRAFFIX AI</span>
             </div>
             <p className="text-yellow-600/40 text-xs max-w-xs text-center md:text-left">
               The global gold standard in AI-driven traffic enforcement and neural urban analytics.
             </p>
          </div>
          
          <div className="flex gap-12 text-xs font-bold uppercase tracking-widest text-yellow-600/60">
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-yellow-400 transition-colors">Safety Standard</a>
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-yellow-400 transition-colors">API Console</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Compliance</a>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full border border-yellow-400/10 flex items-center justify-center text-yellow-600 hover:border-yellow-400 hover:text-white transition-all cursor-pointer">
              <i className="fab fa-x-twitter"></i>
            </div>
            <div className="w-10 h-10 rounded-full border border-yellow-400/10 flex items-center justify-center text-yellow-600 hover:border-yellow-400 hover:text-white transition-all cursor-pointer">
              <i className="fab fa-github"></i>
            </div>
            <div className="w-10 h-10 rounded-full border border-yellow-400/10 flex items-center justify-center text-yellow-600 hover:border-yellow-400 hover:text-white transition-all cursor-pointer">
              <i className="fab fa-linkedin-in"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
