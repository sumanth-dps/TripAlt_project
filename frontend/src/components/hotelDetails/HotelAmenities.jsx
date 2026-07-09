import {
  FaWifi,
  FaTv,
  FaSnowflake,
  FaCar,
  FaRegCreditCard,
  FaCarBattery,
} from "react-icons/fa";
import { BiSolidCctv } from "react-icons/bi";
import { PiElevatorDuotone } from "react-icons/pi";
import { GiMagicBroom } from "react-icons/gi";
import { MdPool, MdLocalDining } from "react-icons/md";

const getAmenityIcon = (a) => {
  switch (a) {
    case "WIFI":
      return <FaWifi size={18} />;
    case "TV":
      return <FaTv size={18} />;
    case "AC":
      return <FaSnowflake size={18} />;
      case "CCTV":
      return <BiSolidCctv size={18} />;
    case "PARKING":
      return <FaCar size={18} />;
    case "CREDIT CARD":
      return <FaRegCreditCard size={18} />;
    
    case "ELEVATOR":
      return <PiElevatorDuotone size={18} />;
    case "POWER BACKUP":
      return <FaCarBattery size={18} />;
    case "ROOM SERVICE":
      return <GiMagicBroom size={18} />;
    case "POOL":
      return <MdPool size={18} />;
    case "DINING AREA":
      return <MdLocalDining size={18} />;
    default:
      return null;
  }
};

export default function HotelAmenities({ amenities }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Amenities</h2>
      <div className="flex flex-wrap gap-3">
        {amenities.map((a) => (
          <span
            key={a}
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-gray-700 rounded-lg border border-blue-200"
          >
            {getAmenityIcon(a)} <span className="text-sm">{a}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
