
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { analyzeTrafficFrame } from '../services/geminiService';
import { MOCK_DATABASE, registerVehicleIfNew } from '../constants';
import { DetectedVehicle } from '../types';
import NotificationToast from './NotificationToast';

const LiveFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [detectedVehicles, setDetectedVehicles] = useState<DetectedVehicle[]>([]);
  const [stats, setStats] = useState({ flow: 42, violations: 3 });
  const [notifications, setNotifications] = useState<string[]>([]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsCapturing(false);
    }
  };

  const processFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !isCapturing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    const base64 = canvas.toDataURL('image/jpeg').split(',')[1];
    const analysis = await analyzeTrafficFrame(base64);

    if (analysis && analysis.detectedPlates) {
      const newDetections: DetectedVehicle[] = analysis.detectedPlates.map((plate: string) => {
        // FEATURE: Auto-register plate
        const wasNew = registerVehicleIfNew(plate, 'Detected via Live');
        if (wasNew) {
          setNotifications(prev => [...prev, `New vehicle ${plate} automatically registered.`]);
        }

        const isRegistered = MOCK_DATABASE.some(v => v.plateNumber === plate);
        return {
          id: Math.random().toString(36).substr(2, 9),
          plateNumber: plate,
          timestamp: new Date().toLocaleTimeString(),
          status: isRegistered ? 'tracked' : 'violating',
          confidence: 0.95
        };
      });

      setDetectedVehicles(prev => [...newDetections, ...prev].slice(0, 10));
      setStats(s => ({ 
        flow: s.flow + (analysis.count || 0), 
        violations: s.violations + (analysis.violations?.length || 0) 
      }));
    }
  }, [isCapturing]);

  useEffect(() => {
    let interval: number;
    if (isCapturing) {
      interval = window.setInterval(processFrame, 7000); 
    }
    return () => clearInterval(interval);
  }, [isCapturing, processFrame]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {notifications.map((note, i) => (
        <NotificationToast key={i} message={note} onClose={() => setNotifications(prev => prev.filter((_, idx) => idx !== i))} />
      ))}
      
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              Live Intersection Feed
            </h2>
            <button 
              onClick={isCapturing ? stopCamera : startCamera}
              className={`w-full sm:w-auto px-6 py-2 rounded-xl font-bold transition-all ${
                isCapturing 
                  ? 'bg-rose-100 text-rose-600 hover:bg-rose-200' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isCapturing ? 'Stop Feed' : 'Start Feed'}
            </button>
          </div>

          <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-inner">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />
            
            {!isCapturing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-800/80 backdrop-blur-sm px-6 text-center">
                <i className="fas fa-video-slash text-4xl mb-3"></i>
                <p className="font-bold">Neural feed inactive</p>
                <p className="text-xs mt-1">Initialize sensor stream to begin tracking</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Flow Rate</p>
            <h3 className="text-3xl font-black text-indigo-600 mt-1">{stats.flow}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Violations</p>
            <h3 className="text-3xl font-black text-rose-500 mt-1">{stats.violations}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
        <h2 className="font-bold text-lg text-slate-800 mb-6 flex items-center justify-between">
          <span>Active Tracks</span>
          <span className="bg-indigo-50 text-indigo-600 text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Real-time</span>
        </h2>
        <div className="space-y-3 overflow-y-auto max-h-[400px] flex-1 pr-2">
          {detectedVehicles.length === 0 ? (
            <div className="text-center py-20 text-slate-300">
              <i className="fas fa-satellite-dish text-3xl mb-3 animate-pulse"></i>
              <p className="text-xs font-bold uppercase tracking-widest">Scanning Grid...</p>
            </div>
          ) : (
            detectedVehicles.map((v) => (
              <div key={v.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between animate-slide-in">
                <div>
                  <p className="font-mono text-base font-black text-slate-800 tracking-tight">{v.plateNumber}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{v.timestamp}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                  v.status === 'tracked' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {v.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
