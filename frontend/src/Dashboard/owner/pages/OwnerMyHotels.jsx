import useAdminAuth from "../../auth/AdminAuthContext";
import hotels from "../../../data/hotels";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Popup from "../../../components/Popup";
import { useState } from "react";

export default function OwnerMyHotels() {
  const { user } = useAdminAuth();
  const navigate = useNavigate();
  const [showRequestPopup, setShowRequestPopup] = useState(false);

  // Hotels owned by the user
  const myHotels = hotels.filter((hotel) => user?.hotelIds?.includes(hotel.id));

  return (
    <div className=" space-y-6">
      {/* PAGE TITLE */}
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-semibold text-[#003566]">My Hotels</h1>
        <button
          onClick={() => setShowRequestPopup(true)}
          className="text-lg px-4 py-2 text-white rounded-lg bg-[#003566]
             hover:bg-[#0A1C4F] transition duration-300 cursor-pointer"
        >
          Request Onboard Extra Hotels
        </button>
      </div>

      {/* ZERO HOTELS CASE */}
      {myHotels.length === 0 && (
        <p className="text-gray-500 bg-white p-4 rounded-lg shadow border">
          No hotels assigned to your owner account.
        </p>
      )}

      {/* HOTELS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {myHotels.map((hotel) => {
          const image =
            hotel.imagesByCategory?.rooms?.[0]?.url ?? "/placeholder.jpg";

          return (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition duration-300 overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={image}
                  alt={hotel.name}
                  className="h-44 w-full object-cover"
                />

                {/* RATING BADGE */}
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md text-[#003566] font-semibold flex items-center gap-1 text-sm">
                  <FaStar className="text-orange-500" /> {hotel.rating}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                {/* HOTEL NAME */}
                <h2 className="text-xl font-bold text-[#003566] leading-tight">
                  {hotel.name}
                </h2>

                {/* LOCATION */}
                <p className="text-gray-600 text-sm flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#F5CC00]" />
                  {hotel.city} • {hotel.area}
                </p>

                {/* BOOKING COUNT */}
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-[#003566]">
                    {hotel.bookings?.length || 0}
                  </span>{" "}
                  total bookings
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => navigate(`/owner/my-hotels/view/${hotel.id}`)}
                  className="mt-2 w-full py-2.5 rounded-lg font-medium text-white bg-[#003566] cursor-pointer
                            hover:bg-[#0A1C4F] transition shadow-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Popup
        isOpen={showRequestPopup}
        onClose={() => setShowRequestPopup(false)}
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-[#003566]">
            Request Sent
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Your request has been successfully sent to the admin.
            <br />
            They will reach out to you shortly.
          </p>

          <button
            onClick={() => setShowRequestPopup(false)}
            className="mt-4 px-6 py-2 bg-[#003566] text-white rounded-lg
                 hover:bg-[#0A1C4F] transition cursor-pointer"
          >
            Okay
          </button>
        </div>
      </Popup>
    </div>
  );
}
