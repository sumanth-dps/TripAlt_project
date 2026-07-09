import { FaStar } from "react-icons/fa";

export default function HotelReviews({ reviews }) {
  if (!reviews?.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-3">Customer Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50 text-center"
          >
            <h3 className="font-semibold mb-2">{r.name}</h3>
            <div className="flex text-orange-400 mb-2 justify-center">
              {Array(r.rating)
                .fill(0)
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
            </div>
            <p className="text-gray-700 text-sm">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
