import React from "react";
import useAdminAuth from "../auth/AdminAuthContext";

export default function PricingPage() {
  const { user } = useAdminAuth();

  // Dummy rooms
  const rooms = [
    { id: 1, name: "Standard Room", price: 1500, recommended: 1700 },
    { id: 2, name: "Deluxe Room", price: 2500, recommended: 2800 },
    { id: 3, name: "Suite Room", price: 4500, recommended: 5000 },
  ];

  return (
    <div className="px-6 space-y-6">
      <h2 className="text-2xl font-bold text-[#003566]">Pricing</h2>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-[#003566]">
          Room Prices
        </h3>

        <div className="space-y-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-lg">{room.name}</div>
                <div className="text-sm text-gray-500">
                  Recommended: ₹{room.recommended}
                </div>
              </div>

              <input
                type="number"
                defaultValue={room.price}
                className="border rounded-md p-2 w-28"
              />
            </div>
          ))}
        </div>

        <button className="mt-6 bg-[#003566] text-white px-5 py-2 rounded-lg">
          Save Prices
        </button>
      </div>
    </div>
  );
}
