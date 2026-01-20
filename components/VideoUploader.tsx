
import React, { useState, useRef } from 'react';
import { MOCK_DATABASE, registerVehicleIfNew } from '../constants';
import { analyzeTrafficVideo } from '../services/geminiService';
import NotificationToast from './NotificationToast';

interface AnalysisResult {
  id: string;
  timestamp: string;
  plate: string;
  type: 'Car' | 'Bike' | 'Truck' | 'SUV' | 'Compact';
  confidence: number;
  violation: string | null;
  speed: string;
}

interface DeepReport {
  summary: string;
  counts: { cars: number; bikes: number; trucks: number };
  risks: string[];
  recommendations: string[];
}

const VideoUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [deepReport, setDeepReport] = useState<DeepReport | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const stages = [
    "Uploading Forensic Payload...",
    "Gemini 3 Pro: Temporal Decoding...",
    "Object Trajectory Profiling...",
    "Cross-referencing RTO Database...",
    "Finalizing Executive Intelligence Report..."
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResults([]);
      setDeepReport(null);
      setProgress(0);
    }
  };

  const captureFrames = (): Promise<string[]> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file!);
      video.load();
      const frames: string[] = [];
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        let currentTime = 0;
        const duration = video.duration;
        const interval = duration / 5;

        const capture = () => {
          if (currentTime <= duration && frames.length < 5) {
            video.currentTime = currentTime;
            currentTime += interval;
          } else {
            resolve(frames);
          }
        };

        video.onseeked = () => {
          ctx?.drawImage(video, 0, 0);
          frames.push(canvas.toDataURL('image/jpeg').split(',')[1]);
          capture();
        };

        capture();
      };
    });
  };

  const startAnalysis = async () => {
    if (!file) return;
    setProcessing(true);
    let p = 0;
    
    // Simulate progress while calling Gemini
    const progressInterval = setInterval(() => {
      p += Math.random() * 2;
      if (p > 90) p = 95;
      const stageIndex = Math.floor((p / 100) * stages.length);
      setCurrentStage(stages[Math.min(stageIndex, stages.length - 1)]);
      setProgress(p);
    }, 300);

    try {
      const frames = await captureFrames();
      const report = await analyzeTrafficVideo(frames);
      
      clearInterval(progressInterval);
      setProgress(100);
      setDeepReport(report);

      // Map mock detailed results for individual vehicle tracking
      const mockResults: AnalysisResult[] = [
        { id: '1', timestamp: '00:04', plate: 'MH-12-DE-4532', type: 'SUV', confidence: 0.98, violation: 'Red Light Jump', speed: '42 km/h' },
        { id: '2', timestamp: '00:12', plate: 'DL-3C-AS-1102', type: 'Car', confidence: 0.94, violation: null, speed: '38 km/h' },
        { id: '3', timestamp: '00:45', plate: 'ABC-1234', type: 'SUV', confidence: 0.89, violation: 'Speeding', speed: '95 km/h' },
        { id: '5', timestamp: '01:15', plate: 'RJ-14-BT-9901', type: 'Truck', confidence: 0.95, violation: 'Lane Violation', speed: '30 km/h' },
        { id: '6', timestamp: '01:22', plate: 'UP-32-ZZ-1111', type: 'Bike', confidence: 0.92, violation: null, speed: '45 km/h' },
      ];
      setResults(mockResults);

      mockResults.forEach(res => {
        registerVehicleIfNew(res.plate, res.type);
      });

      setNotifications(prev => [...prev, "Deep Video Intelligence Report Generated."]);
    } catch (error) {
      console.error(error);
      setNotifications(prev => [...prev, "Critical: Video analysis failed."]);
    } finally {
      setProcessing(false);
    }
  };

  const fleetStats = deepReport?.counts || { cars: 0, bikes: 0, trucks: 0 };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {notifications.map((note, i) => (
        <NotificationToast key={i} message={note} onClose={() => setNotifications(prev => prev.filter((_, idx) => idx !== i))} />
      ))}

      <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="flex-1 text-left">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight flex items-center gap-3">
              <i className="fas fa-brain text-indigo-600"></i>
              Forensic Intelligence
            </h2>
            <p className="text-slate-500 font-medium text-sm md:text-base">Upload multi-lane surveillance footage for Gemini 3 Pro deep-video understanding.</p>
          </div>
          
          <div className="flex gap-2">
             <div className="text-center px-6 py-2 bg-indigo-50 rounded-2xl border border-indigo-100">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Model</p>
                <p className="text-xs font-black text-indigo-700">Gemini 3 Pro</p>
             </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10 group relative border-4 border-dashed border-slate-100 rounded-[30px] md:rounded-[40px] p-10 md:p-16 flex flex-col items-center hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-500">
          <div className="bg-indigo-600 w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[28px] flex items-center justify-center text-white text-2xl md:text-3xl mb-6 shadow-2xl shadow-indigo-200 group-hover:scale-110 transition-transform">
            <i className="fas fa-video"></i>
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
            {file ? file.name : 'Ingest Surveillance Footage'}
          </label>
        </div>

        {file && !processing && !deepReport && (
          <button 
            onClick={startAnalysis}
            className="mt-8 w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl flex items-center justify-center gap-3"
          >
            <i className="fas fa-microchip"></i>
            Run Deep Understanding Pipeline
          </button>
        )}

        {processing && (
          <div className="mt-10 p-8 bg-slate-900 rounded-[32px] text-white shadow-2xl">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Neural Processing</p>
                <h4 className="text-lg md:text-xl font-bold">{currentStage}</h4>
              </div>
              <span className="text-3xl font-black text-indigo-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden p-1">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-blue-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {deepReport && (
        <div className="animate-fade-in space-y-8">
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Executive Forensic Report</h3>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Generated by Traffix Brain v3.0</p>
              </div>
              <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2">
                <i className="fas fa-check-circle"></i> High Confidence Analysis
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Analysis Summary</h4>
                  <p className="text-slate-700 leading-relaxed text-sm font-medium">{deepReport.summary}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                    <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-4">Risk Assessment</h4>
                    <ul className="space-y-3">
                      {deepReport.risks.map((risk, i) => (
                        <li key={i} className="text-xs font-bold text-rose-800 flex items-start gap-2">
                          <i className="fas fa-exclamation-triangle mt-0.5"></i>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Recommendations</h4>
                    <ul className="space-y-3">
                      {deepReport.recommendations.map((rec, i) => (
                        <li key={i} className="text-xs font-bold text-indigo-800 flex items-start gap-2">
                          <i className="fas fa-lightbulb mt-0.5"></i>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fleet Composition</p>
                  <div className="flex justify-around mt-6">
                    <div>
                      <i className="fas fa-car text-blue-500 mb-2 block"></i>
                      <span className="text-2xl font-black text-slate-800">{fleetStats.cars}</span>
                    </div>
                    <div>
                      <i className="fas fa-motorcycle text-orange-500 mb-2 block"></i>
                      <span className="text-2xl font-black text-slate-800">{fleetStats.bikes}</span>
                    </div>
                    <div>
                      <i className="fas fa-truck text-indigo-500 mb-2 block"></i>
                      <span className="text-2xl font-black text-slate-800">{fleetStats.trucks}</span>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Flow Count</p>
                    <p className="text-4xl font-black text-indigo-600">{(fleetStats.cars || 0) + (fleetStats.bikes || 0) + (fleetStats.trucks || 0)}</p>
                  </div>
                </div>
                
                <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg overflow-hidden relative">
                   <div className="relative z-10">
                     <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">Estimated Revenue</p>
                     <p className="text-3xl font-black text-white">₹{results.filter(r => r.violation).length * 1000}</p>
                     <p className="text-[10px] text-slate-400 mt-1">Based on {results.filter(r => r.violation).length} tracked violations</p>
                   </div>
                   <i className="fas fa-money-bill-wave absolute bottom-[-10px] right-[-10px] text-5xl text-white/5 transform rotate-[-15deg]"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((res) => (
              <div key={res.id} className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300">
                <div className="h-32 bg-slate-900 relative flex items-center justify-center">
                   <div className="bg-white px-4 py-2 rounded-md font-mono font-black text-lg tracking-wider text-slate-800 border-2 border-slate-400 transform rotate-[-2deg] shadow-inner z-10">
                     {res.plate}
                   </div>
                   <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-0.5 rounded-full text-[9px] font-black uppercase z-20">
                     {res.type}
                   </div>
                   <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <i className={`fas ${res.type === 'Bike' ? 'fa-motorcycle' : res.type === 'Truck' ? 'fa-truck' : 'fa-car'} text-xs`}></i>
                      </div>
                      <div>
                        <h5 className="font-black text-slate-900 text-sm leading-none mb-1">{res.type}</h5>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.timestamp}</p>
                      </div>
                    </div>
                    <span className="text-indigo-600 font-bold text-xs">{res.speed}</span>
                  </div>
                  {res.violation ? (
                    <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl">
                       <p className="text-[10px] font-bold text-rose-600 uppercase mb-1">Violation</p>
                       <p className="text-xs font-black text-rose-800">{res.violation}</p>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-center">
                       <p className="text-[10px] font-bold text-emerald-600 uppercase">Compliant</p>
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
