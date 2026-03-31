import { createContext, useContext, useState, ReactNode } from "react";
import Toast from "./Toast"; // Ensure this path matches your Toast.tsx file

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  addToast: (toast: Omit<ToastItem, "id">) => void;
}

// 1. Initialize the Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// 2. Export the Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

// 3. Export the Provider
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (toast: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    const duration = toast.duration || 2000;
    const newToast: ToastItem = { id, ...toast, duration };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove from state after duration + animation buffer
    setTimeout(() => {
      removeToast(id);
    }, duration + 300);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Semantic Container for stacking */}
      <section className="toast-stack-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </section>

      <style>{`
        .toast-stack-container {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          pointer-events: none;
        }
      `}</style>
    </ToastContext.Provider>
  );
};