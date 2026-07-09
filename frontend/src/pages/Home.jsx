
import { useNavigate, useParams } from "react-router-dom";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import HotelCard from "../components/HotelCard";
import { IoIosArrowRoundForward } from "react-icons/io";
import hotels from "../data/hotels";

export default function Home() {
  const navigate = useNavigate();
  const { city } = useParams();

  const selectedCity = city || "";

  const filteredHotels = selectedCity
    ? hotels.filter((h) => h.city === selectedCity)
    : hotels;

  const topHotels = filteredHotels.slice(0, 6);

  return (
    <div className="w-full">
      <SearchBar />
      <Banner />

      <section className="w-full py-3 pb-6">
        <div className="w-full xl:w-3/4 2xl:w-2/3 mx-auto px-5 xl:px-0">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
            {selectedCity
              ? `Top picks in ${selectedCity}`
              : "Top picks for you"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-4">
            {topHotels.map((h) => (
              <HotelCard key={h.id} hotel={h} />
            ))}
          </div>

          {/* SEE MORE BUTTON */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                const citySlug = selectedCity
                  ? selectedCity.toLowerCase().replace(/ /g, "-")
                  : "hyderabad";

                navigate(`/${citySlug}/search`);
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center cursor-pointer"
            >
              <p>See more</p>
              <p className="text-lg pt-1">
                <IoIosArrowRoundForward />
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
