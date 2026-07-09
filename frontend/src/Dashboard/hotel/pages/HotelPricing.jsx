import { useState } from "react";
import { FaPercent, FaRupeeSign } from "react-icons/fa";

/* -------------------- DUMMY ROOM PRICING -------------------- */
const INITIAL_PRICING = [
  {
    id: "C101",
    roomType: "Classic Room",
    basePrice: 2800,
    discount: 10, // %
  },
  {
    id: "D201",
    roomType: "Deluxe Room",
    basePrice: 4200,
    discount: 15,
  },
  {
    id: "F301",
    roomType: "Family Suite",
    basePrice: 6200,
    discount: 5,
  },
];

export default function HotelPricing() {
  const [pricing, setPricing] = useState(INITIAL_PRICING);

  /* ---------------- UPDATE PRICE ---------------- */
  const updateField = (id, field, value) => {
    setPricing((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, [field]: Number(value) }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold text-[#003566]">
        Room Pricing
      </h1>

      <p className="text-gray-600 max-w-3xl">
        Update room prices and apply discounts to attract more bookings.
        Final price is automatically calculated.
      </p>

      {/* PRICING TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#003566] text-white text-sm">
            <tr>
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Base Price</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Final Price</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {pricing.map((room) => {
              const finalPrice =
                room.basePrice -
                (room.basePrice * room.discount) / 100;

              return (
                <tr
                  key={room.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-semibold text-[#003566]">
                    {room.roomType}
                  </td>

                  {/* BASE PRICE */}
                  <td className="p-3">
                    <div className="flex items-center gap-2 border rounded-md px-2">
                      <FaRupeeSign className="text-gray-500" />
                      <input
                        type="number"
                        value={room.basePrice}
                        onChange={(e) =>
                          updateField(
                            room.id,
                            "basePrice",
                            e.target.value
                          )
                        }
                        className="w-full py-1 outline-none"
                      />
                    </div>
                  </td>

                  {/* DISCOUNT */}
                  <td className="p-3">
                    <div className="flex items-center gap-2 border rounded-md px-2">
                      <FaPercent className="text-gray-500" />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={room.discount}
                        onChange={(e) =>
                          updateField(
                            room.id,
                            "discount",
                            e.target.value
                          )
                        }
                        className="w-full py-1 outline-none"
                      />
                    </div>
                  </td>

                  {/* FINAL PRICE */}
                  <td className="p-3 font-semibold text-green-700">
                    ₹{finalPrice.toFixed(0)}
                  </td>

                  {/* ACTION */}
                  <td className="p-3">
                    <button className="
                      px-4 py-2 rounded-lg text-sm font-medium
                      bg-[#003566] text-white hover:bg-[#0A1C4F]
                      transition
                    ">
                      Save
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PROMOTION INFO (POINTS ONLY) */}
      <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-[#003566] mb-2">
          Pricing Tips
        </h2>

        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>Offering small discounts increases booking conversion.</li>
          <li>Weekend pricing can be higher due to demand.</li>
          <li>Discounts help attract first-time customers.</li>
          <li>Flexible pricing improves occupancy.</li>
        </ul>
      </div>
    </div>
  );
}
