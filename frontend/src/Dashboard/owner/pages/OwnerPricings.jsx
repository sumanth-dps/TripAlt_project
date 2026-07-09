import useAdminAuth from "../../auth/AdminAuthContext";
import hotels from "../../../data/hotels";
import { useState } from "react";
import CustomSelect from "../../../components/CustomSelect";

export default function OwnerPricings() {
  const { user } = useAdminAuth();

  const myHotels = hotels.filter((h) => user?.hotelIds?.includes(h.id));

  if (myHotels.length === 0) {
    return <div className="p-6 text-gray-600">No hotels found.</div>;
  }

  const [selectedHotelId, setSelectedHotelId] = useState(myHotels[0]?.id);
  const hotel = myHotels.find((h) => h.id === selectedHotelId);

  const [roomTypes, setRoomTypes] = useState(
    JSON.parse(JSON.stringify(hotel.roomTypes))
  );

  const updateField = (index, field, value) => {
    const updated = [...roomTypes];
    updated[index][field] = value;
    setRoomTypes(updated);
  };

  const saveChanges = () => {
    hotel.roomTypes = roomTypes;
    alert("✔ Pricing updated successfully!");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-[#003566]">Manage Pricing</h1>

      {/* HOTEL SELECT */}
      {myHotels.length > 1 && (
        <div className="max-w-sm">
          <CustomSelect
            value={selectedHotelId}
            onChange={setSelectedHotelId}
            placeholder="Select Hotel"
            options={myHotels.map((h) => ({
              value: h.id,
              label: `${h.name} — ${h.city}`,
            }))}
          />
        </div>
      )}

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-[#003566] overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#003566] text-white text-sm">
            <tr>
              <Th>Room Type</Th>
              <Th>Base Price</Th>
              <Th>Original Price</Th>
              <Th>Taxes</Th>
              <Th>Total Rooms</Th>
              <Th>Discount</Th>
            </tr>
          </thead>

          <tbody>
            {roomTypes.map((room, index) => (
              <tr
                key={index}
                className="border-b border-[#003566] hover:bg-orange-50"
              >
                <Td className="font-medium">{room.name}</Td>

                <Td>
                  <Input
                    value={room.price}
                    onChange={(v) => updateField(index, "price", v)}
                  />
                </Td>

                <Td>
                  <Input
                    value={room.originalPrice}
                    onChange={(v) =>
                      updateField(index, "originalPrice", v)
                    }
                  />
                </Td>

                <Td>
                  <Input
                    value={room.taxes}
                    onChange={(v) => updateField(index, "taxes", v)}
                  />
                </Td>

                <Td>
                  <Input
                    value={room.totalRooms}
                    onChange={(v) =>
                      updateField(index, "totalRooms", v)
                    }
                  />
                </Td>

                <Td>
                  <CustomSelect
                    value={room.discount || "none"}
                    onChange={(v) =>
                      updateField(index, "discount", v)
                    }
                    options={[
                      { value: "none", label: "None" },
                      { value: "10%", label: "10% Off" },
                      { value: "20%", label: "20% Off" },
                      { value: "30%", label: "30% Off" },
                    ]}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {roomTypes.map((room, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-sm border border-[#f5cc00] space-y-3"
          >
            <h3 className="font-semibold text-[#003566]">
              {room.name}
            </h3>

            <MobileField
              label="Base Price"
              value={room.price}
              onChange={(v) => updateField(index, "price", v)}
            />

            <MobileField
              label="Original Price"
              value={room.originalPrice}
              onChange={(v) =>
                updateField(index, "originalPrice", v)
              }
            />

            <MobileField
              label="Taxes"
              value={room.taxes}
              onChange={(v) => updateField(index, "taxes", v)}
            />

            <MobileField
              label="Total Rooms"
              value={room.totalRooms}
              onChange={(v) =>
                updateField(index, "totalRooms", v)
              }
            />

            <CustomSelect
              value={room.discount || "none"}
              onChange={(v) =>
                updateField(index, "discount", v)
              }
              placeholder="Discount"
              options={[
                { value: "none", label: "No Discount" },
                { value: "10%", label: "10% Off" },
                { value: "20%", label: "20% Off" },
                { value: "30%", label: "30% Off" },
              ]}
            />
          </div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={saveChanges}
          className="px-6 py-3 bg-[#003566] text-white rounded-lg shadow-md hover:bg-[#0A1C4F]"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-col-1 md:grid-cols-2 gap-6">
        {/* RECOMMENDATIONS SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-[#f5cc00] space-y-4 ">
        <h2 className="text-xl font-bold text-[#003566] flex items-center gap-2">
          Recommended For You
        </h2>

        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-[#F5CC00] font-bold">•</span>
            Increase room price on weekends to match high demand.
          </li>
          <li className="flex gap-2">
            <span className="text-[#F5CC00] font-bold">•</span>
            Add 10–20% discount on weekdays to boost occupancy.
          </li>
          <li className="flex gap-2">
            <span className="text-[#F5CC00] font-bold">•</span>
            Update pricing regularly to stay competitive in your area.
          </li>
          <li className="flex gap-2">
            <span className="text-[#F5CC00] font-bold">•</span>
            Reduce price if occupancy is below 40% this week.
          </li>
        </ul>
      </div>

      {/* MY PROMOTIONS SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-[#f5cc00] space-y-4 ">
        <h2 className="text-xl font-bold text-[#003566] flex items-center gap-2">
          My Promotions
        </h2>

        <p className="text-gray-700">
          Create and manage offers to attract more customers.
        </p>

        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-green-600 font-bold">✔</span>
            Weekend Discount (10–20%)
          </li>
          <li className="flex gap-2">
            <span className="text-green-600 font-bold">✔</span>
            Festive Offer — Flat 15% OFF
          </li>
          <li className="flex gap-2">
            <span className="text-green-600 font-bold">✔</span>
            Long Stay Discount (3+ Nights)
          </li>
        </ul>

        <button className="mt-2 px-4 py-2 bg-[#003566] text-white rounded-lg shadow-md hover:bg-[#0A1C4F]">
          Create New Promotion
        </button>
      </div>

      {/* PROMOTION BENEFITS SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-[#f5cc00] space-y-4">
        <h2 className="text-xl font-bold text-[#003566]">
          Benefits of Promotions
        </h2>

        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-[#F5CC00] font-bold">•</span>
            Attract more customers during low occupancy days.
          </li>
          <li className="flex gap-2">
            <span className="text-[#F5CC00] font-bold">•</span>
            Increase visibility in search results.
          </li>
          <li className="flex gap-2">
            <span className="text-[#F5CC00] font-bold">•</span>
            Get more repeat customers with exclusive offers.
          </li>
          <li className="flex gap-2">
            <span className="text-[#F5CC00] font-bold">•</span>
            Improve conversion rate with competitive pricing.
          </li>
        </ul>
      </div>

      {/* SMART PRICING TIPS */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-[#f5cc00] space-y-4">
        <h2 className="text-xl font-bold text-[#003566]">Smart Pricing Tips</h2>

        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">→</span>
            Set competitive prices based on location demand.
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">→</span>
            Offer small discounts during last-minute booking periods.
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">→</span>
            Keep taxes & base price balanced to improve conversion.
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">→</span>
            Use festive promotions to boost traffic.
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Th({ children }) {
  return (
    <th className="px-4 py-3 lg:px-2 text-left font-semibold">
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td className={`px-4 lg:px-2 py-3 lg:py-2 ${className}`}>
      {children}
    </td>
  );
}

function Input({ value, onChange }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="
        w-28 p-2 rounded-lg border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-[#F5CC00]/70
      "
    />
  );
}

function MobileField({ label, value, onChange }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <span className="text-sm text-gray-500">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          w-28 p-2 rounded-lg border border-gray-300 text-right
          focus:outline-none focus:ring-2 focus:ring-[#F5CC00]/70
        "
      />
    </div>
  );
}
