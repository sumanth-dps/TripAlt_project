import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

export default function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`mb-4 `}>
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center cursor-pointer justify-between  rounded-lg filter-heading"
      >
        <span>{title}</span>
        <IoIosArrowDown
          className={`transition-transform duration-300  hover:bg-[#003566]/20 hover:text-white rounded-full text-lg ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* CONTENT */}
      <div
        className={`overflow-hidden transition-all duration-300  rounded-md ${
          open ? "max-h-[1000px] mt-3" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
