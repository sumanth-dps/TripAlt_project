import { useState, useMemo } from "react";
import {
  FaBed,
  FaCheckCircle,
  FaTools,
  FaExclamationTriangle,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import HotelCalendar from "../../hotel/components/HotelCalendar";
import InventoryCalendar from "../../hotel/components/InventoryCalendar";
import CustomSelect from "../../../components/CustomSelect";

/* MOCK DATA */
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

const todayISO = () => new Date().toISOString().split("T")[0];

export default function HotelRooms() {
  const [viewDate, setViewDate] = useState(todayISO());
  const [calendarRoom, setCalendarRoom] = useState(ROOM_TYPES[0].name);
  const [blockedDates, setBlockedDates] = useState({});

  const inventory = useMemo(() => {
    return ROOM_TYPES.map((room) => {
      const total = room.totalRooms;
      const booked = BOOKINGS_BY_DATE[viewDate]?.[room.name] || 0;
      const blocked = blockedDates[room.name]?.[viewDate] || 0;
      const available = Math.max(0, total - booked - blocked);
      let status = "sellable";
      if (available === 0) status = "soldout";
      else if (available <= 3) status = "limited";
      return { ...room, booked, blocked, available, status };
    });
  }, [viewDate, blockedDates]);

  

  return (
    <div className="space-y-6">

      {/* HEADER — STATS */}
      <h1 className="text-3xl font-bold text-[#003566] flex justify-between items-center">
        Rooms Management
      </h1>
      {/* INVENTORY TABLE */}
      <section className="bg-white rounded-xl shadow-md border border-[#F5E7A2] overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead className="bg-[#003566] text-white text-sm">
              <tr>
                <Th>Room Type</Th>
                <Th>Total</Th>
                <Th>Booked</Th>
                <Th>Blocked</Th>
                <Th>Available</Th>
                <Th>Status</Th>
              </tr>
            </thead>

            <tbody className="text-[#0A1C4F] text-[14px]">
              {inventory.map((room, i) => (
                <tr
                  key={room.name}
                  className={`border-b border-[#f7eeb2]
                    ${i % 2 === 0 ? "bg-white" : "bg-[#fffce8]"}
                    hover:bg-[#FFF7C2] transition group`}
                >
                  <td className="px-5 py-4 font-semibold relative">
                    <div className="absolute left-0 top-0 h-full w-[5px] bg-[#F5CC00] opacity-0 group-hover:opacity-100 transition rounded-r" />
                    {room.name}
                  </td>

                  <Td>{room.totalRooms}</Td>
                  <Td className="text-red-600 font-semibold">{room.booked}</Td>
                  <Td className="text-orange-600 font-semibold">{room.blocked}</Td>
                  <Td className="text-green-600 font-semibold">{room.available}</Td>
                  <Td><StatusBadge status={room.status} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SIDEBY SIDE CALENDARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InventoryCalendar value={viewDate} onChange={setViewDate}/>

        <section className="bg-white p-6 rounded-xl shadow-md border border-[#F5E7A2] col-span-2">
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

/* -------- COMPONENT HELPERS -------- */
function Th({ children }) {
  return <th className="px-5 py-4 text-left font-semibold">{children}</th>;
}
function Td({ children, className = "" }) {
  return <td className={`px-5 py-4 ${className}`}>{children}</td>;
}
function StatusBadge({ status }) {
  const map = {
    sellable: {
      label: "Sellable",
      cls: "bg-green-100 text-green-700 border border-green-200",
      icon: <FaCheckCircle />,
    },
    limited: {
      label: "Limited",
      cls: "bg-orange-100 text-orange-700 border border-orange-200",
      icon: <FaExclamationTriangle />,
    },
    soldout: {
      label: "Sold Out",
      cls: "bg-red-100 text-red-700 border-red-200",
      icon: <FaBed />,
    },
    blocked: {
      label: "Blocked",
      cls: "bg-gray-200 text-gray-700 border-gray-300",
      icon: <FaTools />,
    },
  };
  const c = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${c.cls}`}>
      {c.icon}
      {c.label}
    </span>
  );
}
