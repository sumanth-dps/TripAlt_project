import { useMemo, useState } from "react";
import hotels from "../../../data/hotels";
import useAdminAuth  from "../../auth/AdminAuthContext";

export default function HotelTransactions() {
  const { user } = useAdminAuth();

  // get hotel data for logged-in staff
  const myHotel = hotels.find((h) =>
    user?.hotelIds?.includes(h.id)
  );

  const transactions = myHotel?.transactions || [];

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  const PER_PAGE = 6;

  const filtered = useMemo(() => {
    let list = [...transactions];

    if (search.trim()) {
      list = list.filter(
        (t) =>
          t.id.toLowerCase().includes(search.toLowerCase()) ||
          t.bookingId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) list = list.filter((t) => t.type === type);

    return list;
  }, [transactions, search, type]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#003566]">Transactions</h1>
        <p className="text-sm text-gray-500">
          Payments & refunds for your hotel
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4">
        <input
          placeholder="Search by Transaction / Booking ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border rounded-lg w-full md:w-72"
        />

        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Types</option>
          <option value="payment">Payment</option>
          <option value="refund">Refund</option>
          <option value="payout">Payout</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white border rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Txn ID</th>
              <th className="p-3 text-left">Booking</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((t) => (
              <tr key={t.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium text-[#003566]">
                  {t.id}
                </td>
                <td className="p-3">{t.bookingId}</td>

                <td className="p-3">
                  <Status type={t.type} />
                </td>

                <td className="p-3 font-semibold">
                  ₹{t.amount}
                </td>

                <td className="p-3">{t.date}</td>
              </tr>
            ))}

            {paginated.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-[#003566] text-white rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-3 py-2 text-[#003566] font-medium">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-[#003566] text-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* -------- TYPE BADGE -------- */
function Status({ type }) {
  const styles = {
    payment: "bg-green-100 text-green-700",
    refund: "bg-red-100 text-red-700",
    payout: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[type]}`}>
      {type}
    </span>
  );
}
