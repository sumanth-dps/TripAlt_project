import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#e8e2b7] bg-white rounded-xl shadow-sm">
      <button
        type="button"
        className="w-full flex justify-between items-center px-5 py-3 text-left font-semibold text-[#003566]"
        onClick={() => setOpen(!open)}
      >
        {title}
        <IoChevronDown
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`transition-all overflow-hidden ${
          open ? "max-h-[2000px] opacity-100 py-4 px-5" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
