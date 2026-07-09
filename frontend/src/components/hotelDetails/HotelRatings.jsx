import { FaStar } from "react-icons/fa";

export default function HotelRatings({ reviews = [] }) {
  const total = reviews.length;
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };
  const avgRating = total
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
    : "0.0";
  const ratingLabel =
    avgRating >= 4.5
      ? "EXCELLENT"
      : avgRating >= 4
      ? "VERY GOOD"
      : avgRating >= 3
      ? "GOOD"
      : "AVERAGE";
  return (
    <div className="mt-8 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm bg-white">
      <div className="flex flex-col items-center justify-center w-full sm:w-1/3 text-center">
        <div className="bg-green-600 text-white font-bold text-2xl px-4 py-2 rounded-lg flex items-center">
          {avgRating} <FaStar className="ml-1 text-white" />
        </div>
        <p className="text-gray-800 font-semibold mt-2">{ratingLabel}</p>
        <p className="text-gray-500 text-sm mt-1">{total} ratings</p>
      </div>
      <div className="w-full sm:w-2/3 space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = ratingCounts[star];
          const percent = total ? (count / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center justify-between text-gray-700">
              <div className="flex items-center w-full mr-3">
                <span className="text-sm w-6">{star}★</span>
                <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-orange-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-10 text-right">{count}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
