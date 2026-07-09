import { useState, useMemo } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function InventoryCalendar({ value, onChange }) {
  const today = new Date();

  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const formatISO = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  const selected = value;

  const weeks = useMemo(() => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const startIndex = firstDay.getDay();
    const daysInMonth = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0
    ).getDate();

    const days = [];
    for (let i = 0; i < startIndex; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(month.getFullYear(), month.getMonth(), d));
    }
    while (days.length % 7 !== 0) days.push(null);

    const rows = [];
    for (let i = 0; i < days.length; i += 7)
      rows.push(days.slice(i, i + 7));

    return rows;
  }, [month]);

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-xl  p-4 w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() =>
            setMonth(
              new Date(month.getFullYear(), month.getMonth() - 1, 1)
            )
          }
          className="p-2 rounded hover:bg-gray-100"
        >
          <MdChevronLeft />
        </button>

        <div className="font-semibold text-[#003566]">
          {month.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>

        <button
          onClick={() =>
            setMonth(
              new Date(month.getFullYear(), month.getMonth() + 1, 1)
            )
          }
          className="p-2 rounded hover:bg-gray-100"
        >
          <MdChevronRight />
        </button>
      </div>

      {/* DAYS */}
      <div className="grid grid-cols-7 text-xs text-gray-500 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center py-1">
            {d}
          </div>
        ))}
      </div>

      {/* DATES */}
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((day, i) => {
          if (!day) return <div key={i} />;

          const iso = formatISO(day);
          const isToday = iso === formatISO(today);
          const isSelected = iso === selected;

          return (
            <button
              key={iso}
              onClick={() => onChange(iso)}
              className={`
                h-9 rounded text-sm
                ${
                  isSelected
                    ? "bg-[#003566] text-white"
                    : isToday
                    ? "border border-[#F5CC00]"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
