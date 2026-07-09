import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaDownload, FaHotel, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useMemo } from "react";

export default function BookingConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return (
      <div className="flex justify-center items-center h-screen">
        Invalid Booking Confirmation
      </div>
    );

  const { hotel, selectedRoom, finalPrice, checkIn, checkOut, guests } = state;

  // 🔹 Generate Booking ID
  const bookingID = useMemo(() => {
    return "BKG" + Math.floor(100000 + Math.random() * 900000);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10 mt-15">
      <div className="bg-white border-gray-200 border p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-xl">

        {/* ✔ Success Icon */}
        <div className="flex justify-center mb-4">
  <div className="relative flex items-center justify-center w-24 h-24">
    <div className="absolute w-16 h-16 bg-green-300 rounded-full opacity-70 animate-ping"></div>

    <FaCheckCircle className="text-green-600 text-6xl relative z-10" />
  </div>
</div>


        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-[#003566]">
          Booking Confirmed!
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Your stay at <strong>{hotel.name}</strong> has been successfully booked.
        </p>

        {/* Booking ID */}
        <div className="mt-4 text-center">
          <span className="text-xs text-gray-500">Booking ID</span>
          <p className="text-lg font-semibold tracking-wide text-[#003566]">
            {bookingID}
          </p>
        </div>

        {/* HOTEL INFO */}
        <div className="mt-6 flex gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <img
            src={selectedRoom.image}
            alt={hotel.name}
            className="w-24 h-24 object-cover rounded-lg"
          />

          <div>
            <p className="font-semibold text-gray-900 text-sm flex items-center gap-1">
              <FaHotel className="text-blue-600" /> {hotel.name}
            </p>
            <p className="text-xs text-gray-600 mt-1">{hotel.city}, {hotel.area}</p>

            <p className="text-xs mt-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-lg inline-block">
              {selectedRoom.name}
            </p>
          </div>
        </div>

        {/* STAY SUMMARY CARD */}
        <div className="mt-6 p-4 bg-white border border-gray-200 rounded-xl ">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">Stay Details</h3>

          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" /> Check-In
              </span>
              <span>{checkIn}</span>
            </p>

            <p className="flex justify-between">
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" /> Check-Out
              </span>
              <span>{checkOut}</span>
            </p>

            {guests && (
              <p className="flex justify-between">
                <span className="flex items-center gap-2">
                  <FaUser className="text-blue-600" /> Guests
                </span>
                <span>{guests.adults} Adults, {guests.children} Children</span>
              </p>
            )}
          </div>
        </div>

        {/* PRICE SUMMARY */}
        <div className="mt-6 p-4 bg-white border rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">Payment Summary</h3>

          <div className="flex justify-between text-sm">
            <span>Final Price Paid</span>
            <span className="font-semibold text-gray-900">
              ₹{finalPrice.toLocaleString()}
            </span>
          </div>

          <p className="text-green-600 text-xs mt-1 font-medium text-right">
            ✔ Taxes included · Invoice available
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col gap-3">
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
            <FaDownload /> Download Invoice
          </button>

          <button
            onClick={() => navigate("/my-bookings")}
            className="w-full py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
          >
            Go to My Bookings
          </button>
        </div>

      </div>
    </div>
  );
}
