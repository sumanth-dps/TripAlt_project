import { useNavigate } from "react-router-dom";
import { FaWifi, FaTv, FaSnowflake } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { BiSolidCctv } from "react-icons/bi";
import { PiElevatorDuotone } from "react-icons/pi";
import { FaCarBattery } from "react-icons/fa";
import { GiVacuumCleaner } from "react-icons/gi";

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();
const navigateToHotel = () => {
  const cityArea = `${hotel.city}-${hotel.area}`
    .toLowerCase()
    .replace(/ /g, "-");

  const hotelSlug = hotel.name.toLowerCase().replace(/ /g, "-");

  navigate(`/${cityArea}/${hotelSlug}`, { state: { hotel } });
};


  // ⭐ Safe first preview image from ANY category
  const firstCategory = Object.keys(hotel.imagesByCategory || {}).find(
    (key) => hotel.imagesByCategory[key]?.length > 0
  );

  const previewImage =
    hotel.imagesByCategory?.[firstCategory]?.[0]?.url ||
    "/fallback.jpg"; // fallback if nothing exists

  const visibleAmenities = hotel.amenities.slice(0, 3);
  const remainingCount = hotel.amenities.length - visibleAmenities.length;

  const discount = Math.round(
    (1 - hotel.price / hotel.originalPrice) * 100
  );

  return (
    <div
     onClick={navigateToHotel}
      className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
    >
      {/* Hotel Image */}
      <img
        src={previewImage}
        alt={hotel.name}
        className="w-full h-56 sm:h-64 object-cover"
      />

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-3">

        {/* Title & Location */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              {hotel.name}
            </h3>

            <div className="text-sm text-gray-500 flex items-center gap-1">
              <IoLocationOutline size={16} />
              <p>
                {hotel.area}, {hotel.city}
              </p>
            </div>
          </div>
        </div>

        {/* Amenities (first 3) */}
        <div className="flex flex-wrap gap-2">
          {visibleAmenities.map((a) => (
            <span
              key={a}
              className="text-xs px-3 py-1 bg-blue-100 text-gray-700 rounded-full border border-blue-200 flex items-center gap-2"
            >
              <div>
                {a === "WIFI" && <FaWifi size={16} />}
                {a === "TV" && <FaTv size={16} />}
                {a === "CCTV" && <BiSolidCctv size={16} />}
                {a === "AC" && <FaSnowflake size={16} />}
                {a === "Parking" && <FaCar size={16} />}
                {a === "Credit Card" && <FaRegCreditCard size={16} />}
                
                {a === "Elevator" && <PiElevatorDuotone size={16} />}
                {a === "Power Backup" && <FaCarBattery size={16} />}
                {a === "Daily Cleaning" && <GiVacuumCleaner size={16} />}
              </div>
              <div>{a}</div>
            </span>
          ))}

          {remainingCount > 0 && (
            <span className="text-xs px-1 py-1 text-gray-700">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* Pricing */}
        <div>
          <p className="font-bold text-base sm:text-xl text-black">
            ₹{hotel.price}
            <span className="text-sm text-gray-500 ml-2 line-through">
              ₹{hotel.originalPrice}
            </span>
            <span
              className={`text-sm ml-2 ${
                discount >= 80
                  ? "text-green-700"
                  : discount >= 70
                  ? "text-green-600"
                  : discount >= 60
                  ? "text-orange-400"
                  : "text-[#F5CC00]"
              }`}
            >
              {discount}% off
            </span>
          </p>

          <p className="text-xs text-gray-600">
            + ₹{hotel.taxes} taxes & fees · per room per night
          </p>
        </div>

        {/* Rating */}
        <div className="w-full flex items-center gap-2 text-gray-600 text-xs mt-1">
          <p
            className={`text-lg text-white  text-center px-1 rounded-md font-medium ${
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

          <p>
            {hotel.guestRating >= 4
              ? "Excellent"
              : hotel.guestRating >= 3
              ? "Good"
              : hotel.guestRating >= 2
              ? "Average"
              : hotel.guestRating >= 1
              ? "Bad"
              : "Terrible"}
          </p>
        </div>
      </div>
    </div>
  );
}
