// src/Dashboard/admin/pages/ViewHotel.jsx
import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import hotels from "../../../data/hotels";
import HotelDetails from "../components/HotelDetails";
import HotelBookings from "../components/HotelBookings";
import HotelReviews from "../components/HotelReviews";
import HotelUserModal from "../components/HotelUserModal";
import EarningsPage from "../components/EarningsPage";
import HotelRooms from "../components/HotelRooms";

export default function ViewHotel() {
  const { id } = useParams();
  const hotel =
    hotels.find((h) => String(h.id) === String(id)) ||
    hotels.find((h) => String(h._id) === String(id));

  if (!hotel) {
    return (
      <div className="p-6 text-center text-red-600 text-xl">
        ❌ Hotel not found
        <div className="mt-4">
          <Link
            to="/admin/hotels"
            className="text-white bg-[#0A1C4F] px-4 py-2 rounded"
          >
            Back to Hotel List
          </Link>
        </div>
      </div>
    );
  }

  /* ========= BOOKING STATUS UPDATE ========= */
  const handleStatusUpdate = (bookingId, newStatus) => {
    hotel.bookings = hotel.bookings.map((b) =>
      b.id === bookingId ? { ...b, status: newStatus } : b
    );
  };

  const [activeTab, setActiveTab] = useState("bookings");

  /* ========= IMAGE CATEGORY BUILDER ========= */
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
    const fromByCategory = hotel.imagesByCategory?.[cat] || [];
    const fromImages = hotel.images?.[cat] || [];
    imagesByCategory[cat] = [
      ...fromByCategory.map((it, i) => ({
        id: it.id || `${cat}-srv-${i}`,
        url: it.url,
        previewUrl: it.url,
      })),
      ...fromImages.map((url, i) => ({
        id: `${cat}-url-${i}`,
        url,
        previewUrl: url,
      })),
    ];
  });

  /* ========= BOOKINGS FILTERS ========= */
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingSort, setBookingSort] = useState("");
  const [bookingPage, setBookingPage] = useState(1);
  const BOOKINGS_PER_PAGE = 8;

  const filteredBookings = useMemo(() => {
    let list = hotel.bookings || [];

    if (bookingSearch.trim()) {
      const q = bookingSearch.toLowerCase();
      list = list.filter(
        (b) =>
          String(b.id).toLowerCase().includes(q) ||
          String(b.user).toLowerCase().includes(q) ||
          String(b.roomType).toLowerCase().includes(q)
      );
    }

    if (bookingStatus) list = list.filter((b) => b.status === bookingStatus);
    if (bookingSort === "recent")
      list.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
    if (bookingSort === "priceHigh") list.sort((a, b) => b.price - a.price);
    if (bookingSort === "priceLow") list.sort((a, b) => a.price - b.price);

    return list;
  }, [hotel.bookings, bookingSearch, bookingStatus, bookingSort]);

  const totalBookingPages = Math.ceil(
    filteredBookings.length / BOOKINGS_PER_PAGE
  );
  const paginatedBookings = filteredBookings.slice(
    (bookingPage - 1) * BOOKINGS_PER_PAGE,
    bookingPage * BOOKINGS_PER_PAGE
  );

  /* ========= EXPORT EXCEL ========= */
 
  const handleHideReview = (id) => {
    hotel.reviews = hotel.reviews.map((r) =>
      r.id === id ? { ...r, hidden: !r.hidden } : r
    );
  };

  const handleDeleteReview = (id) => {
    hotel.reviews = hotel.reviews.filter((r) => r.id !== id);
  };

  const handleEditReview = (review) => {
    alert("Open edit modal here – will add UI next");
  };

  /* ========= REVIEWS ========= */
  const [reviewSearch, setReviewSearch] = useState("");
  const [reviewStars, setReviewStars] = useState("");
  const [reviewSort, setReviewSort] = useState("recent");
  const [reviewPage, setReviewPage] = useState(1);
  const REVIEWS_PER_PAGE = 4;

  const filteredReviews = useMemo(() => {
    let list = hotel.reviews || [];

    if (reviewSearch.trim()) {
      const q = reviewSearch.toLowerCase();
      list = list.filter(
        (r) =>
          String(r.user).toLowerCase().includes(q) ||
          String(r.comment).toLowerCase().includes(q)
      );
    }

    if (reviewStars)
      list = list.filter((r) => r.rating === Number(reviewStars));
    if (reviewSort === "recent")
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (reviewSort === "oldest")
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (reviewSort === "high") list.sort((a, b) => b.rating - a.rating);
    if (reviewSort === "low") list.sort((a, b) => a.rating - b.rating);

    return list;
  }, [hotel.reviews, reviewSearch, reviewStars, reviewSort]);

  const totalReviewPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = filteredReviews.slice(
    (reviewPage - 1) * REVIEWS_PER_PAGE,
    reviewPage * REVIEWS_PER_PAGE
  );

  const avgRating = hotel.reviews?.length
    ? (
        hotel.reviews.reduce((s, r) => s + (r.rating || 0), 0) /
        hotel.reviews.length
      ).toFixed(1)
    : "0.0";

  const starCounts = [5, 4, 3, 2, 1].map(
    (s) => (hotel.reviews || []).filter((r) => r.rating === s).length
  );

  /* ========= USER MODAL ========= */
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const openUserModal = (booking) => {
    const foundUser = (hotel.users || []).find(
      (u) => String(u.name) === booking.user || String(u.email) === booking.user
    ) || { name: booking.user, bookings: [booking] };

    setSelectedUser(foundUser);
    setShowUserModal(true);
  };

  const closeUserModal = () => setShowUserModal(false);

 
  /* ========= UI ========= */
  return (
    <div className="space-y-6 md:p-3 lg:p-6">
      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-lg">
        {["details", "bookings", "reviews", "earnings", "calendar"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-3 py-2 rounded-lg font-semibold transition border cursor-pointer ${
              activeTab === t
                ? "bg-[#0A1C4F] text-white border-[#0A1C4F]"
                : "bg-orange-50 text-[#F5CC00] border-[#F5CC00] hover:bg-[#003566] hover:border-[#003566] hover:text-white"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* ========= DETAILS ========= */}
      {activeTab === "details" && (
        <HotelDetails hotel={hotel} imagesByCategory={imagesByCategory} />
      )}

      {/* ========= BOOKINGS ========= */}
      {activeTab === "bookings" && (
        <div className="space-y-3">
          <HotelBookings
            paginatedBookings={paginatedBookings}
            filteredBookings={filteredBookings} // ⭐ REQUIRED
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
        </div>
      )}

      {/* ========= REVIEWS ========= */}
      {activeTab === "reviews" && (
        <HotelReviews
          reviewSearch={reviewSearch}
          setReviewSearch={setReviewSearch}
          reviewStars={reviewStars}
          setReviewStars={setReviewStars}
          reviewSort={reviewSort}
          setReviewSort={setReviewSort}
          reviewPage={reviewPage}
          setReviewPage={setReviewPage}
          totalReviewPages={totalReviewPages}
          averageRating={avgRating}
          totalReviews={hotel.reviews?.length || 0}
          starCounts={starCounts}
          paginatedReviews={paginatedReviews.filter((r) => !r.hidden)} // hide by default
          onEditReview={handleEditReview}
          onHideReview={handleHideReview}
          onDeleteReview={handleDeleteReview}
        />
      )}

      {/* ========= EARNINGS ========= */}
      {activeTab === "earnings" && <EarningsPage />}

      {/* ========= CALENDAR ========= */}
      {activeTab === "calendar" && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-6">
          <HotelRooms />
        </div>
      )}

      {/* ========= USER MODAL ========= */}
      {showUserModal && (
        <HotelUserModal user={selectedUser} onClose={closeUserModal} />
      )}
    </div>
  );
}
