import {
  FaSnowflake,
  FaTv,
  FaWifi,
  FaBed,
  FaUsers,
} from "react-icons/fa";
import { MdFamilyRestroom, MdOutlineDoorFront } from "react-icons/md";

export default function HotelRoomSelector({
  roomTypes,
  selectedRoom,
  setSelectedRoom,
  mealOptions,
  guests = { adults: 2, children: 0, rooms: 1 },
}) {
  if (!roomTypes?.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Choose Your Room</h2>

      <div className="space-y-8">
        {roomTypes.map((room, idx) => {
          const isSelected = selectedRoom?.name === room.name;
          const availableRooms = room.rooms?.filter((r) => !r.isBooked).length || 0;
          const exceedsCapacity =
            guests.adults > room.maxAdults || guests.children > room.maxChildren;

          return (
            <div
              key={idx}
              onClick={() => !exceedsCapacity && setSelectedRoom(room)}
              className={`rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border relative group 
                ${
                  exceedsCapacity
                    ? "border-red-300 opacity-70 cursor-not-allowed"
                    : isSelected
                    ? "border-green-500 ring-2 ring-green-300 shadow-md"
                    : "border-gray-200 hover:border-blue-300 hover:shadow-lg"
                }`}
            >
              <div
                className={`flex items-center justify-between px-5 py-2 
                  ${
                    isSelected
                      ? "bg-linear-to-r from-green-50 to-green-100"
                      : "bg-gray-50"
                  }`}
              >
                <span className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                  ⭐ {isSelected ? "SELECTED CATEGORY" : "AVAILABLE CATEGORY"}
                </span>
                {exceedsCapacity && (
                  <span className="text-xs text-red-600 font-medium">
                    ⚠ Guests exceed capacity
                  </span>
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-5 p-5 bg-white">
     
                <div className="relative md:w-1/3 w-full">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 md:h-44 object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  {availableRooms === 0 && (
                    <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center text-white text-sm font-medium transition-transform duration-300 group-hover:scale-[1.03]">
                      Fully Booked
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {room.name}
                    </h3>
                    {isSelected && (
                      <span className="text-green-600 text-sm font-semibold">
                        ✔ Selected
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <FaBed className="text-gray-500" />
                      {room.bedType || "King Bed"} · {room.bedCount || 1} Bed(s)
                    </span>
                    <span className="flex items-center gap-2">🏠 {room.size}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2 text-xs font-medium">
                    <span className="flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full">
                      <FaUsers /> Max {room.maxAdults} Adults
                    </span>
                    <span className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">
                      <MdFamilyRestroom /> Max {room.maxChildren} Children
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 text-sm">
                    {mealOptions.includes("Breakfast included") && (
                      <span className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full">
                        🍳 Breakfast
                      </span>
                    )}
                    {mealOptions.includes("Lunch included") && (
                      <span className="bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full">
                        🍱 Lunch
                      </span>
                    )}
                    {mealOptions.includes("Dinner included") && (
                      <span className="bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1 rounded-full">
                        🍽 Dinner
                      </span>
                    )}
                  </div>
                  {/* Amenities */}
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
                    {room.amenities.includes("AC") && (
                      <span className="flex items-center gap-2">
                        <FaSnowflake className="text-blue-500" /> AC
                      </span>
                    )}
                    {room.amenities.includes("TV") && (
                      <span className="flex items-center gap-2">
                        <FaTv className="text-[#F5CC00]" /> TV
                      </span>
                    )}
                    {room.amenities.includes("WiFi") && (
                      <span className="flex items-center gap-2">
                        <FaWifi className="text-green-500" /> WiFi
                      </span>
                    )}
                    {room.amenities.includes("Balcony") && (
                      <span className="flex items-center gap-2">🌅 Balcony</span>
                    )}
                    {room.amenities.includes("Mini Bar") && (
                      <span className="flex items-center gap-2">🍷 Mini Bar</span>
                    )}
                  </div>

                  
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center p-5 bg-gray-50">
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{room.price.toLocaleString()}
                    <span className="text-gray-500 line-through text-base ml-2 font-normal">
                      ₹{room.originalPrice.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    + ₹{room.taxes} taxes & fees / night
                  </p>
                </div>

                <button
                  disabled={exceedsCapacity || availableRooms === 0}
                  className={`mt-4 sm:mt-0 font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 w-full sm:w-auto justify-center ${
                    exceedsCapacity || availableRooms === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-green-600 text-white shadow-md hover:bg-green-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {availableRooms === 0
                    ? "FULLY BOOKED"
                    : exceedsCapacity
                    ? "EXCEEDS CAPACITY"
                    : isSelected
                    ? "SELECTED"
                    : "SELECT"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
