
import CustomSelect from "../../components/CustomSelect";

export default function SortBar({
  sortBy,
  setSortBy,
  filteredHotels = [],
  showFilters,
  setShowFilters,
}) {
  const sortOptions = [
    { value: "default", label: "Recommended" },
    { value: "priceLowHigh", label: "Price: Low → High" },
    { value: "priceHighLow", label: "Price: High → Low" },
    { value: "ratingHighLow", label: "Top Rated" },
    { value: "popularity", label: "Most Popular" },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">

      {/* LEFT */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
        {filteredHotels.length} Hotels Found
      </h2>

      {/* RIGHT */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">

        {/* SORT */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-gray-600 text-sm font-medium whitespace-nowrap">
            Sort by:
          </span>

          <CustomSelect
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
            placeholder="Recommended"
            className="w-full sm:w-[200px]"
          />
        </div>

        {/* FILTER TOGGLE (MOBILE) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="xl:hidden text-sm bg-blue-100 text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
    </div>
  );
}
