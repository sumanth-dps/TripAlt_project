import { useEffect } from "react";

export default function Popup({ isOpen, onClose, children, display = "center" }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 bg-black/50 backdrop-blur-sm
        flex items-center justify-center
        p-4 z-9999
        animate-fadeInOverlay
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md
          animate-popupScale
          ${display === "bottom" ? "mt-auto rounded-b-none" : ""}
        `}
      >
        {children}
      </div>
    </div>
  );
}
