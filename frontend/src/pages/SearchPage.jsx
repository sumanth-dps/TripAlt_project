import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import hotelsData from "../data/hotels";
import SearchBar from "../components/SearchBar";
import { SearchFilters, SortBar, HotelResults } from "../components/search";

const normalize = (str = "") =>
  str.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");

export default function SearchPage() {
  const location = useLocation();
  const { city_area } = useParams();

  const [hotels] = useState(hotelsData);
  const [filteredHotels, setFilteredHotels] = useState(hotels);

  const urlKey = normalize(city_area);
  const initialQuery =
  location.state?.query ||
  location.state?.city ||
  city_area?.replace(/-/g, " ") ||
  "";


  const initialArea =
    hotels.find((h) => normalize(`${h.city}${h.area}`) === urlKey)?.area || "";

  /* ---------------- STATE ---------------- */
  const [selectedArea, setSelectedArea] = useState(initialArea);
const [searchLocation, setSearchLocation] = useState(initialQuery);

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState([]);
  const [selectedTravellerCategory, setSelectedTravellerCategory] = useState([]);
  const [selectedSportCategory, setSelectedSportCategory] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [guestRating, setGuestRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  /* ---------------- AVAILABLE AREAS ---------------- */
  const availableAreas = [
  ...new Set(
    hotels
      .filter((h) =>
        h.city?.toLowerCase().includes(searchLocation.toLowerCase())
      )
      .map((h) => h.area)
      .filter(Boolean)
  ),
];


  /* ---------------- FILTER LOGIC ---------------- */
  useEffect(() => {
    let filtered = hotels.filter((hotel) => {
      const hPrice = Number(hotel.price ?? Infinity);

      /* ---------- NORMALIZE DATA ---------- */
      const hAmenities =
        (hotel.amenities ?? []).map((a) =>
          a.toString().toLowerCase().trim()
        );

      const hMeals =
        (hotel.mealOptions ?? []).map((m) =>
          m.toString().toLowerCase().trim()
        );

      const hPaymentOptions =
        (hotel.paymentOptions ?? []).map((p) =>
          p.toString().toLowerCase().trim()
        );

      const hAccommodation = hotel.type?.toLowerCase() ?? "";

      const hTravellerCategories =
        (hotel.travellerCategories ?? []).map((t) =>
          t.toString().toLowerCase().trim()
        );
        const hSportCategories =
        (hotel.sportCategories ?? []).map((t) =>
          t.toString().toLowerCase().trim()
        );

      const hRating = Number(hotel.rating ?? 0);
      const hGuestRating = hotel.guestRating ?? 0;

      /* ---------- MATCHES ---------- */
 const query = searchLocation.toLowerCase().trim();

const matchesLocation =
  !query ||
  hotel.city?.toLowerCase().includes(query) ||
  hotel.area?.toLowerCase().includes(query) ||
  hotel.name?.toLowerCase().includes(query);


      const matchesArea =
        !selectedArea ||
        hotel.area?.toLowerCase() === selectedArea.toLowerCase();

      const withinPrice =
        hPrice >= priceRange[0] && hPrice <= priceRange[1];

      const hasAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((a) =>
          hAmenities.includes(a.toLowerCase().trim())
        );

      const hasMeals =
        selectedMeals.length === 0 ||
        selectedMeals.every((m) =>
          hMeals.includes(m.toLowerCase().trim())
        );

      const matchesAccommodation =
        selectedAccommodation.length === 0 ||
        selectedAccommodation.includes(
          hAccommodation.charAt(0).toUpperCase() + hAccommodation.slice(1)
        );

      const matchesTravellerCategory =
        selectedTravellerCategory.length === 0 ||
        selectedTravellerCategory.some((t) =>
          hTravellerCategories.includes(t.toLowerCase())
        );
        const matchesSportCategory =
        selectedSportCategory.length === 0 ||
        selectedSportCategory.some((t) =>
          hSportCategories.includes(t.toLowerCase())
        );

      const matchesPayment =
        paymentOptions.length === 0 ||
        paymentOptions.some((p) =>
          hPaymentOptions.includes(p.toLowerCase())
        );

      const meetsHotelRating = hRating >= minRating;
      const meetsGuestRating =
        guestRating === 0 || hGuestRating >= guestRating;

      return (
  matchesLocation &&
  matchesArea &&
  withinPrice &&
  hasAmenities &&
  hasMeals &&
  matchesAccommodation &&
  matchesTravellerCategory &&
  matchesSportCategory &&
  matchesPayment &&
  meetsHotelRating &&
  meetsGuestRating
);

    });

    /* ---------- SORT ---------- */
    if (sortBy === "priceLowHigh")
      filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "priceHighLow")
      filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "ratingHighLow")
      filtered.sort((a, b) => b.guestRating - a.guestRating);
    else if (sortBy === "popularity")
      filtered.sort(
        (a, b) => (b.reviewsCount ?? 0) - (a.reviewsCount ?? 0)
      );

    setFilteredHotels(filtered);
  }, [
    hotels,
    searchLocation,
    selectedArea,
    priceRange,
    selectedAmenities,
    selectedMeals,
    selectedAccommodation,
    selectedTravellerCategory,
    selectedSportCategory,
    paymentOptions,
    minRating,
    guestRating,
    sortBy,
  ]);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen mt-24">
      
<SearchBar
  minimal
  value={searchLocation}
  onSearch={(query) => {
    setSearchLocation(query);
    setSelectedArea("");
  }}
/>


      <div className="py-10 px-4 flex justify-center">
        <div className="w-full xl:w-3/4 2xl:w-2/3 flex gap-8 items-start">
          <SearchFilters
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            availableAreas={availableAreas}
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            type={["Hotels", "Resorts", "Villas", "Hostels"]}
            selectedAccommodation={selectedAccommodation}
            setSelectedAccommodation={setSelectedAccommodation}
            travellerCategories={[
              "Couples",
              "Families",
              "Business Travellers",
              "Groups",
              "Solo Travellers",
            ]}
            sportCategories={[
              "Pickle Ball",
              "Box Cricket",
              "Badminton",
              "Tennis",
            ]}
            selectedTravellerCategory={selectedTravellerCategory}
            setSelectedTravellerCategory={setSelectedTravellerCategory}
            selectedSportCategory={selectedSportCategory}
            setSelectedSportCategory={setSelectedSportCategory}
            guestRating={guestRating}
            setGuestRating={setGuestRating}
            selectedMeals={selectedMeals}
            setSelectedMeals={setSelectedMeals}
            minRating={minRating}
            setMinRating={setMinRating}
            paymentFilters={["Free Cancellation", "Pay at Property"]}
            paymentOptions={paymentOptions}
            setPaymentOptions={setPaymentOptions}
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
            handleCheckboxChange={(set, v) =>
              set((prev) =>
                prev.includes(v)
                  ? prev.filter((x) => x !== v)
                  : [...prev, v]
              )
            }
          />

          <div className="w-full xl:w-2/3">
            <SortBar
              sortBy={sortBy}
              setSortBy={setSortBy}
              filteredHotels={filteredHotels}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />

            <HotelResults filteredHotels={filteredHotels} />
          </div>
        </div>
      </div>
    </div>
  );
}
