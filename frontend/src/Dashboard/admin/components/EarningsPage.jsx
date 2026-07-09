import { useEffect, useMemo, useState } from "react";
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
import CustomSelect from "../../../components/CustomSelect";

/* ---------------- FILTER OPTIONS ---------------- */
const DATE_FILTERS = [
  { label: "All Time", value: "" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Custom", value: "custom" },
];

export default function EarningsPage() {
  const { user } = useAdminAuth();
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const [dateFilter, setDateFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* ---------------- MOCK FETCH ---------------- */
  useEffect(() => {
    setLoading(true);

    const response = {
      revenue: 120000,
      commission: 15000,
      taxes: 2700,
      net: 100000,
      transactions: [
        {
          id: "BKG00123",
          amount: 3500,
          commission: 200,
          net: 3300,
          date: "2025-01-10",
        },
        {
          id: "BKG00567",
          amount: 5400,
          commission: 300,
          net: 5100,
          date: "2025-01-18",
        },
        {
          id: "BKG00987",
          amount: 4200,
          commission: 250,
          net: 3950,
          date: "2025-01-22",
        },
      ],
      monthly: [
        { month: "Jan", revenue: 20000, net: 17600 },
        { month: "Feb", revenue: 18000, net: 15800 },
        { month: "Mar", revenue: 22000, net: 19400 },
        { month: "Apr", revenue: 16000, net: 14000 },
        { month: "May", revenue: 26000, net: 22900 },
        { month: "Jun", revenue: 28000, net: 24700 },
      ],
    };

    setSummary(response);
    setTransactions(response.transactions);
    setMonthlyData(response.monthly);
    setLoading(false);
  }, []);

  /* ---------------- DATE FILTER ---------------- */
  const filteredTransactions = useMemo(() => {
    if (!dateFilter) return transactions;
    const now = new Date();

    return transactions.filter((t) => {
      const d = new Date(t.date);

      if (dateFilter === "today") {
        return d.toDateString() === now.toDateString();
      }
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
  }, [transactions, dateFilter, fromDate, toDate]);

  if (loading) {
    return <div className="p-6 text-gray-500 animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-8 pb-12">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <h2 className="text-3xl font-bold text-[#0A1C4F]">
          Earnings Dashboard
        </h2>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-stretch sm:items-center w-full lg:w-auto">
          <CustomSelect
            value={dateFilter}
            onChange={(v) => {
              setDateFilter(v);
              setFromDate("");
              setToDate("");
            }}
            options={DATE_FILTERS}
            placeholder="Booking Date"
          />

          {dateFilter === "custom" && (
            <>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="custom-input w-full sm:w-40"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="custom-input w-full sm:w-40"
              />
            </>
          )}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <SummaryCard label="Net Earnings" value={summary.net} />
        <SummaryCard label="Total Revenue" value={summary.revenue} />
        <SummaryCard label="Commission" value={summary.commission} />
        <SummaryCard label="Taxes" value={summary.taxes} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* REVENUE TREND */}
        <DashboardSection title="Revenue Trend">
          <div className="w-full overflow-hidden">
            <ResponsiveContainer
              width="100%"
              height={220}
              className="md:h-[260px]"
            >
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
            <ResponsiveContainer
              width="100%"
              height={220}
              className="md:h-[260px]"
            >
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
      <div className="bg-white flex flex-col gap-2 border border-gray-200  rounded-xl  shadow-md p-4">
        <h2 className="text-[#003566] text-lg font-semibold">Received</h2>
        <div className="flex flex-row items-center justify-between text-sm text-gray-500">
          <h2>Amount Collected at Hotel</h2>
          <h2>2000</h2>
        </div>

        <h2 className="text-[#003566] text-lg font-semibold">Deductions</h2>
        <div className="flex flex-row items-center justify-between text-sm text-gray-500">
          <h2>Previous month balance</h2>
          <h2>2000</h2>
        </div>
      </div>
      {/* ================= TRANSACTIONS ================= */}
      <DashboardSection title="Recent Transactions">
        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto rounded-xl border border-[#f7eeb2] shadow-lg">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#0A1C4F] text-white text-sm">
              <tr>
                <Th>Booking ID</Th>
                <Th>Date</Th>
                <Th>Amount</Th>
                <Th>Commission</Th>
                <Th>Net</Th>
              </tr>
            </thead>

            <tbody className="text-[#003566] text-sm">
              {filteredTransactions.map((t, i) => (
                <tr
                  key={i}
                  className={`border-b border-[#f7eeb2]
                  ${i % 2 === 0 ? "bg-white" : "bg-[#fffce8]"}
                  hover:bg-[#FFF7C2] transition group`}
                >
                  <td className="px-5 py-4 font-semibold relative">
                    <div
                      className="absolute left-0 top-0 h-full w-[5px] bg-[#F5CC00]
                      opacity-0 group-hover:opacity-100 transition rounded-r"
                    />
                    {t.id}
                  </td>
                  <Td>{t.date}</Td>
                  <Td>₹{t.amount}</Td>
                  <Td>₹{t.commission}</Td>
                  <Td className="font-semibold text-[#00A650]">₹{t.net}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="lg:hidden space-y-3">
          {filteredTransactions.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-[#f7eeb2] border-l-[6px] border-l-[#F5CC00]
                rounded-xl shadow-md p-4"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500">Booking ID</p>
                  <p className="font-semibold">{t.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm">{t.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Amount</p>
                  <p className="font-semibold">₹{t.amount}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Commission</p>
                  <p className="font-semibold text-red-600">₹{t.commission}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Net</p>
                  <p className="font-semibold text-[#00A650]">₹{t.net}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function SummaryCard({ label, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[#003566]">₹{value}</p>
    </div>
  );
}

function DashboardSection({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold mb-5 text-[#003566]">{title}</h3>
      {children}
    </div>
  );
}

function Th({ children }) {
  return <th className="px-5 py-4 text-left">{children}</th>;
}

function Td({ children, className = "" }) {
  return <td className={`px-5 py-4 ${className}`}>{children}</td>;
}
