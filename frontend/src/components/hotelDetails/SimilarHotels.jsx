
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HotelCard from "../HotelCard";

export default function SimilarHotels({ displayedHotels, city, navigate }) {
  if (!displayedHotels?.length) return null;

  return (
    <section className="mt-10 w-full bg-gray-50/70 py-8 rounded-2xl shadow-sm ">
     
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 px-6 sm:px-10">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">
          <span className="text-gray-800">Similar Hotels in</span>{" "}
          <span className="text-blue-600">{city}</span>
        </h2>
        <div className="hidden sm:block w-16 h-[3px] bg-blue-500 rounded-full mt-1"></div>
      </div>

      <div className="relative group ">
        
        <button
          onClick={() =>
            document
              .getElementById("similarHotelsSlider")
              .scrollBy({ left: -350, behavior: "smooth" })
          }
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md hover:shadow-lg text-gray-700 hover:text-blue-600 rounded-full p-2 transition-all z-20"
        >
          <FaChevronLeft size={18} />
        </button>

        <button
          onClick={() =>
            document
              .getElementById("similarHotelsSlider")
              .scrollBy({ left: 350, behavior: "smooth" })
          }
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md hover:shadow-lg text-gray-700 hover:text-blue-600 rounded-full p-2 transition-all z-20"
        >
          <FaChevronRight size={18} />
        </button>

        
        <div
          id="similarHotelsSlider"
          className="flex gap-5 overflow-x-auto scroll-smooth px-6 sm:px-12 scrollbar-hide py-4 snap-x snap-mandatory"
        >
          {displayedHotels.map((h) => (
            <div
              key={h.id}
              onClick={() => navigate(`/hotel/${h.id}`, { state: { hotel: h } })}
              className="min-w-[270px] sm:min-w-[300px] md:min-w-[320px] snap-center cursor-pointer transition-transform hover:scale-[1.02] duration-200"
            >
              <HotelCard hotel={h} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
