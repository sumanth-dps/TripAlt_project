import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaSearch } from "react-icons/fa";
import hotelsData from "../../../data/hotels";
import useAdminAuth from "../../auth/AdminAuthContext";
import { ROLES } from "../../auth/roles";
import CustomSelect from "../../../components/CustomSelect";
import { PiNotePencilDuotone } from "react-icons/pi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { BiExport } from "react-icons/bi";

export default function HotelsList() {
  const { user } = useAdminAuth();

  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  /* ROLE FILTER */
  useEffect(() => {
    if (!user) return;
    if ([ROLES.ADMIN, ROLES.PROPERTY_MANAGER].includes(user.role)) {
      setHotels(hotelsData);
    } else {
      setHotels(hotelsData.filter((h) => user.hotelIds?.includes(String(h.id))));
    }
  }, [user]);

  /* GET UNIQUE CITIES & AREAS */
  const cities = [...new Set(hotelsData.map((h) => h.city))];

  const availableAreas = useMemo(() => {
    if (!cityFilter) return [];
    return [...new Set(hotelsData.filter((h) => h.city === cityFilter).map((h) => h.area?.trim()))];
  }, [cityFilter]);

  /* FILTER LOGIC */
  const filtered = useMemo(() => {
    return hotels
      .filter((h) => {
        const q = search.toLowerCase();
        return (
          h.name.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.area.toLowerCase().includes(q) ||
          h.owner?.name?.toLowerCase().includes(q)
        );
      })
      .filter((h) => (cityFilter ? h.city === cityFilter : true))
      .filter((h) => (areaFilter ? h.area === areaFilter : true));
  }, [hotels, search, cityFilter, areaFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);


const exportExcel = () => {
  const rows = filtered.map((h) => ({
    ID: h.id,
    Name: h.name,
    City: h.city,
    Area: h.area,
    Rating: h.rating,
    Owner: h.owner?.name || "—",
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Hotels");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `hotels_export_${Date.now()}.xlsx`);
};

  return (
    <div className="space-y-6 p-3 xl:p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-[#0A1C4F]">
          Hotels ({filtered.length})
        </h2>

        {/* SEARCH BAR */}
        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full md:w-80 shadow-md">
          <input
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search hotel, owner, city, area"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <FaSearch className="text-[#f5cc00]" />
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3">

  <CustomSelect
  
    value={cityFilter}
    onChange={(v) => {
      setCityFilter(v);
      setAreaFilter("");
      setPage(1);
    }}
    options={[{ label: "All Cities", value: "" }, ...cities.map((c) => ({ label: c, value: c }))]}
    placeholder="City"
  />

  <CustomSelect
    value={areaFilter}
    onChange={(v) => {
      setAreaFilter(v);
      setPage(1);
    }}
    options={[
      { label: "All Areas", value: "" },
      ...availableAreas.map((a) => ({ label: a, value: a })),
    ]}
    placeholder="Area"
  />

  {/* EXPORT EXCEL BUTTON */}
  

  {user.role === ROLES.ADMIN && (
    <Link
      to="/admin/hotel/add"
      className="ml-auto bg-[#003566] text-white px-4 py-2 rounded-lg shadow hover:bg-[#0A1C4F] transition"
    >
      + Add Hotel
    </Link>
  )}
  <button
    onClick={exportExcel}
    className="px-4 py-2 bg-green-600 flex flex-row cursor-pointer items-center gap-2 text-white rounded-lg shadow hover:bg-green-700 transition"
  >
    <BiExport className="text-lg"/> 
    <span>Export Data</span>
  </button>
</div>


      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-linear-to-br from-white to-[#fdf8d7] rounded-xl shadow-xl border border-[#f5e7a2] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="bg-[#0A1C4F] text-white text-[15px]">
              <tr>
                <th className="py-4 px-5 text-left">Hotel</th>
                <th className="px-5 text-left">City</th>
                <th className="px-5 text-left">Area</th>
                <th className="px-5 text-left">Rating</th>
                <th className="px-5 text-left">Owner</th>
                <th className="px-5 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="text-[#0A1C4F] text-[14px]">
              {paginated.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    No hotels found
                  </td>
                </tr>
              )}

              {paginated.map((h, i) => (
                <tr
                  key={h.id}
                  className={`border-b border-[#f7eeb2]  ${
                    i % 2 === 0 ? "bg-white" : "bg-[#fffce8]"
                  } hover:bg-[#FFF7C2] group`}
                >
                  <td className="py-4 px-5 font-semibold relative">
                    <div className="absolute left-0 top-0 h-full w-[5px] bg-[#F5CC00] opacity-0 group-hover:opacity-100 transition rounded-r" />
                    {h.name}
                  </td>
                  <td className="px-5">{h.city}</td>
                  <td className="px-5">{h.area}</td>
                  <td className="px-5 text-orange-600">⭐ {h.rating}</td>
                  <td className="px-5">{h.owner?.name || "—"}</td>

                  <td className="px-5 flex gap-3 items-center text-lg mt-4">
                    <Link to={`/admin/hotels/view/${h.id}`} className="text-blue-700">
                      <FaRegEye />
                    </Link>

                    {([ROLES.ADMIN, ROLES.PROPERTY_MANAGER].includes(user.role)) && (
                      <Link to={`/admin/hotels/edit/${h.id}`} className="text-green-600">
                        <PiNotePencilDuotone />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden space-y-3">
        {paginated.map((h) => (
          <div key={h.id} className="bg-white rounded-lg shadow-md p-3 border relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#F5CC00] rounded-l" />

            <h3 className="font-semibold text-[#0A1C4F]">{h.name}</h3>
            <p className="text-xs text-gray-600">{h.city} • {h.area}</p>
            <p className="text-orange-600 text-sm">⭐ {h.rating}</p>
            <p className="text-xs mt-1">Owner: {h.owner?.name}</p>

            <div className="flex gap-3 justify-center">
              <Link to={`/admin/hotels/view/${h.id}`} className="text-blue-700 text-sm underline">
                View
              </Link>
              {([ROLES.ADMIN, ROLES.PROPERTY_MANAGER].includes(user.role)) && (
                <Link to={`/admin/hotels/edit/${h.id}`} className="text-green-600 text-sm underline">
                  Edit
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm shadow ${
              page === i + 1 ? "bg-[#0A1C4F] text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
