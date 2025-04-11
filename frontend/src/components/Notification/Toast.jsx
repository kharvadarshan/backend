import { useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

const toastStyles = {
  success: {
    bg: "bg-green-50",
    border: "border-green-400",
    icon: <CheckCircle className="text-green-600" />,
    text: "text-green-800",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-400",
    icon: <XCircle className="text-red-600" />,
    text: "text-red-800",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-400",
    icon: <Info className="text-blue-600" />,
    text: "text-blue-800",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-400",
    icon: <AlertTriangle className="text-yellow-600" />,
    text: "text-yellow-800",
  },
};

export default function Toast({ type = "info", message, duration = 3000, onClose }) {
  const { bg, border, icon, text } = toastStyles[type] || toastStyles.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      onClick={onClose}
      className={`cursor-pointer flex items-center gap-3 px-4 py-3 mt-2 border-l-4 shadow rounded-lg ${bg} ${border} ${text} animate-fadeIn`}
    >
      {icon}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
