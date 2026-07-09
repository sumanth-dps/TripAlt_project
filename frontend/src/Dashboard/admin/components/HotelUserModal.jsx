
import React from "react";
import { FaTimes } from "react-icons/fa";

export default function HotelUserModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[90%] max-w-lg p-6 rounded-xl shadow-lg space-y-4 animate-fadeIn">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-[#003566]">
            User Details
          </h3>

          <button
            className="text-gray-600 hover:text-red-600"
            onClick={onClose}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* USER INFO */}
        <div className="space-y-2">
          <div>
            <span className="font-medium">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-medium">Email:</span>{" "}
            {user.email || "N/A"}
          </div>
          <div>
            <span className="font-medium">Phone:</span>{" "}
            {user.phone || "N/A"}
          </div>
        </div>

        {/* USER BOOKINGS */}
        <div>
          <h4 className="font-semibold text-[#003566] mb-2">
            Bookings
          </h4>

          <div className="space-y-2 max-h-52 overflow-y-auto pr-2">
            {(user.bookings || []).map((b, i) => (
              <div
                key={i}
                className="p-3 border rounded bg-gray-50 shadow-sm"
              >
                <div className="text-sm">
                  <span className="font-medium">Booking ID:</span> {b.id}
                </div>
                <div className="text-sm">Room: {b.roomType}</div>
                <div className="text-sm">Check-In: {b.checkIn}</div>
                <div className="text-sm">Check-Out: {b.checkOut}</div>
                <div className="text-green-700 font-semibold mt-1">
                  ₹{b.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CLOSE BUTTON */}
        <button
          className="w-full bg-[#003566] text-white py-2 rounded-lg mt-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
