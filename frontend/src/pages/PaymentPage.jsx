import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!state)
    return (
      <div className="flex justify-center items-center h-screen">
        Invalid Payment Request
      </div>
    );

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/booking-confirmation", { state });
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-xl font-bold text-[#003566] mb-4">
          Complete Payment
        </h1>

        <p className="text-gray-600 mb-6">
          You are paying <strong>₹{state.finalPrice}</strong> for your booking.
        </p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
