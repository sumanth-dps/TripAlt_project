
import { useState, useMemo, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import CustomSelect from "../../../components/CustomSelect";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { BiExport } from "react-icons/bi";

/* ---------------- OPTIONS ---------------- */
const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "Pending", value: "Pending" },
  { label: "Cancelled", value: "Cancelled" },
];

const DATE_OPTIONS = [
  { label: "Booking Date", value: "" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Custom", value: "custom" },
];

const SORT_OPTIONS = [
  { label: "Sort", value: "" },
  { label: "Most Recent", value: "recent" },
  { label: "Price High → Low", value: "priceHigh" },
  { label: "Price Low → High", value: "priceLow" },
];

export default function HotelBookings({
  paginatedBookings,
  bookingPage,
  totalBookingPages,
  setBookingPage,
  bookingSearch,
  setBookingSearch,
  bookingStatus,
  setBookingStatus,
  bookingSort,
  setBookingSort,
  onUserClick,
  onStatusUpdate,
  filteredBookings=[],
}) {
  /* ---------------- DATE FILTER STATE ---------------- */
  const [dateFilter, setDateFilter] = useState("");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  /* ---------------- DATE FILTER LOGIC ---------------- */
 const dateFiltered = useMemo(() => {
  let list = Array.isArray(filteredBookings)
    ? [...filteredBookings]
    : [];

  const now = new Date();

  if (dateFilter) {
    list = list.filter((b) => {
      if (!b.bookingDate) return false;
      const d = new Date(b.bookingDate);

      if (dateFilter === "today") {
        return d.toDateString() === now.toDateString();
      }

      if (dateFilter === "week") {
        const start = new Date(now);
        start.setDate(now.getDate() - now.getDay());
        start.setHours(0, 0, 0, 0);
        return d >= start && d <= now;
      }

      if (dateFilter === "month") {
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        return d >= start && d <= now;
      }

      if (dateFilter === "custom" && customFrom && customTo) {
        const from = new Date(customFrom);
        const to = new Date(customTo);
        to.setHours(23, 59, 59, 999);
        return d >= from && d <= to;
      }

      return true;
    });
  }

  return list;
}, [filteredBookings, dateFilter, customFrom, customTo]);


  /* ---------------- EXPORT EXCEL ---------------- */
  const exportExcel = () => {
    if (!dateFiltered.length) {
      alert("No bookings to export");
      return;
    }

    const rows = dateFiltered.map((b) => ({
      BookingID: b.id,
      User: b.user,
      BookedOn: b.bookingDate,
      Room: b.roomType,
      CheckIn: b.checkIn,
      CheckOut: b.checkOut,
      Status: b.status,
      Price: b.price,
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");

    const buffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `HotelBookings_${Date.now()}.xlsx`
    );
  };

  useEffect(() => {
    setBookingPage(1);
  }, [bookingSearch, bookingStatus, bookingSort, dateFilter, customFrom, customTo]);

  return (
    <div className="space-y-6 p-6 bg-linear-to-br from-white to-[#fdf8d7] rounded-xl shadow-xl border border-[#f5e7a2]">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h2 className="text-2xl font-semibold text-[#0A1C4F]">
          Bookings ({dateFiltered.length})
        </h2>

        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full md:w-80 shadow-md">
          <input
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search booking…"
            value={bookingSearch}
            onChange={(e) => setBookingSearch(e.target.value)}
          />
          <FaSearch className="text-[#f5cc00]" />
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap gap-3 items-center">

        <CustomSelect
          value={bookingStatus}
          onChange={setBookingStatus}
          options={STATUS_OPTIONS}
          placeholder="All Status"
        />

        <CustomSelect
          value={dateFilter}
          onChange={(v) => {
            setDateFilter(v);
            setCustomFrom("");
            setCustomTo("");
          }}
          options={DATE_OPTIONS}
          placeholder="Booking Date"
        />

        {dateFilter === "custom" && (
          <>
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="p-2 border border-[#0a1c4f] rounded-md"
            />
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="p-2 border border-[#0a1c4f] rounded-md"
            />
          </>
        )}

        <CustomSelect
          value={bookingSort}
          onChange={setBookingSort}
          options={SORT_OPTIONS}
          placeholder="Sort"
        />

        <button
          onClick={exportExcel}
          className="ml-auto px-4 py-2 bg-green-600 flex items-center gap-2 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          <BiExport className="text-lg" />
          Export Data
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="hidden xl:block rounded-xl overflow-hidden border border-[#f5e7a2] shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-[#0A1C4F] text-white">
              <tr>
                <th className="px-5 py-4 text-left">Booking ID</th>
                <th className="px-5 text-left">User</th>
                <th className="px-5 text-left">Booked On</th>
                <th className="px-5 text-left">Room</th>
                <th className="px-5 text-left">Check-in</th>
                <th className="px-5 text-left">Check-out</th>
                <th className="px-5 text-left">Status</th>
                <th className="px-5 text-left">Price</th>
              </tr>
            </thead>

            <tbody className="text-[#0A1C4F] text-sm">
              {paginatedBookings?.map((b, i) => (
                <tr
                  key={b.id}
                  className={`border-b border-[#f7eeb2]
                    ${i % 2 === 0 ? "bg-white" : "bg-[#fffce8]"}
                    hover:bg-[#FFF7C2]`}
                >
                  <td className="px-5 py-4 font-semibold">{b.id}</td>

                  <td
                    className="px-5 text-blue-700 underline cursor-pointer"
                    onClick={() => onUserClick(b)}
                  >
                    {b.user}
                  </td>

                  <td className="px-5 text-gray-600">{b.bookingDate}</td>
                  <td className="px-5">{b.roomType}</td>
                  <td className="px-5">{b.checkIn}</td>
                  <td className="px-5">{b.checkOut}</td>

                  <td className="px-5">
                    <select
                      value={b.status}
                      onChange={(e) =>
                        onStatusUpdate(b.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-semibold border
                        ${
                          b.status === "Confirmed"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : b.status === "Pending"
                            ? "bg-orange-100 text-orange-700 border-orange-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="px-5 font-bold text-[#00A650]">
                    ₹{b.price.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalBookingPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setBookingPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm shadow
              ${
                bookingPage === i + 1
                  ? "bg-[#0A1C4F] text-white"
                  : "bg-gray-200"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
