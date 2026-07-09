import React, { useState, useMemo, useEffect } from "react";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";
import CustomSelect from "../../../components/CustomSelect";
export default function HotelCalendar({
  roomTypes = [],
  calendarRoom,
  setCalendarRoom,
  blockedDates = {},
  setBlockedDates,
}) {
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [blockCount, setBlockCount] = useState(1);

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [open, setOpen] = useState(false);

  const selectedRoomTotal =
    roomTypes.find((r) => r.name === calendarRoom)?.totalRooms || 0;

  const formatLocalISO = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const parseLocalDate = (iso) => new Date(`${iso}T00:00:00`);

  const isPast = (d) => {
    const todayMidnight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime();

    const check = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate()
    ).getTime();

    return check < todayMidnight;
  };

  const blockedMap = blockedDates[calendarRoom] || {};
  const blockedSet = useMemo(
    () => new Set(Object.keys(blockedMap)),
    [blockedMap]
  );

  useEffect(() => {
    setStart(null);
    setEnd(null);
  }, [calendarRoom, open]);
  function groupConsecutiveDates(dates = []) {
    if (!dates.length) return [];

    const sorted = [...dates].sort(
      (a, b) => parseLocalDate(a) - parseLocalDate(b)
    );

    const ranges = [];
    let rangeStart = sorted[0];
    let prev = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
      const nextExpected = new Date(parseLocalDate(prev));
      nextExpected.setDate(nextExpected.getDate() + 1);

      if (formatLocalISO(nextExpected) !== sorted[i]) {
        ranges.push({
          start: rangeStart,
          end: prev,
          isRange: rangeStart !== prev,
        });
        rangeStart = sorted[i];
      }
      prev = sorted[i];
    }

    ranges.push({
      start: rangeStart,
      end: prev,
      isRange: rangeStart !== prev,
    });

    return ranges;
  }
