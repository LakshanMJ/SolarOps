import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

export default function Toast({ type, title, message, duration = 4000, onClose }: ToastProps) {
  const [status, setStatus] = useState<"entering" | "active" | "closing">("entering");
  const Icon = iconMap[type];

  useEffect(() => {
    const entryTimer = requestAnimationFrame(() => setStatus("active"));
    return () => cancelAnimationFrame(entryTimer);
  }, []);

  const handleClose = () => {
    setStatus("closing");
    setTimeout(onClose, 300);
  };

  return (
    <aside className={`toast-item ${type} ${status}`} role="alert">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
      `}</style>
      
      {/* 1. Icon Container */}
      <figure className="toast-icon">
        <Icon size={20} strokeWidth={2.5} />
      </figure>

      {/* 2. Text Wrapper (Handles vertical stacking of title and message) */}
      <section className="toast-content">
        {title && <header className="toast-title">{title}</header>}
        <p className="toast-message">{message}</p>
      </section>

      {/* 3. Close Button */}
      <button className="toast-close" onClick={handleClose} aria-label="Close">
        <X size={16} strokeWidth={2.5} />
      </button>

      {/* Progress Bar */}
      <span className="toast-progress" style={{ animationDuration: `${duration}ms` }} />

      <style>{`
        .toast-item {
          font-family: 'Inter', sans-serif;
          width: 420px;
          max-width: calc(100vw - 2rem);
          display: flex;
          align-items: flex-start; /* Aligns icon to the top of the first line */
          gap: 12px;
          padding: 16px 20px;
          border-radius: 14px;
          position: relative;
          overflow: hidden;
          pointer-events: auto;
          margin-bottom: 12px;
          
          /* Dark Glass Background */
          background: rgba(13, 18, 15, 0.85); 
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .entering { opacity: 0; transform: translateX(20px); }
        .active { opacity: 1; transform: translateX(0); }
        .closing { opacity: 0; transform: scale(0.95); }

        .toast-icon { 
          margin: 0; 
          flex-shrink: 0; 
          padding-top: 2px; /* Perfectly aligns icon with the center of the title line */
        }

        .toast-content { 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
          gap: 2px; /* Spacing between Title and Message */
        }

        .toast-title { 
          font-weight: 700; 
          font-size: 14.5px; 
          color: #FFFFFF; 
          line-height: 1.4;
        }

        .toast-message { 
          font-size: 13px; 
          color: rgba(255, 255, 255, 0.65); 
          line-height: 1.5;
          margin: 0;
        }
        
        .toast-close {
          background: none; border: none; cursor: pointer; color: rgba(255, 255, 255, 0.3);
          padding: 4px; border-radius: 6px; flex-shrink: 0;
          transition: all 0.2s;
        }
        .toast-close:hover { color: #fff; background: rgba(255, 255, 255, 0.1); }

        .toast-progress {
          position: absolute; bottom: 0; left: 0; height: 4px;
          background: currentColor;
          box-shadow: 0 0 8px currentColor;
          animation: toast-shrink linear forwards;
          transform-origin: left;
        }

        @keyframes toast-shrink { from { width: 100%; } to { width: 0%; } }

        /* Status Colors */
        .success { color: #10B981; } 
        .error { color: #FF4B4B; }
        .warning { color: #FFB800; }
        .info { color: #3B82F6; }
      `}</style>
    </aside>
  );
}