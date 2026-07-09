import { IoLocationOutline } from "react-icons/io5";

export default function HotelAbout({ hotel }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
      <div className="flex items-center text-gray-600 text-sm sm:text-base gap-x-2 mt-2">
        <IoLocationOutline size={18} />
        <span>
          {hotel.address}, {hotel.area && `${hotel.area},`} {hotel.city},{" "}
          {hotel.country}
        </span>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-gray-700 leading-relaxed">
          {hotel.description || "No description available."}
        </p>
      </div>
    </div>
  );
}
