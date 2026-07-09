import { useState } from "react";
import { FaPhoneAlt, FaUser, FaEnvelope, FaKey } from "react-icons/fa";
import Popup from "../components/Popup";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
// const [errorPopup, setErrorPopup] = useState("");
  // SEND OTP
  // const handlePhoneSubmit = (e) => {
  //   e.preventDefault();
  //   if (phone.length < 10) return setErrorPopup("Enter valid phone number");

  //   // Send OTP (future backend)
  //   setErrorPopup("OTP sent to " + phone);
  //   setStep(2);
  // };
const [alert, setAlert] = useState({
  open: false,
  type: "error", // error | success | info
  message: "",
});

const showAlert = (type, message) => {
  setAlert({ open: true, type, message });
};

const handlePhoneSubmit = (e) => {
  e.preventDefault();

  if (phone.length < 10) {
    return showAlert("error", "Please enter a valid 10-digit phone number");
  }

  // future backend call
  showAlert("success", `OTP sent successfully to ${phone}`);
  setStep(2);
};

  // VERIFY OTP
  // const handleVerifySubmit = (e) => {
  //   e.preventDefault();
  //   if (!name.trim() || !email.trim() || !otp.trim())
  //     return setErrorPopup("Please fill all fields");

  //   setErrorPopup("Login successful!");
  // };

  const handleVerifySubmit = (e) => {
  e.preventDefault();

  if (!name.trim() || !email.trim() || !otp.trim()) {
    return showAlert("error", "All fields are required to continue");
  }

  showAlert("success", "Login successful! Welcome 🎉");
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-gray-50 to-gray-200 px-6">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10 animate-fadeIn">

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
          {step === 1 ? "Welcome Back 👋" : "Verify Your Account"}
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {step === 1
            ? "Enter your mobile number to continue"
            : "Enter your details to complete verification"}
        </p>

        {/* STEP 1: PHONE NUMBER */}
        {step === 1 && (
          <form onSubmit={handlePhoneSubmit} className="space-y-5">

            {/* Phone Input */}
            <div className="relative flex flex-row items-center">
              <FaPhoneAlt className="absolute ml-3 text-[#003566] text-lg" />
              <input 
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-12 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#003566]  hover:bg-blue-700 text-white font-semibold tracking-wide transition-all shadow-md cursor-pointer"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* STEP 2: USER DETAILS + OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifySubmit} className="space-y-5">

            {/* Name */}
            <div className="relative flex flex-row items-center">
              <FaUser className="absolute ml-3 text-[#003566] text-lg" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative flex flex-row items-center">
              <FaEnvelope className="absolute ml-3 text-[#003566] text-lg" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* OTP */}
            <div className="relative flex flex-row items-center">
              <FaKey className="absolute ml-3 text-[#003566] text-lg" />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-12 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#003566]  hover:bg-blue-700 text-white font-semibold tracking-wide transition-all shadow-md cursor-pointer"
            >
              Verify & Login
            </button>

            {/* Back to Phone */}
            <p className="text-center text-[#003566] cursor-pointer hover:underline mt-3"
              onClick={() => setStep(1)}
            >
              Change Phone Number
            </p>
          </form>
        )}
      </div>
{/* <Popup isOpen={!!errorPopup} onClose={() => setErrorPopup("")}>
        <div className="text-center px-2">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-3xl">🚫</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-1">Missing Information</h2>

          <p className="text-gray-600 text-sm mb-5">{errorPopup}</p>

          <button onClick={() => setErrorPopup("")} className="bg-[#003566] text-white px-6 py-2.5 rounded-xl w-full font-medium hover:bg-blue-900 duration-300 cursor-pointer">
            OK
          </button>
        </div>
      </Popup> */}
      <Popup isOpen={alert.open} onClose={() => setAlert({ ...alert, open: false })}>
  <div className="text-center px-2">
    
    {/* ICON */}
    <div
      className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4
      ${
        alert.type === "error"
          ? "bg-red-100"
          : alert.type === "success"
          ? "bg-green-100"
          : "bg-blue-100"
      }`}
    >
      <span className="text-3xl">
        {alert.type === "error" && "🚫"}
        {alert.type === "success" && "✅"}
        {alert.type === "info" && "ℹ️"}
      </span>
    </div>

    {/* TITLE */}
    <h2 className="text-xl font-semibold text-gray-800 mb-1">
      {alert.type === "error" && "Action Required"}
      {alert.type === "success" && "Success"}
      {alert.type === "info" && "Information"}
    </h2>

    {/* MESSAGE */}
    <p className="text-gray-600 text-sm mb-5">{alert.message}</p>

    {/* BUTTON */}
    <button
      onClick={() => setAlert({ ...alert, open: false })}
      className={`w-full px-6 py-2.5 rounded-xl font-medium text-white transition cursor-pointer
        ${
          alert.type === "error"
            ? "bg-red-600 hover:bg-red-700"
            : alert.type === "success"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-[#003566] hover:bg-blue-900"
        }`}
    >
      OK
    </button>
  </div>
</Popup>

       
    </div>
  );
};

export default SignUp;
