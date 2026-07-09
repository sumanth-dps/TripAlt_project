// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";

// /* ---------- Constants (same as AddHotel) ---------- */
// const INDIAN_STATES = [
//   "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
//   "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
//   "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
//   "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
//   "Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands",
//   "Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi",
//   "Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
// ];

// const COUNTRIES = ["India"];

// const ACCOMMODATION_TYPES = [
//   "Hotels","Resorts","Serviced Apartments","Guesthouses",
//   "Villas","Homestays","Hostels","Farmhouses"
// ];

// const SUITABLE_FOR_OPTIONS = [
//   "Couples","Families","Solo Travelers","Business Travelers",
//   "Friends","Senior Citizens"
// ];

// const ROOMTYPE_AMENITIES = [
//   "AC","TV","WiFi","Mini Bar","Balcony","Jacuzzi","Room Service",
//   "Garden View","Mountain View","Sea View","Bathtub","Kitchenette"
// ];

// const HOTEL_AMENITIES = [
//   "wifi","ac","tv","parking","roomService","cctv","creditCard",
//   "elevator","powerBackup","pool","diningArea"
// ];

// const GALLERY_CATEGORIES = [
//   "rooms","lobby","reception","facade","entrance","washroom","other"
// ];

// const API_URL = import.meta.env.VITE_API_BASE_URL || ""; // optional

// /* ---------- Helper ---------- */
// const emptyHotel = () => ({
//   name: "",
//   city: "",
//   area: "",
//   address: "",
//   state: "",
//   pincode: "",
//   country: "India",
//   description: "",
//   price: "",
//   originalPrice: "",
//   rating: "",
//   taxes: "",
//   type: "Hotels",
//   travellerCategories: [],
//   amenities: [],
//   mealOptions: [],
//   freeCancellation: false,
//   payAtProperty: false,
//   roomTypes: [],
//   areaInfo: {
//     restaurants: [],
//     attractions: [],
//     transport: [],
//     airports: [],
//     naturalBeauty: [],
//   },
//   houseRules: {
//     checkIn: "From 12:00 PM",
//     checkOut: "Until 11:00 AM",
//     cancellation: "",
//     childrenAndBeds: "All children are welcome.",
//     ageRestriction: "Minimum age for check-in is 18",
//     pets: "Pets are not allowed.",
//     acceptedCards: ["Visa", "MasterCard", "Cash"],
//   },
// });

// /* ---------- Component ---------- */
// export default function EditHotel() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [hotel, setHotel] = useState(emptyHotel());
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   // imagesByCategory stores both existing server URLs and newly uploaded files
//   // For server images: { id: <uuid>, url: 'https://..', fromServer: true }
//   // For new files: { id: <uuid>, file: File, previewUrl: URL.createObjectURL(file) }
//   const [imagesByCategory, setImagesByCategory] = useState({
//     rooms: [],
//     lobby: [],
//     reception: [],
//     facade: [],
//     entrance: [],
//     washroom: [],
//     other: [],
//   });

//   // track if we loaded hotel initially
//   useEffect(() => {
//     let mounted = true;
//     const loadHotel = async () => {
//       setLoading(true);
//       try {
//         if (!API_URL) {
//           // No API configured — keep default empty hotel
//           if (!mounted) return;
//           setLoading(false);
//           return;
//         }
//         const res = await fetch(`${API_URL}/api/admin/hotels/${id}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             // presumes auth on frontend; adjust if needed
//             Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
//           },
//         });
//         if (!res.ok) {
//           // fallback to empty if not found
//           console.warn("Failed to load hotel from API:", res.status);
//           if (!mounted) return;
//           setLoading(false);
//           return;
//         }
//         const data = await res.json();

//         if (!mounted) return;

//         // normalize into hotel state
//         const loaded = {
//           name: data.name || "",
//           city: data.city || "",
//           area: data.area || "",
//           address: data.address || "",
//           state: data.state || "",
//           pincode: data.pincode || "",
//           country: data.country || "India",
//           description: data.description || "",
//           price: data.price || "",
//           originalPrice: data.originalPrice || "",
//           rating: data.rating || "",
//           taxes: data.taxes || "",
//           type: data.type || "Hotels",
//           travellerCategories: data.travellerCategories || [],
//           amenities: data.amenities || [],
//           mealOptions: data.mealOptions || [],
//           freeCancellation: data.freeCancellation || false,
//           payAtProperty: data.payAtProperty || false,
//           roomTypes: (data.roomTypes || []).map((rt) => ({
//             ...rt,
//             // ensure id exists for mapping within form
//             id: rt.id || uuidv4(),
//           })),
//           areaInfo: data.areaInfo || emptyHotel().areaInfo,
//           houseRules: data.houseRules || emptyHotel().houseRules,
//         };

//         setHotel(loaded);

//         // build imagesByCategory from data.images if present
//         const gallery = data.images || {};
//         const nextImages = {};
//         GALLERY_CATEGORIES.forEach((cat) => {
//           const arr = gallery[cat] || [];
//           nextImages[cat] = arr.map((url) => ({
//             id: uuidv4(),
//             url,
//             fromServer: true,
//           }));
//         });
//         setImagesByCategory((prev) => ({ ...prev, ...nextImages }));
//       } catch (err) {
//         console.error("Load hotel error:", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     if (id) loadHotel();

//     return () => {
//       mounted = false;
//     };
//   }, [id]);

//   /* ---------- Simple update helpers ---------- */
//   const update = (key, value) => setHotel((prev) => ({ ...prev, [key]: value }));

//   const toggleArrayValue = (key, value) =>
//     setHotel((prev) => ({
//       ...prev,
//       [key]: prev[key].includes(value)
//         ? prev[key].filter((x) => x !== value)
//         : [...prev[key], value],
//     }));

//   const toggleAmenity = (v) => toggleArrayValue("amenities", v);
//   const toggleMeal = (v) => toggleArrayValue("mealOptions", v);
//   const toggleSuitableFor = (v) => toggleArrayValue("travellerCategories", v);

//   /* ---------- Image handling per category ---------- */
//   const handleCategoryUpload = (e, category) => {
//     const files = Array.from(e.target.files || []);
//     if (!files.length) return;

