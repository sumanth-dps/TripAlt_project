import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaRegCreditCard, FaRegBuilding } from "react-icons/fa";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const paymentSectionRef = useRef(null);

  const [guestDetails, setGuestDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialRequest: "",
  });

  const [address, setAddress] = useState({
    street: "",
    city: "",
    pincode: "",
  });

  const [gstEnabled, setGstEnabled] = useState(false);
  const [gstInfo, setGstInfo] = useState({
    gstNumber: "",
    companyName: "",
  });

  const [agree, setAgree] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("payAtProperty");

  const GST_FEE = 70;

  if (!bookingData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <p>No booking data found.</p>
      </div>
    );
  }

  const {
    hotel,
    selectedRoom,
    checkIn,
    checkOut,
    guests,
    totalBeforeBankDiscount,
    promoApplied,
    promoDiscount = 0,
    selectedBankCoupon,
    bankDiscount = 0,
  } = bookingData;

  // ⬇️ PRICE CALCULATION (Animated)
  const [finalPrice, setFinalPrice] = useState(totalBeforeBankDiscount);
// Calculate total nights of stay
const getNights = () => {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diff = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
};

const totalNights = getNights();
const totalRooms = guests.rooms;

  useEffect(() => {
    let updatedPrice =
      totalBeforeBankDiscount - promoDiscount - bankDiscount;

    if (gstEnabled) updatedPrice += GST_FEE;

    // Smooth animation
    setFinalPrice(updatedPrice);
  }, [gstEnabled, promoDiscount, bankDiscount, totalBeforeBankDiscount]);

  // Auto-scroll when user selects a payment method
  

  // HANDLE CONFIRM
  const handleConfirm = () => {
    if (!agree) return;

    if (paymentMethod === "payOnline") {
      navigate("/payment", {
        state: {
          hotel,
          selectedRoom,
          finalPrice,
          checkIn,
          checkOut,
          guests,
          gstEnabled,
          gstInfo,
        },
      });
    } else {
      navigate("/booking-confirmation", {
        state: {
          hotel,
          selectedRoom,
          finalPrice,
          checkIn,
          checkOut,
          guests,
        },
      });
    }
  };

  return (
    <div className="min-h-screen py-12 flex justify-center">
      <div className="w-full xl:w-3/4 2xl:w-2/3 bg-white shadow-lg rounded-2xl p-6 sm:p-10">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#003566] hover:text-blue-800 mb-5"
        >
          <IoArrowBack size={20} />
          <span>Back to Hotel</span>
        </button>

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-[#003566]">Review Your Booking</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#003566]">{hotel.name}</h1>
            <p className="text-gray-600 text-sm mt-1">
              {hotel.city}, {hotel.area}
            </p>
            <p className="text-gray-500 text-sm">
              Room: <span className="font-medium">{selectedRoom.name}</span>
            </p>
          </div>

          <img
            src={selectedRoom.image}
            alt={selectedRoom.name}
            className="w-full sm:w-48 h-36 rounded-lg object-cover mt-4 sm:mt-0"
          />
        </div>

        {/* Booking Details */}
        <div className="grid sm:grid-cols-3 gap-6 border-t border-b border-gray-200 py-6 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-[#003566] mb-1">Check-In</p>
            <p>{checkIn}</p>
          </div>
          <div>
            <p className="font-semibold text-[#003566] mb-1">Check-Out</p>
            <p>{checkOut}</p>
          </div>
          <div>
            <p className="font-semibold text-[#003566] mb-1">Guests & Rooms</p>
            <p>
              {guests.adults} Adults, {guests.children} Children,{" "}
              {guests.rooms} Room{guests.rooms > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Guest Details */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[#003566] mb-3">Guest Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {["Full Name", "Email", "Phone Number"].map((ph, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={ph}
                className="border border-gray-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setGuestDetails({ ...guestDetails, [Object.keys(guestDetails)[idx]]: e.target.value })
                }
              />
            ))}

            <textarea
              placeholder="Special Requests (Optional)"
              className="border border-gray-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) =>
                setGuestDetails({ ...guestDetails, specialRequest: e.target.value })
              }
            />
          </div>
        </div>

        {/* Address */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[#003566] mb-3">Address</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Street Address"
              className="border p-2 text-sm rounded-md"
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              className="border p-2 text-sm rounded-md"
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Pincode"
              className="border p-2 text-sm rounded-md"
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            />
          </div>
        </div>

        {/* GST Section */}
        <div className="mt-8">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={gstEnabled}
              onChange={() => setGstEnabled(!gstEnabled)}
            />
            Need GST Invoice?
          </label>

          {gstEnabled && (
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                placeholder="GST Number"
                className="border p-2 text-sm rounded-md"
                onChange={(e) => setGstInfo({ ...gstInfo, gstNumber: e.target.value })}
              />
              <input
                type="text"
                placeholder="Company Name"
                className="border p-2 text-sm rounded-md"
                onChange={(e) =>
                  setGstInfo({ ...gstInfo, companyName: e.target.value })
                }
              />
            </div>
          )}
        </div>

      {/* PRICE BREAKDOWN (Total Stay Price + Savings) */}
<div className="mt-8">
  <h2 className="text-lg font-semibold text-gray-900 mb-3">Price Breakdown</h2>

  <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 text-sm shadow-sm">

    {/* ORIGINAL STAY PRICE */}
    <div className="flex justify-between text-gray-500 line-through">
      <span>Original Total Price</span>
      <span>
        ₹{(
          (selectedRoom.originalPrice + selectedRoom.taxes) *
          totalNights *
          totalRooms
        ).toLocaleString()}
      </span>
    </div>

    {/* DISCOUNTED ROOM PRICE */}
    <div className="flex justify-between">
      <span>
        Room Price ({totalNights} night{totalNights > 1 ? "s" : ""}, {totalRooms} room
        {totalRooms > 1 ? "s" : ""})
      </span>
      <span>
        ₹{(selectedRoom.price * totalNights * totalRooms).toLocaleString()}
      </span>
    </div>

    {/* TAXES */}
    <div className="flex justify-between">
      <span>Taxes & Fees</span>
      <span>
        ₹{(selectedRoom.taxes * totalNights * totalRooms).toLocaleString()}
      </span>
    </div>

    {/* PROMO DISCOUNTS */}
    {promoDiscount > 0 && (
      <div className="flex justify-between text-green-600 font-medium">
        <span>Promo Code ({promoApplied})</span>
        <span>-₹{promoDiscount}</span>
      </div>
    )}

    {/* BANK DISCOUNTS */}
    {bankDiscount > 0 && (
      <div className="flex justify-between text-green-600 font-medium">
        <span>Bank Offer ({selectedBankCoupon?.bank})</span>
        <span>-₹{bankDiscount}</span>
      </div>
    )}

    {/* GST */}
    {gstEnabled && (
      <div className="flex justify-between">
        <span>GST Fee</span>
        <span>₹{GST_FEE}</span>
      </div>
    )}

    <hr />

    {/* FINAL PAYABLE */}
    <div className="flex justify-between font-semibold text-gray-900 text-lg">
      <span>Total Payable</span>
      <span className="text-blue-600">
        ₹{finalPrice.toLocaleString()}
      </span>
    </div>

    {/* SAVINGS CALCULATION */}
    <div className="text-green-700 font-semibold text-right text-sm">
      You Save ₹
      {(
        (selectedRoom.originalPrice + selectedRoom.taxes) * totalNights * totalRooms -
        (selectedRoom.price * totalNights * totalRooms +
          selectedRoom.taxes * totalNights * totalRooms -
          promoDiscount -
          bankDiscount)
      ).toLocaleString()}
    </div>
  </div>
</div>


        {/* Payment Method */}
        <div ref={paymentSectionRef} className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Payment Method</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setPaymentMethod("payAtProperty")}
              className={`flex items-center gap-2 border rounded-md px-4 py-2 text-sm font-medium transition ${
                paymentMethod === "payAtProperty"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              <FaRegBuilding /> Pay at Property
            </button>

            <button
              onClick={() => setPaymentMethod("payOnline")}
              className={`flex items-center gap-2 border rounded-md px-4 py-2 text-sm font-medium transition ${
                paymentMethod === "payOnline"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              <FaRegCreditCard /> Pay Online
            </button>
          </div>
        </div>

        {/* USER AGREEMENT */}
        <div className="mt-6">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            I agree to the booking terms, cancellation policy & privacy policy.
          </label>
        </div>

        {/* CONFIRM BUTTON */}
        <div className="mt-10 flex justify-end">
          <button
            disabled={!agree}
            onClick={handleConfirm}
            className={`px-6 py-3 rounded-lg shadow-md font-semibold transition ${
              agree
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
