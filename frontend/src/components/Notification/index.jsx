import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const toastColors = {
  success: {
    bg: "bg-green-100",
    border: "border-green-400",
    icon: <CheckCircle className="text-green-600 w-6 h-6" />,
    text: "text-green-700",
  },
  error: {
    bg: "bg-red-100",
    border: "border-red-400",
    icon: <XCircle className="text-red-600 w-6 h-6" />,
    text: "text-red-700",
  },
};

const CustomToast = ({ type = "success", message = "", onClose }) => {
  const { bg, border, icon, text } = toastColors[type] || toastColors.success;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (typeof onClose === "function") onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    if (typeof onClose === "function") onClose();
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleClose}
      className={`cursor-pointer fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4 py-3 rounded-lg shadow-lg border-l-4 ${bg} ${border} flex items-center gap-3 animate-fadeIn`}
    >
      {icon}
      <span className={`text-sm font-medium ${text}`}>{message}</span>
    </div>
  );
};

export default CustomToast;


// import { useState } from "react";
// import CustomToast from "./CustomToast";

// export default function Notification() {
//   const [toast, setToast] = useState(null);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <button
//         onClick={() =>
//           setToast({ type: "success", message: "Everything worked perfectly!" })
//         }
//         className="px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
//       >
//         Show Toast
//       </button>

//       {toast && (
//         <CustomToast
//           type={toast.type}
//           message={toast.message}
//           onClose={() => setToast(null)}
//         />
//       )}
//     </div>
//   );
// }
