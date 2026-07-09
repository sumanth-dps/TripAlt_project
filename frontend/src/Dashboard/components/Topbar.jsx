import { IoMenu } from "react-icons/io5";
import { BiSolidBell } from "react-icons/bi";
import { FaUserCircle, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../auth/AdminAuthContext";

export default function Topbar({ setMobileSidebarOpen }) {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();

  const roleConfig = {
    administrator: { label: "Admin", home: "/admin" },
    hotel_owner: { label: "Hotel Owner", home: "/owner" },
    hotel_manager: { label: "Hotel Staff", home: "/hotel" },
    property_manager: { label: "Property Manager", home: "/admin/dashboard" },
    hotel_accountant: { label: "Accounts", home: "/admin/dashboard" },
    cre: { label: "Support", home: "/admin/dashboard" },
  };

  const roleInfo = roleConfig[user?.role] || { label: "User", home: "/" };

  /* ---------------- CLICK OUTSIDE CLOSE ---------------- */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleLogout = () => {
    setShowMenu(false);
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 flex items-center justify-between px-6">
      
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          className="xl:hidden text-3xl text-[#003566]"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <IoMenu />
        </button>

        <img
          src="/logo.png"
          onClick={() => navigate(roleInfo.home)}
          className="hidden xl:block w-28 cursor-pointer"
          alt="KEYO"
        />

        {/* ROLE BADGE */}
        <span className="hidden md:inline-block px-3 py-1 text-sm rounded-full bg-[#003566]/10 text-[#003566] font-semibold">
          {roleInfo.label}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <BiSolidBell className="text-2xl cursor-pointer text-[#003566]" />

        {/* PROFILE */}
        <div className="relative" ref={dropdownRef}>
          <FaUserCircle
            className="text-4xl cursor-pointer text-[#003566]"
            onClick={() => setShowMenu((p) => !p)}
          />

          {showMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">

              {/* USER INFO */}
              <div className="px-4 py-3 border-b bg-gray-50">
                <p className="font-semibold text-[#003566] leading-tight">
                  {user?.name || "KEYO User"}
                </p>
                <p className="text-xs text-gray-500">{roleInfo.label}</p>
              </div>

              {/* ACTIONS */}
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/help");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaQuestionCircle className="text-[#003566]" />
                  Help & Support
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
