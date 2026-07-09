import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import hotels from "../../../data/hotels";

import HotelHeader from "../../admin/components/HotelHeader";
import HotelDetails from "../../admin/components/HotelDetails";
import HotelBookings from "../../admin/components/HotelBookings";
import HotelReviews from "../../admin/components/HotelReviews";
import HotelUserModal from "../../admin/components/HotelUserModal";
import HotelCalendar from "../../hotel/components/HotelCalendar";
import EarningsPage from "../../admin/components/EarningsPage"; // same earnings component

export default function OwnerViewHotel() {
  const { id } = useParams();

  // find hotel (like admin view)
  const hotel =
    hotels.find((h) => String(h.id) === String(id)) ||
    hotels.find((h) => String(h._id) === String(id));

  if (!hotel) {
    return (
      <div className="p-6 text-center text-red-600 text-xl">
        ❌ Hotel not found
        <div className="mt-4">
          <Link
            to="/owner/my-hotels"
            className="text-white bg-[#0A1C4F] px-4 py-2 rounded"
          >
            Back to My Hotels
          </Link>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState("bookings");

  /* --------------------- IMAGE CATEGORIES --------------------- */
  const categories = [
    "rooms",
    "lobby",
    "reception",
    "facade",
    "entrance",
    "washroom",
    "other",
  ];

  const imagesByCategory = {};
  categories.forEach((cat) => {
    const byCategory = hotel.imagesByCategory?.[cat] || [];
    const fallback = hotel.images?.[cat] || [];

    imagesByCategory[cat] = [
      ...byCategory.map((it, i) => ({
        id: it.id || `${cat}-srv-${i}`,
        url: it.url,
        previewUrl: it.url,
      })),
      ...fallback.map((url, i) => ({
        id: `${cat}-url-${i}`,
        url,
        previewUrl: url,
      })),
    ];
  });

  /* --------------------- BOOKINGS --------------------- */
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingSort, setBookingSort] = useState("");
  const [bookingPage, setBookingPage] = useState(1);
  const bookingsPerPage = 5;

  const filteredBookings = useMemo(() => {
    const list = (hotel.bookings || []).filter((b) => {
      const q = bookingSearch.trim().toLowerCase();
      if (!q) return true;
      return (
        b.id?.toLowerCase().includes(q) ||
        b.user?.toLowerCase().includes(q) ||
        b.roomType?.toLowerCase().includes(q)
      );
    });

    const statusFiltered = bookingStatus
      ? list.filter((b) => b.status === bookingStatus)
      : list;

    return statusFiltered.sort((a, b) => {
      if (bookingSort === "recent") return new Date(b.checkIn) - new Date(a.checkIn);
      if (bookingSort === "priceHigh") return b.price - a.price;
      if (bookingSort === "priceLow") return a.price - b.price;
      return 0;
    });
  }, [hotel.bookings, bookingSearch, bookingStatus, bookingSort]);

  const totalBookingPages = Math.max(
    1,
    Math.ceil(filteredBookings.length / bookingsPerPage)
  );
const handleStatusUpdate = (id, newStatus) => {
  hotel.bookings = hotel.bookings.map((b) =>
    b.id === id ? { ...b, status: newStatus } : b
  );
};

  const paginatedBookings = filteredBookings.slice(
    (bookingPage - 1) * bookingsPerPage,
    bookingPage * bookingsPerPage
  );

  /* --------------------- REVIEWS --------------------- */
  const [reviewSearch, setReviewSearch] = useState("");
  const [reviewStars, setReviewStars] = useState("");
  const [reviewSort, setReviewSort] = useState("recent");
  const [reviewPage, setReviewPage] = useState(1);
  const reviewsPerPage = 4;

  const filteredReviews = useMemo(() => {
    const list = (hotel.reviews || []).filter((r) => {
      const q = reviewSearch.trim().toLowerCase();
      return (
        r.user?.toLowerCase().includes(q) ||
        r.comment?.toLowerCase().includes(q)
      );
    });

    const starFiltered = reviewStars
      ? list.filter((r) => r.rating === Number(reviewStars))
      : list;

    return starFiltered.sort((a, b) => {
      if (reviewSort === "recent") return new Date(b.date) - new Date(a.date);
      if (reviewSort === "oldest") return new Date(a.date) - new Date(b.date);
      if (reviewSort === "high") return b.rating - a.rating;
      if (reviewSort === "low") return a.rating - b.rating;
      return 0;
    });
  }, [hotel.reviews, reviewSearch, reviewStars, reviewSort]);

  const totalReviewPages = Math.max(
    1,
    Math.ceil(filteredReviews.length / reviewsPerPage)
  );

  const paginatedReviews = filteredReviews.slice(
    (reviewPage - 1) * reviewsPerPage,
    reviewPage * reviewsPerPage
  );

  // Rating summary (as admin page uses)
  const averageRating = hotel.reviews?.length
    ? (
        hotel.reviews.reduce((s, r) => s + (r.rating || 0), 0) /
        hotel.reviews.length
      ).toFixed(1)
    : "0.0";

  const starCounts = [5, 4, 3, 2, 1].map(
    (s) => hotel.reviews.filter((r) => r.rating === s).length
  );

  /* --------------------- USER MODAL --------------------- */
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const openUserModal = (booking) => {
    if (!booking) return;

    const foundUser =
      hotel.users?.find(
        (u) => u.name === booking.user || u.email === booking.user
      ) || { name: booking.user, bookings: [booking] };

    setSelectedUser(foundUser);
    setShowUserModal(true);
  };

  /* --------------------- CALENDAR --------------------- */
  const [calendarRoom, setCalendarRoom] = useState(
    hotel.roomTypes?.[0]?.name || ""
  );
  const [blockedDates, setBlockedDates] = useState({});

  /* --------------------- ADMIN UI STYLE TAB BUTTON --------------------- */
  const TabButton = ({ id, children }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`p-2 px-3 rounded-md font-medium ${
        activeTab === id
          ? "bg-[#0A1C4F] text-white border-[#0A1C4F]"
          : "bg-orange-50 hover:bg-[#003566] hover:text-white border border-[#F5CC00] text-[#F5CC00] duration-300"
      }`}
    >
      {children}
    </button>
  );

  /* --------------------- RENDER --------------------- */
  return (
    <div className="space-y-6 p-6">

      {/* SAME ADMIN TABS UI */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 text-lg text-[#0A1C4F]">
        <TabButton id="details">Hotel Details</TabButton>
        <TabButton id="bookings">Bookings</TabButton>
        <TabButton id="reviews">Reviews</TabButton>
        <TabButton id="earnings">Earnings</TabButton>
        <TabButton id="calendar">Calendar</TabButton>
      </div>

      {/* SAME HEADER */}
      <HotelHeader hotel={hotel} />

      {/* DETAILS TAB */}
      {activeTab === "details" && (
        <HotelDetails hotel={hotel} imagesByCategory={imagesByCategory} />
      )}

      {/* BOOKINGS TAB */}
      {activeTab === "bookings" && (
        <HotelBookings
          paginatedBookings={paginatedBookings}
          bookingPage={bookingPage}
          totalBookingPages={totalBookingPages}
          setBookingPage={setBookingPage}
          bookingSearch={bookingSearch}
          setBookingSearch={setBookingSearch}
          bookingStatus={bookingStatus}
          setBookingStatus={setBookingStatus}
          bookingSort={bookingSort}
          setBookingSort={setBookingSort}
          onUserClick={openUserModal}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      {/* REVIEWS TAB */}
      {activeTab === "reviews" && (
        <HotelReviews
          paginatedReviews={paginatedReviews}
          reviewSearch={reviewSearch}
          setReviewSearch={setReviewSearch}
          reviewStars={reviewStars}
          setReviewStars={setReviewStars}
          reviewSort={reviewSort}
          setReviewSort={setReviewSort}
          reviewPage={reviewPage}
          setReviewPage={setReviewPage}
          totalReviewPages={totalReviewPages}
          averageRating={averageRating}
          totalReviews={hotel.reviews.length}
          starCounts={starCounts}
        />
      )}

      {/* EARNINGS TAB */}
      {activeTab === "earnings" && <EarningsPage hotel={hotel} />}

      {/* CALENDAR TAB */}
      {activeTab === "calendar" && (
        <div className="bg-white p-6 rounded-xl shadow border space-y-6">
          <h3 className="font-semibold text-lg text-[#003566]">Block Dates</h3>

          <HotelCalendar
            roomTypes={hotel.roomTypes}
            calendarRoom={calendarRoom}
            setCalendarRoom={setCalendarRoom}
            blockedDates={blockedDates}
            setBlockedDates={setBlockedDates}
          />
        </div>
      )}

      {/* USER MODAL */}
      {showUserModal && (
        <HotelUserModal user={selectedUser} onClose={() => setShowUserModal(false)} />
      )}
    </div>
  );
}
