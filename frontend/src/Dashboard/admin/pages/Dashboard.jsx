
import React from "react";
import  useAdminAuth  from "../../auth/AdminAuthContext";

import { IoIosPeople } from "react-icons/io";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoBedSharp } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";

import { motion } from "framer-motion";
import { Line, Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

// Register charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

// Admin Line Chart Dummy Data
const adminCheckinCheckoutData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Check In",
      data: [120, 150, 130, 170, 200, 180, 220],
      borderColor: "#003566",
      backgroundColor: "rgba(0, 53, 102, 0.2)",
      tension: 0.4,
    },
    {
      label: "Check Out",
      data: [80, 100, 95, 110, 140, 130, 160],
      borderColor: "#5596d6",
      backgroundColor: "rgba(85, 150, 214, 0.2)",
      tension: 0.4,
    },
  ],
};

// Admin Pie Chart Dummy Data
const adminPieData = {
  labels: ["Check-in", "Check-out", "Pending"],
  datasets: [
    {
      data: [753, 516, 230],
      backgroundColor: ["#003566", "#5596d6", "#cbd9ff"],
    },
  ],
};

export default function Dashboard() {
  const { user } = useAdminAuth();

  const isOwner =
    user?.role === "hotel_owner" || user?.role === "hotel_manager";

  const isPropertyManager = user?.role === "property_manager";

  const hotelList = user?.hotelIds || [];

  const [selectedHotelId, setSelectedHotelId] = React.useState(
    (isOwner || isPropertyManager) ? hotelList[0] : null
  );

  const [hotelAnalytics, setHotelAnalytics] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  React.useEffect(() => {
    if (!selectedHotelId) return;

    const dummy = {
      revenue: 42500,
      occupancy: 78,
      arr: 2450,
      rating: 4.3,
      chart: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        revenueTrend: [5000, 7000, 6500, 8000, 9000, 7500, 8500],
        occupancyTrend: [60, 72, 75, 80, 90, 85, 88],
        arrTrend: [2200, 2300, 2400, 2500, 2600, 2550, 2700],
      },
    };

    setHotelAnalytics(dummy);
  }, [selectedHotelId]);

  const ownerCards = [
    {
      label: "Revenue (30 days)",
      value: hotelAnalytics ? `₹${hotelAnalytics.revenue}` : "--",
      icon: GiTakeMyMoney,
    },
    {
      label: "Occupancy",
      value: hotelAnalytics ? `${hotelAnalytics.occupancy}%` : "--",
      icon: IoBedSharp,
    },
    {
      label: "Avg Room Rate",
      value: hotelAnalytics ? `₹${hotelAnalytics.arr}` : "--",
      icon: FaIndianRupeeSign,
    },
    {
      label: "Rating",
      value: hotelAnalytics ? hotelAnalytics.rating : "--",
      icon: IoIosPeople,
    },
  ];

  const ownerLineData =
    hotelAnalytics && {
      labels: hotelAnalytics.chart.labels,
      datasets: [
        {
          label: "Revenue",
          data: hotelAnalytics.chart.revenueTrend,
          borderColor: "#003566",
          backgroundColor: "rgba(0,53,102,0.2)",
        },
        {
          label: "Occupancy %",
          data: hotelAnalytics.chart.occupancyTrend,
          borderColor: "#5596d6",
          backgroundColor: "rgba(85,150,214,0.2)",
        },
        {
          label: "Avg Room Rate",
          data: hotelAnalytics.chart.arrTrend,
          borderColor: "#ffaa33",
          backgroundColor: "rgba(255,170,51,0.2)",
        },
      ],
    };

  const adminCards = [
    { label: "Today Bookings", value: "8,461", icon: IoBedSharp },
    { label: "New Income", value: "₹7,053", icon: FaIndianRupeeSign },
    { label: "Total Customers", value: "516", icon: IoIosPeople },
    { label: "Total Revenue", value: "₹1.2M", icon: GiTakeMyMoney },
  ];

  const statCards = (isOwner || isPropertyManager) ? ownerCards : adminCards;

  return (
    <div className="px-4 pt-2 pb-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-[#003566]">
          {isOwner || isPropertyManager ? "Hotel Performance Dashboard" : "Keyo Admin Dashboard"}
        </h2>

        {/* PROPERTY MANAGER DROPDOWN */}
        {isPropertyManager && hotelList.length > 0 && (
          <div>
            <label className="font-medium mr-3 text-[#003566]">Select Hotel:</label>
            <select
              className="border border-gray-200 rounded-md px-3 py-2"
              value={selectedHotelId}
              onChange={(e) => setSelectedHotelId(e.target.value)}
            >
              {hotelList.map(h => (
                <option key={h} value={h}>
                  Hotel {h}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {statCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white shadow-sm rounded-xl p-6 border border-gray-200 hover:shadow-lg duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-3xl font-bold">{item.value}</div>
                    <div className="text-gray-500 text-sm">{item.label}</div>
                  </div>
                  <Icon className="text-6xl bg-[#003566]/10 rounded-xl p-3" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* OWNER VIEW */}
        {(isOwner || isPropertyManager) && hotelAnalytics ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="font-semibold text-lg text-[#003566] mb-4">
              Hotel Performance Trends
            </h3>

            <div className="h-[300px]">
              <Line data={ownerLineData} options={{ maintainAspectRatio: false }} />
            </div>
          </motion.div>
        ) : (

          /* ADMIN DASHBOARD */
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* CALENDAR */}
            <motion.div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 ">
              <h3 className="font-semibold mb-4 text-[#003566] text-lg">
                Select Booking Date
              </h3>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar value={selectedDate} onChange={setSelectedDate} />
              </LocalizationProvider>
            </motion.div>

            {/* CHARTS */}
            <motion.div className="bg-white col-span-2 rounded-xl p-6 shadow-sm border border-gray-200 ">
              <h3 className="font-semibold mb-4 text-[#003566] text-lg">
                Reservation Analytics
              </h3>

              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-full lg:w-2/3 h-[260px]">
                  <Line
                    data={adminCheckinCheckoutData}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>

                <div className="w-full lg:w-1/3 h-[260px] flex justify-center">
                  <Doughnut
                    data={adminPieData}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