const groupedRanges = groupConsecutiveDates(
  Object.keys(blockedMap)
);


  /* ---------------- CALENDAR GRID ---------------- */

  const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
  const daysInMonth = (d) =>
    new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

  const weeks = useMemo(() => {
    const firstDay = startOfMonth(visibleMonth);
    const offset = firstDay.getDay();
    const totalDays = daysInMonth(visibleMonth);

    const days = [];
    for (let i = 0; i < offset; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) {
      days.push(
        new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), d)
      );
    }
    while (days.length % 7 !== 0) days.push(null);

    const rows = [];
    for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7));

    return rows;
  }, [visibleMonth]);

  /* ---------------- INTERACTIONS ---------------- */

  function onDayClick(day) {
    if (isPast(day)) return;

    const iso = formatLocalISO(day);
    if (blockedSet.has(iso)) return;

    if (!start || end) {
      setStart(day);
      setEnd(null);
    } else {
      setEnd(day > start ? day : start);
      setStart(day > start ? start : day);
    }
  }

  function inRange(day) {
    if (!start || !end) return false;
    return day >= start && day <= end;
  }

  function confirmBlock() {
  if (!start || !end) {
    alert("Select a date range");
    return;
  }

  setBlockedDates((prev) => {
    const roomData = prev[calendarRoom] || {};
    const updated = { ...roomData };

    const cur = new Date(start);

    while (cur <= end) {
      const iso = formatLocalISO(cur);

      updated[iso] = Math.min(
        selectedRoomTotal || 1,
        (updated[iso] || 0) + (blockCount || 1)
      );

      cur.setDate(cur.getDate() + 1);
    }

    return {
      ...prev,
      [calendarRoom]: updated,
    };
  });

  setStart(null);
  setEnd(null);
  setBlockCount(1);
  setOpen(false);
}


 function removeBlockedRange(room, startStr, endStr, isRange) {
  setBlockedDates((prev) => {
    const roomData = { ...(prev[room] || {}) };

    if (isRange) {
      const cur = new Date(parseLocalDate(startStr));
      const endDate = parseLocalDate(endStr);

      while (cur <= endDate) {
        delete roomData[formatLocalISO(cur)];
        cur.setDate(cur.getDate() + 1);
      }
    } else {
      delete roomData[startStr];
    }

    return {
      ...prev,
      [room]: roomData,
    };
  });
}

  const roomOptions = roomTypes.map((rt) => ({
    label: rt.name,
    value: rt.name,
  }));

  /* ---------------- UI ---------------- */

  return (
    <div className="relative">
      {/* TOP CONTROLS */}
      <div className="grid grid-cols-1 gap-3 items-end">
        <div className="flex flex-col md:flex-row items-start  gap-3">
          <div>
            <label className="text-sm text-gray-600">Room type</label>
            <CustomSelect
              value={calendarRoom}
              onChange={setCalendarRoom}
              options={roomOptions}
              placeholder="Select room type"
            />
          </div>
          {/* BLOCK COUNT */}
          <div className="">
            <label className="text-sm text-gray-600">
              Number of rooms to block
            </label>

            <input
              type="number"
              min={1}
              max={selectedRoomTotal}
              value={blockCount}
              onChange={(e) =>
                setBlockCount(
                  Math.min(
                    selectedRoomTotal,
                    Math.max( Number(e.target.value))
                  )
                )
              }
              className="w-full px-3 py-2 rounded-md border border-gray-200 shadow-sm focus:shadow-none  focus:outline-none  focus:border-[#f5cc00]"
            />

            <p className="text-xs text-gray-500 mt-1">
              Max: {selectedRoomTotal} rooms
            </p>
          </div>
        </div>

        <div className="sm:col-span-2 flex flex-col md:flex-row md:items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-[#0A1C4F] text-white rounded-md"
          >
            Block Dates
          </button>

          <span className="text-sm text-gray-600">
            Blocks apply to <b>{calendarRoom}</b>
          </span>
        </div>
      </div>

      {/* POPUP CALENDAR */}
      {open && (
        <div className="absolute z-50 mt-3 right-0 left-0 sm:left-auto sm:w-[520px] mx-2 sm:mx-0">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setVisibleMonth(
                      (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)
                    )
                  }
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <MdChevronLeft className="text-xl text-gray-600 cursor-pointer" />
                </button>

                <div className="font-medium">
                  {visibleMonth.toLocaleString(undefined, {
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <button
                  onClick={() =>
                    setVisibleMonth(
                      (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)
                    )
                  }
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <MdChevronRight className="text-xl text-gray-600 cursor-pointer" />
                </button>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded hover:bg-gray-100"
              >
                <MdClose className="text-xl text-gray-600 cursor-pointer" />
              </button>
            </div>

            {/* DAYS */}
            <div className="grid grid-cols-7 text-xs text-center text-gray-500 mt-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* DATES */}
            <div className="grid grid-cols-7 gap-1 mt-2">
              {weeks.map((week, wi) =>
                week.map((day, di) => {
                  if (!day) return <div key={`${wi}-${di}`} className="h-9" />;

                  const iso = formatLocalISO(day);
                  const blocked = blockedSet.has(iso);

                  let cls =
                    "h-9 text-sm flex items-center justify-center rounded";

                  if (isPast(day)) cls += " text-gray-300 cursor-not-allowed";
                  else if (blocked)
                    cls +=
                      " bg-red-50 text-red-700 border border-red-200 cursor-not-allowed";
                  else if (
                    (start && iso === formatLocalISO(start)) ||
                    (end && iso === formatLocalISO(end))
                  )
                    cls += " bg-[#0A1C4F] text-white";
                  else if (inRange(day)) cls += " bg-orange-100 text-[#0A1C4F]";
                  else cls += " hover:bg-gray-100 cursor-pointer";

                  return (
                    <div
                      key={iso}
                      className={cls}
                      onClick={() =>
                        !isPast(day) && !blocked && onDayClick(day)
                      }
                    >
                      {day.getDate()}
                    </div>
                  );
                })
              )}
            </div>

            {/* ACTION */}
            <div className="flex justify-between items-center mt-4 text-sm">
              <span className="text-gray-600">
                {start && end
                  ? "Range selected"
                  : start
                  ? "Pick end date"
                  : "Pick start date"}
              </span>

              <button
                onClick={confirmBlock}
                className="px-4 py-1 bg-[#0A1C4F] text-white rounded-md cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BLOCKED LIST */}
      <div className="mt-6 space-y-6">
        <h4 className="font-semibold text-[#003566] text-lg">Blocked Dates</h4>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {groupedRanges.map((rng, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-white border border-[#F5CC00]  rounded-xl p-4 shadow-sm"
            style={{ borderLeft: "6px solid #F5CC00" }}
          >
            <div>
  <p className="font-semibold text-[#003566]">
    {calendarRoom}
  </p>

  <p className="text-sm text-gray-600">
    {rng.start === rng.end
      ? `${blockedMap[rng.start]} • ${rng.start} rooms blocked`
      : `${rng.start} → ${rng.end}`}
  </p>
</div>


            <button
              onClick={() =>
                removeBlockedRange(
                  calendarRoom,
                  rng.start,
                  rng.end,
                  rng.isRange
                )
              }
              className="p-2 rounded hover:bg-red-50 text-red-600 cursor-pointer"
            >
              <MdClose />
            </button>
          </div>
        ))}
       </div>
      </div>
    </div>
  );
}