//     // Enforce 10 image limit per category
//     if ((imagesByCategory[category]?.length || 0) + files.length > 10) {
//       alert(`Max 10 images allowed for ${category}`);
//       return;
//     }

//     const mapped = files.map((file) => ({
//       id: uuidv4(),
//       file,
//       previewUrl: URL.createObjectURL(file),
//     }));

//     setImagesByCategory((prev) => ({
//       ...prev,
//       [category]: [...(prev[category] || []), ...mapped],
//     }));

//     // clear input value (if using same input element again)
//     e.target.value = "";
//   };

//   const removeImage = (category, id) => {
//     setImagesByCategory((prev) => ({
//       ...prev,
//       [category]: prev[category].filter((img) => {
//         // revoke object URL if it was a preview
//         const found = prev[category].find((x) => x.id === id);
//         if (found?.previewUrl) URL.revokeObjectURL(found.previewUrl);
//         return x.id !== id;
//       }),
//     }));
//   };

//   /* ---------- Room types helpers (same as AddHotel) ---------- */
//   const addRoomType = () => {
//     const newRoom = {
//       id: uuidv4(),
//       name: "",
//       price: "",
//       originalPrice: "",
//       taxes: "",
//       image: "",
//       amenities: [],
//       bedType: "",
//       bedCount: 1,
//       maxAdults: 1,
//       maxChildren: 0,
//       size: "",
//       description: "",
//     };
//     setHotel((prev) => ({ ...prev, roomTypes: [...prev.roomTypes, newRoom] }));
//   };

//   const updateRoomType = (id, key, value) =>
//     setHotel((prev) => ({
//       ...prev,
//       roomTypes: prev.roomTypes.map((rt) =>
//         rt.id === id ? { ...rt, [key]: value } : rt
//       ),
//     }));

//   const toggleRoomTypeAmenity = (id, value) =>
//     setHotel((prev) => ({
//       ...prev,
//       roomTypes: prev.roomTypes.map((rt) =>
//         rt.id === id
//           ? {
//               ...rt,
//               amenities: rt.amenities.includes(value)
//                 ? rt.amenities.filter((x) => x !== value)
//                 : [...rt.amenities, value],
//             }
//           : rt
//       ),
//     }));

//   const removeRoomType = (id) =>
//     setHotel((prev) => ({
//       ...prev,
//       roomTypes: prev.roomTypes.filter((rt) => rt.id !== id),
//     }));

//   const updateHouseRule = (key, value) =>
//     setHotel((prev) => ({
//       ...prev,
//       houseRules: { ...(prev.houseRules || {}), [key]: value },
//     }));

//   /* ---------- Submit handler ---------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // basic validation
//     if (!hotel.name?.trim()) return alert("Hotel name is required");
//     if (!hotel.city?.trim()) return alert("City is required");
//     const roomTypesRequired = !["Villas", "Farmhouses"].includes(hotel.type);
//     if (roomTypesRequired && hotel.roomTypes.length === 0)
//       return alert("Add at least 1 room type");

//     setSaving(true);

//     try {
//       // Build final object for body.data (keep existing server image URLs)
//       const final = { ...hotel };

//       // build gallery object capturing existing URLs + placeholders for new ones
//       const gallery = {};
//       GALLERY_CATEGORIES.forEach((cat) => {
//         gallery[cat] = [];
//         (imagesByCategory[cat] || []).forEach((it) => {
//           if (it.fromServer && it.url) gallery[cat].push(it.url);
//           // new files will be uploaded — backend will return URLs
//         });
//       });
//       final.images = gallery;

//       // If API is configured, send PUT with FormData
//       if (API_URL) {
//         const fd = new FormData();
//         fd.append("data", JSON.stringify(final));

//         // append new files and build imagesMeta
//         const imagesMeta = [];
//         GALLERY_CATEGORIES.forEach((cat) => {
//           (imagesByCategory[cat] || []).forEach((it) => {
//             if (it.file) {
//               fd.append("images", it.file, it.file.name);
//               imagesMeta.push({ filename: it.file.name, category: cat });
//             }
//           });
//         });

//         fd.append("imagesMeta", JSON.stringify(imagesMeta));

//         const res = await fetch(`${API_URL}/api/admin/hotels/${id}`, {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
//           },
//           body: fd,
//         });

//         let resJson = {};
//         try {
//           resJson = await res.json();
//         } catch (err) {
//           console.warn("Server returned non-JSON response");
//         }

//         if (!res.ok) {
//           console.error("Update failed:", resJson);
//           alert(resJson.message || "Failed to update hotel");
//           setSaving(false);
//           return;
//         }

//         alert("Hotel updated successfully");
//         // optional: navigate back to hotels list
//         navigate("/admin/hotels");
//         return;
//       }

