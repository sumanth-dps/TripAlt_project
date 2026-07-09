import { useState, useEffect, useMemo, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RxCalendar } from "react-icons/rx";
import { FaBed } from "react-icons/fa";
import { format } from "date-fns";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import bankCoupons from "../../data/bankCoupons";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Popup from "../Popup";
import CustomSelect from "../CustomSelect";
export default function BookingSidebar(props) {
  const {
    hotel,
    selectedRoom,
    setSelectedRoom,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    navigate,
  } = props;
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarButtonRef = useRef(null);

  const [applyDiscount, setApplyDiscount] = useState(false);
  const [selectedBankCoupon, setSelectedBankCoupon] = useState(null);

  /* ----------------------- NEW — MOBILE DETECTION ----------------------- */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showAllCoupons, setShowAllCoupons] = useState(false);
  const [calendarError, setCalendarError] = useState("");

  useEffect(() => {
    if (showAllCoupons) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAllCoupons]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ----------------------- CALENDAR SYSTEM ----------------------- */
  const [valueDates, setValueDates] = useState([null, null]);
  const [calStart, setCalStart] = useState(null);
  const [calEnd, setCalEnd] = useState(null);

  // ✅ Always have a fallback room (works on page refresh / copied URL)
  const fallbackRoom =
    selectedRoom ||
    hotel?.roomTypes?.slice().sort((a, b) => a.price - b.price)[0] ||
    null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);

  const daysInMonth = (d) =>
    new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(new Date()));
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
    const check = new Date(date);
    check.setHours(0, 0, 0, 0);
    return check < today;
  };

  const inRange = (date) => {
    if (!calStart || !calEnd || !date) return false;

    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    const s = new Date(calStart);
    const e = new Date(calEnd);

    s.setHours(0, 0, 0, 0);
    e.setHours(0, 0, 0, 0);

    return d >= s && d <= e;
  };

  const onDayClick = (day) => {
    if (!day || isPast(day)) return;

    if (!calStart || (calStart && calEnd)) {
      setCalStart(new Date(day));
      setCalEnd(null);
      return;
    }

    let s = new Date(calStart);
    let d = new Date(day);

    if (d > s) setCalEnd(d);
    else {
      setCalEnd(s);
      setCalStart(d);
    }
  };

  const nice = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const confirmCalendar = () => {
    if (!calStart && !calEnd) {
      setCalendarError("Please select check-in and check-out dates.");
      return;
    }

    if (calStart && !calEnd) {
      setCalendarError("Please select a check-out date.");
      return;
    }

    setValueDates([calStart, calEnd]);
    setCheckIn(format(calStart, "yyyy-MM-dd"));
    setCheckOut(format(calEnd, "yyyy-MM-dd"));
    setShowCalendar(false);
  };

  const dayClasses = (day) => {
    if (!day) return "h-10 w-10";

    if (isPast(day))
      return "h-10 w-10 flex items-center justify-center text-gray-300";

    const iso = day.toDateString();
    const startIso = calStart?.toDateString();
    const endIso = calEnd?.toDateString();

    const isStart = iso === startIso;
    const isEnd = iso === endIso;
    const range = inRange(day);

    let base =
      "h-10 w-10 flex items-center justify-center rounded-full text-sm cursor-pointer transition-all ";

    if (isStart || isEnd)
      return base + "bg-[#003566] text-white font-semibold shadow";

    if (range) return base + "bg-[#DDEAF8] text-[#003566]";

    return base + "hover:bg-gray-100";
  };

  /* ----------------------- PRICE CALC ----------------------- */
  const nights =
    checkIn && checkOut
      ? (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      : 1;

  const validNights = nights > 0 ? nights : 1;

  const safeRoom = fallbackRoom || {
    price: 0,
    taxes: 0,
    name: "Select Room",
  };

  const DISCOUNT_AMOUNT = 200;

  const calculateTotal = useMemo(() => {
    if (!safeRoom) return 0;

    let total =
      (safeRoom.price + (safeRoom.taxes || 0)) *
      validNights *
      (guests.rooms || 1);

    if (applyDiscount) total -= DISCOUNT_AMOUNT;
    return Math.max(total, 0);
  }, [safeRoom, guests.rooms, applyDiscount, validNights]);

  /* ----------------------- CLICK OUTSIDE ----------------------- */
  const calendarRef = useRef(null);

  useEffect(() => {
    if (!showCalendar) return;

    const handler = (e) => {
      if (calendarRef.current?.contains(e.target)) return;
      if (calendarButtonRef.current?.contains(e.target)) return;
      setShowCalendar(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showCalendar]);

  useEffect(() => {
    if (!selectedRoom && hotel?.roomTypes?.length) {
      const cheapest = [...hotel.roomTypes].sort(
        (a, b) => a.price - b.price,
      )[0];
      setSelectedRoom(cheapest);
    }
  }, [hotel, selectedRoom, setSelectedRoom]);
  const roomOptions =
    hotel?.roomTypes?.map((room) => ({
      value: room.name,
      label: `${room.name} — ₹${room.price.toLocaleString()}`,
      roomData: room,
    })) || [];
  useEffect(() => {
    if (checkIn && checkOut && !valueDates[0] && !valueDates[1]) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      setValueDates([start, end]);
      setCalStart(start);
      setCalEnd(end);
    }
  }, [checkIn, checkOut]);

  /* ----------------------- UI ----------------------- */
  return (
    <div className="lg:sticky lg:top-24 self-start h-fit mt-6 lg:mt-0 relative z-50 ">
      <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-5 ">
        {/* ------------------- DATE RANGE PICKER ------------------- */}
        <div className="text-gray-700 flex flex-col mb-4 relative">
          <div className="flex gap-x-2 items-center mb-1">
            <RxCalendar />
            <label className="text-xs font-medium">Check-in & Check-out</label>
          </div>

          <button
            ref={calendarButtonRef}
            onClick={(e) => {
              e.stopPropagation(); // ✅ IMPORTANT
              setShowCalendar((s) => !s);
            }}
            className="w-full flex items-center justify-between
    px-4 py-2.5 rounded-lg
    bg-white border border-gray-200
    text-[#003566] text-sm font-medium
    shadow-sm cursor-pointer
    hover:border-[#003566]
    transition
  "
          >
            {valueDates[0] && valueDates[1]
              ? `${nice(valueDates[0])} — ${nice(valueDates[1])}`
              : "Select dates"}

            <IoIosArrowDown className={`${showCalendar ? "rotate-180" : ""}`} />
          </button>

          {showCalendar && (
            <>
              {/* Background overlay for mobile */}
              {isMobile && (
                <div
                  className="fixed inset-0 bg-black/40 z-1500"
                  onClick={() => setShowCalendar(false)}
                />
              )}

              <div
                ref={calendarRef}
                className={`${
                  isMobile
                    ? "fixed inset-0 bg-white p-4 overflow-auto z-1600 pt-20"
                    : "absolute top-[105%] right-0 bg-white shadow-xl border border-gray-200 rounded-2xl p-5 w-[650px] max-w-[90vw] z-1600"
                }`}
              >
                {/* MONTHS — SAME AS SearchBarCore */}
                <div className="flex flex-col md:flex-row gap-8 justify-center">
                  {(isMobile ? [weeks1] : [weeks1, weeks2]).map((weeks, mi) => {
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
                        {/* HEADER */}
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
                              className="p-2 rounded-full hover:bg-gray-100"
                            >
                              <MdOutlineArrowBackIos />
                            </button>
                          )}

                          <p className="flex-1 text-center text-md font-semibold text-gray-700">
                            {label}
                          </p>

                          {(isMobile || mi === 1) && (
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
                              className="p-2 rounded-full hover:bg-gray-100"
                            >
                              <MdOutlineArrowForwardIos />
                            </button>
                          )}
                        </div>

                        {/* DAYS HEADER */}
                        <div className="grid grid-cols-7 text-[11px] text-gray-500 mb-2">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                            (d) => (
                              <div key={d} className="text-center">
                                {d}
                              </div>
                            ),
                          )}
                        </div>

                        {/* DAYS */}
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
                  })}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-600">
                    {calStart && calEnd
                      ? `Selected: ${nice(calStart)} → ${nice(calEnd)}`
                      : calStart
                        ? `Start: ${nice(calStart)}`
                        : "Pick start date"}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCalStart(null);
                        setCalEnd(null);
                        setValueDates([null, null]);
                        setCheckIn("");
                        setCheckOut("");
                      }}
                      className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300"
                    >
                      Reset
                    </button>

                    <button
                      onClick={confirmCalendar}
                      className="px-4 py-2 bg-[#003566] text-white rounded-lg text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ROOM CATEGORY — CustomSelect */}
        <div className="relative z-100">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-2 mb-1">
            <FaBed /> Room Category
          </label>

          <CustomSelect
            value={selectedRoom?.name || ""}
            placeholder="Select room"
            options={roomOptions}
            onChange={(value) => {
              const selected = roomOptions.find((opt) => opt.value === value);
              if (selected) {
                setSelectedRoom(selected.roomData);
              }
            }}
            variant="fluid"
          />
        </div>

        {/* ROOMS COUNT SELECTOR */}
        <div className="mt-3">
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Number of Rooms
          </label>

          <div
            className="w-full flex items-center justify-between
          px-4 py-1.5 rounded-lg
          bg-white border border-gray-200
          text-[#003566] text-sm font-medium
          shadow-sm cursor-pointer
          hover:border-[#003566]
         
          transition
        "
          >
            <span className="text-sm text-[#003566] font-medium">
              {guests.rooms} Room{guests.rooms > 1 ? "s" : ""}
            </span>

            <div className="flex text-[#003566]  items-center gap-3">
              {/* Decrease Rooms */}

              <CiCircleMinus
                onClick={() =>
                  setGuests((prev) => ({
                    ...prev,
                    rooms: Math.max(1, prev.rooms - 1),
                  }))
                }
                className="text-3xl hover:text-gray-500 cursor-pointer"
              />

              {/* Count */}
              <span className="text-sm font-medium px-1">{guests.rooms}</span>

              {/* Increase Rooms */}
              <CiCirclePlus
                onClick={() =>
                  setGuests((prev) => ({
                    ...prev,
                    rooms: prev.rooms + 1,
                  }))
                }
                className="text-3xl hover:text-gray-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* BANK COUPONS */}
        <div className="relative">
          {/* Title + View More on the right */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-semibold text-gray-800 abc">
              Bank Offers
            </h3>

            {/* Hide view more when a coupon is selected */}
            {!selectedBankCoupon && (
              <button
                onClick={() => setShowAllCoupons(true)}
                className="text-[11px] text-blue-600 font-medium cursor-pointer"
              >
                View More
              </button>
            )}
          </div>

          {/* SELECTED COUPON — Highlighted Card */}
          {selectedBankCoupon && (
            <div className="border border-blue-300 bg-blue-50 rounded-xl p-4 mb-3 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-700 text-sm">
                  {selectedBankCoupon.code}
                </span>
                <span className="text-green-600 font-semibold text-sm">
                  ₹{selectedBankCoupon.discount}
                </span>
              </div>

              <p className="text-[11px] text-gray-600 mt-1 leading-tight">
                {selectedBankCoupon.message}
              </p>

              <button
                className="text-[11px] text-red-500 underline mt-2"
                onClick={() => setSelectedBankCoupon(null)}
              >
                Remove offer
              </button>
            </div>
          )}

          {/* SHOW FIRST 2 ONLY WHEN NO COUPON SELECTED */}
          {!selectedBankCoupon && (
            <div className="space-y-2">
              {bankCoupons.slice(0, 2).map((c, i) => (
                <label
                  key={i}
                  className={`block rounded-xl p-4 border flex gap-3 cursor-pointer transition-all shadow-sm
            ${
              selectedBankCoupon?.code === c.code
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-blue-400 hover:bg-gray-50"
            }`}
                >
                  <input
                    type="radio"
                    checked={selectedBankCoupon?.code === c.code}
                    onChange={() => setSelectedBankCoupon(c)}
                    className="mt-1 accent-blue-600"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between font-semibold text-gray-900 text-sm">
                      <span>{c.code}</span>
                      <span className="text-green-600">₹{c.discount}</span>
                    </div>

                    <p className="text-[11px] text-gray-600 mt-1 leading-tight">
                      {c.message}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* POPUP */}
          {showAllCoupons && (
            <>
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-9999"
                onClick={() => setShowAllCoupons(false)}
              />

              <div
                className="
          fixed top-1/2 -translate-y-1/2
          left-1/2 -translate-x-1/2
          w-full max-w-md
          bg-white rounded-2xl shadow-2xl
          p-6 z-10000
          max-h-[75vh] overflow-y-auto
        "
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-800">
                    All Bank Offers
                  </h3>

                  <button
                    className="text-gray-700 text-2xl leading-none"
                    onClick={() => setShowAllCoupons(false)}
                  >
                    ×
                  </button>
                </div>

                {bankCoupons.map((c, i) => (
                  <label
                    key={i}
                    className={`block rounded-xl p-4 border mb-2 flex gap-3 cursor-pointer transition-all shadow-sm
              ${
                selectedBankCoupon?.code === c.code
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-400 hover:bg-gray-50"
              }
            `}
                    onClick={() => {
                      setSelectedBankCoupon(c);
                      setShowAllCoupons(false);
                    }}
                  >
                    <input
                      type="radio"
                      checked={selectedBankCoupon?.code === c.code}
                      readOnly
                      className="mt-1 accent-blue-600"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between font-semibold text-gray-900 text-sm">
                        <span>{c.code}</span>
                        <span className="text-green-600">₹{c.discount}</span>
                      </div>

                      <p className="text-[11px] text-gray-600 mt-1 leading-tight">
                        {c.message}
                      </p>
                    </div>
                  </label>
                ))}

                <button
                  className="w-full mt-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  onClick={() => setShowAllCoupons(false)}
                >
                  Close
                </button>
              </div>
            </>
          )}

          {selectedBankCoupon && (
            <p className="text-[11px] text-blue-700 mt-1 leading-tight">
              Bank offer valid only when paying with{" "}
              <b>{selectedBankCoupon.bank}</b>.
            </p>
          )}
        </div>

        {/* PROMO CODE */}
        <div className="flex items-center gap-2 py-2 bg-green-50 border border-green-200 rounded-lg px-3">
          <input
            type="checkbox"
            checked={applyDiscount}
            onChange={(e) => setApplyDiscount(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <label className="text-sm font-medium text-green-800 cursor-pointer">
            Apply <b>KEYO200</b> — Get ₹200 OFF
          </label>
        </div>

        {/* PRICE SUMMARY */}
        <div className="mt-3 font-semibold text-gray-900 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Room Price</span>
            <span>
              ₹{(safeRoom.price * validNights * guests.rooms).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Taxes</span>
            <span>
              ₹{(safeRoom.taxes * validNights * guests.rooms).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Promo Discount</span>
            <span
              className={applyDiscount ? "text-green-600" : "text-gray-400"}
            >
              {applyDiscount ? `-₹${DISCOUNT_AMOUNT}` : "—"}
            </span>
          </div>

          {selectedBankCoupon && (
            <p className="text-xs text-blue-700">
              Bank discount will apply on payment page.
            </p>
          )}

          <hr />

          <div className="flex justify-between text-lg font-bold text-[#003566]">
            <span>Total</span>
            <span>₹{calculateTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* BOOK NOW BUTTON */}
        <button
          onClick={() => {
            if (!valueDates[0] || !valueDates[1]) {
              setCalendarError(
                "Please select check-in and check-out dates before booking.",
              );
              return;
            }

            if (!safeRoom) return;

            const citySlug = hotel.city.toLowerCase().replace(/ /g, "-");
            const areaSlug = hotel.area.toLowerCase().replace(/ /g, "-");
            const nameSlug = hotel.name.toLowerCase().replace(/ /g, "-");

            navigate(`/${citySlug}-${areaSlug}/${nameSlug}/booking`, {
              state: {
                hotel,
                selectedRoom: safeRoom,
                checkIn,
                checkOut,
                guests,
                totalBeforeBankDiscount: calculateTotal,
                promoApplied: applyDiscount ? "KEYO200" : null,
                selectedBankCoupon,
              },
            });
          }}
          className="w-full bg-[#003566] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-3"
        >
          Book Now
        </button>
      </div>
      <Popup isOpen={!!calendarError} onClose={() => setCalendarError("")}>
        <div className="text-center px-2">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-3xl">📅</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Date Selection Required
          </h2>

          <p className="text-gray-600 text-sm mb-5">{calendarError}</p>

          <button
            onClick={() => setCalendarError("")}
            className="bg-[#003566] text-white px-6 py-2.5 rounded-xl w-full font-medium hover:bg-blue-900 duration-300"
          >
            OK
          </button>
        </div>
      </Popup>
    </div>
  );
}
