
import { useEffect, useState } from "react";
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

export default function HotelEarnings() {
  const { user } = useAdminAuth();
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    setLoading(true);

    const response = {
      revenue: 120000,
      commission: 15000,
      taxes: 2700,
      net: 100000,
      payableToKeyo: 5000,
      receivableFromKeyo: 0,
      deductions: {
        prevBalance: 2000,
        adjustments: 1000,
      },
      transactions: [
        { id: "BKG00123", amount: 3500, commission: 200, net: 3300 },
        { id: "BKG00567", amount: 5400, commission: 300, net: 5100 },
        { id: "BKG00987", amount: 4200, commission: 250, net: 3950 },
      ],
      monthly: [
        { month: "Jan", revenue: 20000, commission: 2400, net: 17600 },
        { month: "Feb", revenue: 18000, commission: 2200, net: 15800 },
        { month: "Mar", revenue: 22000, commission: 2600, net: 19400 },
        { month: "Apr", revenue: 16000, commission: 2000, net: 14000 },
        { month: "May", revenue: 26000, commission: 3100, net: 22900 },
        { month: "Jun", revenue: 28000, commission: 3300, net: 24700 },
      ],
    };

    setSummary(response);
    setTransactions(response.transactions);
    setMonthlyData(response.monthly);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500 animate-pulse">Loading earnings…</div>;
  }

  return (
    <div className="space-y-6 p-6 pb-12">

      <h2 className="text-3xl font-bold text-[#003566]">
        Earnings Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard label="Net Earnings" value={summary.net} />
        <SummaryCard label="Total Revenue" value={summary.revenue} />
        <SummaryCard label="Commission" value={summary.commission} />
        <SummaryCard label="Taxes On Commissions" value={summary.taxes} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard
          label="Payable to KEYO"
          value={summary.payableToKeyo}
          color="text-red-600"
        />
        <SummaryCard
          label="Receivable from KEYO"
          value={summary.receivableFromKeyo}
          color="text-green-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <DashboardSection title="Revenue Trend (Last 6 Months)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#003566"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardSection>

        <DashboardSection title="Net Earnings Trend">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="net" fill="#0096c7" radius={6} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardSection>

      </div>

      <DashboardSection title="Deductions">
        <div className="space-y-2 text-sm text-gray-700">
          <Row label="Previous Month Balance" value={summary.deductions.prevBalance} />
          <Row label="Adjustments" value={summary.deductions.adjustments} />
        </div>
      </DashboardSection>

      <DashboardSection title="Recent Transactions">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <Th>Booking ID</Th>
                <Th>Amount</Th>
                <Th>Commission</Th>
                <Th>Net Earnings</Th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t hover:bg-gray-50">
                  <Td>{t.id}</Td>
                  <Td>₹{t.amount}</Td>
                  <Td>₹{t.commission}</Td>
                  <Td className="font-semibold text-[#003566]">
                    ₹{t.net}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardSection>

    </div>
  );
}
function SummaryCard({ label, value, color = "text-[#003566]" }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>
        ₹{value}
      </p>
    </div>
  );
}

function DashboardSection({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-xl font-semibold mb-5 text-[#003566]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-semibold">₹{value}</span>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="p-3 text-left font-semibold text-gray-700">
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td className={`p-3 ${className}`}>
      {children}
    </td>
  );
}
