import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import hotels from "../data/hotels";

import HotelGallery from "../components/hotelDetails/HotelGallery";
import HotelAbout from "../components/hotelDetails/HotelAbout";
import HotelAmenities from "../components/hotelDetails/HotelAmenities";
import HotelAreaInfo from "../components/hotelDetails/HotelAreaInfo";
import HotelHouseRules from "../components/hotelDetails/HotelHouseRules";
import HotelRoomSelector from "../components/hotelDetails/HotelRoomSelector";
import HotelRatings from "../components/hotelDetails/HotelRatings";
import HotelReviews from "../components/hotelDetails/HotelReviews";
import BookingSidebar from "../components/hotelDetails/BookingSidebar";
import SimilarHotels from "../components/hotelDetails/SimilarHotels";
import HotelLocation from "../components/hotelDetails/HotelLocation";
import { RiShareForwardFill } from "react-icons/ri";
import FloatingSupport from "../components/FloatingSupport";

export default function HotelDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { city_area, name } = useParams();

  /* 🔑 Normalizers — MUST match URL format */
  const normalize = (str = "") =>
    str
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");

  const hotel =
    location.state?.hotel ||
    hotels.find((h) => {
      const cityAreaFromData = normalize(`${h.city}${h.area}`);
      const cityAreaFromURL = normalize(city_area.replace("-", ""));
      const hotelNameFromData = normalize(h.name);
      const hotelNameFromURL = normalize(name);

      return (
        cityAreaFromData === cityAreaFromURL &&
        hotelNameFromData === hotelNameFromURL
      );
    }) ||
    null;

  const [checkIn, setCheckIn] = useState(location.state?.fromDate || "");
  const [checkOut, setCheckOut] = useState(location.state?.toDate || "");
  const [selectedRoom, setSelectedRoom] = useState(null);

  // ✅ Always pick cheapest room safely
  useEffect(() => {
    if (hotel?.roomTypes?.length) {
      const cheapest = [...hotel.roomTypes].sort(
        (a, b) => a.price - b.price,
      )[0];
      setSelectedRoom(cheapest);
    }
  }, [hotel]);

  // ✅ SAFE total calculation (NO crashes)
  const calculateTotal = useMemo(() => {
    if (!hotel) return 0;

    const room =
      selectedRoom || hotel.roomTypes?.sort((a, b) => a.price - b.price)[0];

    if (!room) return 0;

    if (!checkIn || !checkOut) {
      return room.price + (room.taxes || 0);
    }

    const nights =
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

    const validNights = nights > 0 ? nights : 1;

    return (room.price + (room.taxes || 0)) * validNights;
  }, [checkIn, checkOut, selectedRoom, hotel]);

  const [guests, setGuests] = useState({
    adults: location.state?.adults || 2,
    children: location.state?.children || 0,
    rooms: location.state?.rooms || 1,
  });

  // ❌ Hotel not found (wrong URL)
  if (!hotel) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-lg">
        Hotel not found
      </div>
    );
  }

  const similarHotels = hotels.filter(
    (h) => h.city === hotel.city && h.name !== hotel.name,
  );
  const handleShare = async () => {
    const url = window.location.href;
    const title = hotel?.name || "Hotel Details";
    const text = `Check out this hotel: ${title}`;

    // ✅ If browser supports native share (mostly mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        console.error("Share cancelled", err);
      }
    } else {
      // ✅ Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Failed to copy link");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full xl:w-3/4 2xl:w-2/3 px-4 xl:px-0 mt-20">
        <div className="flex flex-row items-center justify-between my-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#0A1C4F] cursor-pointer hover:text-orange-500 duration-300  "
          >
            <IoArrowBack size={20} />
            Back
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-[#0A1C4F] cursor-pointer hover:text-orange-500 duration-300"
          >
            <RiShareForwardFill className="text-lg" />
            <span className="text-md">Share</span>
          </button>
        </div>

        <HotelGallery imagesByCategory={hotel.imagesByCategory || {}} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <HotelAbout hotel={hotel} />
            <HotelAmenities amenities={hotel.amenities} />
            <HotelAreaInfo areaInfo={hotel.areaInfo} />
            <HotelHouseRules houseRules={hotel.houseRules} />
            <HotelRoomSelector
              roomTypes={hotel.roomTypes}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
              mealOptions={hotel.mealOptions}
            />
            <HotelLocation embedUrl={hotel.location?.locationEmbedUrl} />
            <HotelRatings reviews={hotel.reviews || []} />
            <HotelReviews reviews={hotel.reviews || []} />
          </div>

          <BookingSidebar
            hotel={hotel}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
            calculateTotal={calculateTotal}
            navigate={navigate}
          />
        </div>

        <SimilarHotels
          displayedHotels={similarHotels.slice(0, 6)}
          city={hotel.city}
          navigate={navigate}
        />
      </div>
    </div>
  );
}
