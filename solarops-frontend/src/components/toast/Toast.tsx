import { useEffect, useState } from "react";
import "./toast.css";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

const icons: Record<ToastType, string> = {
  success: "✔️",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

export default function Toast({
  type,
  title,
  message,
  duration = 4000,
  onClose,
}: ToastProps) {
  const [closing, setClosing] = useState(false);

  // auto close timer
  useEffect(() => {
    const timer = setTimeout(() => setClosing(true), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  // remove after animation
  useEffect(() => {
    if (closing) {
      const timer = setTimeout(onClose, 300);
      return () => clearTimeout(timer);
    }
  }, [closing, onClose]);

  return (
    <div
      className={`toast ${type} ${closing ? "closing" : ""}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="toast-icon">{icons[type]}</div>

      <div className="toast-content">
        {title && <div className="toast-title">{title}</div>}
        <div className="toast-message">{message}</div>
      </div>

      <button
        className="toast-close"
        onClick={() => setClosing(true)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}