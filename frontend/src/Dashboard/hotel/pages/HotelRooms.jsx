import { useState, useMemo } from "react";
import {
  FaBed,
  FaCheckCircle,
  FaTools,
  FaExclamationTriangle,
} from "react-icons/fa";
import HotelCalendar from "../components/HotelCalendar";
import InventoryCalendar from "../components/InventoryCalendar";

const ROOM_TYPES = [
  { name: "Classic Room", totalRooms: 20 },
  { name: "Deluxe Room", totalRooms: 12 },
  { name: "Family Suite", totalRooms: 6 },
];

const BOOKINGS_BY_DATE = {
  "2025-01-18": {
    "Classic Room": 10,
    "Deluxe Room": 4,
  },
  "2025-01-19": {
    "Classic Room": 18,
    "Family Suite": 6,
  },
};

const todayISO = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

export default function HotelRooms() {
  /* -------- Calendar A: View Inventory -------- */
  const [viewDate, setViewDate] = useState(todayISO());

  /* -------- Calendar B: Block Rooms -------- */
  const [calendarRoom, setCalendarRoom] = useState(ROOM_TYPES[0].name);
  const [blockedDates, setBlockedDates] = useState({});

  /* -------- INVENTORY CALCULATION -------- */
  const inventory = useMemo(() => {
    return ROOM_TYPES.map((room) => {
      const total = room.totalRooms;

      const booked =
        BOOKINGS_BY_DATE[viewDate]?.[room.name] || 0;

      // ✅ NEW OBJECT-BASED BLOCKED COUNT
      const blocked =
        blockedDates[room.name]?.[viewDate] || 0;

      const available = Math.max(
        0,
        total - booked - blocked
      );

      let status = "sellable";
      if (available === 0) status = "soldout";
      else if (available <= 3) status = "limited";

      return {
        ...room,
        booked,
        blocked,
        available,
        status,
      };
    });
  }, [viewDate, blockedDates]);

  return (
    <div className="space-y-6">
      {/* ===================== HEADER ===================== */}
      <h1 className="text-3xl font-bold text-[#003566]">
        Rooms Management
      </h1>

      {/* ===================== INVENTORY TABLE ===================== */}
      <section className="bg-white rounded-xl shadow  overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#003566] text-white">
            <tr>
              <Th>Room Type</Th>
              <Th>Total</Th>
              <Th>Booked</Th>
              <Th>Blocked</Th>
              <Th>Available</Th>
              <Th>Status</Th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((room) => (
              <tr
                key={room.name}
                className="border-b hover:bg-orange-50"
              >
                <Td className="font-semibold">
                  {room.name}
                </Td>

                <Td>{room.totalRooms}</Td>

                <Td className="text-red-600 font-semibold">
                  {room.booked}
                </Td>

                <Td className="text-orange-600 font-semibold">
                  {room.blocked}
                </Td>

                <Td className="text-green-600 font-semibold">
                  {room.available}
                </Td>

                <Td>
                  <StatusBadge status={room.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ===================== CALENDARS ===================== */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* INVENTORY VIEW */}
        <InventoryCalendar
          value={viewDate}
          onChange={setViewDate}
        />

        {/* BLOCK ROOMS */}
        <section className="bg-white p-6 rounded-xl shadow border w-full">
          <h2 className="text-xl font-semibold text-[#003566] mb-4">
            Block Room Dates
          </h2>

          <HotelCalendar
            roomTypes={ROOM_TYPES}
            calendarRoom={calendarRoom}
            setCalendarRoom={setCalendarRoom}
            blockedDates={blockedDates}
            setBlockedDates={setBlockedDates}
          />
        </section>
      </div>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left font-semibold">
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td className={`px-4 py-3 ${className}`}>
      {children}
    </td>
  );
}

function StatusBadge({ status }) {
  const map = {
    sellable: {
      label: "Sellable",
      cls: "bg-green-100 text-green-700",
      icon: <FaCheckCircle />,
    },
    limited: {
      label: "Limited",
      cls: "bg-orange-100 text-orange-700",
      icon: <FaExclamationTriangle />,
    },
    soldout: {
      label: "Sold Out",
      cls: "bg-red-100 text-red-700",
      icon: <FaBed />,
    },
    blocked: {
      label: "Blocked",
      cls: "bg-gray-200 text-gray-700",
      icon: <FaTools />,
    },
  };

  const c = map[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${c.cls}`}
    >
      {c.icon}
      {c.label}
    </span>
  );
}
