import hotels from "../../../data/hotels";
import  useAdminAuth  from "../../auth/AdminAuthContext";
import { useMemo, useState } from "react";
import CustomSelect from "../../../components/CustomSelect";
// CHART IMPORTS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function OwnerDashboard() {
  const { user } = useAdminAuth();
  const [selectedRange, setSelectedRange] = useState("today");

  /* ---------------------- STATIC KPI RANGE DATA ---------------------- */
  const analytics = {
    today: {
      revenue: 8200,
      occupancy: "78%",
      avgRoom: "₹3200",
      rating: 4.4,
      reviews: 8,
      checkins: 12,
    },
    last7: {
      revenue: 58300,
      occupancy: "82%",
      avgRoom: "₹3100",
      rating: 4.5,
      reviews: 52,
      checkins: 80,
    },
    last30: {
      revenue: 214000,
      occupancy: "76%",
      avgRoom: "₹2950",
      rating: 4.3,
      reviews: 210,
      checkins: 310,
    },
    month: {
      revenue: 178000,
      occupancy: "81%",
      avgRoom: "₹3000",
      rating: 4.4,
      reviews: 162,
      checkins: 250,
    },
  };

  const stats = analytics[selectedRange];

  /* ---------------------- USER HOTELS DATA ---------------------- */
  const myHotels = hotels.filter((h) => user?.hotelIds?.includes(h.id));

  const totalHotels = myHotels.length;

  const totalBookings = myHotels.reduce(
    (sum, h) => sum + (h.bookings?.length || 0),
    0
  );

  const totalEarnings = myHotels.reduce((sum, h) => {
    const earningsFromHotel =
      h.bookings?.reduce((s, b) => s + (b.price || 0), 0) || 0;
    return sum + earningsFromHotel;
  }, 0);

  const averageRating = useMemo(() => {
    const allRatings = myHotels.flatMap((h) => h.reviews || []).map((r) => r.rating);
    if (allRatings.length === 0) return 0;
    return (allRatings.reduce((s, r) => s + r, 0) / allRatings.length).toFixed(1);
  }, [myHotels]);

  /* ---------------------- CHART DATA ---------------------- */
  const revenueChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: [8200, 9600, 7200, 11000, 12500, 15000, 9800],
        backgroundColor: "#003566",
      },
    ],
  };

  const occupancyChart = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Occupancy %",
        data: [78, 82, 76, 81],
        borderColor: "#F5CC00",
        backgroundColor: "#F5CC00",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  return (
    <div className="space-y-6 ">

      {/* Heading */}
      <h1 className="text-3xl font-semibold text-[#003566]">Owner Dashboard</h1>

      {/* DATE RANGE SELECT / TABS */}

{/* MOBILE — Custom Select */}
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
    ]}
  />
</div>

{/* DESKTOP — BUTTON TABS */}
<div className="hidden md:flex gap-4 flex-wrap">
  {[
    { key: "today", label: "Today" },
    { key: "last7", label: "Last 7 Days" },
    { key: "last30", label: "Last 30 Days" },
    { key: "month", label: "This Month" },
  ].map(({ key, label }) => (
    <button
      key={key}
      onClick={() => setSelectedRange(key)}
      className={`px-4 py-2 rounded-lg font-medium border shadow-sm cursor-pointer transition ${
        selectedRange === key
          ? "bg-[#003566] text-white border-[#003566]"
          : "bg-white text-[#003566] border-gray-200 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  ))}
</div>


      {/* KPI CARDS — KEYO STYLE */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-6">
        <KpiCard title="Revenue" value={`₹${stats.revenue}`} />
        <KpiCard title="Occupancy" value={stats.occupancy} />
        <KpiCard title="Avg Room Price" value={stats.avgRoom} />
        <KpiCard title="Avg Rating" value={`⭐ ${stats.rating}`} />
        <KpiCard title="Reviews" value={stats.reviews} />
        <KpiCard title="Today Check-ins" value={stats.checkins} />
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <SummaryCard title="Total Hotels" value={totalHotels} />
        <SummaryCard title="Total Bookings" value={totalBookings} />
        <SummaryCard title="Total Earnings" value={`₹${totalEarnings}`} />
        <SummaryCard title="Average Rating" value={`⭐ ${averageRating}`} />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        
        {/* Revenue Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-[#003566]">Revenue Trend</h2>
          <Bar data={revenueChart} />
        </div>

        {/* Occupancy Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-[#003566]">Occupancy Overview</h2>
          <Line data={occupancyChart} />
        </div>

      </div>
    </div>
  );
}

/* ---------------------- COMPONENTS ---------------------- */

function KpiCard({ title, value }) {
  return (
    <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm text-center hover:shadow-lg duration-300">
      <p className="text-xs font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-[#003566] mt-1">{value}</p>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg duration-300">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-[#003566] mt-2">{value}</p>
    </div>
  );
}
