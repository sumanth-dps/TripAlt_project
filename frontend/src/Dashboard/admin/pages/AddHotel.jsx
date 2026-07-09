import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import CustomSelectTwo from "../../../components/CustomSelectTwo";
import ImageDropZone from "../../../components/ImageDropZone";
import { RxCross2 } from "react-icons/rx";
/* ------------------ STATIC DATA ------------------ */
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
const COUNTRIES = ["India"];
const ACCOMMODATION_TYPES = [
  "Hotels",
  "Resorts",
  "Serviced Apartments",
  "Guesthouses",
  "Villas",
  "Homestays",
  "Hostels",
  "Farmhouses",
];
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
const SUITABLE_FOR_OPTIONS = [
  "Couples",
  "Families",
  "Solo",
  "Business",
  "Friends",
  "Senior Citizens",
];
const ROOMTYPE_AMENITIES = ["AC", "TV", "WiFi", "Balcony", "Bathtub"];
const HOTEL_AMENITIES = [
  "WIFI",
  "AC",
  "TV",
  "Parking",
  "Room Service",
  "CCTV",
  "Credit Card",
  "Elevator",
  "Power Backup",
  "Pool",
  "Dining Area",
  "EV Charging ",
];
const MEAL_OPTIONS = ["Breakfast", "Lunch", "Dinner", "All-inclusive"];
const ROOM_MEAL_OPTIONS = ["Breakfast", "Lunch", "Dinner", "All-inclusive"];

/* ======================================================= */
export default function AddHotel() {
  const [hotel, setHotel] = useState({
    name: "",
    city: "",
    area: "",
    address: "",
    state: "",
    pincode: "",
    country: "India",
    embedUrl: "",
    mealOptions: [],
    description: "",
    rating: "",
    type: "Hotels",
    travellerCategories: [],
    amenities: [],
    freeCancellation: false,
    payAtProperty: false,
    roomTypes: [],
    areaInfo: {
      restaurants: [],
      attractions: [],
      transport: [],
      airports: [],
      naturalBeauty: [],
    },
    houseRules: {
      checkIn: "From 12 PM",
      checkOut: "Until 11 AM",
      cancellation: "Free cancellation up to 24 hours before check-in.",
      childrenAndBeds: "Children above 10 years are considered as Adults ",
      ageRestriction: "Only Above 18 years are allowed to Check In",
      pets: "Pets Not allowed",
      acceptedCards: ["Visa", "MasterCard", "Cash"],
    },
    owner: { id: "", name: "", email: "", phone: "", aadhar: "", pan: "" },
  });

  const [open, setOpen] = useState({
    basic: false,
    description: false,
    images: false,
    rooms: false,
    area: false,
    house: false,
    owner: false,
  });

  const toggle = (key) => setOpen((p) => ({ ...p, [key]: !p[key] }));

  const [ownerMode, setOwnerMode] = useState("existing");
  const roomTypesRequired = !["Villas", "Farmhouses"].includes(hotel.type);

  const update = (k, v) => setHotel((p) => ({ ...p, [k]: v }));
  const updateOwner = (k, v) =>
    setHotel((p) => ({ ...p, owner: { ...p.owner, [k]: v } }));

  const toggleArray = (k, v) =>
    setHotel((p) => ({
      ...p,
      [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v],
    }));

  /* ----------- AREA INFO ---------- */
  const [areaInput, setAreaInput] = useState({ key: "restaurants", value: "" });
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
  const removeAreaInfo = (k, i) =>
    setHotel((p) => ({
      ...p,
      areaInfo: { ...p.areaInfo, [k]: p.areaInfo[k].filter((_, x) => x !== i) },
    }));

  /* --------- IMAGES ---------- */
  const [imagesByCategory, setImagesByCategory] = useState({
    rooms: [],
    entrance: [],
    facade: [],
    washroom: [],
    lobby: [],
    other: [],
  });

  /* ---------- ROOMS ---------- */
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
  const toggleRoomMealOptions = (id, v) =>
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

  /* -------- Submit ------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hotel.name || !hotel.city) return alert("Hotel name & city required");
    if (roomTypesRequired && hotel.roomTypes.length === 0)
      return alert("Add at least one room type");
    alert("Saved (console)");
    console.log(hotel);
  };

  return (
    <div className="flex justify-center md:p-6 text-[#003566]">
      <div className="w-full space-y-6">
        <h1 className="text-3xl font-semibold text-[#0A1C4F]">
          Add New Accommodation
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
              Save Accommodation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
