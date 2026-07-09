
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../auth/AdminAuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ROLES } from "../auth/roles";
import Popup from "../../components/Popup";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
const [alert, setAlert] = useState({
  open: false,
  type: "error", // error | success | info
  message: "",
});

const showAlert = (type, message) => {
  setAlert({ open: true, type, message });
};

  /* ---------------- DUMMY USERS ---------------- */
  const dummyUsers = [
    {
      email: "admin@keyo.com",
      password: "admin123",
      role: ROLES.ADMIN,
      name: "Keyo Admin",
    },
    {
      email: "owner@hotel.com",
      password: "owner123",
      role: ROLES.HOTEL_OWNER,
      hotelIds: [1, 2],
      name: "Hotel Owner",
    },
    {
      email: "manager@hotel.com",
      password: "manager123",
      role: ROLES.HOTEL_MANAGER,
      hotelIds: [1],
      name: "Hotel Manager",
    },
    {
      email: "staff@hotel.com",
      password: "staff123",
      role: ROLES.HOTEL_STAFF,
      hotelIds: [1],
      name: "Hotel Staff",
    },
    {
      email: "pm@keyo.com",
      password: "pm123",
      role: ROLES.PROPERTY_MANAGER,
      name: "Property Manager",
    },
    {
      email: "account@keyo.com",
      password: "account123",
      role: ROLES.ACCOUNTANT,
      name: "Accountant",
    },
    {
      email: "cre@keyo.com",
      password: "cre123",
      role: ROLES.CRE,
      name: "Customer Relations",
    },
  ];

  /* ---------------- LOGIN HANDLER ---------------- */
const handleLogin = (e) => {
  e.preventDefault();
  setLoading(true);

  const found = dummyUsers.find(
    (u) => u.email === form.email && u.password === form.password
  );

  setTimeout(() => {
    if (!found) {
      setLoading(false);
      showAlert("error", "Invalid email or password. Please try again.");
      return;
    }

    // Save user
    login(found);

    showAlert("success", `Welcome ${found.name}! Logging you in...`);

    setTimeout(() => {
      if (
        [
          ROLES.ADMIN,
          ROLES.PROPERTY_MANAGER,
          ROLES.ACCOUNTANT,
          ROLES.CRE,
        ].includes(found.role)
      ) {
        navigate("/admin/dashboard", { replace: true });
      } else if (found.role === ROLES.HOTEL_OWNER) {
        navigate("/owner/dashboard", { replace: true });
      } else if (
        [ROLES.HOTEL_MANAGER, ROLES.HOTEL_STAFF].includes(found.role)
      ) {
        navigate("/hotel/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }, 900);
  }, 800);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#003566] text-center">
          KEYO Login
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Admin • Owner • Hotel Staff
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-[#003566]">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              className="w-full mt-1 p-3 text-[#003566] border border-[#003566] rounded-lg shadow-sm focus:ring-2 focus:ring-[#F5CC00]/80 outline-none focus:border-0"
              placeholder="admin@keyo.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-[#003566]">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPass ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                className="w-full p-3 text-[#003566] border border-[#003566] rounded-lg shadow-sm focus:ring-2 focus:ring-[#F5CC00]/80 outline-none focus:border-0"
                placeholder="Enter password"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 cursor-pointer text-[#003566]"
              >
                {showPass ? <IoEyeOff size={22} /> : <IoEye size={22} />}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-[#003566] rounded-lg font-medium
                       hover:bg-[#0A1C4F] transition-all shadow-md cursor-pointer disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        {/* Helper */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          Demo Staff Login: <br />
          <span className="font-medium">staff@hotel.com / staff123</span>
        </div>
      </div>
      <Popup isOpen={alert.open} onClose={() => setAlert({ ...alert, open: false })}>
  <div className="text-center px-2">

    {/* ICON */}
    <div
      className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4
      ${
        alert.type === "error"
          ? "bg-red-100"
          : alert.type === "success"
          ? "bg-green-100"
          : "bg-blue-100"
      }`}
    >
      <span className="text-3xl">
        {alert.type === "error" && "🚫"}
        {alert.type === "success" && "✅"}
        {alert.type === "info" && "ℹ️"}
      </span>
    </div>

    {/* TITLE */}
    <h2 className="text-xl font-semibold text-gray-800 mb-1">
      {alert.type === "error" && "Login Failed"}
      {alert.type === "success" && "Login Successful"}
      {alert.type === "info" && "Information"}
    </h2>

    {/* MESSAGE */}
    <p className="text-gray-600 text-sm mb-5">{alert.message}</p>

    {/* BUTTON */}
    <button
      onClick={() => setAlert({ ...alert, open: false })}
      className={`w-full px-6 py-2.5 rounded-xl font-medium text-white transition cursor-pointer
        ${
          alert.type === "error"
            ? "bg-red-600 hover:bg-red-700"
            : alert.type === "success"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-[#003566] hover:bg-blue-900"
        }`}
    >
      OK
    </button>
  </div>
</Popup>

    </div>
  );
}
