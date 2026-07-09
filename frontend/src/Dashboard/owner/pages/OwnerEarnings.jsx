import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import useAdminAuth from "../../auth/AdminAuthContext";
import hotels from "../../../data/hotels";
import CustomSelect from "../../../components/CustomSelect";

export default function OwnerEarnings() {
  const { user } = useAdminAuth();

  const myHotels = hotels.filter((h) => user?.hotelIds?.includes(h.id));

  if (myHotels.length === 0) {
    return <div className="p-6 text-gray-500">No hotels assigned.</div>;
  }

  const [selectedHotelId, setSelectedHotelId] = useState(myHotels[0].id);
  const hotel = myHotels.find((h) => h.id === selectedHotelId);

  const bookings = hotel.bookings || [];

  /* ---------------- SUMMARY LOGIC ---------------- */
  const summary = useMemo(() => {
    const confirmed = bookings.filter((b) => b.status === "Confirmed");
    const cancelled = bookings.filter((b) => b.status === "Cancelled");

    const revenue = confirmed.reduce((s, b) => s + b.price, 0);
    const commission = Math.round(revenue * 0.12);
    const taxes = Math.round(commission * 0.18);
    const net = revenue - commission - taxes;

    return {
      revenue,
      commission,
      taxes,
      net,
      cancelledLoss: cancelled.reduce((s, b) => s + b.price, 0),
    };
  }, [bookings]);

  /* ---------------- MONTHLY CHART DATA ---------------- */
  const monthlyData = useMemo(() => {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => ({
      month: m,
      revenue: 15000 + i * 4000,
      net: 12000 + i * 3200,
    }));
  }, []);

  return (
    <div className="space-y-6 pb-12">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold text-[#003566]">
          Earnings Dashboard
        </h2>

        {myHotels.length > 1 && (

            <CustomSelect
              value={selectedHotelId}
              onChange={setSelectedHotelId}
              placeholder="Select Hotel"
              options={myHotels.map((h) => ({
                value: h.id,
                label: `${h.name} — ${h.city}`,
              }))}
            />
          
        )}
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard label="Net Earnings" value={summary.net} />
        <SummaryCard label="Total Revenue" value={summary.revenue} />
        <SummaryCard label="Commission" value={summary.commission} />
        <SummaryCard label="Taxes" value={summary.taxes} />
      </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* REVENUE TREND */}
  <DashboardSection title="Revenue Trend">
    <div className="w-full overflow-hidden">
      <ResponsiveContainer width="100%" height={220} className="md:h-[260px]">
        <LineChart
          data={monthlyData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* X AXIS */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-30}
            textAnchor="end"
            height={50}
          />

          {/* HIDE Y AXIS ON MOBILE */}
          <YAxis
            tick={{ fontSize: 12 }}
            width={40}
            hide={window.innerWidth < 640}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#003566"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </DashboardSection>

  {/* NET EARNINGS TREND */}
  <DashboardSection title="Net Earnings Trend">
    <div className="w-full overflow-hidden">
      <ResponsiveContainer width="100%" height={220} className="md:h-[260px]">
        <BarChart
          data={monthlyData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-30}
            textAnchor="end"
            height={50}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            width={40}
            hide={window.innerWidth < 640}
          />

          <Tooltip />

          <Bar
            dataKey="net"
            fill="#0096c7"
            radius={[6, 6, 0, 0]}
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </DashboardSection>
</div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-[#003566] overflow-x-auto">
        <table className="w-full ">
          <thead className="bg-[#003566] text-white text-sm">
            <tr>
              <Th>Booking ID</Th>
              <Th>Guest</Th>
              <Th>Room</Th>
              <Th>Check-In</Th>
              <Th>Check-Out</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr
                key={b.id}
                className="border-b border-[#003566] hover:bg-orange-50"
              >
                <Td>{b.id}</Td>
                <Td>{b.user}</Td>
                <Td>{b.roomType}</Td>
                <Td>{b.checkIn}</Td>
                <Td>{b.checkOut}</Td>
                <Td className="font-semibold text-green-600">
                  ₹{b.price}
                </Td>
                <Td>
                  <StatusBadge status={b.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white p-5 rounded-xl shadow-sm border border-[#f5cc00]"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[#003566]">{b.id}</p>
              <StatusBadge status={b.status} />
            </div>

            <p className="text-sm text-gray-700 mt-1">{b.user}</p>
            <p className="text-sm">{b.roomType}</p>
            <p className="text-sm text-gray-600">
              {b.checkIn} → {b.checkOut}
            </p>

            <p className="font-bold text-green-600 mt-2">
              ₹{b.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function SummaryCard({ label, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[#003566]">
        ₹{value}
      </p>
    </div>
  );
}

function DashboardSection({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold mb-5 text-[#003566]">
        {title}
      </h3>
      {children}
    </div>
  );
}

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
  const styles =
    status === "Confirmed"
      ? "bg-green-100 text-green-700"
      : status === "Pending"
      ? "bg-orange-100 text-orange-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}
