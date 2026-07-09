import { useNavigate, useLocation } from "react-router-dom";
import {
  FaWifi,
  FaTv,
  FaSnowflake,
  FaCar,
  FaRegCreditCard,
  FaCarBattery,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { BiSolidCctv } from "react-icons/bi";
import { PiElevatorDuotone } from "react-icons/pi";
import { GiVacuumCleaner } from "react-icons/gi";

export default function HotelCardSearch({ hotel }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { fromDate, toDate, adults, children, rooms } = location.state || {};

  const firstCategory = Object.keys(hotel.imagesByCategory || {}).find(
    (key) => hotel.imagesByCategory[key]?.length > 0
  );

  const previewImage =
    hotel.imagesByCategory?.[firstCategory]?.[0]?.url || "/fallback.jpg";

  const visibleAmenities = hotel.amenities.slice(0, 3);
  const remainingCount = hotel.amenities.length - visibleAmenities.length;
  const discount = Math.round((1 - hotel.price / hotel.originalPrice) * 100);

  const navigateToHotel = () => {
  // NEW CLEAN URL FORMAT: /city-area/hotel-name
  const cityArea = `${hotel.city}-${hotel.area}`
    .toLowerCase()
    .replace(/ /g, "-");

  const hotelSlug = hotel.name.toLowerCase().replace(/ /g, "-");

  navigate(`/${cityArea}/${hotelSlug}`, {
    state: {
      hotel,
      fromDate,
      toDate,
      adults,
      children,
      rooms,
    },
  });
};

  return (
    <div
      onClick={navigateToHotel}
      className="flex flex-col md:flex-row bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 w-full cursor-pointer"
    >
      {/* Image */}
      <div className="md:w-1/3 w-full">
        <img
          src={previewImage}
          alt={hotel.name}
          className="min-h-56 h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="md:w-2/3 w-full p-4 flex flex-col gap-3">

        {/* Title & Location */}
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              {hotel.name}
            </h3>

            <div className="text-sm text-gray-500 flex items-center gap-1">
              <IoLocationOutline size={16} />
              <p>{hotel.area}, {hotel.city}</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-3">
          {visibleAmenities.map((a) => (
            <span
              key={a}
              className="text-xs px-3 py-1 bg-blue-50 text-gray-700 rounded-full border border-blue-200 flex items-center gap-1"
            >
              {a === "WIFI" && <FaWifi size={16} />}
              {a === "TV" && <FaTv size={14} />}
              {a === "AC" && <FaSnowflake size={14} />}
              {a === "Parking" && <FaCar size={14} />}
              {a === "Credit Card" && <FaRegCreditCard size={14} />}
              {a === "CCTV" && <BiSolidCctv size={14} />}
              {a === "Elevator" && <PiElevatorDuotone size={14} />}
              {a === "Power Backup" && <FaCarBattery size={14} />}
              {a === "Daily Cleaning" && <GiVacuumCleaner size={14} />}
              <span>{a}</span>
            </span>
          ))}

          {remainingCount > 0 && (
            <span className="text-xs text-gray-500 mt-1">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-gray-600 text-xs">
          <p
            className={`text-lg text-white text-center px-1 rounded-md font-medium ${
              hotel.guestRating <= 2.5
                ? "bg-[#ff4545]"
                : hotel.guestRating <= 3
                ? "bg-[#ffa534]"
                : hotel.guestRating <= 3.5
                ? "bg-[#ffe234]"
                : hotel.guestRating <= 4
                ? "bg-[#b7dd29]"
                : hotel.guestRating <= 4.5
                ? "bg-[#57e32c]"
                : "bg-green-600"
            }`}
          >
            {hotel.guestRating} ★
          </p>

          <p>({hotel.reviewsCount} reviews)</p>
        </div>

        {/* Pricing + Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="font-bold text-base sm:text-xl text-black">
              ₹{hotel.price}
              <span className="text-sm text-gray-500 ml-2 line-through">
                ₹{hotel.originalPrice}
              </span>
              <span className="text-sm ml-2 text-[#F5CC00]">
                {discount}% off
              </span>
            </p>

            <p className="text-xs text-gray-600">
              + ₹{hotel.taxes} taxes & fees · per room per night
            </p>
          </div>

          <button className="w-full md:w-auto bg-[#003566] hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-3 md:mt-0 duration-300 cursor-pointer">
            View Details
          </button>
        </div>

      </div>
    </div>
  );
}
