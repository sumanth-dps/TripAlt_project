//   import  { useState, useEffect } from "react";
//   import hotels from "../../../data/hotels";
//   import { Link } from "react-router-dom";
//   import { FaSearch } from "react-icons/fa";
// import useAdminAuth from "../auth/AdminAuthContext";
// const { user } = useAdminAuth();

// // 🚫 Block access for non-admin roles
// if (user?.role !== "administrator") {
//   return (
//     <div className="p-6 text-center text-red-600 font-semibold">
//       You do not have permission to view all bookings.
//     </div>
//   );
// }

//   export default function Bookings() {
//     const [allBookings, setAllBookings] = useState([]);
//     const [search, setSearch] = useState("");
//     const [statusFilter, setStatusFilter] = useState("");
//     const [sortBy, setSortBy] = useState("");
//     const [page, setPage] = useState(1);

//     const itemsPerPage = 8;

//     useEffect(() => {
//       const merged = [];
//       hotels.forEach((hotel) => {
//         (hotel.bookings || []).forEach((booking) => {
//           merged.push({
//             ...booking,
//             hotelName: hotel.name,
//             hotelId: hotel.id || hotel._id,
//           });
//         });
//       });
//       setAllBookings(merged);
//     }, []);

//     const filtered = allBookings
//       .filter(
//         (b) =>
//           b.id.toLowerCase().includes(search.toLowerCase()) ||
//           b.user.toLowerCase().includes(search.toLowerCase()) ||
//           b.hotelName.toLowerCase().includes(search.toLowerCase())
//       )
//       .filter((b) => (statusFilter ? b.status === statusFilter : true))
//       .sort((a, b) => {
//         if (sortBy === "recent") return new Date(b.checkIn) - new Date(a.checkIn);
//         if (sortBy === "priceHigh") return b.price - a.price;
//         if (sortBy === "priceLow") return a.price - b.price;
//         return 0;
//       });

//     const totalPages = Math.ceil(filtered.length / itemsPerPage);
//     const paginated = filtered.slice(
//       (page - 1) * itemsPerPage,
//       page * itemsPerPage
//     );

//    return (
//   <div className="space-y-6 ">

//     {/* HEADER */}
//     <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
//       <h2 className="text-2xl font-semibold text-[#0A1C4F]">All Bookings</h2>

//       {/* SEARCH - MOBILE */}
//       <div className="flex md:hidden items-center bg-white rounded-full px-3 py-2 w-full shadow">
//         <input
//           className="bg-transparent outline-none text-sm w-full"
//           placeholder="Search booking ID, hotel, user..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//         />
//         <FaSearch className="text-gray-600" />
//       </div>

//       {/* SEARCH - DESKTOP */}
//       <div className="hidden md:flex items-center bg-gray-50 rounded-full px-3 py-2 w-1/3 shadow-md">
//         <input
//           className="bg-transparent outline-none text-sm w-full"
//           placeholder="Search booking ID, hotel, user..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//         />
//         <FaSearch className="text-[#f5cc00]" />
//       </div>
//     </div>

//     {/* FILTERS */}
//     <div className="flex flex-row gap-3 sm:gap-4 bg-white  rounded-xl">
//       <select
//         value={statusFilter}
//         onChange={(e) => {
//           setStatusFilter(e.target.value);
//           setPage(1);
//         }}
//         className="p-2 border border-[#f5cc00] rounded-md w-full sm:w-auto"
//       >
//         <option value="">All Status</option>
//         <option value="Confirmed">Confirmed</option>
//         <option value="Pending">Pending</option>
//         <option value="Cancelled">Cancelled</option>
//       </select>

//       <select
//         value={sortBy}
//         onChange={(e) => {
//           setSortBy(e.target.value);
//           setPage(1);
//         }}
//         className="p-2 border border-[#f5cc00] rounded-md w-full sm:w-auto"
//       >
//         <option value="">Sort</option>
//         <option value="recent">Most Recent</option>
//         <option value="priceHigh">Price High → Low</option>
//         <option value="priceLow">Price Low → High</option>
//       </select>
//     </div>

//     {/* DESKTOP TABLE */}
//     <div className="hidden xl:block bg-linear-to-br from-white to-[#fef9e7] rounded-xl shadow-xl border border-[#f5e7a2] overflow-hidden">
//   <div className="overflow-x-auto">
//     <table className="w-full min-w-[950px]">

//       {/* TABLE HEADER */}
//       <thead className="bg-[#0A1C4F] text-white shadow-md text-[15px]">
//         <tr>
//           <th className="py-4 px-5 text-left">Booking ID</th>
//           <th className="px-5 text-left">Hotel</th>
//           <th className="px-5 text-left">User</th>
//           <th className="px-5 text-left">Room Type</th>
//           <th className="px-5 text-left">Check In</th>
//           <th className="px-5 text-left">Check Out</th>
//           <th className="px-5 text-left">Price</th>
//           <th className="px-5 text-left">Status</th>
//           <th className="px-5 text-left">Actions</th>
//         </tr>
//       </thead>