//       // If no API, fallback to frontend-only (console)
//       console.log("EDIT (frontend-only) final object:", final);
//       alert("Saved to frontend only — check console");
//     } catch (err) {
//       console.error("Save error:", err);
//       alert("An error occurred while saving");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ---------- UI render (largely same layout as AddHotel) ---------- */
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="text-gray-600">Loading hotel...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center bg-gray-50 text-[#003566]">
//       <div className="w-full ">
//         <h1 className="text-2xl font-bold mb-4">Edit Accommodation</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* BASIC INFO */}
//           <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label>Hotel Name *</label>
//               <input
//                 value={hotel.name}
//                 onChange={(e) => update("name", e.target.value)}
//                 className="w-full mt-1 p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label>City *</label>
//               <input
//                 value={hotel.city}
//                 onChange={(e) => update("city", e.target.value)}
//                 className="w-full mt-1 p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label>Accommodation Type</label>
//               <select
//                 value={hotel.type}
//                 onChange={(e) => update("type", e.target.value)}
//                 className="w-full mt-1 p-2 border rounded"
//               >
//                 {ACCOMMODATION_TYPES.map((t) => (
//                   <option key={t}>{t}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label>Area</label>
//               <input
//                 value={hotel.area}
//                 onChange={(e) => update("area", e.target.value)}
//                 className="w-full mt-1 p-2 border rounded"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label>Address</label>
//               <input
//                 value={hotel.address}
//                 onChange={(e) => update("address", e.target.value)}
//                 className="w-full mt-1 p-2 border rounded"
//               />
//             </div>
//           </section>

//           {/* STATE, PINCODE */}
//           <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label>State</label>
//               <select
//                 value={hotel.state}
//                 onChange={(e) => update("state", e.target.value)}
//                 className="w-full mt-1 p-2 border rounded"
//               >
//                 <option value="">Select State</option>
//                 {INDIAN_STATES.map((s) => (
//                   <option key={s}>{s}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label>Pincode</label>
//               <input
//                 value={hotel.pincode}
//                 onChange={(e) => update("pincode", e.target.value)}
//                 className="w-full mt-1 p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label>Country</label>
//               <select
//                 value={hotel.country}
//                 onChange={(e) => update("country", e.target.value)}
//                 className="w-full mt-1 p-2 border rounded"
//               >
//                 {COUNTRIES.map((c) => (
//                   <option key={c}>{c}</option>
//                 ))}
//               </select>
//             </div>
//           </section>

//           {/* DESCRIPTION */}
//           <section>
//             <label>Description</label>
//             <textarea
//               value={hotel.description}
//               onChange={(e) => update("description", e.target.value)}
//               rows={3}
//               className="w-full mt-1 p-2 border rounded"
//             />
//           </section>

//           {/* RATING */}
//           <section>
//             <label>Rating</label>
//             <input
//               type="number"
//               step={0.1}
//               value={hotel.rating}
//               onChange={(e) => update("rating", e.target.value)}
//               className="w-full mt-1 p-2 border rounded"
//             />
//           </section>

//           {/* SUITABLE FOR */}
//           <section>
//             <label>Suitable For</label>
//             <div className="flex flex-wrap gap-3 mt-2">
//               {SUITABLE_FOR_OPTIONS.map((s) => (
//                 <label key={s} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={hotel.travellerCategories.includes(s)}
//                     onChange={() => toggleSuitableFor(s)}
//                   />
//                   {s}
//                 </label>
//               ))}
//             </div>
//           </section>

//           {/* HOTEL AMENITIES */}
//           <section>
//             <label>Hotel Amenities</label>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
//               {HOTEL_AMENITIES.map((a) => (
//                 <label key={a} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={hotel.amenities.includes(a)}
//                     onChange={() => toggleAmenity(a)}
//                   />
//                   {a}
//                 </label>
//               ))}
//             </div>
//           </section>

//           {/* IMAGES — category wise */}
//           <section className="space-y-6">
//             <h2 className="text-xl font-semibold">Images</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {Object.keys(imagesByCategory).map((category) => (
//                 <div key={category} className="border p-4 rounded-lg bg-white shadow-sm">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-medium capitalize">{category}</h3>

//                     <label className="cursor-pointer text-sm text-blue-600">
//                       Browse Images
//                       <input
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         className="hidden"
//                         onChange={(e) => handleCategoryUpload(e, category)}
//                       />
//                     </label>
//                   </div>

//                   <p className="text-sm mt-2">
//                     {imagesByCategory[category].length > 0 ? (
//                       <span className="text-green-600 font-medium">
//                         ✔ {imagesByCategory[category].length} uploaded
//                       </span>
//                     ) : (
//                       <span className="text-gray-500">No images uploaded</span>
//                     )}
//                   </p>

//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
//                     {imagesByCategory[category].map((img) => (
//                       <div key={img.id} className="relative">
//                         <img
//                           src={img.previewUrl || img.url}
//                           className="w-full h-24 object-cover rounded border"
//                         />

//                         <button
//                           onClick={() => removeImage(category, img.id)}
//                           className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded px-2 py-1"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* ROOM TYPES (same structure as AddHotel) */}
//           {(!["Villas", "Farmhouses"].includes(hotel.type)) && (
//             <section className="mt-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-semibold text-[#0A1C4F]">Room Types</h3>

//                 <button
//                   type="button"
//                   onClick={addRoomType}
//                   className="px-4 py-2 rounded-lg border border-[#0A1C4F] text-[#0A1C4F] 
//         bg-[#0A1C4F]/10 hover:bg-[#0A1C4F]/20 transition-all shadow-sm"
//                 >
//                   + Add Room
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 {hotel.roomTypes.map((rt) => (
//                   <div key={rt.id} className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
//                     <div className="flex justify-between items-center mb-4">
//                       <h4 className="text-lg font-semibold text-[#0A1C4F]">
//                         {rt.name || "New Room"}
//                       </h4>

//                       <button
//                         type="button"
//                         onClick={() => removeRoomType(rt.id)}
//                         className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
//                       >
//                         Remove
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                       <input
//                         placeholder="Room Name"
//                         value={rt.name}
//                         onChange={(e) => updateRoomType(rt.id, "name", e.target.value)}
//                         className="p-2 border rounded"
//                       />
//                       <input
//                         placeholder="Price"
//                         value={rt.price}
//                         onChange={(e) => updateRoomType(rt.id, "price", e.target.value)}
//                         className="p-2 border rounded"
//                       />
//                       <input
//                         placeholder="Original Price"
//                         value={rt.originalPrice}
//                         onChange={(e) => updateRoomType(rt.id, "originalPrice", e.target.value)}
//                         className="p-2 border rounded"
//                       />
//                       <input
//                         placeholder="Taxes"
//                         value={rt.taxes}
//                         onChange={(e) => updateRoomType(rt.id, "taxes", e.target.value)}
//                         className="p-2 border rounded"
//                       />

//                       <input
//                         placeholder="Bed Type"
//                         value={rt.bedType}
//                         onChange={(e) => updateRoomType(rt.id, "bedType", e.target.value)}
//                         className="p-2 border rounded"
//                       />
//                       <input
//                         placeholder="Bed Count"
//                         value={rt.bedCount}
//                         onChange={(e) => updateRoomType(rt.id, "bedCount", e.target.value)}
//                         className="p-2 border rounded"
//                       />
//                       <input
//                         placeholder="Max Adults"
//                         value={rt.maxAdults}
//                         onChange={(e) => updateRoomType(rt.id, "maxAdults", e.target.value)}
//                         className="p-2 border rounded"
//                       />
//                       <input
//                         placeholder="Max Children"
//                         value={rt.maxChildren}
//                         onChange={(e) => updateRoomType(rt.id, "maxChildren", e.target.value)}
//                         className="p-2 border rounded"
//                       />

//                       <input
//                         placeholder="Size"
//                         value={rt.size}
//                         onChange={(e) => updateRoomType(rt.id, "size", e.target.value)}
//                         className="p-2 border rounded md:col-span-2"
//                       />

//                       <textarea
//                         placeholder="Room Description"
//                         value={rt.description}
//                         onChange={(e) => updateRoomType(rt.id, "description", e.target.value)}
//                         className="p-2 border rounded md:col-span-4"
//                       />
//                     </div>

//                     <div className="mt-4">
//                       <p className="font-medium text-[#0A1C4F] mb-2">Room Amenities</p>

//                       <div className="flex flex-wrap gap-3">
//                         {ROOMTYPE_AMENITIES.map((a) => (
//                           <label
//                             key={a}
//                             className={`px-3 py-1 rounded-full border cursor-pointer text-sm transition
//                           ${
//                             rt.amenities.includes(a)
//                               ? "bg-[#00A650]/10 border-[#00A650] text-[#00A650]"
//                               : "bg-gray-100 border-gray-200 text-gray-700"
//                           }
//                         `}
//                           >
//                             <input
//                               type="checkbox"
//                               className="hidden"
//                               checked={rt.amenities.includes(a)}
//                               onChange={() => toggleRoomTypeAmenity(rt.id, a)}
//                             />
//                             {a}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* AREA INFO + HOUSE RULES */}
//           <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//             {/* AREA INFO */}
//             <div>
//               <h3 className="font-medium">Area Info</h3>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
//                 <select
//                   className="p-2 border rounded"
//                   value={""}
//                   onChange={() => {}}
//                 >
//                   {/* left intentionally empty for editing section (areaInput above controls adding) */}
//                 </select>
//                 <input
//                   className="p-2 border rounded"
//                   placeholder="Name - distance"
//                   value={""}
//                   onChange={() => {}}
//                 />
//                 <button className="bg-blue-600 text-white rounded px-3 py-2">Add</button>
//               </div>

//               {/* existing areaInfo display */}
//               {Object.keys(hotel.areaInfo || {}).map((key) => (
//                 <div key={key} className="mt-4">
//                   <h4 className="font-medium capitalize">{key}</h4>

//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {hotel.areaInfo[key].map((item, idx) => (
//                       <span
//                         key={idx}
//                         className="px-2 py-1 bg-gray-200 rounded flex items-center gap-1 text-sm"
//                       >
//                         {item}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* HOUSE RULES */}
//             <div>
//               <h3 className="font-medium">House Rules</h3>

//               <div className="space-y-3 mt-3">
//                 {[
//                   "checkIn",
//                   "checkOut",
//                   "cancellation",
//                   "childrenAndBeds",
//                   "ageRestriction",
//                   "pets",
//                 ].map((rule) => (
//                   <input
//                     key={rule}
//                     className="p-2 border rounded w-full"
//                     placeholder={rule}
//                     value={hotel.houseRules[rule]}
//                     onChange={(e) => updateHouseRule(rule, e.target.value)}
//                   />
//                 ))}

//                 <input
//                   className="p-2 border rounded w-full"
//                   placeholder="Accepted Cards"
//                   value={hotel.houseRules.acceptedCards.join(", ")}
//                   onChange={(e) =>
//                     updateHouseRule(
//                       "acceptedCards",
//                       e.target.value.split(",").map((x) => x.trim())
//                     )
//                   }
//                 />

//                 <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2 mt-2">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={hotel.freeCancellation}
//                       onChange={(e) => update("freeCancellation", e.target.checked)}
//                     />
//                     Free Cancellation
//                   </label>

//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={hotel.payAtProperty}
//                       onChange={(e) => update("payAtProperty", e.target.checked)}
//                     />
//                     Pay at Property
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* SUBMIT */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={saving}
//               className="px-6 py-2 bg-[#0A1C4F] text-white rounded"
//             >
//               {saving ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import CustomSelectTwo from "../../../components/CustomSelectTwo";
import ImageDropZone from "../../../components/ImageDropZone";

/* ------------------ STATIC DATA (SAME AS ADD HOTEL) ------------------ */
const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi",
  "Goa","Gujarat","Haryana","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana",
  "Uttar Pradesh","Uttarakhand","West Bengal",
];

const COUNTRIES = ["India"];

const ACCOMMODATION_TYPES = [
  "Hotels","Resorts","Serviced Apartments","Guesthouses",
  "Villas","Homestays","Hostels","Farmhouses",
];

const SUITABLE_FOR_OPTIONS = [
  "Couples","Families","Solo","Business","Friends","Senior Citizens",
];

const ROOMTYPE_AMENITIES = ["AC","TV","WiFi","Balcony","Bathtub"];

const HOTEL_AMENITIES = [
  "WIFI","AC","TV","Parking","Room Service","CCTV",
  "Credit Card","Elevator","Power Backup","Pool","Dining Area","EV Charging",
];

const MEAL_OPTIONS = ["Breakfast","Lunch","Dinner","All-inclusive"];
const ROOM_MEAL_OPTIONS = ["Breakfast","Lunch","Dinner","All-inclusive"];

const EXISTING_OWNERS = [
  {
    id: "O-1001",
    name: "Ramesh",
    email: "ramesh@gmail.com",
    phone: "99999",
    aadhar: "123",
    pan: "ABCDE",
  },
  {
    id: "O-1002",
    name: "Suresh",
    email: "suresh@gmail.com",
    phone: "88888",
    aadhar: "456",
    pan: "FGHIJ",
  },
];

/* ======================================================= */

export default function EditHotel() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ------------------ STATE ------------------ */
  const [hotel, setHotel] = useState(null);

  const [open, setOpen] = useState({
    basic: false,
    description: false,
    images: false,
    rooms: false,
    area: false,
    house: false,
    owner: false,
  });

  const [ownerMode, setOwnerMode] = useState("existing");

  const [imagesByCategory, setImagesByCategory] = useState({
    rooms: [],
    entrance: [],
    facade: [],
    washroom: [],
    lobby: [],
    other: [],
  });

  const [areaInput, setAreaInput] = useState({
    key: "restaurants",
    value: "",
  });

  const toggle = (k) => setOpen((p) => ({ ...p, [k]: !p[k] }));

  /* ------------------ LOAD HOTEL ------------------ */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("EDIT_HOTEL"));

    if (!stored) {
      alert("Hotel not found");
      navigate("/admin/hotels");
      return;
    }

    setHotel({
      ...stored,
      roomTypes: stored.roomTypes || [],
      areaInfo: stored.areaInfo || {
        restaurants: [],
        attractions: [],
        transport: [],
        airports: [],
        naturalBeauty: [],
      },
      houseRules: stored.houseRules || {
        checkIn: "",
        checkOut: "",
        cancellation: "",
        childrenAndBeds: "",
        ageRestriction: "",
        pets: "",
        acceptedCards: [],
      },
      owner: stored.owner || {
        id: "",
        name: "",
        email: "",
        phone: "",
        aadhar: "",
        pan: "",
      },
    });

    setImagesByCategory(
      stored.imagesByCategory || {
        rooms: [],
        entrance: [],
        facade: [],
        washroom: [],
        lobby: [],
        other: [],
      }
    );
  }, [id, navigate]);

  if (!hotel) return null;

  const roomTypesRequired = !["Villas", "Farmhouses"].includes(hotel.type);

  /* ------------------ HELPERS ------------------ */
  const update = (k, v) => setHotel((p) => ({ ...p, [k]: v }));

  const updateOwner = (k, v) =>
    setHotel((p) => ({ ...p, owner: { ...p.owner, [k]: v } }));

  const toggleArray = (k, v) =>
    setHotel((p) => ({
      ...p,
      [k]: p[k].includes(v)
        ? p[k].filter((x) => x !== v)
        : [...p[k], v],
    }));

  /* ------------------ AREA INFO ------------------ */
  const addAreaInfo = () => {
    if (!areaInput.value.trim()) return;

    setHotel((p) => ({
      ...p,
      areaInfo: {
        ...p.areaInfo,
        [areaInput.key]: [...p.areaInfo[areaInput.key], areaInput.value.trim()],
      },
    }));

    setAreaInput({ ...areaInput, value: "" });
  };

  const removeAreaInfo = (key, index) =>
    setHotel((p) => ({
      ...p,
      areaInfo: {
        ...p.areaInfo,
        [key]: p.areaInfo[key].filter((_, i) => i !== index),
      },
    }));

  /* ------------------ ROOMS ------------------ */
  const addRoomType = () =>
    setHotel((p) => ({
      ...p,
      roomTypes: [
        ...p.roomTypes,
        {
          id: uuidv4(),
          name: "",
          price: "",
          originalPrice: "",
          taxes: "",
          amenities: [],
          bedType: "",
          bedCount: "",
          maxAdults: "",
          maxChildren: "",
          mealOptions: [],
          size: "",
          number: "",
        },
      ],
    }));

  const updateRoomType = (id, k, v) =>
    setHotel((p) => ({
      ...p,
      roomTypes: p.roomTypes.map((rt) =>
        rt.id === id ? { ...rt, [k]: v } : rt
      ),
    }));

  const toggleRoomAmenity = (id, v) =>
    setHotel((p) => ({
      ...p,
      roomTypes: p.roomTypes.map((rt) =>
        rt.id === id
          ? {
              ...rt,
              amenities: rt.amenities.includes(v)
                ? rt.amenities.filter((x) => x !== v)
                : [...rt.amenities, v],
            }
          : rt
      ),
    }));

  const toggleRoomMeal = (id, v) =>
    setHotel((p) => ({
      ...p,
      roomTypes: p.roomTypes.map((rt) =>
        rt.id === id
          ? {
              ...rt,
              mealOptions: rt.mealOptions.includes(v)
                ? rt.mealOptions.filter((x) => x !== v)
                : [...rt.mealOptions, v],
            }
          : rt
      ),
    }));

  const removeRoomType = (id) =>
    setHotel((p) => ({
      ...p,
      roomTypes: p.roomTypes.filter((r) => r.id !== id),
    }));

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hotel.name || !hotel.city)
      return alert("Hotel name & city required");

    if (roomTypesRequired && hotel.roomTypes.length === 0)
      return alert("Add at least one room type");

    localStorage.setItem(
      "EDIT_HOTEL",
      JSON.stringify({ ...hotel, imagesByCategory })
    );

    alert("Hotel updated successfully");
    navigate("/admin/hotels");
  };

  /* ======================================================= */
  return (
    <div className="flex justify-center md:p-6 text-[#003566]">
      <div className="w-full space-y-6">
        <h1 className="text-3xl font-semibold text-[#0A1C4F]">
          Edit Accommodation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* BASIC INFO */}
                    <section className="custom-section">
                      <header
                        onClick={() => toggle("basic")}
                        className="cursor-pointer flex justify-between items-center p-4 text-xl font-semibold"
                      >
                        Basic Information
                        <IoIosArrowDown
                          className={`${open.basic ? "rotate-180" : ""} transition`}
                        />
                      </header>
                      {open.basic && (
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            {
                              label: "Hotel Name*",
                              key: "name",
                              placeholder: "Hotel Name",
                            },
                            { label: "City*", key: "city", placeholder: "Hyderbad" },
                          ].map((x) => (
                            <div key={x.key}>
                              <label>{x.label}</label>
                              <input
                                placeholder={x.placeholder}
                                required
                                className="custom-input"
                                value={hotel[x.key]}
                                onChange={(e) => update(x.key, e.target.value)}
                              />
                            </div>
                          ))}
          
                          {/* Accommodation Type */}
                          <div>
                            <label>Accommodation Type*</label>
                            <CustomSelectTwo
                              value={hotel.type}
                              onChange={(v) => update("type", v)}
                              options={ACCOMMODATION_TYPES.map((t) => ({
                                label: t,
                                value: t,
                              }))}
                              placeholder="Select Type"
                            />
                          </div>
          
                          <div>
                            <label>Area*</label>
                            <input
                              required
                              placeholder="Secunderabad"
                              className="custom-input"
                              value={hotel.area}
                              onChange={(e) => update("area", e.target.value)}
                            />
                          </div>
          
                          <div className="md:col-span-2">
                            <label>Address*</label>
                            <input
                              required
                              className="custom-input"
                              value={hotel.address}
                              onChange={(e) => update("address", e.target.value)}
                            />
                          </div>
          
                          {/* State, Pincode, Country */}
                          {[
                            { label: "State", key: "state", options: INDIAN_STATES },
                            { label: "Pincode*", key: "pincode", placeholder: "500001" },
                            { label: "Country*", key: "country", options: COUNTRIES },
                          ].map((x) => (
                            <div key={x.key}>
                              <label>{x.label}</label>
                              {x.options ? (
                                <CustomSelectTwo
                                  value={hotel[x.key]}
                                  onChange={(v) => update(x.key, v)}
                                  options={x.options.map((o) => ({ label: o, value: o }))}
                                  placeholder={`Select ${x.label}`}
                                />
                              ) : (
                                <input
                                  required
                                  placeholder={x.placeholder}
                                  className="custom-input"
                                  value={hotel[x.key]}
                                  onChange={(e) => update(x.key, e.target.value)}
                                />
                              )}
                            </div>
                          ))}
                          <div className="md:col-span-3">
                            <label>Location Embeded URL*</label>
                            <textarea
                              rows={3}
                              placeholder="Example:https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
                              required
                              className="custom-input "
                              value={hotel.embedUrl}
                              onChange={(e) => update("embedUrl", e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </section>
          
                    {/* DESCRIPTION */}
                    <section className="custom-section">
                      <header
                        onClick={() => toggle("description")}
                        className="cursor-pointer flex justify-between items-center p-4 text-xl font-semibold"
                      >
                        Description & Facilities
                        <IoIosArrowDown
                          className={`${open.description ? "rotate-180" : ""} transition`}
                        />
                      </header>
                      {open.description && (
                        <div className="p-6 space-y-4">
                          <label>About*</label>
                          <textarea
                            required
                            placeholder="About Hotel"
                            rows={3}
                            className="custom-input"
                            value={hotel.description}
                            onChange={(e) => update("description", e.target.value)}
                          />
                          <label>Keyo Admin Rating*</label>
                          <input
                            required
                            type="number"
                            min={0.5}
                            max={5}
                            className="custom-input"
                            value={hotel.rating}
                            onChange={(e) => update("rating", e.target.value)}
                            placeholder="Rating (0-5)"
                          />
          
                          <h3>Suitable For*</h3>
                          <div className="flex flex-wrap gap-3">
                            {SUITABLE_FOR_OPTIONS.map((s) => (
                              <label
                                key={s}
                                className="flex items-center gap-2 cursor-pointer text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={hotel.travellerCategories.includes(s)}
                                  onChange={() => toggleArray("travellerCategories", s)}
                                  className="accent-[#F5CC00]"
                                />
                                {s}
                              </label>
                            ))}
                          </div>
          
                          <h3>Hotel Amenities*</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2  ">
                            {HOTEL_AMENITIES.map((a) => (
                              <label
                                key={a}
                                className="flex items-center gap-2 text-sm cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  className="accent-[#F5CC00] "
                                  checked={hotel.amenities.includes(a)}
                                  onChange={() => toggleArray("amenities", a)}
                                />
                                {a}
                              </label>
                            ))}
                          </div>
                          <h3>Meal Options*</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2  ">
                            {MEAL_OPTIONS.map((a) => (
                              <label
                                key={a}
                                className="flex items-center gap-2 text-sm cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  className="accent-[#F5CC00] "
                                  checked={hotel.mealOptions.includes(a)}
                                  onChange={() => toggleArray("mealOptions", a)}
                                />
                                {a}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </section>
                    {/* IMAGES */}
                    <section className="custom-section">
                      <header
                        onClick={() => toggle("images")}
                        className="cursor-pointer flex justify-between items-center p-4 text-xl font-semibold"
                      >
                        Upload Images
                        <IoIosArrowDown
                          className={`${open.images ? "rotate-180" : ""} transition`}
                        />
                      </header>
          
                      {open.images && (
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2  gap-4">
                          {Object.keys(imagesByCategory).map((cat) => (
                            <div
                              key={cat}
                              className="border border-[#f5cc00] rounded-lg p-4 space-y-3"
                            >
                              <div className="flex justify-between items-center">
                                <h4 className="capitalize font-semibold">{cat}</h4>
                              </div>
          
                              {/* DRAG & DROP ZONE */}
                              <ImageDropZone
                                onFiles={(files) => {
                                  const mapped = files.map((f) => ({
                                    id: uuidv4(),
                                    file: f,
                                    previewUrl: URL.createObjectURL(f),
                                  }));
                                  setImagesByCategory((p) => ({
                                    ...p,
                                    [cat]: [...p[cat], ...mapped],
                                  }));
                                }}
                              />
          
                              {/* THUMBNAILS */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                                {imagesByCategory[cat].map((img) => (
                                  <div key={img.id} className="relative">
                                    <img
                                      src={img.previewUrl}
                                      className="w-full h-20 object-cover rounded shadow-sm"
                                    />
                                    <button
                                      className="absolute top-1 right-1 text-xs bg-red-600 text-white p-1 cursor-pointer hover:bg-red-700 duration-300 rounded-full"
                                      onClick={() =>
                                        setImagesByCategory((p) => ({
                                          ...p,
                                          [cat]: p[cat].filter((x) => x.id !== img.id),
                                        }))
                                      }
                                    >
                                      <RxCross2 />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
          
                    {/* ROOMS */}
                    {(roomTypesRequired || hotel.type === "Hotels") && (
                      <section className="custom-section">
                        <header
                          onClick={() => toggle("rooms")}
                          className="cursor-pointer flex justify-between items-center p-4 text-xl font-semibold"
                        >
                          Room Types
                          <IoIosArrowDown
                            className={`${open.rooms ? "rotate-180" : ""} transition`}
                          />
                        </header>
                        {open.rooms && (
                          <div className="p-6 space-y-6">
                            <button
                              onClick={addRoomType}
                              type="button"
                              className="px-4 py-2 bg-[#0A1C4F] text-white rounded cursor-pointer"
                            >
                              + Add Room
                            </button>
          
                            {hotel.roomTypes.map((rt) => (
                              <div
                                key={rt.id}
                                className="border border-[#f5cc00] rounded-lg p-4"
                              >
                                <div className="flex justify-between items-center">
                                  <h4 required>{rt.name || "New Room"}</h4>
                                  <button
                                    className="cursor-pointer"
                                    onClick={() => removeRoomType(rt.id)}
                                  >
                                    <MdDeleteForever className="text-red-600 text-2xl hover:scale-115 duration-300" />
                                  </button>
                                </div>
          
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                  {/* FIXED ROOM FIELD MAPPINGS */}
                                  <input
                                    className="custom-input"
                                    placeholder="Room Name"
                                    value={rt.name}
                                    onChange={(e) =>
                                      updateRoomType(rt.id, "name", e.target.value)
                                    }
                                  />
                                  <input
                                    className="custom-input"
                                    placeholder="Price per night"
                                    value={rt.price}
                                    onChange={(e) =>
                                      updateRoomType(rt.id, "price", e.target.value)
                                    }
                                  />
                                  <input
                                    className="custom-input"
                                    placeholder="Original Price per night"
                                    value={rt.originalPrice}
                                    onChange={(e) =>
                                      updateRoomType(
                                        rt.id,
                                        "originalPrice",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <input
                                    className="custom-input"
                                    placeholder="Taxes"
                                    value={rt.taxes}
                                    onChange={(e) =>
                                      updateRoomType(rt.id, "taxes", e.target.value)
                                    }
                                  />
          
                                  <input
                                    className="custom-input"
                                    placeholder="Bed Type"
                                    value={rt.bedType}
                                    onChange={(e) =>
                                      updateRoomType(rt.id, "bedType", e.target.value)
                                    }
                                  />
                                  <input
                                    className="custom-input"
                                    placeholder="Number of Beds"
                                    value={rt.bedCount}
                                    onChange={(e) =>
                                      updateRoomType(rt.id, "bedCount", e.target.value)
                                    }
                                  />
                                  <input
                                    className="custom-input"
                                    placeholder="Max Adults"
                                    value={rt.maxAdults}
                                    onChange={(e) =>
                                      updateRoomType(rt.id, "maxAdults", e.target.value)
                                    }
                                  />
                                  <input
                                    className="custom-input"
                                    placeholder="Max Children"
                                    value={rt.maxChildren}
                                    onChange={(e) =>
                                      updateRoomType(rt.id, "maxChildren", e.target.value)
                                    }
                                  />
          
                                  <input
                                    className="custom-input"
                                    placeholder="Room Size"
                                    value={rt.size}
                                    onChange={(e) =>
                                      updateRoomType(rt.id, "size", e.target.value)
                                    }
                                  />
                                  <input
                                    className="custom-input"
                                    placeholder="Number of Rooms"
                                    value={rt.number}
                                    onChange={(e) =>
                                      updateRoomType(rt.id, "number", e.target.value)
                                    }
                                  />
                                </div>
          
                                <h4 className="mt-3 font-medium">Room Amenities</h4>
                                <div className="flex flex-wrap gap-3">
                                  {ROOMTYPE_AMENITIES.map((a) => (
                                    <label
                                      key={a}
                                      className="flex gap-2 items-center text-sm"
                                    >
                                      <input
                                        type="checkbox"
                                        className="accent-[#F5CC00]"
                                        checked={rt.amenities.includes(a)}
                                        onChange={() => toggleRoomAmenity(rt.id, a)}
                                      />
                                      {a}
                                    </label>
                                  ))}
                                </div>
                                <h4 className="mt-3 font-medium">Meal Options</h4>
                                <div className="flex flex-wrap gap-3">
                                  {ROOM_MEAL_OPTIONS.map((a) => (
                                    <label
                                      key={a}
                                      className="flex gap-2 items-center text-sm"
                                    >
                                      <input
                                        type="checkbox"
                                        className="accent-[#F5CC00]"
                                        checked={rt.mealOptions.includes(a)}
                                        onChange={() => toggleRoomMealOptions(rt.id, a)}
                                      />
                                      {a}
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </section>
                    )}
          
                    {/* AREA INFO */}
                    <section className="custom-section">
                      <header
                        onClick={() => toggle("area")}
                        className="cursor-pointer flex justify-between items-center p-4 text-xl font-semibold"
                      >
                        Near By Areas
                        <IoIosArrowDown
                          className={`${open.area ? "rotate-180" : ""} transition`}
                        />
                      </header>
                      {open.area && (
                        <div className="p-6">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <CustomSelectTwo
                              value={areaInput.key}
                              onChange={(v) => setAreaInput({ ...areaInput, key: v })}
                              options={[
                                { label: "Restaurants", value: "restaurants" },
                                { label: "Attractions", value: "attractions" },
                                { label: "Transport", value: "transport" },
                                { label: "Airports", value: "airports" },
                                { label: "Natural Beauty", value: "naturalBeauty" },
                              ]}
                              placeholder="Select"
                            />
                            <input
                              placeholder="Name - distance"
                              value={areaInput.value}
                              onChange={(e) =>
                                setAreaInput({ ...areaInput, value: e.target.value })
                              }
                              className="custom-input"
                            />
                            <button
                              type="button"
                              className="bg-[#0A1C4F] text-white rounded p-3"
                              onClick={addAreaInfo}
                            >
                              Add
                            </button>
                          </div>
          
                          {Object.keys(hotel.areaInfo).map((k) => (
                            <div key={k} className="mt-4">
                              <h4 className="capitalize font-medium">{k}</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {hotel.areaInfo[k].map((x, i) => (
                                  <span
                                    key={i}
                                    className="bg-gray-200 px-2 py-1 rounded flex gap-2 text-lg"
                                  >
                                    {x}
                                    <button
                                      onClick={() => removeAreaInfo(k, i)}
                                      className="text-red-600 text-lg cursor-pointer"
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
          
                    {/* HOUSE RULES */}
                    <section className="custom-section">
                      <header
                        onClick={() => toggle("house")}
                        className="cursor-pointer flex justify-between items-center p-4 text-xl font-semibold"
                      >
                        Hotel Rules
                        <IoIosArrowDown
                          className={`${open.house ? "rotate-180" : ""} transition`}
                        />
                      </header>
          
                      {open.house && (
                        <div className="p-6 space-y-3">
                          {/* CHECK IN */}
                          <label>Check-In Timing*</label>
                          <input
                            className="custom-input"
                            placeholder="Example: From 12:00 PM"
                            value={hotel.houseRules.checkIn}
                            onChange={(e) =>
                              setHotel((p) => ({
                                ...p,
                                houseRules: { ...p.houseRules, checkIn: e.target.value },
                              }))
                            }
                          />
          
                          {/* CHECK OUT */}
                          <label>Check-Out Timing*</label>
                          <input
                            className="custom-input"
                            placeholder="Example: Until 11:00 AM"
                            value={hotel.houseRules.checkOut}
                            onChange={(e) =>
                              setHotel((p) => ({
                                ...p,
                                houseRules: { ...p.houseRules, checkOut: e.target.value },
                              }))
                            }
                          />
          
                          {/* CANCELLATION RULES */}
                          <label>Cancellation Policy*</label>
                          <input
                            className="custom-input"
                            placeholder="Example: Free cancellation up to 24 hours before check-in."
                            value={hotel.houseRules.cancellation}
                            onChange={(e) =>
                              setHotel((p) => ({
                                ...p,
                                houseRules: {
                                  ...p.houseRules,
                                  cancellation: e.target.value,
                                },
                              }))
                            }
                          />
          
                          {/* CHILDREN & BEDS POLICY */}
                          <label>Children & Extra Beds*</label>
                          <input
                            className="custom-input"
                            placeholder="Example: Children above 10 years are charged as adults"
                            value={hotel.houseRules.childrenAndBeds}
                            onChange={(e) =>
                              setHotel((p) => ({
                                ...p,
                                houseRules: {
                                  ...p.houseRules,
                                  childrenAndBeds: e.target.value,
                                },
                              }))
                            }
                          />
          
                          {/* AGE RESTRICTION */}
                          <label>Age Restriction*</label>
                          <input
                            className="custom-input"
                            placeholder="Example: Guests must be 18+ to check-in"
                            value={hotel.houseRules.ageRestriction}
                            onChange={(e) =>
                              setHotel((p) => ({
                                ...p,
                                houseRules: {
                                  ...p.houseRules,
                                  ageRestriction: e.target.value,
                                },
                              }))
                            }
                          />
          
                          {/* PETS RULES */}
                          <label>Pets Policy*</label>
                          <input
                            className="custom-input"
                            placeholder="Example: Pets not allowed"
                            value={hotel.houseRules.pets}
                            onChange={(e) =>
                              setHotel((p) => ({
                                ...p,
                                houseRules: { ...p.houseRules, pets: e.target.value },
                              }))
                            }
                          />
          
                          {/* CARDS ACCEPTED */}
                          <label>Accepted Cards / Payment Modes*</label>
                          <input
                            className="custom-input"
                            placeholder="Example: Visa, MasterCard, Cash, UPI"
                            value={hotel.houseRules.acceptedCards.join(", ")}
                            onChange={(e) =>
                              setHotel((p) => ({
                                ...p,
                                houseRules: {
                                  ...p.houseRules,
                                  acceptedCards: e.target.value
                                    .split(",")
                                    .map((x) => x.trim()),
                                },
                              }))
                            }
                          />
          
                          {/* CHECKBOX OPTIONS */}
                          <div className="flex flex-row items-center gap-5">
                            <label className="flex gap-2 items-center">
                              <input
                                type="checkbox"
                                className="accent-[#F5CC00]"
                                checked={hotel.freeCancellation}
                                onChange={(e) =>
                                  update("freeCancellation", e.target.checked)
                                }
                              />
                              Free Cancellation Available
                            </label>
          
                            <label className="flex gap-2 items-center">
                              <input
                                type="checkbox"
                                className="accent-[#F5CC00]"
                                checked={hotel.payAtProperty}
                                onChange={(e) =>
                                  update("payAtProperty", e.target.checked)
                                }
                              />
                              Payment Allowed at Property
                            </label>
                          </div>
                        </div>
                      )}
                    </section>
          
                    {/* OWNER */}
                    <section className="custom-section">
                      <header
                        onClick={() => toggle("owner")}
                        className="cursor-pointer flex justify-between items-center p-4 text-xl font-semibold"
                      >
                        Owner Profile
                        <IoIosArrowDown
                          className={`${open.owner ? "rotate-180" : ""} transition`}
                        />
                      </header>
                      {open.owner && (
                        <div className="p-6 space-y-4">
                          <div className="flex gap-8">
                            <label className="flex gap-2 items-center">
                              <input
                                type="radio"
                                checked={ownerMode === "existing"}
                                onChange={() => setOwnerMode("existing")}
                                className="accent-[#F5CC00]"
                              />
                              Select Existing Owner
                            </label>
                            <label className="flex gap-2 items-center">
                              <input
                                type="radio"
                                checked={ownerMode === "new"}
                                onChange={() => {
                                  setOwnerMode("new");
                                  setHotel((p) => ({
                                    ...p,
                                    owner: {
                                      id: "",
                                      name: "",
                                      email: "",
                                      phone: "",
                                      aadhar: "",
                                      pan: "",
                                    },
                                  }));
                                }}
                                className="accent-[#F5CC00]"
                              />
                              Add New Owner
                            </label>
                          </div>
          
                          {ownerMode === "existing" && (
                            <CustomSelectTwo
                              value={hotel.owner.id}
                              onChange={(v) => {
                                const sel = EXISTING_OWNERS.find((o) => o.id === v);
                                if (sel) setHotel((p) => ({ ...p, owner: sel }));
                              }}
                              options={EXISTING_OWNERS.map((o) => ({
                                label: `${o.name} — ${o.phone}`,
                                value: o.id,
                              }))}
                              placeholder="Select Owner"
                            />
                          )}
          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {["name", "email", "phone", "aadhar", "pan"].map((f) => (
                              <input
                                key={f}
                                placeholder={f.toUpperCase()}
                                disabled={ownerMode === "existing"}
                                value={hotel.owner[f]}
                                onChange={(e) => updateOwner(f, e.target.value)}
                                className="custom-input"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </section>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#0A1C4F] text-white rounded-lg shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
