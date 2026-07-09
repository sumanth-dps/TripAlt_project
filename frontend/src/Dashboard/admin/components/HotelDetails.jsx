import HotelGallery from "../components/HotelGallery";
import HotelHeader from "./HotelHeader";
export default function HotelDetails({ hotel, imagesByCategory }) {
  if (!hotel) return null;

  return (
    <div className="space-y-6">

      <HotelHeader hotel={hotel} />
      {/* -------- GALLERY -------- */}
      <HotelGallery imagesByCategory={imagesByCategory} />

      {/* -------- BASIC DETAILS -------- */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-xl font-semibold text-[#003566] mb-3">Hotel Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Detail label="Hotel Name" value={hotel.name} />
          <Detail label="City" value={hotel.city} />
          <Detail label="Area" value={hotel.area} />
          <Detail label="Address" value={hotel.address} />
          <Detail label="Type" value={hotel.type} />
          <Detail label="Rating" value={hotel.rating} />
          <Detail label="Rooms" value={hotel.roomTypes?.length} />
          <Detail label="Price" value={`₹${hotel.price.toLocaleString()}`} />
        </div>

        <div className="mt-3 text-gray-700">{hotel.description}</div>
      </div>

      {/* -------- OWNER DETAILS -------- */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-xl font-semibold text-[#003566] mb-3">Owner Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Detail label="Owner Name" value={hotel.owner?.name} />
          <Detail label="Phone" value={hotel.owner?.phone} />
          <Detail label="Email" value={hotel.owner?.email} />
          <Detail label="Aadhar" value={hotel.owner?.aadhar} />
          <Detail label="PAN" value={hotel.owner?.pan} />
        </div>
      </div>

      {/* -------- ROOM TYPES -------- */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-xl font-semibold text-[#003566] mb-3">Room Types</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {hotel.roomTypes?.map((rt, idx) => (
            <div
              key={idx}
              className="p-4 shadow bg-orange-50 rounded-xl border border-[#F5CC00] text-[#003566] flex justify-between"
            >
              <div>
                <div className="font-semibold">{rt.name}</div>
                <div className="text-sm text-gray-500">{rt.bedType} • {rt.size}</div>
                <div className="text-sm mt-1 text-gray-500">{rt.description}</div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {rt.amenities?.map((a, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-gray-200 rounded">
                      {a}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {rt.mealOptions?.map((a, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-gray-200 rounded">
                      {a}
                    </span>
                    
                  ))}
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-lg">₹{rt.price}</div>
                <div className="text-sm text-gray-500">Taxes ₹{rt.taxes}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -------- AMENITIES -------- */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-xl font-semibold text-[#003566] mb-3">Hotel Amenities</h3>

        <div className="flex flex-wrap gap-2">
          {hotel.amenities?.map((a, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700"
            >
              {a}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-[#003566] my-3">Meal Options</h3>

        <div className="flex flex-wrap gap-2">
          {hotel.mealOptions?.map((a, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700"
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* -------- NEARBY AREA INFO (FIXED) -------- */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-xl font-semibold text-[#003566] mb-3">Nearby Areas</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(hotel.areaInfo || {}).map(([category, list]) => (
            <div key={category}>
              <h4 className="font-medium capitalize text-[#003566]">{category}</h4>

              {list.length === 0 ? (
                <p className="text-gray-500 text-sm">No data</p>
              ) : (
                <div className="flex flex-col gap-1 mt-1">
                  {list.map((item, index) => (
                    <div key={index} className="text-gray-700 text-sm">
                      {item.name} <span className="text-gray-500">({item.distance})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* -------- MAP / LOCATION -------- */}
      {hotel.location?.locationEmbedUrl && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="text-xl font-semibold text-[#003566] mb-3">Location</h3>

          <iframe
            src={hotel.location.locationEmbedUrl}
            className="w-full h-72 rounded-xl border-2 border-[#F5CC00]"
            loading="lazy"
          />
        </div>
      )}

      {/* -------- HOUSE RULES -------- */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-xl font-semibold text-[#003566] mb-3">House Rules</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Detail label="Check-in" value={hotel.houseRules.checkIn} />
          <Detail label="Check-out" value={hotel.houseRules.checkOut} />
          <Detail label="Cancellation" value={hotel.houseRules.cancellation} />
          <Detail label="Children & Beds" value={hotel.houseRules.childrenAndBeds} />
          <Detail label="Age Restriction" value={hotel.houseRules.ageRestriction} />
          <Detail label="Pets" value={hotel.houseRules.pets} />
          <Detail
            label="Accepted Cards"
            value={hotel.houseRules.acceptedCards?.join(", ")}
          />
        </div>
      </div>

    </div>
  );
}

/* ------------------------- REUSABLE COMPONENT ------------------------- */

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-[#003566]">{value || "—"}</p>
    </div>
  );
}
