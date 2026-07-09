import { useState } from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaBed,
  FaClipboardList,
} from "react-icons/fa";
import CustomSelect from "../../../components/CustomSelect";
export default function HotelDashboard() {
const [selectedRange, setSelectedRange] = useState("today");
  const analytics = {
    today: {
      checkins: 12,
      checkouts: 7,
      occupancy: "78%",
      availableRooms: 6,
      pendingBookings: 4,
    },
    last7: {
      checkins: 84,
      checkouts: 79,
      occupancy: "82%",
      availableRooms: 14,
      pendingBookings: 18,
    },
    last30: {
      checkins: 312,
      checkouts: 298,
      occupancy: "75%",
      availableRooms: 22,
      pendingBookings: 42,
    },
    month: {
      checkins: 260,
      checkouts: 240,
      occupancy: "80%",
      availableRooms: 18,
      pendingBookings: 35,
    },
    all: {
      checkins: 2840,
      checkouts: 2715,
      occupancy: "77%",
      availableRooms: 12,
      pendingBookings: 96,
    },
  };

  const data = analytics[selectedRange];

  return (
    <div className="space-y-6 pb-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#003566]">
          Hotel Dashboard
        </h1>

        {/* MOBILE SELECT */}
<div className="md:hidden w-full">
  <CustomSelect
    value={selectedRange}
    onChange={setSelectedRange}
    placeholder="Select Range"
    options={[
      { value: "today", label: "Today" },
      { value: "last7", label: "Last 7 Days" },
      { value: "last30", label: "Last 30 Days" },
      { value: "month", label: "This Month" },
      { value: "all", label: "All Time" },
    ]}
  />
</div>
        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex flex-wrap gap-2">
          <RangeButton label="Today" active={selectedRange === "today"} onClick={() => setSelectedRange("today")} />
          <RangeButton label="Last 7 Days" active={selectedRange === "last7"} onClick={() => setSelectedRange("last7")} />
          <RangeButton label="Last 30 Days" active={selectedRange === "last30"} onClick={() => setSelectedRange("last30")} />
          <RangeButton label="This Month" active={selectedRange === "month"} onClick={() => setSelectedRange("month")} />
          <RangeButton label="All Time" active={selectedRange === "all"} onClick={() => setSelectedRange("all")} />
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        <KpiCard icon={<FaSignInAlt />} label="Check-ins" value={data.checkins} color="green" />
        <KpiCard icon={<FaSignOutAlt />} label="Check-outs" value={data.checkouts} color="blue" />
        <KpiCard icon={<FaBed />} label="Occupancy" value={data.occupancy} color="purple" />
        <KpiCard icon={<FaBed />} label="Available Rooms" value={data.availableRooms} color="orange" />
        <KpiCard icon={<FaClipboardList />} label="Pending Bookings" value={data.pendingBookings} color="red" />
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-[#003566] mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <QuickAction label="Manage Bookings" />
          <QuickAction label="Update Room Status" />
          <QuickAction label="Block Dates" />
          <QuickAction label="Update Pricing" />
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-[#003566] mb-4">
          {selectedRange === "today" ? "Today Summary" : "Operational Summary"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryItem label="Early Check-ins" value="3" />
          <SummaryItem label="Late Check-outs" value="2" />
          <SummaryItem label="Rooms Under Maintenance" value="1" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function RangeButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
        active
          ? "bg-[#003566] text-white"
          : "bg-white border border-gray-200 text-[#003566] hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}

function KpiCard({ icon, label, value, color }) {
  const colors = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
      <div className={`inline-flex p-3 rounded-lg ${colors[color]}`}>
        {icon}
      </div>
      <p className="mt-3 text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-[#003566] mt-1">
        {value}
      </p>
    </div>
  );
}

function QuickAction({ label }) {
  return (
    <button className="p-4 rounded-xl border bg-gray-50 font-medium hover:bg-[#003566] hover:text-white transition">
      {label}
    </button>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="p-4 rounded-lg bg-gray-50 border">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-2xl font-bold text-[#003566] mt-1">{value}</p>
    </div>
  );
}
