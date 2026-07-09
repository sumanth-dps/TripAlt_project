import HotelCardSearch from "../HotelCardSearch";

export default function HotelResults({ filteredHotels }) {
  if (filteredHotels.length === 0) {
    return (
      <p className="text-gray-500 text-center py-10">
        No hotels match your filters.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {filteredHotels.map((hotel) => (
        <HotelCardSearch key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
