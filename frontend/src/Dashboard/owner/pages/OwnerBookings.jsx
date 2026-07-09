
import React, { useEffect, useMemo, useState } from "react";
import hotels from "../../../data/hotels";
import useAdminAuth from "../../auth/AdminAuthContext";
import { FaSearch } from "react-icons/fa";
import CustomSelect from "../../../components/CustomSelect";
import { BiExport } from "react-icons/bi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
  { label: "Oldest", value: "oldest" },
  { label: "Price High → Low", value: "priceHigh" },
  { label: "Price Low → High", value: "priceLow" },
];

export default function OwnerBookings() {
  const { user } = useAdminAuth();

  const myHotels = hotels.filter((h) =>
    user?.hotelIds?.includes(h.id)
  );

  const allBookings = useMemo(() => {
    return myHotels.flatMap((hotel) =>
      (hotel.bookings || []).map((b) => ({
        ...b,
        hotelName: hotel.name,
        hotelId: hotel.id,
      }))
    );
  }, [myHotels]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const PER_PAGE = 8;

  /* ---------------- FILTERING ---------------- */
  const filtered = useMemo(() => {
    let list = [...allBookings];
    const now = new Date();

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.user.toLowerCase().includes(q) ||
          b.roomType.toLowerCase().includes(q) ||
          b.hotelName.toLowerCase().includes(q)
      );
    }

    if (status) list = list.filter((b) => b.status === status);

    if (dateFilter) {
      list = list.filter((b) => {
        if (!b.bookingDate) return false;
        const d = new Date(b.bookingDate);

        if (dateFilter === "today")
          return d.toDateString() === now.toDateString();

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

        if (dateFilter === "custom" && fromDate && toDate) {
          const from = new Date(fromDate);
          const to = new Date(toDate);
          to.setHours(23, 59, 59, 999);
          return d >= from && d <= to;
        }

        return true;
      });
    }

    if (sort === "recent")
      list.sort(
        (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
      );
    if (sort === "oldest")
      list.sort(
        (a, b) => new Date(a.bookingDate) - new Date(b.bookingDate)
      );
    if (sort === "priceHigh") list.sort((a, b) => b.price - a.price);
    if (sort === "priceLow") list.sort((a, b) => a.price - b.price);

    return list;
  }, [allBookings, search, status, dateFilter, fromDate, toDate, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  /* ---------------- EXPORT ---------------- */
  const exportExcel = () => {
    const rows = filtered.map((b) => ({
      BookingID: b.id,
      Hotel: b.hotelName,
      Guest: b.user,
      BookedOn: b.bookingDate,
      CheckIn: b.checkIn,
      CheckOut: b.checkOut,
      Status: b.status,
      Price: b.price,
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "OwnerBookings");

    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf]), `Owner_Bookings_${Date.now()}.xlsx`);
  };

  useEffect(() => setPage(1), [
    search,
    status,
    dateFilter,
    fromDate,
    toDate,
    sort,
  ]);

  if (myHotels.length === 0) {
    return <div className="p-6 text-gray-500">No hotels assigned.</div>;
  }

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-2xl font-semibold text-[#0A1C4F]">
          My Hotel Bookings
        </h2>

        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full md:w-80 shadow-md">
          <input
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search booking…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="text-[#f5cc00]" />
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 items-center">
        <CustomSelect
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS}
          placeholder="All Status"
        />

        <CustomSelect
          value={dateFilter}
          onChange={(v) => {
            setDateFilter(v);
            setFromDate("");
            setToDate("");
          }}
          options={DATE_OPTIONS}
          placeholder="Booking Date"
        />

        {dateFilter === "custom" && (
          <>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="p-2 border rounded-md"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-2 border rounded-md"
            />
          </>
        )}

        <CustomSelect
          value={sort}
          onChange={setSort}
          options={SORT_OPTIONS}
          placeholder="Sort"
        />

        <button
          onClick={exportExcel}
          className="ml-auto px-4 py-2 bg-green-600 flex items-center gap-2 text-white rounded-lg shadow hover:bg-green-700"
        >
          <BiExport />
          Export
        </button>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden xl:block bg-linear-to-br from-white to-[#fdf8d7] rounded-xl shadow-xl border border-[#f5e7a2] overflow-hidden">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-[#0A1C4F] text-white">
            <tr>
              <Th>Booking ID</Th>
              <Th>Hotel</Th>
              <Th>Guest</Th>
              <Th>Booked On</Th>
              <Th>Check-In</Th>
              <Th>Check-Out</Th>
              <Th>Status</Th>
              <Th>Price</Th>
            </tr>
          </thead>

          <tbody className="text-[#0A1C4F] text-sm">
            {paginated.map((b, i) => (
              <tr
                key={b.id}
                className={`border-b border-[#f7eeb2]
                ${i % 2 === 0 ? "bg-white" : "bg-[#fffce8]"}
                hover:bg-[#FFF7C2] group`}
              >
                <td className="px-5 py-4 font-semibold relative">
                  <div className="absolute left-0 top-0 h-full w-[5px] bg-[#F5CC00]
                    opacity-0 group-hover:opacity-100 transition rounded-r" />
                  {b.id}
                </td>
                <Td>{b.hotelName}</Td>
                <Td>{b.user}</Td>
                <Td>{b.bookingDate}</Td>
                <Td>{b.checkIn}</Td>
                <Td>{b.checkOut}</Td>
                <Td>
                  <StatusBadge status={b.status} />
                </Td>
                <Td className="font-bold text-[#00A650]">
                  ₹{b.price.toLocaleString()}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="xl:hidden space-y-3">
        {paginated.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-lg shadow-md p-4 border relative"
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
              ₹{b.price}
            </p>
            <StatusBadge status={b.status} />
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
            ${page === i + 1 ? "bg-[#0A1C4F] text-white" : "bg-gray-200"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Th({ children }) {
  return <th className="px-5 py-4 text-left">{children}</th>;
}

function Td({ children, className = "" }) {
  return <td className={`px-5 py-4 ${className}`}>{children}</td>;
}

function StatusBadge({ status }) {
  const cls =
    status === "Confirmed"
      ? "bg-green-100 text-green-700"
      : status === "Pending"
      ? "bg-orange-100 text-orange-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}
