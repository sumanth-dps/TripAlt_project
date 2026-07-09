import CustomSelect from "../../components/CustomSelect";
import FilterSection from "./FilterSection";
export default function SearchFilters({
  showFilters,
  setShowFilters,
  searchLocation,
  setSearchLocation,
  availableAreas,
  selectedArea,
  setSelectedArea,
  priceRange,
  setPriceRange,
  type,
  selectedAccommodation,
  setSelectedAccommodation,
  travellerCategories,
  selectedTravellerCategory,
  setSelectedTravellerCategory,
  sportCategories,
  selectedSportCategory,
  setSelectedSportCategory,
  guestRating,
  setGuestRating,
  selectedMeals,
  setSelectedMeals,
  minRating,
  setMinRating,
  paymentFilters,
  paymentOptions,
  setPaymentOptions,
  selectedAmenities,
  setSelectedAmenities,
  handleCheckboxChange,
}) {
  const ratingOptions = [
    { value: 0, label: "Any" },
    { value: 3, label: "3★ & above" },
    { value: 4, label: "4★ & above" },
    { value: 4.5, label: "4.5★ & above" },
  ];

  const areaOptions = [
    { value: "", label: "All Areas" },
    ...availableAreas.map((area) => ({
      value: area,
      label: area.charAt(0).toUpperCase() + area.slice(1),
    })),
  ];
  const resetFilters = () => {
    setSearchLocation("");
    setSelectedArea("");
    setPriceRange([0, 10000]);

    setSelectedAccommodation([]);
    setSelectedTravellerCategory([]);
    setSelectedSportCategory([]);
    setGuestRating(0);
    setSelectedMeals([]);
    setMinRating(0);
    setPaymentOptions([]);
    setSelectedAmenities([]);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-[#E5E7EB]
      p-5 w-full xl:w-1/3 h-[80vh] overflow-y-auto transition-all duration-300
      ${showFilters ? "block" : "hidden"} xl:block
      xl:sticky xl:top-24`}
    >
      {/* HEADER */}
      <h2 className="text-xl font-semibold text-[#003566] mb-4 flex justify-between items-center">
        Filters
        <button
          onClick={() => setShowFilters(false)}
          className="xl:hidden text-sm text-gray-500 hover:text-[#003566]"
        >
          ✕
        </button>
      </h2>

      {/* SEARCH */}
      <div className="mb-4">
        <label className="filter-heading">
          City or Hotel
        </label>
        <input
          type="text"
          placeholder="Search city..."
          value={searchLocation}
          onChange={(e) => {
            setSearchLocation(e.target.value);
            setSelectedArea("");
          }}
          className="
            w-full mt-1 px-3 py-2.5
            border border-gray-200 rounded-lg text-gray-700
            focus:ring-2 focus:ring-[#f5cc00] focus:border-white
            outline-none text-sm
          "
        />
      </div>

      {/* AREA */}
      {availableAreas.length > 0 && (
        <div className="mb-4">
          <label className="filter-heading">Area</label>
          <div className="mt-2">
            <CustomSelect
              value={selectedArea}
              onChange={setSelectedArea}
              options={areaOptions}
              placeholder="All Areas"
              variant="fluid"
            />
          </div>
        </div>
      )}

      {/* PRICE */}
      <div className="mb-4">
        <label className="filter-heading">
          Price Range (₹{priceRange[0]} – ₹{priceRange[1]})
        </label>
        <input
          type="range"
          min="500"
          max="10000"
          step="500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="w-full mt-2 accent-[#003566]"
        />
      </div>

      {/* ACCOMMODATION */}
      <FilterSection title="Accommodation Type">
        <div className="flex flex-col gap-2 p-2 border rounded-lg border-gray-300 ">
          {type.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedAccommodation.includes(type)}
                onChange={() =>
                  setSelectedAccommodation((prev) =>
                    prev.includes(type)
                      ? prev.filter((x) => x !== type)
                      : [...prev, type],
                  )
                }
                className="accent-[#F5CC00]"
              />
              {type}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* TRAVELLER */}
      <FilterSection title="Traveller Category">
        <div className="flex flex-col gap-2 p-2 border rounded-lg border-gray-300 ">
          {travellerCategories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedTravellerCategory.includes(cat)}
                onChange={() =>
                  handleCheckboxChange(setSelectedTravellerCategory, cat)
                }
                className="accent-[#F5CC00]"
              />
              {cat}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* sports*/}
      <FilterSection title="Sports Complex">
        <div className="flex flex-col gap-2 p-2 border rounded-lg border-gray-300 ">
          {sportCategories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedSportCategory.includes(cat)}
                onChange={() =>
                  handleCheckboxChange(setSelectedSportCategory, cat)
                }
                className="accent-[#F5CC00]"
              />
              {cat}
            </label>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Meal Options">
        <div className="flex flex-col gap-2 p-2 border rounded-lg border-gray-300 ">
          {[
            "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive",
          ].map((meal) => (
            <label
              key={meal}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedMeals.includes(meal)}
                onChange={() =>
                  setSelectedMeals((prev) =>
                    prev.includes(meal)
                      ? prev.filter((m) => m !== meal)
                      : [...prev, meal],
                  )
                }
                className="accent-[#F5CC00]"
              />
              {meal}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* AMENITIES */}
      <FilterSection title="Amenities" defaultOpen={false}>
        <div className="flex flex-col p-2 border rounded-lg border-gray-300  gap-2">
          {[
            "WIFI",
            "AC",
            "TV",
            "CCTV",
            "PARKING",
            "ROOM SERVICE",
            "CREDIT CARD",
            "ELEVATOR",
            "POWER BACKUP",
            "POOL",
            "DINING AREA",
          ].map((a) => (
            <label
              key={a}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(a)}
                onChange={() =>
                  setSelectedAmenities((prev) =>
                    prev.includes(a)
                      ? prev.filter((x) => x !== a)
                      : [...prev, a],
                  )
                }
                className="accent-[#F5CC00]"
              />
              {a}
            </label>
          ))}
        </div>
      </FilterSection>
      
      {/* PAYMENT */}
      <FilterSection title="Payment Options">
        <div className="flex flex-col gap-2 p-2 border rounded-lg border-gray-300 ">
          {paymentFilters.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 text-sm text-gray-700 "
            >
              <input
                type="checkbox"
                checked={paymentOptions.includes(opt)}
                onChange={() => handleCheckboxChange(setPaymentOptions, opt)}
                className="accent-[#F5CC00]"
              />
              {opt}
            </label>
          ))}
        </div>
      </FilterSection>
      {/* GUEST RATING */}
      <div className="mb-4">
        <label className="filter-heading  block mb-2">
          Guest Rating
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[2.5, 3, 3.5, 4, 4.5].map((value) => (
            <button
              key={value}
              onClick={() => setGuestRating(value === guestRating ? 0 : value)}
              className={`py-2 rounded-full text-sm font-medium border cursor-pointer
                ${
                  guestRating === value
                    ? "bg-[#003566] text-white border-[#003566]"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-[#F5F7FA]"
                }`}
            >
              {value}+
            </button>
          ))}
        </div>
      </div>

      {/* HOTEL RATING */}
      <div className="mb-4">
        <label className="filter-heading">
          Hotel Rating
        </label>
        <div className="mt-2">
          <CustomSelect
            value={minRating}
            onChange={setMinRating}
            options={ratingOptions}
            placeholder="Any"
            variant="fluid"
          />
        </div>
      </div>

      
      {/* MEAL OPTIONS */}

      {/* RESET */}
      <button
        onClick={resetFilters}
        className="
          w-full mt-4 py-2.5 rounded-lg text-sm font-medium
          text-[#003566]
          bg-[#EAF0F6] transition hover:bg-[#003566] hover:text-white duration-300 cursor-pointer
        "
      >
        Reset Filters
      </button>
    </div>
  );
}
