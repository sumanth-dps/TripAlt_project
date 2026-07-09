import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function CustomSelectTwo({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder;

  return (
    <div ref={ref} className="relative w-full">
      {/* SELECT BUTTON */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center justify-between
          px-4 py-3 rounded-lg cursor-pointer
          bg-white border
          text-[#003566] font-medium
          border-[#f5cc06] transition
        "
      >
        <span className="truncate">{selectedLabel}</span>
        <IoChevronDown
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full
            bg-white border border-gray-200
            rounded-lg shadow-lg max-h-100 overflow-y-scroll
          "
        >
          {options.map((opt) => (
            <button
  
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2 text-sm cursor-pointer
                hover:bg-[#003566]/10 transition
                ${
                  value === opt.value
                    ? "bg-[#003566]/10 text-[#003566] font-semibold"
                    : "text-gray-700"
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
