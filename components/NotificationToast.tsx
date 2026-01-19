
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const NotificationToast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-[200] animate-slide-in">
      <div className="bg-slate-900 border-l-4 border-yellow-400 text-white p-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[320px]">
        <div className="bg-yellow-400 text-black w-10 h-10 rounded-full flex items-center justify-center shrink-0">
          <i className="fas fa-paper-plane"></i>
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-yellow-400 uppercase tracking-widest">System Dispatch</p>
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
