import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import admins from "../../../data/admins";
import hotels from "../../../data/hotels";
import CustomSelect from "../../../components/CustomSelect";
import MultiSelect from "../../../components/MultiSelect";

const ROLE_OPTIONS = [
  { label: "Super Admin", value: "Super Admin" },
  { label: "Admin", value: "Admin" },
  { label: "Hotel Owner", value: "Hotel Owner" },
  { label: "Hotel Manager", value: "Hotel Manager" },
  { label: "Property Manager", value: "Property Manager" },
  { label: "Accountant", value: "Accountant" },
];



export default function EditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotelOptions = useMemo(
    () =>
      hotels.map((h) => ({
        label: h.name,
        value: h.id,
      })),
    []
  );

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "Admin",
    aadhar: "",
    pan: "",
    hotelId: "",
    hotelIds: [], // when owner has multiple
  });

  useEffect(() => {
    const admin = admins.find((a) => String(a.id) === String(id));
    if (admin) {
      setForm({
        ...admin,
        hotelIds: admin.hotelIds || [],
        hotelId: admin.hotelId || "",
      });
    } else {
      alert("Admin not found!");
      navigate("/admin/admins");
    }
  }, [id]);

  const update = (key, value) => setForm({ ...form, [key]: value });

  const saveChanges = () => {
    const index = admins.findIndex((a) => String(a.id) === String(id));
    if (index === -1) return alert("Admin not found!");

    if (
      form.role === "Hotel Owner" &&
      (!form.hotelIds || form.hotelIds.length === 0)
    ) {
      return alert("Select at least one hotel for owner");
    }

    if (
      ["Hotel Manager", "Property Manager", "Accountant"].includes(form.role) &&
      !form.hotelId
    ) {
      return alert("Select a hotel for this admin");
    }

    admins[index] = form;
    alert("Admin updated successfully!");
    console.log("Updated Admins:", admins);
    navigate("/admin/admins");
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow text-[#003566]">
      <h2 className="text-2xl font-semibold">Edit Admin</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input
            className="p-3 rounded-lg w-full border border-[#f5cc00] shadow bg-white"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            className="p-3 rounded-lg w-full border border-[#f5cc00] shadow bg-white"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            className="p-3 rounded-lg w-full border border-[#f5cc00] shadow bg-white"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
{/* Aadhar */}
        <div>
          <label className="text-sm font-medium">Aadhar Number</label>
          <input
            className="p-3 rounded-lg w-full border border-[#f5cc00] shadow bg-white"
            maxLength={12}
            value={form.aadhar}
            onChange={(e) => update("aadhar", e.target.value)}
          />
        </div>

        {/* PAN */}
        <div>
          <label className="text-sm font-medium">PAN Number</label>
          <input
            className="p-3 rounded-lg w-full border border-[#f5cc00] shadow bg-white"
            maxLength={10}
            value={form.pan}
            onChange={(e) => update("pan", e.target.value)}
          />
        </div>
        {/* Role */}
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

      {/* HOTEL ASSIGNMENT */}
      {form.role === "Hotel Owner" && (
        <div>
          <label className="text-sm font-medium">Assign Hotels (Owner)</label>
          <MultiSelect
            value={form.hotelIds}
            onChange={(v) => update("hotelIds", v)}
            options={hotelOptions}
            placeholder="Select Hotels"
          />
        </div>
      )}

      {["Hotel Manager", "Property Manager", "Accountant"].includes(
        form.role
      ) && (
        <div>
          <label className="text-sm font-medium">Assign Hotel</label>
          <CustomSelect
            value={form.hotelId}
            onChange={(v) => update("hotelId", v)}
            options={hotelOptions}
            placeholder="Select Hotel"
          />
        </div>
      )}

      <button
        className="px-5 py-3 bg-[#0A1C4F] text-white rounded-lg shadow hover:bg-[#0a1c4f]/80"
        onClick={saveChanges}
      >
        Save Changes
      </button>
    </div>
  );
}
