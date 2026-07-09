import { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";

/* -------------------- DUMMY BOOKINGS -------------------- */
const BOOKINGS = [
  {
    id: "B001",
    guest: "Rahul Sharma",
    roomType: "Deluxe Room",
    roomNo: null,
    checkIn: "2025-02-12",
    checkOut: "2025-02-14",
    guests: 2,
    status: "Confirmed",
  },
  {
    id: "B002",
    guest: "Priya Patel",
    roomType: "Classic Room",
    roomNo: "C101",
    checkIn: "2025-02-12",
    checkOut: "2025-02-13",
    guests: 1,
    status: "Pending",
  },
  {
    id: "B003",
    guest: "Amit Verma",
    roomType: "Family Suite",
    roomNo: "F301",
    checkIn: "2025-02-10",
    checkOut: "2025-02-12",
    guests: 4,
    status: "Cancelled",
  },
];

/* -------------------- ROOM OPTIONS -------------------- */
const ROOM_NUMBERS = ["C101", "C102", "D201", "D202", "F301"];

export default function HotelBookings() {
  const [bookings, setBookings] = useState(BOOKINGS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  /* ---------------- FILTER ---------------- */
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const q = search.toLowerCase();
      const matchSearch =
        b.id.toLowerCase().includes(q) ||
        b.guest.toLowerCase().includes(q);

      const matchStatus = statusFilter
        ? b.status === statusFilter
        : true;

      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  /* ---------------- UPDATE STATUS ---------------- */
  const updateStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status } : b
      )
    );
  };

  /* ---------------- ASSIGN ROOM ---------------- */
  const assignRoom = (id, roomNo) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, roomNo } : b
      )
    );
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-semibold text-[#003566]">
          Hotel Bookings
        </h1>

        {/* SEARCH */}
        <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm w-full md:w-72">
          <input
            placeholder="Search by ID or Guest"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
          <FaSearch className="text-gray-500" />
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-3 flex-wrap">
        {["", "Confirmed", "Checked-in", "Checked-out", "Cancelled"].map(
          (s) => (
            <FilterButton
              key={s || "all"}
              active={statusFilter === s}
              label={s || "All"}
              onClick={() => setStatusFilter(s)}
            />
          )
        )}
      </div>

      {/* ---------------- DESKTOP TABLE ---------------- */}
      <div className="hidden md:block bg-white border rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-[#003566] text-white text-sm">
            <tr>
              <th className="p-3 text-left">Booking ID</th>
              <th className="p-3 text-left">Guest</th>
              <th className="p-3 text-left">Room Type</th>
              <th className="p-3 text-left">Room No</th>
              <th className="p-3 text-left">Dates</th>
              <th className="p-3 text-left">Guests</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{b.id}</td>
                <td className="p-3">{b.guest}</td>
                <td className="p-3">{b.roomType}</td>

                {/* ROOM ASSIGN */}
                <td className="p-3">
                  <select
                    value={b.roomNo || ""}
                    onChange={(e) =>
                      assignRoom(b.id, e.target.value)
                    }
                    className="border rounded-md p-1"
                  >
                    <option value="">Assign</option>
                    {ROOM_NUMBERS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-3 text-sm">
                  {b.checkIn} → {b.checkOut}
                </td>

                <td className="p-3">{b.guests}</td>

                <td className="p-3">
                  <StatusBadge status={b.status} />
                </td>

                {/* ACTIONS */}
                <td className="p-3">
                  <select
                    value={b.status}
                    onChange={(e) =>
                      updateStatus(b.id, e.target.value)
                    }
                    className="border rounded-md p-1"
                  >
                    <option>Confirmed</option>
                    <option>Checked-in</option>
                    <option>Checked-out</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- MOBILE CARDS ---------------- */}
      <div className="md:hidden space-y-4">
        {filteredBookings.map((b) => (
          <div
            key={b.id}
            className="bg-white border rounded-xl shadow p-4 space-y-2"
          >
            <div className="flex justify-between">
              <p className="font-semibold text-[#003566]">{b.id}</p>
              <StatusBadge status={b.status} />
            </div>

            <p className="text-sm">{b.guest}</p>
            <p className="text-sm">{b.roomType}</p>

            <p className="text-sm">
              {b.checkIn} → {b.checkOut}
            </p>

            <div className="flex gap-2">
              <select
                value={b.roomNo || ""}
                onChange={(e) =>
                  assignRoom(b.id, e.target.value)
                }
                className="border rounded-md p-1 text-sm flex-1"
              >
                <option value="">Assign Room</option>
                {ROOM_NUMBERS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>

              <select
                value={b.status}
                onChange={(e) =>
                  updateStatus(b.id, e.target.value)
                }
                className="border rounded-md p-1 text-sm flex-1"
              >
                <option>Confirmed</option>
                <option>Checked-in</option>
                <option>Checked-out</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition ${
        active
          ? "bg-[#003566] text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Confirmed: "bg-orange-100 text-orange-700",
    "Checked-in": "bg-green-100 text-green-700",
    "Checked-out": "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}
