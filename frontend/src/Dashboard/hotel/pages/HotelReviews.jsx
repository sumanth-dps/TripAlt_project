import { useState, useMemo } from "react";
import { FaSearch, FaStar } from "react-icons/fa";

/* ------------------ DUMMY REVIEWS DATA ------------------ */
const REVIEWS = [
  {
    id: "R101",
    guest: "Rahul Sharma",
    rating: 5,
    comment: "Excellent service and clean rooms!",
    date: "2025-02-10",
  },
  {
    id: "R102",
    guest: "Priya Patel",
    rating: 4,
    comment: "Nice stay but breakfast can be improved.",
    date: "2025-02-08",
  },
  {
    id: "R103",
    guest: "Amit Verma",
    rating: 3,
    comment: "Room was okay, service was average.",
    date: "2025-02-05",
  },
  {
    id: "R104",
    guest: "Nisha Gupta",
    rating: 5,
    comment: "Loved the hospitality. Will visit again!",
    date: "2025-02-03",
  },
];

export default function HotelReviews() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredReviews = useMemo(() => {
    return REVIEWS.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch =
        r.guest.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q);

      const matchRating = ratingFilter
        ? r.rating === Number(ratingFilter)
        : true;

      return matchSearch && matchRating;
    });
  }, [search, ratingFilter]);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold text-[#003566]">
        Guest Reviews
      </h1>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* SEARCH */}
        <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm w-full md:w-72">
          <input
            placeholder="Search by guest or comment"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
          <FaSearch className="text-gray-500" />
        </div>

        {/* RATING FILTER */}
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-48"
        >
          <option value="">All Ratings</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>
      </div>

      {/* ---------------- DESKTOP TABLE ---------------- */}
      <div className="hidden md:block bg-white border rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#003566] text-white text-sm">
            <tr>
              <th className="p-3 text-left">Guest</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Comment</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredReviews.map((r) => (
              <tr
                key={r.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 font-medium text-[#003566]">
                  {r.guest}
                </td>

                <td className="p-3">
                  <Stars count={r.rating} />
                </td>

                <td className="p-3 text-sm text-gray-700">
                  {r.comment}
                </td>

                <td className="p-3 text-sm text-gray-600">
                  {r.date}
                </td>
              </tr>
            ))}

            {filteredReviews.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-gray-500"
                >
                  No reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------- MOBILE CARDS ---------------- */}
      <div className="md:hidden space-y-4">
        {filteredReviews.map((r) => (
          <div
            key={r.id}
            className="bg-white border rounded-xl shadow p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[#003566]">
                {r.guest}
              </p>
              <Stars count={r.rating} />
            </div>

            <p className="text-sm text-gray-700">
              {r.comment}
            </p>

            <p className="text-xs text-gray-500">
              {r.date}
            </p>
          </div>
        ))}
      </div>

      {/* INFO BOX */}
      <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl">
        <h3 className="font-semibold text-[#003566] mb-2">
          Staff Note
        </h3>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>Reviews cannot be edited or deleted by staff.</li>
          <li>Use feedback to improve guest experience.</li>
          <li>Critical reviews should be escalated to management.</li>
        </ul>
      </div>

    </div>
  );
}

/* ---------------- STAR RENDER ---------------- */

function Stars({ count }) {
  return (
    <div className="flex gap-1 text-orange-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={i < count ? "" : "opacity-30"}
        />
      ))}
    </div>
  );
}