//       <tbody className="text-[#0A1C4F] text-[14px]">

//         {paginated.length === 0 && (
//           <tr>
//             <td colSpan="9" className="text-center py-6 text-gray-500 text-sm">
//               No bookings found
//             </td>
//           </tr>
//         )}

//         {paginated.map((b, i) => (
//           <tr
//             key={b.id}
//             className={`
//               transition-all
//               border-b border-[#f7eeb2]
//               ${i % 2 === 0 ? "bg-white" : "bg-[#fffce8]"}
//               hover:bg-[#FFF7C2] group
//             `}
//           >
//             <td className="relative py-4 px-5 font-semibold">
//               <div className="absolute left-0 top-0 h-full w-[5px] bg-[#F5CC00] opacity-0 
//               group-hover:opacity-100 transition-all rounded-r"></div>
//               {b.id}
//             </td>

//             <td className="px-5 font-semibold text-[#003566]">{b.hotelName}</td>
//             <td className="px-5">{b.user}</td>
//             <td className="px-5 text-[#003566]">{b.roomType}</td>

//             <td className="px-5">{b.checkIn}</td>
//             <td className="px-5">{b.checkOut}</td>

//             <td className="px-5 font-bold text-[#00A650]">
//               ₹{b.price.toLocaleString()}
//             </td>

//             <td className="px-5">
//               <span
//                 className={`
//                   px-3 py-1 rounded-full text-sm font-semibold
//                   ${
//                     b.status === "Confirmed"
//                       ? "bg-green-100 text-green-800 border border-green-200"
//                       : b.status === "Pending"
//                       ? "bg-orange-200 text-orange-800 border border-orange-300"
//                       : "bg-red-100 text-red-700 border border-red-200"
//                   }
//                 `}
//               >
//                 {b.status}
//               </span>
//             </td>

//             <td className="px-5">
//               <Link
//                 to={`/admin/hotels/view/${b.hotelId}?tab=bookings`}
//                 className="text-blue-700 font-semibold hover:text-blue-900 underline transition"
//               >
//                 View Hotel
//               </Link>
//             </td>
//           </tr>
//         ))}
//       </tbody>

//     </table>
//   </div>
// </div>

// <div className="xl:hidden space-y-3">

//   {paginated.length === 0 && (
//     <div className="text-center py-3 text-gray-500 text-sm">
//       No bookings found
//     </div>
//   )}

//   {paginated.map((b) => (
//     <div
//       key={b.id}
//       className="
//         bg-white  
//         rounded-lg
//         shadow-md 
//         p-3 
//         border border-gray-200
//         relative
//         overflow-hidden
//       "
//     >
//       <div className="absolute left-0 top-0 h-full w-[4px] bg-[#F5CC00] rounded-r-lg"></div>

//       <div className="flex justify-between items-start gap-3">
//         {/* LEFT SIDE */}
//         <div className="flex flex-col space-y-0.5">
//           <span className="font-semibold text-[#0A1C4F] text-[13px]">
//             {b.hotelName}
//           </span>

//           <span className="text-[11px] text-gray-600">
//             #{b.id} • {b.user}
//           </span>

//           <span className="text-[11px] text-gray-600">
//             {b.roomType}
//           </span>

//           <span className="text-[11px] text-gray-600">
//             {b.checkIn} → {b.checkOut}
//           </span>

//           <span className="font-semibold text-[#00A650] text-sm mt-1">
//             ₹{b.price.toLocaleString()}
//           </span>

//           <span
//             className={`
//               mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-medium
//               ${
//                 b.status === "Confirmed"
//                   ? "bg-green-100 text-green-700"
//                   : b.status === "Pending"
//                   ? "bg-orange-100 text-orange-700"
//                   : "bg-red-100 text-red-700"
//               }
//             `}
//           >
//             {b.status}
//           </span>
//         </div>

//         {/* VIEW LINK */}
//         <Link
//           to={`/admin/hotels/view/${b.hotelId}?tab=bookings`}
//           className="
//             text-blue-600 
//             text-[12px] 
//             font-medium 
//             underline 
//             self-start 
//             mt-1
//             whitespace-nowrap
//           "
//         >
//           View
//         </Link>
//       </div>
//     </div>
//   ))}
// </div>



//     {/* PAGINATION */}
//     <div className="flex justify-center gap-2 mt-4">
//       {Array.from({ length: totalPages }).map((_, i) => (
//         <button
//           key={i}
//           onClick={() => setPage(i + 1)}
//           className={`px-3 py-1 rounded-md text-sm shadow-md ${
//             page === i + 1 ? "bg-[#0A1C4F] text-white" : "bg-gray-200"
//           }`}
//         >
//           {i + 1}
//         </button>
//       ))}
//     </div>
//   </div>
// );

//   }
