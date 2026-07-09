
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  FaHome,
  FaCalendarCheck,
  FaBed,
  FaRupeeSign,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdReceiptLong } from "react-icons/md";

import useAdminAuth from "../../auth/AdminAuthContext";

/* ---------------- HOTEL MENU ITEMS ---------------- */
const items = [
  {
    to: "/hotel/dashboard",
    label: "Dashboard",
    icon: <FaHome />,
  },
  {
    to: "/hotel/bookings",
    label: "Bookings",
    icon: <FaCalendarCheck />,
  },
  {
    to: "/hotel/rooms",
    label: "Rooms",
    icon: <FaBed />,
  },
  {
    to: "/hotel/pricing",
    label: "Pricing",
    icon: <FaRupeeSign />,
  },
  {
    to: "/hotel/earnings",
    label: "Earnings",
    icon: <RiMoneyRupeeCircleFill />,
  },
  {
    to: "/hotel/transactions",
    label: "Transactions",
    icon: <MdReceiptLong />,
  },
  {
    to: "/hotel/reviews",
    label: "Reviews",
    icon: <FaStar />,
  },
];

/* ---------------- SIDEBAR COMPONENT ---------------- */
export default function HotelSidebar({
  mobileSidebarOpen,
  setMobileSidebarOpen,
}) {
  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block w-64 2xl:w-72 bg-white border-r border-gray-300 h-screen sticky top-0 overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* MOBILE SIDEBAR */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full bg-white w-64 z-50 shadow-xl
        transform transition-transform duration-300
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute top-4 right-4 text-3xl text-[#003566]"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <IoClose />
        </button>

        <SidebarContent />
      </div>

      {/* OVERLAY */}
      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </>
  );
}

/* ---------------- SIDEBAR CONTENT ---------------- */

function SidebarContent() {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  return (
    <div className="p-4 relative h-full">
      {/* LOGO */}
      <img
        onClick={() => navigate("/hotel/dashboard")}
        src="/logo.png"
        alt="KEYO"
        className="w-24 md:w-28 cursor-pointer"
      />

      {/* MENU */}
      <nav className="mt-6 space-y-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-md text-md
              ${
                isActive
                  ? "bg-[#003566]/20 text-[#003566] font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <span>{it.icon}</span>
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-md 
          text-sm text-red-600 hover:bg-red-50"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}
