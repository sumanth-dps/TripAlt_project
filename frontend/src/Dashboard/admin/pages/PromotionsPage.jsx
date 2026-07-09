import React from "react";

export default function PromotionsPage() {
  return (
    <div className=" space-y-6">
      <h2 className="text-2xl font-bold text-[#003566]">Promotions</h2>

      {/* ⭐ CREATE PROMOTION */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-[#003566]">
          Create Promotion
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Promotion Title"
            className="border rounded-md p-2"
          />

          <input
            type="number"
            placeholder="Discount %"
            className="border rounded-md p-2"
          />

          <input
            type="date"
            className="border rounded-md p-2"
          />

          <select className="border rounded-md p-2">
            <option>Select Room Type</option>
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Suite</option>
          </select>

        </div>

        <button className="mt-6 bg-[#003566] text-white px-5 py-2 rounded-lg">
          Create Promotion
        </button>
      </div>

      {/* ⭐ ACTIVE PROMOTIONS */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-[#003566]">
          Active Promotions
        </h3>

        {[1, 2].map((item) => (
          <div
            key={item}
            className="border p-4 rounded-lg mb-3 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold text-lg">Summer Saver {item}</div>
              <div className="text-gray-600 text-sm">20% OFF • Valid till 28 Feb</div>
            </div>

            <button className="text-red-600 hover:underline">Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
}
