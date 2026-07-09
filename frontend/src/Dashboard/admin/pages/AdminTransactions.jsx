import React, { useState, useMemo, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import CustomSelect from "../../../components/CustomSelect";

const dummyTransactions = [
  {
    id: "TXN001",
    hotelName: "The Palace",
    user: "Ravi Kumar",
    bookingId: "B001",
    type: "payment",
    method: "UPI",
    amount: 4200,
    date: "2025-02-12",
  },
  {
    id: "TXN002",
    hotelName: "The Star Hotel",
    user: "Neha Singh",
    bookingId: "B003",
    type: "refund",
    method: "Card",
    amount: -1800,
    date: "2025-02-11",
  },
  {
    id: "TXN003",
    hotelName: "The Palace",
    user: "Saran",
    bookingId: "B002",
    type: "commission",
    method: "Keyo Commission",
    amount: 350,
    date: "2025-02-10",
  },
  {
    id: "TXN004",
    hotelName: "Hotel Sunshine",
    user: "Harsha",
    bookingId: "B009",
    type: "payout",
    method: "Bank Transfer",
    amount: 8200,
    date: "2025-02-09",
  },
];

const TYPE_OPTIONS = [
  { label: "All Types", value: "" },
  { label: "Payment", value: "payment" },
  { label: "Refund", value: "refund" },
  { label: "Commission", value: "commission" },
  { label: "Payout", value: "payout" },
];

const METHOD_OPTIONS = [
  { label: "All Methods", value: "" },
  { label: "UPI", value: "UPI" },
  { label: "Card", value: "Card" },
  { label: "Wallet", value: "Wallet" },
  { label: "Keyo Commission", value: "Keyo Commission" },
  { label: "Bank Transfer", value: "Bank Transfer" },
];

const DATE_OPTIONS = [
  { label: "Transaction Date", value: "" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Custom", value: "custom" },
];

const SORT_OPTIONS = [
  { label: "Sort", value: "" },
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Amount High → Low", value: "amountHigh" },
  { label: "Amount Low → High", value: "amountLow" },
];

export default function AdminTransactions() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [method, setMethod] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const PER_PAGE = 8;
  const now = new Date();

  /* ---------- FILTER + SORT ---------- */
  const filtered = useMemo(() => {
    let list = [...dummyTransactions];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.hotelName.toLowerCase().includes(q) ||
          t.user.toLowerCase().includes(q)
      );
    }

    if (type) list = list.filter((t) => t.type === type);
    if (method) list = list.filter((t) => t.method === method);

    if (dateFilter) {
      list = list.filter((t) => {
        const d = new Date(t.date);

        if (dateFilter === "today") return d.toDateString() === now.toDateString();

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

    if (sort === "newest") list.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "oldest") list.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === "amountHigh") list.sort((a, b) => b.amount - a.amount);
    if (sort === "amountLow") list.sort((a, b) => a.amount - b.amount);

    return list;
  }, [search, type, method, dateFilter, customFrom, customTo, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => setPage(1), [search, type, method, dateFilter, customFrom, customTo, sort]);

  return (
    <div className="space-y-6 px-3 lg:px-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h2 className="text-2xl font-semibold text-[#0A1C4F]">
          All Transactions
        </h2>

        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full md:w-80 shadow-md">
          <input
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search ID, Name, Hotel…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="text-[#f5cc00]" />
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3">
        <CustomSelect value={type} onChange={setType} options={TYPE_OPTIONS} placeholder="Type" />
        <CustomSelect value={method} onChange={setMethod} options={METHOD_OPTIONS} placeholder="Payment Method" />

        <CustomSelect
          value={dateFilter}
          onChange={(v) => {
            setDateFilter(v);
            setCustomFrom("");
            setCustomTo("");
          }}
          options={DATE_OPTIONS}
          placeholder="Date"
        />

        {dateFilter === "custom" && (
          <>
            <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className="p-2 border rounded-md" />
            <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className="p-2 border rounded-md" />
          </>
        )}

        <CustomSelect value={sort} onChange={setSort} options={SORT_OPTIONS} placeholder="Sort" />
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden xl:block bg-linear-to-br from-white to-[#fdf8d7] rounded-xl shadow-xl border border-[#f5e7a2] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-sm">
            <thead className="bg-[#0A1C4F] text-white">
              <tr>
                <th className="px-5 py-4 text-left">Txn ID</th>
                <th className="px-5 text-left">Hotel</th>
                <th className="px-5 text-left">User</th>
                <th className="px-5 text-left">Payment Method</th>
                <th className="px-5 text-left">Type</th>
                <th className="px-5 text-left">Amount</th>
                <th className="px-5 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="text-[#0A1C4F]">
              {paginated.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}

              {paginated.map((t, i) => (
                <tr
                  key={t.id}
                  className={`border-b border-[#f7eeb2] ${
                    i % 2 === 0 ? "bg-white" : "bg-[#fffce8]"
                  } hover:bg-[#FFF7C2] group`}
                >
                  <td className="px-5 py-4 font-semibold relative">
                    <div className="absolute left-0 top-0 h-full w-[5px] bg-[#F5CC00] opacity-0 group-hover:opacity-100 transition rounded-r" />
                    {t.id}</td>
                  <td className="px-5 font-semibold text-[#003566]">{t.hotelName}</td>
                  <td className="px-5">{t.user}</td>
                  <td className="px-5 text-sm">{t.method}</td>
                  <td className="px-5 capitalize">{t.type}</td>
                  <td className="px-5 font-bold text-[#00A650]">₹{t.amount.toLocaleString()}</td>
                  <td className="px-5">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="xl:hidden space-y-3">
        {paginated.map((t) => (
          <div key={t.id} className="bg-white rounded-lg shadow-md p-3 border relative">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-[#F5CC00] rounded-r" />

            <p className="font-semibold text-[#0A1C4F] text-sm">{t.hotelName}</p>
            <p className="text-xs text-gray-600">#{t.id} — {t.user}</p>
            <p className="text-xs text-gray-600">{t.method}</p>

            <p className="font-semibold text-[#00A650] text-sm mt-1">₹{t.amount}</p>
            <p className="text-xs text-gray-600 mt-1">{t.date}</p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm shadow ${
              page === i + 1 ? "bg-[#0A1C4F] text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
