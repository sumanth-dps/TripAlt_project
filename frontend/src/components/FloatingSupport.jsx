import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";

export default function FloatingSupport({ hotel }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  /* ---------------- SETTINGS ---------------- */
  const WHATSAPP_NUMBER = "919876543210"; // 👉 your number
  const CALL_NUMBER = "+919848508925";

  /* ---------------- PAGE RULES ---------------- */
  const isAdmin =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/owner")||
    location.pathname.startsWith("/staff");

  const isAllowedPage =
    location.pathname === "/" ||
    location.pathname.includes("/");

  if (isAdmin || !isAllowedPage) return null;

  /* ---------------- MESSAGE LOGIC ---------------- */
  const message = hotel
    ? `Hi 👋 I’m interested in *${hotel.name}* at ${hotel.city}. Please help me.`
    : "Hi 👋 I need help with hotel booking on Trip Alt";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ACTION BUTTONS */}
      {open && (
        <>
          {/* CALL */}
          <a
            href={`tel:${CALL_NUMBER}`}
            className="flex items-center gap-3 bg-white shadow-lg cursor-pointer
                       px-4 py-3 rounded-full border border-gray-200
                       hover:bg-gray-50 transition"
          >
            <FaPhoneAlt className="text-[#0A1C4F] text-lg" />
            <span className="text-sm font-medium text-[#0A1C4F]">
              Call Support
            </span>
          </a>

          {/* WHATSAPP */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 shadow-lg
                       px-4 py-3 rounded-full text-white
                       hover:bg-green-600 transition"
          >
            <FaWhatsapp className="text-lg" />
            <span className="text-sm font-medium">Chat on WhatsApp</span>
          </a>
        </>
      )}

      {/* MAIN FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full bg-[#0A1C4F]
                   flex items-center justify-center shadow-xl
                   hover:scale-105 transition cursor-pointer"

      >
        {/* PULSE RING */}
        <span className="absolute inset-0 rounded-full bg-[#0A1C4F]
                         animate-ping opacity-20"></span>

        <RiCustomerService2Fill className="text-white text-2xl" />
      </button>
    </div>
  );
}
