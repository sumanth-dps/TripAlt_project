import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaHotel } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { RxCalendar } from "react-icons/rx";
import { addDays, format } from "date-fns";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import Popup from "./Popup";

export default function SearchBarCore({ onSearch, value }) {
  const [city, setCity] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [userHasTyped, setUserHasTyped] = useState(false);

  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [errorPopup, setErrorPopup] = useState("");

  const [valueDates, setValueDates] = useState([null, null]);

  const [calStart, setCalStart] = useState(null);
  const [calEnd, setCalEnd] = useState(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const suggestionRef = useRef(null);
  const guestsRef = useRef(null);
  const calendarRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const searchState = location.state;
  const isSearchPage = location.pathname.includes("/search");

  const LOCATIONIQ_KEY = import.meta.env.VITE_LOCATIONIQ_KEY;
  const suppressFetchRef = useRef(false);

  useEffect(() => {
    setCity(value || "");
    setUserHasTyped(false);
    setSuggestions([]);
  }, [value]);

  useEffect(() => {
    if (!userHasTyped || city.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    if (suppressFetchRef.current) {
      suppressFetchRef.current = false;
      return;
    }

    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.locationiq.com/v1/autocomplete?key=${LOCATIONIQ_KEY}&q=${encodeURIComponent(
            city,
          )}&limit=6&countrycodes=in&normalizecity=1`,
        );
        const data = await res.json();
        if (cancelled) return;

        setSuggestions(
          Array.isArray(data)
            ? data.map((it) => ({
                name: it.display_name.split(",")[0],
                full: it.display_name,
              }))
            : [],
        );
      } catch {
        if (!cancelled) setSuggestions([]);
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [city, userHasTyped]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (
        suggestionRef.current?.contains(e.target) ||
        guestsRef.current?.contains(e.target) ||
        calendarRef.current?.contains(e.target)
      )
        return;

      setSuggestions([]);
      setShowGuestsDropdown(false);
      setShowCalendar(false);
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);
  useEffect(() => {
    if (searchState?.fromDate && searchState?.toDate) {
      const start = new Date(searchState.fromDate);
      const end = new Date(searchState.toDate);

      setValueDates([start, end]);
      setCalStart(start);
      setCalEnd(end);
    }
  }, [searchState]);

  const today = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  })();

  const formatLocalISO = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const nice = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const daysInMonth = (d) =>
    new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);

  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(new Date()),
  );

  const monthPlus = (m, add = 0) =>
    new Date(m.getFullYear(), m.getMonth() + add, 1);
  const month2 = monthPlus(visibleMonth, 1);

  const generateMonthGrid = (month) => {
    const first = startOfMonth(month);
    const startIndex = first.getDay();
    const total = daysInMonth(month);
    const cells = [];
    for (let i = 0; i < startIndex; i++) cells.push(null);
    for (let d = 1; d <= total; d++)
      cells.push(new Date(month.getFullYear(), month.getMonth(), d));
    while (cells.length % 7 !== 0) cells.push(null);
    const rows = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  };

  const weeks1 = generateMonthGrid(visibleMonth);
  const weeks2 = generateMonthGrid(month2);

  const isPast = (date) => {
    if (!date) return false;
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return d.getTime() < today.getTime();
  };

  const onDayClick = (day) => {
    if (!day || isPast(day)) return;

    if (!calStart || (calStart && calEnd)) {
      setCalStart(new Date(day));
      setCalEnd(null);
      return;
    }

    const s = new Date(calStart);
    const picked = new Date(day);

    picked > s ? setCalEnd(picked) : (setCalEnd(s), setCalStart(picked));
  };

  const inRange = (date) => {
    if (!calStart || !calEnd || !date) return false;
    const t = new Date(date).setHours(0, 0, 0, 0);
    const s = new Date(calStart).setHours(0, 0, 0, 0);
    const e = new Date(calEnd).setHours(0, 0, 0, 0);
    return t >= s && t <= e;
  };

  const confirmCalendar = () => {
    if (!calStart) return setErrorPopup("Pick a start date.");
    if (!calEnd) return setErrorPopup("Pick an end date.");
    setValueDates([calStart, calEnd]);
    setShowCalendar(false);
  };

  const handleSearch = () => {
    if (!city || !valueDates[0] || !valueDates[1]) {
      return setErrorPopup("Please fill all search fields before searching.");
    }

    // ✅ SAVE LAST USED CITY (IMPORTANT)
    localStorage.setItem("lastSearchCity", city);

    const fromDate = format(valueDates[0], "yyyy-MM-dd");
    const toDate = format(valueDates[1], "yyyy-MM-dd");

    if (isSearchPage && onSearch) {
      onSearch(city);
      return;
    }

    const citySlug = city.toLowerCase().replace(/\s+/g, "-");

navigate(`/${citySlug}/search`, {
  state: {
    query: city,        // 🔑 IMPORTANT
    fromDate,
    toDate,
    rooms,
    adults,
    children,
  },
});

  };

  const handleSuggestionClick = (s) => {
    setCity(s.name);
    setUserHasTyped(true);

    // ✅ SAVE USER CHOICE
    localStorage.setItem("lastSearchCity", s.name);

    setSuggestions([]);
    suppressFetchRef.current = true;

    if (isSearchPage && onSearch) onSearch(s.name);
  };

  const dayClasses = (d) => {
    if (!d) return "h-10";

    if (isPast(d)) return "h-10 flex items-center justify-center text-gray-300";

    const iso = formatLocalISO(d);
    const startIso = calStart ? formatLocalISO(calStart) : null;
    const endIso = calEnd ? formatLocalISO(calEnd) : null;

    const isStart = iso === startIso;
    const isEnd = iso === endIso;
    const range = inRange(d);

    let base =
      "h-10 w-10 flex items-center justify-center rounded-full text-sm cursor-pointer transition-all ";

    if (isStart || isEnd)
      return base + "bg-[#003566] text-white font-semibold shadow";

    if (range) return base + "bg-[#DDEAF8] text-[#003566]";

    return base + "hover:bg-gray-100";
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setUserHasTyped(true);
    localStorage.setItem("lastSearchCity", e.target.value);
    if (isSearchPage && onSearch) onSearch(e.target.value);
  };
useEffect(() => {
  if (showCalendar && window.innerWidth < 1024) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [showCalendar]);

  useEffect(() => {
    if (value) {
      setCity(value);
      return;
    }

    const lastSearch = localStorage.getItem("lastSearchCity");
    if (lastSearch) {
      setCity(lastSearch);
      return;
    }

    const detected = localStorage.getItem("userLocation");
    if (detected) {
      setCity(detected);
    }
  }, [value]);

  return (
    <div className="w-full flex justify-center relative z-150">
      <div className="w-full bg-white rounded-2xl shadow-lg p-4 lg:p-1 flex flex-col lg:flex-row gap-4 lg:gap-3 items-center relative">
        <div
          ref={suggestionRef}
          className="flex flex-row w-full lg:w-[30%] relative p-3 lg:p-2 lg:px-4 border border-gray-200 lg:border-0 rounded-lg lg:rounded-none"
        >
          <FaHotel className="text-gray-600 text-lg mr-2" />

          <input
            value={city}
            onChange={handleCityChange}
            placeholder="Search area, city, hotel..."
            className="w-full text-sm outline-none"
          />
          {userHasTyped && suggestions.length > 0 && (
            <ul className="absolute top-full mt-1 left-0 bg-white border rounded-lg shadow-lg w-full max-h-48 overflow-y-auto z-3000">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                >
                  {s.full}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* CALENDAR */}
        <div
          ref={calendarRef}
          className="w-full lg:flex-1 relative lg:px-3 text-gray-700 border-gray-200 lg:border-l lg:rounded-none "
        >
          <label className="text-xs font-medium flex items-center gap-1 text-gray-700 mb-1 px-1 lg:px-0">
            <RxCalendar className="text-lg" /> Check-in & check-out
          </label>
          <button
            onClick={() => setShowCalendar((s) => !s)}
            className="flex justify-between items-center w-full text-sm border lg:border-0 border-gray-200 p-3 lg:p-0 mt-2 lg:mt-0 rounded-lg lg:py-1 cursor-pointer"
          >
            <span className={!valueDates[0] ? "text-gray-400" : ""}>
              {valueDates[0] && valueDates[1]
                ? `${nice(valueDates[0])} — ${nice(valueDates[1])}`
                : "Select dates"}
            </span>

            <IoIosArrowDown
              className={`transition-transform ${showCalendar ? "rotate-180" : ""}`}
            />
          </button>
          {showCalendar && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black/40 z-2500 md:hidden"
                onClick={() => setShowCalendar(false)}
              />
              {/* Calendar Card */}
              <div
                className={`mt-15  md:mt-1 fixed md:absolute inset-0 md:inset-auto top-0 left-0 md:top-[115%] md:left-1/2 md:-translate-x-1/2 
    bg-white w-full h-full md:w-[680px] md:h-auto rounded-none md:rounded-3xl shadow-2xl p-5 z-2600 overflow-y-auto
  `}
              >
                {/* MONTHS */}
                <div className=" flex flex-col md:flex-row gap-8 justify-center">
                  {(window.innerWidth < 768 ? [weeks1] : [weeks1, weeks2]).map(
                    (weeks, mi) => {
                      const label =
                        mi === 0
                          ? visibleMonth.toLocaleString("en-US", {
                              month: "long",
                              year: "numeric",
                            })
                          : month2.toLocaleString("en-US", {
                              month: "long",
                              year: "numeric",
                            });

                      return (
                        <div key={mi} className="w-full sm:w-[320px]">
                          <div className="flex items-center justify-between mb-3">
                            {mi === 0 && (
                              <button
                                onClick={() =>
                                  setVisibleMonth(
                                    (m) =>
                                      new Date(
                                        m.getFullYear(),
                                        m.getMonth() - 1,
                                        1,
                                      ),
                                  )
                                }
                                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                              >
                                <MdOutlineArrowBackIos />
                              </button>
                            )}

                            <p className="text-center flex-1 text-md font-semibold text-gray-700">
                              {label}
                            </p>

                            {(window.innerWidth < 768 || // mobile → single month → show both
                              mi === 1) && ( // desktop → second month only
                              <button
                                onClick={() =>
                                  setVisibleMonth(
                                    (m) =>
                                      new Date(
                                        m.getFullYear(),
                                        m.getMonth() + 1,
                                        1,
                                      ),
                                  )
                                }
                                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                              >
                                <MdOutlineArrowForwardIos />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-7 text-[11px] text-gray-500 mb-2">
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                              (d) => (
                                <div key={d} className="text-center">
                                  {d}
                                </div>
                              ),
                            )}
                          </div>

                          <div className="grid grid-cols-7 gap-1">
                            {weeks.map((week, wi) =>
                              week.map((day, di) => (
                                <div
                                  key={`${mi}-${wi}-${di}`}
                                  className={dayClasses(day)}
                                  onClick={() => onDayClick(day)}
                                >
                                  {day?.getDate()}
                                </div>
                              )),
                            )}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>

                {/* FOOTER */}
                <div className="mt-6 md:mt-0 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {calStart && calEnd
                      ? `${nice(calStart)} → ${nice(calEnd)}`
                      : calStart
                        ? `Start: ${nice(calStart)}`
                        : "Pick a start date"}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setCalStart(null);
                        setCalEnd(null);
                        setValueDates([null, null]);
                      }}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-300 text-sm cursor-pointer"
                    >
                      Reset
                    </button>

                    <button
                      onClick={confirmCalendar}
                      className="px-5 py-2 rounded-lg bg-[#003566] hover:bg-blue-700 text-white text-sm font-semibold cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* GUESTS */}
        <div
          ref={guestsRef}
          className="w-full lg:flex-1 relative text-gray-700 lg:px-3 py-2 lg:py-0 lg:pb-2 border-gray-200 lg:border-l lg:rounded-none"
        >
          <label className="text-xs font-medium flex items-center gap-1 mb-1 px-1 lg:px-0">
            <GoPeople className="text-lg" /> Guests & Rooms
          </label>

          <button
            onClick={() => setShowGuestsDropdown((s) => !s)}
            className="rounded-lg cursor-pointer flex justify-between items-center  w-full text-sm mt-2 lg:mt-0 lg:pt-1 border border-gray-200 lg:border-0 p-3 lg:p-0"
          >
            {rooms} Room{rooms > 1 ? "s" : ""} • {adults} Adult
            {adults > 1 ? "s" : ""} • {children} Child
            <IoIosArrowDown
              className={`transition-transform ${showGuestsDropdown ? "rotate-180" : ""}`}
            />
          </button>
          {showGuestsDropdown && (
            <div
              className="
        absolute top-full left-0 mt-2 w-full
        bg-white border border-gray-200
        rounded-2xl shadow-xl p-4 z-3000
      "
            >
              {[
                { label: "Rooms", value: rooms, set: setRooms, min: 1 },
                { label: "Adults", value: adults, set: setAdults, min: 1 },
                {
                  label: "Children",
                  value: children,
                  set: setChildren,
                  min: 0,
                },
              ].map(({ label, value, set, min }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-3 border-b last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {label}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {label === "Rooms"
                        ? "Number of rooms"
                        : label === "Adults"
                          ? "Age 18+"
                          : "Below 18"}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <CiCircleMinus
                      onClick={() => set(Math.max(min, value - 1))}
                      className={`text-3xl cursor-pointer ${
                        value === min
                          ? "text-gray-300"
                          : "text-[#003566] hover:text-blue-700"
                      }`}
                    />

                    <span className="text-sm font-semibold w-4 text-center">
                      {value}
                    </span>

                    <CiCirclePlus
                      onClick={() => set(value + 1)}
                      className="text-3xl text-[#003566] hover:text-blue-700 cursor-pointer"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() => setShowGuestsDropdown(false)}
                className="
          w-full mt-4 py-2.5
          bg-[#003566] text-white
          rounded-xl text-sm font-semibold
          hover:bg-blue-700 transition
        "
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          className="w-full lg:w-auto bg-[#003566] text-white px-4 py-3 lg:mr-1 mt-2 lg:mt-0 rounded-xl hover:bg-blue-700 duration-300 cursor-pointer flex items-center justify-center gap-2 text-md font-medium"
        >
          <FiSearch className="text-xl" /> Search
        </button>
      </div>

      {/* ERROR POPUP */}
      <Popup isOpen={!!errorPopup} onClose={() => setErrorPopup("")}>
        <div className="text-center px-2">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-3xl">🚫</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Missing Information
          </h2>

          <p className="text-gray-600 text-sm mb-5">{errorPopup}</p>

          <button
            onClick={() => setErrorPopup("")}
            className="bg-[#003566] text-white px-6 py-2.5 rounded-xl w-full font-medium hover:bg-blue-900 duration-300 cursor-pointer"
          >
            OK
          </button>
        </div>
      </Popup>
    </div>
  );
}
