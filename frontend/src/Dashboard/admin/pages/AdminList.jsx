import React, { useState, useMemo } from "react";
import admins from "../../../data/admins";
import hotels from "../../../data/hotels";
import { FaSearch, FaRegEye } from "react-icons/fa";
import { PiNotePencilDuotone } from "react-icons/pi";
import CustomSelect from "../../../components/CustomSelect";
import { Link } from "react-router-dom";

const ROLE_OPTIONS = [
  { label: "All Roles", value: "" },
  { label: "Super Admin", value: "Super Admin" },
  { label: "Admin", value: "Admin" },
  { label: "Hotel Owner", value: "Hotel Owner" },
  { label: "Hotel Manager", value: "Hotel Manager" },
  { label: "Property Manager", value: "Property Manager" },
  { label: "Accountant", value: "Accountant" }
];

export default function AdminList() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const getHotelSummary = (admin) => {
    if (admin.role === "Super Admin" || admin.role === "Admin") return "All Hotels";
    if (Array.isArray(admin.hotelIds) && admin.hotelIds.length > 1) {
      const first = hotels.find((h) => h.id === admin.hotelIds[0]);
      return `${first?.name || "Hotel"}, +${admin.hotelIds.length - 1} more`;
    }
    if (admin.hotelId) {
      const h = hotels.find((h) => h.id === admin.hotelId);
      return h?.name || "Hotel";
    }
    return "No Access";
  };

  const filtered = useMemo(
    () =>
      admins.filter((a) => {
        const q = search.toLowerCase();
        if (!a.name.toLowerCase().includes(q) && !a.email.toLowerCase().includes(q)) return false;
        if (roleFilter && a.role !== roleFilter) return false;
        return true;
      }),
    [search, roleFilter]
  );

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h2 className="text-2xl font-semibold text-[#0A1C4F]">Users</h2>
 <div className="flex items-center bg-white rounded-full px-4 py-2 w-full md:w-80 shadow-md">
          <input
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search admin by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="text-[#f5cc00]" />
        </div>
        
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3">
         <CustomSelect
          value={roleFilter}
          onChange={(v) => setRoleFilter(v)}
          options={ROLE_OPTIONS}
          placeholder="All Roles"
        />
        <Link
          to="/admin/admins/add"
          className="ml-auto bg-[#003566] text-white px-4 py-2 rounded-lg shadow hover:bg-[#0A1C4F] transition"
        >
          + Add Admin
        </Link>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden xl:block bg-linear-to-br from-white to-[#fffceb] rounded-xl shadow-xl border border-[#f5e7a2] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-[#0A1C4F] text-white text-[15px]">
              <tr>
                <th className="px-5 py-4 text-left">Name</th>
                <th className="px-5 text-left">Email</th>
                <th className="px-5 text-left">Mobile</th>
                <th className="px-5 text-left">Role</th>
                <th className="px-5 text-left">Hotel Access</th>
                <th className="px-5 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="text-[#0A1C4F] text-[14px]">
              {filtered.map((a, i) => (
                <tr
                  key={a.id}
                  className={`border-b border-[#f7eeb2] ${
                    i % 2 === 0 ? "bg-white" : "bg-[#fffce8]"
                  } hover:bg-[#FFF7C2]`}
                >
                  <td className="px-5 py-4 font-semibold">{a.name}</td>
                  <td className="px-5">{a.email}</td>
                  <td className="px-5">{a.phone || "-"}</td>
                  <td className="px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        a.role === "Super Admin"
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : a.role === "Admin"
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "bg-orange-100 text-orange-700 border border-orange-200"
                      }`}
                    >
                      {a.role}
                    </span>
                  </td>
                  <td className="px-5 text-gray-700 text-sm">{getHotelSummary(a)}</td>
                  <td className="px-5 flex gap-3 items-center text-lg mt-4">
                    <button
                      onClick={() => setSelectedAdmin(a)}
                      className="text-blue-800 hover:text-blue-900 "
                    >
                      <FaRegEye /> 
                    </button>
                    <Link
                      to={`/admin/admins/edit/${a.id}`}
                      className="text-green-600 hover:text-green-700"
                    >
                      <PiNotePencilDuotone />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="xl:hidden space-y-3">
        {filtered.map((a) => (
          <div
            key={a.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <h3 className="font-semibold text-[#0A1C4F] text-base">{a.name}</h3>
            <p className="text-sm text-gray-600">{a.email}</p>
            <p className="text-sm text-gray-600">📞 {a.phone || "-"}</p>
            <p className="text-xs mt-1">
              <strong>Role:</strong> {a.role}
            </p>
            <p className="text-xs">
              <strong>Hotel Access:</strong> {getHotelSummary(a)}
            </p>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => setSelectedAdmin(a)}
                className="text-blue-700 text-sm underline flex items-center gap-1"
              >
                <FaRegEye /> View
              </button>

              <Link
                to={`/admin/admins/edit/${a.id}`}
                className="text-green-600 text-sm underline flex items-center gap-1"
              >
                <PiNotePencilDuotone /> Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      {selectedAdmin && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999]">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] md:w-[450px] animate-scaleIn">
            <h3 className="text-xl font-semibold text-[#003566]">User Details</h3>

            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedAdmin.name}</p>
              <p><strong>Email:</strong> {selectedAdmin.email}</p>
              <p><strong>Phone:</strong> {selectedAdmin.phone || "-"}</p>
              <p><strong>Role:</strong> {selectedAdmin.role}</p>
              <p><strong>Hotel Access:</strong> {getHotelSummary(selectedAdmin)}</p>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setSelectedAdmin(null)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>

              <Link
                to={`/admin/admins/edit/${selectedAdmin.id}`}
                className="px-4 py-2 rounded-md bg-[#003566] text-white hover:bg-[#0A1C4F]"
              >
                Edit User
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .animate-scaleIn { animation: scaleIn .25s ease-out }
        @keyframes scaleIn { from {transform: scale(.8);opacity:0;} to {transform: scale(1);opacity:1;} }
      `}</style>
    </div>
  );
}
