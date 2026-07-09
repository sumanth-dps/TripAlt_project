import React, { useState } from "react";
import { FaCalendarAlt, FaBed, FaArrowRight, FaStar } from "react-icons/fa";

const MyBookings = () => {
  const [bookings] = useState([
    {
      id: "BKG12345",
      hotelName: "Hotel Royal Residency",
      city: "Hyderabad",
      room: "Deluxe King Room",
      image:
        "https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1200",
      checkIn: "2025-02-12",
      checkOut: "2025-02-15",
      total: 5200,
      status: "Confirmed",
      reviewed: false,
    },
    {
      id: "BKG67890",
      hotelName: "Sunset Comfort Inn",
      city: "Bangalore",
      room: "Executive Suite",
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200",
      checkIn: "2025-01-08",
      checkOut: "2025-01-10",
      total: 7600,
      status: "Cancelled",
      reviewed: false,
    },
  ]);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState([]);

  const openReviewModal = (booking) => {
    setCurrentBooking(booking);
    setShowReviewModal(true);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...previews]);
  };

  const submitReview = () => {
    alert(
      `Review Submitted:\nRating: ${rating}\nText: ${reviewText}\nImages: ${images.length}`
    );
    setShowReviewModal(false);
  };

  return (
    <div className="flex justify-center mt-24 px-4 py-10 bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="w-full xl:w-3/4 2xl:w-2/3">
        <h1 className="text-3xl font-bold text-[#003566] mb-8 text-center">
          My Bookings
        </h1>

        {bookings.length === 0 && (
          <p className="text-center text-gray-600">You have no bookings yet.</p>
        )}

        <div className="space-y-8">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white shadow-lg border border-gray-200 rounded-2xl p-5 sm:flex gap-6 hover:shadow-xl transition"
            >
              <img
                src={b.image}
                alt={b.hotelName}
                className="w-full sm:w-56 h-40 object-cover rounded-lg"
              />

              <div className="flex-1 mt-4 sm:mt-0">
                <h2 className="text-xl font-semibold text-gray-900">
                  {b.hotelName}
                </h2>
                <p className="text-gray-600 text-sm">{b.city}</p>

                <p className="flex items-center gap-2 text-gray-700 mt-2 text-sm">
                  <FaBed className="text-blue-600" />
                  {b.room}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Check-In
                    </p>
                    <p className="flex items-center gap-2 text-gray-800 text-sm">
                      <FaCalendarAlt />
                      {b.checkIn}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Check-Out
                    </p>
                    <p className="flex items-center gap-2 text-gray-800 text-sm">
                      <FaCalendarAlt />
                      {b.checkOut}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-semibold text-[#003566]">
                    ₹{b.total.toLocaleString()}
                  </p>

                  <span
                    className={`px-4 py-1.5 text-sm rounded-full font-medium ${
                      b.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : b.status === "Pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => alert("Go to booking details")}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                  >
                    View Details <FaArrowRight />
                  </button>

                  {b.status === "Confirmed" && (
                    <button
                      onClick={() => openReviewModal(b)}
                      className="text-sm font-semibold text-green-700 hover:text-green-900"
                    >
                      Write Review ⭐
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ⭐ REVIEW MODAL ⭐ */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-800">
              Review {currentBooking?.hotelName}
            </h2>

            {/* Star Rating */}
            <div className="flex gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl cursor-pointer ${
                    rating >= star ? "text-orange-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <textarea
              placeholder="Write your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="4"
            />

            {/* Upload Photos */}
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">
                Upload Photos
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="mt-2"
              />

              {/* Preview */}
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="upload preview"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={submitReview}
                className="px-5 py-2 bg-[#003566] text-white rounded-lg"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
