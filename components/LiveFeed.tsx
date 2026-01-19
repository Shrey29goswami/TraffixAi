
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { analyzeTrafficFrame } from '../services/geminiService';
import { MOCK_DATABASE } from '../constants';
import { DetectedVehicle } from '../types';

const LiveFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [detectedVehicles, setDetectedVehicles] = useState<DetectedVehicle[]>([]);
  const [stats, setStats] = useState({ flow: 42, violations: 3 });

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
        flow: s.flow + analysis.count, 
        violations: s.violations + (analysis.violations?.length || 0) 
      }));
    }
  }, [isCapturing]);

  useEffect(() => {
    let interval: number;
    if (isCapturing) {
      interval = window.setInterval(processFrame, 5000); // Process every 5s for demo
    }
    return () => clearInterval(interval);
  }, [isCapturing, processFrame]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              Live Intersection Feed
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={isCapturing ? stopCamera : startCamera}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isCapturing 
                    ? 'bg-rose-100 text-rose-600 hover:bg-rose-200' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isCapturing ? 'Stop Feed' : 'Start Feed'}
              </button>
            </div>
          </div>

          <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden group">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {!isCapturing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-800/50 backdrop-blur-sm">
                <i className="fas fa-video-slash text-4xl mb-2"></i>
                <p>Camera feed inactive</p>
              </div>
            )}

            {isCapturing && (
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="bg-black/50 backdrop-blur px-3 py-1 rounded text-white text-xs font-mono">
                  SOLO v2 / SSD ResNet
                </div>
                <div className="bg-black/50 backdrop-blur px-3 py-1 rounded text-white text-xs font-mono">
                  FPS: 30
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm font-medium">Daily Flow Rate</p>
            <h3 className="text-3xl font-bold text-indigo-600 mt-1">{stats.flow}</h3>
            <p className="text-xs text-emerald-500 mt-2 font-medium">
              <i className="fas fa-arrow-up mr-1"></i> 12% vs yesterday
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm font-medium">Detected Violations</p>
            <h3 className="text-3xl font-bold text-rose-500 mt-1">{stats.violations}</h3>
            <p className="text-xs text-rose-400 mt-2 font-medium">
              Manual review required
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="font-bold text-lg text-slate-800 mb-6">Real-time Recognition</h2>
        <div className="space-y-4">
          {detectedVehicles.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <i className="fas fa-magnifying-glass text-3xl mb-3"></i>
              <p>Waiting for data...</p>
            </div>
          ) : (
            detectedVehicles.map((v) => (
              <div key={v.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between animate-slide-in">
                <div>
                  <p className="font-mono text-lg font-bold text-slate-700">{v.plateNumber}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">{v.timestamp}</p>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  v.status === 'tracked' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {v.status}
                </span>
              </div>
            ))
          )}
        </div>
        
        <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors font-medium">
          View All Detections
        </button>
      </div>
    </div>
  );
};

export default LiveFeed;
