import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select",
  className = "",
  variant = "fixed", // "fixed" | "fluid"
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder;

  const wrapperWidth =
    variant === "fluid"
      ? "w-full"
      : "w-40 md:w-48 xl:w-56"; // ✅ OLD STYLE preserved

  return (
    <div
      ref={ref}
      className={`relative ${wrapperWidth} ${className}`}
    >
      {/* SELECT BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full flex items-center justify-between
          px-4 py-2.5 rounded-lg
          bg-white border border-gray-200
          text-[#003566] text-sm font-medium
          shadow-sm cursor-pointer
          hover:border-[#003566]
         
          transition
        "
      >
        <span className="truncate">{selectedLabel}</span>
        <IoChevronDown
          className={`text-lg transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full max-h-70  overflow-y-auto
            bg-white border border-gray-200
            rounded-lg shadow-lg
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
                w-full text-left px-4 py-2 text-sm
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
