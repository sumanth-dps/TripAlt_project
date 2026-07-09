import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function MultiSelect({ value = [], onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggle = (val) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const label =
    value.length > 0
      ? value
          .map((v) => options.find((o) => o.value === v)?.label)
          .join(", ")
      : placeholder;

  return (
    <div ref={ref} className="relative w-full">
      {/* SELECT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm text-[#003566] hover:border-[#003566]"
      >
        <span className="truncate">{label}</span>
        <IoChevronDown className={`${open ? "rotate-180" : ""} transition`} />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-[#003566]/10"
            >
              <input
                type="checkbox"
                checked={value.includes(opt.value)}
                onChange={() => toggle(opt.value)}
                className="accent-[#003566]"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
