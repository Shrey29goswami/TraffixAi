
import React, { useState } from 'react';
import { MOCK_DATABASE, registerVehicleIfNew } from '../constants';
import NotificationToast from './NotificationToast';

interface AnalysisResult {
  id: string;
  timestamp: string;
  plate: string;
  type: string;
  confidence: number;
  violation: string | null;
  speed: string;
}

const VideoUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  const stages = [
    "Initializing SOLO v2 Segmentation...",
    "Extracting Spatio-Temporal Features...",
    "Running ANPR OCR Pipeline...",
    "Cross-referencing RTO Database...",
    "Generating Forensic Reports..."
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResults([]);
      setProgress(0);
    }
  };

  const startAnalysis = () => {
    if (!file) return;
    setProcessing(true);
    let p = 0;
    
    const interval = setInterval(() => {
      p += Math.random() * 5;
      const stageIndex = Math.floor((p / 100) * stages.length);
      setCurrentStage(stages[Math.min(stageIndex, stages.length - 1)]);

      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setProcessing(false);
        const mockResults: AnalysisResult[] = [
          { id: '1', timestamp: '00:04', plate: 'MH-12-DE-4532', type: 'SUV', confidence: 0.98, violation: 'Red Light Jump', speed: '42 km/h' },
          { id: '2', timestamp: '00:12', plate: 'DL-3C-AS-1102', type: 'Sedan', confidence: 0.94, violation: null, speed: '38 km/h' },
          { id: '3', timestamp: '00:45', plate: 'ABC-1234', type: 'SUV', confidence: 0.89, violation: 'Speeding', speed: '95 km/h' },
          { id: '4', timestamp: '01:02', plate: 'KA-05-NB-2231', type: 'Compact', confidence: 0.97, violation: null, speed: '40 km/h' },
        ];
        setResults(mockResults);

        // Update Database and Dispatch Notifications
        mockResults.forEach(res => {
          // FEATURE: Auto-register every detected plate
          const wasNew = registerVehicleIfNew(res.plate, res.type);
          if (wasNew) {
            setNotifications(prev => [...prev, `New vehicle ${res.plate} detected and added to database.`]);
          }

          if (res.violation) {
            const vehicle = MOCK_DATABASE.find(v => v.plateNumber === res.plate);
            if (vehicle) {
              const amount = res.violation === 'Speeding' ? 1500 : 1000;
              vehicle.history.push({
                id: `F-${Math.floor(Math.random() * 10000)}`,
                date: new Date().toLocaleDateString(),
                location: 'Intersection A4-Forensic',
                type: res.violation,
                amount: amount,
                status: 'pending'
              });
              setNotifications(prev => [...prev, `Fine of ₹${amount} issued to ${res.plate} for ${res.violation}. Records updated.`]);
            }
          }
        });
      }
      setProgress(p);
    }, 200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {notifications.map((note, i) => (
        <NotificationToast key={i} message={note} onClose={() => setNotifications(prev => prev.filter((_, idx) => idx !== i))} />
      ))}

      <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="flex-1 text-left">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">Forensic Video Intelligence</h2>
            <p className="text-slate-500 font-medium text-sm md:text-base">Upload multi-lane surveillance footage for deep-pixel analysis and violation reconstruction.</p>
          </div>
          
          <div className="flex gap-2 md:gap-4">
             <div className="text-center px-4 md:px-6 py-2 bg-indigo-50 rounded-2xl border border-indigo-100">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Model</p>
                <p className="text-xs md:text-sm font-black text-indigo-700">SOLO-ResNet101</p>
             </div>
             <div className="text-center px-4 md:px-6 py-2 bg-emerald-50 rounded-2xl border border-emerald-100 hidden sm:block">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Latency</p>
                <p className="text-xs md:text-sm font-black text-emerald-700">45ms / Frame</p>
             </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10 group relative border-4 border-dashed border-slate-100 rounded-[30px] md:rounded-[40px] p-10 md:p-16 flex flex-col items-center hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-500">
          <div className="bg-indigo-600 w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[28px] flex items-center justify-center text-white text-2xl md:text-3xl mb-6 shadow-2xl shadow-indigo-200 group-hover:scale-110 transition-transform">
            <i className="fas fa-film"></i>
          </div>
          <input 
            type="file" 
            id="videoInput" 
            accept="video/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
          <label 
            htmlFor="videoInput" 
            className="cursor-pointer bg-slate-900 text-white px-8 md:px-10 py-3 md:py-4 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl active:scale-95 text-sm md:text-base text-center"
          >
            {file ? file.name : 'Drop Footage Here or Browse'}
          </label>
        </div>

        {file && !processing && results.length === 0 && (
          <button 
            onClick={startAnalysis}
            className="mt-8 w-full py-4 md:py-5 bg-indigo-600 text-white rounded-2xl font-black text-base md:text-lg hover:bg-indigo-700 transition-all shadow-xl flex items-center justify-center gap-3"
          >
            <i className="fas fa-brain"></i>
            Initialize Deep Learning Pipeline
          </button>
        )}

        {processing && (
          <div className="mt-10 p-6 md:p-8 bg-slate-900 rounded-[32px] text-white shadow-2xl">
            <div className="flex justify-between items-end mb-4 md:mb-6">
              <div>
                <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Active Pipeline</p>
                <h4 className="text-lg md:text-xl font-bold truncate max-w-[200px] md:max-w-none">{currentStage}</h4>
              </div>
              <span className="text-2xl md:text-3xl font-black text-indigo-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 md:h-4 overflow-hidden p-1">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-blue-400 h-full rounded-full transition-all duration-300 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="animate-fade-in space-y-8">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Analysis Breakdown</h3>
            <button className="bg-white border border-slate-200 px-4 md:px-6 py-2 rounded-xl font-bold text-xs md:text-sm text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">
              <i className="fas fa-file-pdf mr-2 text-rose-500"></i> Export
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white p-4 md:p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Detections</p>
              <p className="text-2xl md:text-3xl font-black text-indigo-600 mt-2">1,402</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unique</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 mt-2">84</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Violations</p>
              <p className="text-2xl md:text-3xl font-black text-rose-500 mt-2">12</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confidence</p>
              <p className="text-2xl md:text-3xl font-black text-emerald-500 mt-2">94%</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((res) => (
              <div key={res.id} className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300">
                <div className="h-32 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                   <div className="bg-white px-4 py-2 rounded-md font-mono font-black text-lg md:text-xl tracking-wider text-slate-800 border-2 border-slate-400 transform rotate-[-2deg] shadow-inner relative z-10">
                     {res.plate}
                   </div>
                   <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="font-black text-slate-900 tracking-tight">{res.type}</h5>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.timestamp}</p>
                    </div>
                    <span className="text-indigo-600 font-bold text-xs">{res.speed}</span>
                  </div>
                  
                  {res.violation ? (
                    <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl">
                       <p className="text-[10px] font-bold text-rose-600 uppercase mb-1">Violation</p>
                       <p className="text-xs font-black text-rose-800">{res.violation}</p>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
                       <p className="text-[10px] font-bold text-emerald-600 uppercase">Clear</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
