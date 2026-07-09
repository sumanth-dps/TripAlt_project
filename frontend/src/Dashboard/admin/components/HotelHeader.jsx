import { Link } from "react-router-dom";

export default function HotelHeader({ hotel }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-2xl font-bold text-[#0A1C4F]">{hotel.name}</h2>
        <div className="text-sm text-gray-600">
          {hotel.city} • {hotel.area}
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/admin/hotels/edit/${hotel.id}`}
          className="px-4 py-2 rounded-md bg-[#0A1C4F] text-white shadow"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
