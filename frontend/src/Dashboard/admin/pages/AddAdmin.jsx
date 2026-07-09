import { useState, useMemo } from "react";
import admins from "../../../data/admins";
import hotels from "../../../data/hotels";
import MultiSelect from "../../../components/MultiSelect";
import CustomSelect from "../../../components/CustomSelect";

const ROLE_OPTIONS = [
  { label: "Super Admin", value: "Super Admin" },
  { label: "Admin", value: "Admin" },
  { label: "Hotel Owner", value: "Hotel Owner" },
  { label: "Hotel Manager", value: "Hotel Manager" },
  { label: "Property Manager", value: "Property Manager" },
  { label: "Accountant", value: "Accountant" },
];

export default function AddAdmin() {
  const [form, setForm] = useState({
    id: "A" + Math.floor(Math.random() * 9000 + 1000),
    name: "",
    email: "",
    phone: "",
    role: "Admin",
    aadhar: "",
    pan: "",
    hotelId: "",       // 👈 for staff (1 hotel)
    hotelIds: [],      // 👈 for owners (multiple hotels)
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const hotelOptions = useMemo(
    () => hotels.map(h => ({ label: h.name, value: h.id })),
    []
  );

  const saveAdmin = () => {
    if (!form.name.trim()) return alert("Name is required");
    if (!form.email.trim()) return alert("Email is required");

    /** VALIDATION LOGIC */
    // OWNER → must select at least one hotel
    if (form.role === "Hotel Owner" && form.hotelIds.length === 0) {
      return alert("Hotel Owner must be assigned to at least 1 hotel.");
    }

    // Staff → must select exactly one
    if (
      ["Hotel Manager", "Property Manager", "Accountant"].includes(form.role) &&
      !form.hotelId
    ) {
      return alert("Select hotel access for this admin.");
    }

    admins.push(form);
    alert("Admin Added Successfully!");
    console.log("Updated Admins:", admins);
  };

  return (
    <div className="bg-white p-6 m-6  rounded-xl shadow space-y-6 text-[#003566]">
      <h2 className="text-2xl font-bold">Add New Admin</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input
            className="p-3 rounded-lg w-full border border-[#f5cc00] bg-white shadow"
            value={form.name}
            placeholder="Full Name"
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            className="p-3 rounded-lg w-full border border-[#f5cc00] bg-white shadow"
            type="email"
            value={form.email}
            placeholder="Email"
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Phone Number</label>
          <input
            className="p-3 rounded-lg w-full border border-[#f5cc00] bg-white shadow"
            value={form.phone}
            placeholder="Phone Number"
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        {/* Aadhar */}
        <div>
          <label className="text-sm font-medium">Aadhar</label>
          <input
            className="p-3 rounded-lg w-full border border-[#f5cc00] bg-white shadow"
            maxLength={12}
            placeholder="Aadhar Number"
            value={form.aadhar}
            onChange={(e) => update("aadhar", e.target.value)}
          />
        </div>

        {/* PAN */}
        <div>
          <label className="text-sm font-medium">PAN</label>
          <input
            className="p-3 rounded-lg w-full border border-[#f5cc00] bg-white shadow"
            maxLength={10}
            placeholder="PAN Number"
            value={form.pan}
            onChange={(e) => update("pan", e.target.value)}
          />
        </div>

        {/* ROLE */}
        <div>
          <label className="text-sm font-medium">Role</label>
          <CustomSelect
            value={form.role}
            onChange={(v) => update("role", v)}
            options={ROLE_OPTIONS}
            placeholder="Select Role"
          />
        </div>
      </div>

      {["Hotel Owner"].includes(form.role) && (
  <div>
    <label className="text-sm font-medium">Assign Hotels (Owner can manage multiple)</label>
    <MultiSelect
      value={form.hotelIds || []}
      onChange={(v) => update("hotelIds", v)}
      options={hotelOptions}
      placeholder="Select Hotels"
    />
  </div>
)}

{["Hotel Manager", "Property Manager", "Accountant"].includes(form.role) && (
  <div>
    <label className="text-sm font-medium">Assign Single Hotel</label>
    <CustomSelect
      value={form.hotelId}
      onChange={(v) => update("hotelId", v)}
      options={hotelOptions}
      placeholder="Select Hotel"
    />
  </div>
)}


      <button
        className="px-5 py-3 bg-[#0A1C4F] text-white rounded-lg shadow hover:bg-[#0A1C4F]/80"
        onClick={saveAdmin}
      >
        Save Admin
      </button>
    </div>
  );
}
