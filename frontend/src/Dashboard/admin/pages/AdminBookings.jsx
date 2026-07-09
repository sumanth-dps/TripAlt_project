import React, { useState, useMemo } from "react";
import hotels from "../../../data/hotels";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomSelect from "../../../components/CustomSelect";
import { useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { BiExport } from "react-icons/bi";

const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
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
  { label: "Oldest", value: "oldest" },
  { label: "Price High → Low", value: "priceHigh" },
  { label: "Price Low → High", value: "priceLow" },
];
const normalizeStatus = (status) => {
  if (!status) return "unknown";

  const s = status.trim().toLowerCase();

  if (s.includes("confirm")) return "confirmed";
  if (s.includes("pend")) return "pending";
  if (s.includes("cancel")) return "cancelled";

  return "unknown";
};

export default function AdminBookings() {

  const allBookings = useMemo(() => {
  return hotels.flatMap((hotel) =>
    (hotel.bookings || []).map((b) => ({
      ...b,
      status: normalizeStatus(b.status),
      hotelName: hotel.name,
      hotelId: hotel.id,
    }))
  );
}, []);



  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const PER_PAGE = 8;


  /* ---------------- FILTER + SORT ---------------- */


const filtered = useMemo(() => {
  let list = [...allBookings];
  const now = new Date();

  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter(
      (b) =>
        b.id.toLowerCase().includes(q) ||
        b.user.toLowerCase().includes(q) ||
        b.hotelName.toLowerCase().includes(q)
    );
  }

  if (status) {
  list = list.filter((b) => b.status === status);
}


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

  if (sort === "recent") {
    list.sort(
      (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
    );
  } else if (sort === "oldest") {
    list.sort(
      (a, b) => new Date(a.bookingDate) - new Date(b.bookingDate)
    );
  } else if (sort === "priceHigh") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === "priceLow") {
    list.sort((a, b) => a.price - b.price);
  }

  return list;
}, [search, status, dateFilter, customFrom, customTo, sort]);



  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );
  const exportExcel = () => {
  const rows = filtered.map((b) => ({
    BookingID: b.id,
    Hotel: b.hotelName,
    User: b.user,
    BookedOn: b.bookingDate,
    CheckIn: b.checkIn,
    CheckOut: b.checkOut,
    Status: b.status,
    Price: b.price,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Bookings");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, `Bookings_${Date.now()}.xlsx`);
};

useEffect(() => {
  setPage(1);
}, [search, status, dateFilter, customFrom, customTo, sort]);

  return (
    <div className="space-y-6 px-3 lg:px-6 ">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h2 className="text-2xl font-semibold text-[#0A1C4F]">
          All Bookings
        </h2>

        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full md:w-80 shadow-md">
          <input
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search booking…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <FaSearch className="text-[#f5cc00]" />
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 items-center">

  <CustomSelect
    value={status}
    onChange={(v) => {
      setStatus(v);
      setPage(1);
    }}
    options={STATUS_OPTIONS}
    placeholder="All Status"
  />

  <CustomSelect
    value={dateFilter}
    onChange={(v) => {
      setDateFilter(v);
      setCustomFrom("");
      setCustomTo("");
      setPage(1);
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
        className="p-2 border rounded-md"
      />
      <input
        type="date"
        value={customTo}
        onChange={(e) => setCustomTo(e.target.value)}
        className="p-2 border rounded-md"
      />
    </>
  )}

  <CustomSelect
    value={sort}
    onChange={(v) => {
      setSort(v);
      setPage(1);
    }}
    options={SORT_OPTIONS}
    placeholder="Sort"
  />

  {/* EXPORT BUTTON */}
  <button
    onClick={exportExcel}
   className="ml-auto px-4 py-2 bg-green-600 flex flex-row cursor-pointer items-center gap-2 text-white rounded-lg shadow hover:bg-green-700 transition"
     >
       <BiExport className="text-lg"/> 
       <span>Export Data</span>
  </button>
</div>


      {/* DESKTOP TABLE */}
      <div className="hidden xl:block bg-linear-to-br from-white to-[#fdf8d7] rounded-xl shadow-xl border border-[#f5e7a2] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-[#0A1C4F] text-white">
              <tr>
                <th className="px-5 py-4 text-left">Booking ID</th>
                <th className="px-5 text-left">Hotel</th>
                <th className="px-5 text-left">User</th>
                <th className="px-5 text-left">Booked On</th>
                <th className="px-5 text-left">Check-in</th>
                <th className="px-5 text-left">Check-out</th>
                <th className="px-5 text-left">Status</th>
                <th className="px-5 text-left">Price</th>
                <th className="px-5 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="text-[#0A1C4F] text-sm">
              {paginated.length === 0 && (
                <tr>
                  <td colSpan="9" className="py-6 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}

              {paginated.map((b, i) => (
                <tr
                  key={b.id}
                  className={`border-b border-[#f7eeb2]
                    ${i % 2 === 0 ? "bg-white" : "bg-[#fffce8]"}
                    hover:bg-[#FFF7C2] group`}
                >
                  <td className="px-5 py-4 font-semibold relative">
                    <div className="absolute left-0 top-0 h-full w-[5px] bg-[#F5CC00] opacity-0 group-hover:opacity-100 transition rounded-r" />
                    {b.id}</td>
                  <td className="px-5 font-semibold text-[#003566]">
                    {b.hotelName}
                  </td>
                  <td className="px-5">{b.user}</td>
                  <td className="px-5 text-gray-600">{b.bookingDate}</td>
                  <td className="px-5">{b.checkIn}</td>
                  <td className="px-5">{b.checkOut}</td>
                  <td className="px-5">
                    <span
  className={`px-3 py-1 rounded-full text-xs font-semibold
    ${
      b.status === "confirmed"
        ? "bg-green-100 text-green-700 border border-green-200"
        : b.status === "pending"
        ? "bg-orange-100 text-orange-700 border border-orange-200"
        : "bg-red-100 text-red-700 border border-red-200"
    }`}
>
  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
</span>

                  </td>
                  <td className="px-5 font-bold text-[#00A650]">
                    ₹{b.price.toLocaleString()}
                  </td>
                  <td className="px-5">
                    <Link
                      to={`/admin/hotels/view/${b.hotelId}?tab=bookings`}
                      className="text-blue-700 underline font-medium hover:text-blue-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="xl:hidden space-y-3">
        {paginated.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-lg shadow-md p-3 border relative"
          >
            <div className="absolute top-0 left-0 w-[4px] h-full bg-[#F5CC00] rounded-r" />
            <p className="font-semibold text-[#0A1C4F] text-sm">
              {b.hotelName}
            </p>
            <p className="text-xs text-gray-600">
              #{b.id} • {b.user}
            </p>
            <p className="text-xs text-gray-600">
              Booked: {b.bookingDate}
            </p>
            <p className="text-xs text-gray-600">
              {b.checkIn} → {b.checkOut}
            </p>
            <p className="font-semibold text-[#00A650] text-sm mt-1">
              ₹{b.price.toLocaleString()}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs font-medium">{b.status}</span>
              <Link
                to={`/admin/hotels/view/${b.hotelId}?tab=bookings`}
                className="text-blue-600 text-xs underline font-medium"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm shadow
              ${
                page === i + 1
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
