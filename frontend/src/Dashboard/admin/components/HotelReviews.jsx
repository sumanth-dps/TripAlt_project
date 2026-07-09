import { FaSearch, FaStar } from "react-icons/fa";
import { PiNotePencilDuotone } from "react-icons/pi";
import { HiEyeSlash, HiEye, HiTrash } from "react-icons/hi2";
import CustomSelect from "../../../components/CustomSelect";

export default function HotelReviews({
  paginatedReviews,
  reviewSearch,
  setReviewSearch,
  reviewStars,
  setReviewStars,
  reviewSort,
  setReviewSort,
  reviewPage,
  setReviewPage,
  totalReviewPages,
  averageRating,
  totalReviews,
  starCounts,
  onEditReview,
  onHideReview,
  onDeleteReview,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl border border-[#F5E7A2] space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-[#0A1C4F]">Reviews</h3>
          <p className="text-gray-500">{totalReviews} total reviews</p>
        </div>

        <div className="flex items-center gap-2 bg-[#FFF7C2] px-4 py-1 rounded-full border border-[#F5CC00]">
          <FaStar className="text-orange-500" />
          <span className="font-semibold text-[#0A1C4F]">{averageRating}</span>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className="w-10 text-sm">{s}★</span>
            <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#F5cC00] rounded-full h-full"
                style={{
                  width:
                    totalReviews > 0
                      ? `${(starCounts[i] / totalReviews) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">{starCounts[i]}</span>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-4 ">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          {/* Rating Filter */}
          <CustomSelect
            value={reviewStars}
            onChange={(v) => {
              setReviewStars(v);
              setReviewPage(1);
            }}
            options={[
              { label: "All Ratings", value: "" },
              { label: "⭐ 5 Stars", value: "5" },
              { label: "⭐ 4 Stars", value: "4" },
              { label: "⭐ 3 Stars", value: "3" },
              { label: "⭐ 2 Stars", value: "2" },
              { label: "⭐ 1 Star", value: "1" },
            ]}
            placeholder="All Ratings"
          />

          {/* Sort */}
          <CustomSelect
            value={reviewSort}
            onChange={(v) => {
              setReviewSort(v);
              setReviewPage(1);
            }}
            options={[
              { label: "Most Recent", value: "recent" },
              { label: "Oldest", value: "oldest" },
              { label: "Highest Rated", value: "high" },
              { label: "Lowest Rated", value: "low" },
            ]}
            placeholder="Sort"
          />
        </div>
        {/* Search */}
        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full md:w-80 shadow-md border border-gray-200">
          <input
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search review or user..."
            value={reviewSearch}
            onChange={(e) => {
              setReviewSearch(e.target.value);
              setReviewPage(1);
            }}
          />
          <FaSearch className="text-[#f5cc00]" />
        </div>
        
      </div>

      {/* REVIEWS */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 ">
        {paginatedReviews.map((r) => (
          <div
            key={r.id}
            className="p-4  bg-white border border-gray-200 rounded-xl shadow-md  transition"
          >
            <div className="flex justify-between items-start">
              <div className="">
                <div className="font-semibold text-[#0A1C4F]">{r.user}</div>
                <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
                <p className="text-xs text-gray-400 mt-1">{r.date}</p>
              </div>

              <div className="flex flex-col items-end">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <FaStar key={i} className="text-orange-400 text-sm" />
                  ))}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 mt-3">
                   {/* Hide / Unhide */}
                  <button
                    className="p-2 shadow cursor-pointer rounded-full bg-blue-50  text-blue-600 hover:bg-blue-100 hover:text-blue-700 duration-300"
                    onClick={() => onHideReview(r.id)}
                  >
                    {r.hidden ? <HiEye size={18} /> : <HiEyeSlash size={18} />}
                  </button>
                  {/* Edit */}
                  <button
                    className="p-2 shadow cursor-pointer rounded-full bg-orange-100 text-orange-500 hover:text-orange-600 hover:bg-orange-200 duration-300"
                    onClick={() => onEditReview(r)}
                  >
                    <PiNotePencilDuotone size={18} />
                  </button>

                 

                  {/* Delete */}
                  <button
                    className="p-2 shadow cursor-pointer rounded-full bg-red-50 text-red-600 hover:bg-red-100 duration-300 hover:text-red-700"
                    onClick={() => onDeleteReview(r.id)}
                  >
                    <HiTrash size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {paginatedReviews.length === 0 && (
          <div className="text-center text-gray-500 py-4">No reviews found</div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalReviewPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setReviewPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm shadow ${
              reviewPage === i + 1
                ? "bg-[#0A1C4F] text-white"
                : "bg-gray-200 text-[#003566]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
