import { NavLink, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import {
  FaHome,
  FaHotel,
  FaPlusCircle,
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

import useAdminAuth  from "../../auth/AdminAuthContext";
import { ROLES } from "../../auth/roles";

const items = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: <FaHome />,
    allow: [
      ROLES.ADMIN,
      ROLES.PROPERTY_MANAGER,
      ROLES.ACCOUNTANT,
      ROLES.CRE,
    ],
  },

  {
    to: "/admin/hotels",
    label: "Hotels",
    icon: <FaHotel />,
    allow: [ROLES.ADMIN, ROLES.PROPERTY_MANAGER],
  },

  {
    to: "/admin/hotel/add",
    label: "Add Hotel",
    icon: <FaPlusCircle />,
    allow: [ROLES.ADMIN],
  },

  {
    to: "/admin/bookings",
    label: "Bookings",
    icon: <FaCalendarAlt />,
    allow: [
      ROLES.ADMIN,
      ROLES.PROPERTY_MANAGER,
      ROLES.CRE,
      ROLES.ACCOUNTANT,
    ],
  },

  {
    to: "/admin/transactions",
    label: "Transactions",
    icon: <RiMoneyRupeeCircleFill />,
    allow: [ROLES.ADMIN, ROLES.PROPERTY_MANAGER, ROLES.ACCOUNTANT],
  },

  {
    to: "/admin/admins",
    label: "Users",
    icon: <FaUsers />,
    allow: [ROLES.ADMIN],
  },
  {
    to: "/admin/customizations",
    label: "Customizations",
    icon:<MdEdit />,
    allow: [ROLES.ADMIN],
  },
];

/* ------------------- SIDEBAR COMPONENT ------------------- */
export default function AdminSidebar({ mobileSidebarOpen, setMobileSidebarOpen }) {
  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden xl:block w-64 2xl:w-72 bg-white border-r border-gray-300 h-screen sticky top-0 overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* MOBILE SIDEBAR */}
      <div
        className={`xl:hidden fixed top-0 left-0 h-full bg-white w-64 z-50 shadow-xl transform transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-3xl text-[#003566]"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <IoClose  />
        </button>

        <SidebarContent />
      </div>

      {/* OVERLAY */}
      {mobileSidebarOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

function SidebarContent() {
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();

  return (
    <div className="p-4 relative h-full">
      {/* LOGO */}
      <img
        onClick={() => navigate("/admin/dashboard")}
        src="/logo.png"
        alt="Logo"
        className="w-24 md:w-28 cursor-pointer"
      />

      {/* MENU ITEMS */}
      <nav className="mt-6 space-y-1">
        {items
          .filter((it) => it.allow.includes(user?.role))
          .map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-md text-md ${
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
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}
