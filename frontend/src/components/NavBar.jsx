import { useState, useRef, useEffect } from "react";
import { IoMdHeadset, IoIosArrowDown } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const cities = [
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Vijayawada",
    "Visakhapatnam",
  ];

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    navigate(`/${city}`);
    setShowDropdown(false);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-1000 transition-transform duration-500">
      <div className="w-full xl:w-3/4 2xl:w-2/3 mx-auto flex items-center justify-between py-4 px-4 lg:px-10 xl:px-2 bg-white shadow-md text-black bg-opacity-95 rounded-b-lg">
        {/* LEFT SECTION */}
        <div className="flex items-center md:gap-4">
          <img
            src="./logo.svg"
            alt="Logo"
            className="w-20 md:w-28 cursor-pointer mr-4"
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
          />

          {/* CITY DROPDOWN */}
          <div ref={dropdownRef} className="relative hidden md:block">
            <div
              className="flex items-center gap-1 cursor-pointer text-sm md:text-base font-medium"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{selectedCity}</span>
              <IoIosArrowDown
                className={`transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </div>

            <ul
              className={`absolute left-0 mt-2 w-40 bg-white rounded-lg shadow transform transition-all duration-200 origin-top ${
                showDropdown
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {cities.map((c) => (
                <li
                  key={c}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleCitySelect(c)}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="tel:+919876543210"
            className="hover:text-blue-700 text-[#20244c] transition font-medium flex items-center gap-1"
          >
            <IoMdHeadset className="text-xl " /> +91-98765 43210
          </a>

          <button
            onClick={() => navigate("/login")}
            className="bg-[#003566] px-5 py-2.5 rounded-lg text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>

          {/* PROFILE MENU */}
          <div ref={profileRef} className="relative">
            <FaUserCircle
              className="text-4xl text-gray-700 cursor-pointer hover:text-blue-600 transition"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            <div
              className={`absolute right-0 mt-2 w-44 bg-white rounded-lg shadow
  transition-all duration-200 origin-top z-50
  ${
    profileOpen
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95 pointer-events-none"
  }`}
            >
              <ul className="text-sm text-gray-700">
                <li
                  className="navbar-li"
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                  }}
                >
                  My Profile
                </li>

                <li
                  className="navbar-li"
                  onClick={() => {
                    navigate("/my-bookings");
                    setProfileOpen(false);
                  }}
                >
                  My Bookings
                </li>

                <li
                  className="navbar-li"
                  onClick={() => {
                    navigate("/about_us");
                    setProfileOpen(false);
                  }}
                >
                  About Us
                </li>

                <li className="navbar-li">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2"
                  >
                    <IoMdCall /> +91-98765 43210
                  </a>
                </li>

                <li
                  className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
                  onClick={() => {
                    navigate("/logout");
                    setProfileOpen(false);
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* MOBILE MENU ICON */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <IoMenuOutline className="text-3xl" />
        </button>
      </div>

      {/* MOBILE MENU — FULL FEATURES ADDED */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-[600px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        } bg-white/95 shadow-lg px-6 rounded-b-lg`}
      >
        {/* Mobile — CITY SELECTOR */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm mb-1 font-semibold">
            Select City
          </p>
          <select
            className="w-full border rounded-lg p-2"
            value={selectedCity}
            onChange={(e) => handleCitySelect(e.target.value)}
          >
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Call */}
        <a
          href="tel:+919876543210"
          className="flex items-center gap-3 text-lg text-[#003566] font-medium bg-gray-100 py-3 px-4 rounded-lg hover:bg-gray-200 transition"
        >
          <IoMdHeadset className="text-2xl" /> +91-98765 43210
        </a>

        {/* Login */}
        <button
          onClick={() => navigate("/login")}
          className="mt-3 bg-orange-400 px-4 py-3 rounded-lg text-black font-semibold w-full shadow hover:bg-orange-500 transition"
        >
          Login
        </button>

        {/* MOBILE PROFILE MENU */}
        <div className="mt-5 border-t pt-4 space-y-3">
          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left py-2 text-gray-700 font-medium hover:text-blue-700"
          >
            My Profile
          </button>

          <button
            onClick={() => navigate("/my-bookings")}
            className="w-full text-left py-2 text-gray-700 font-medium hover:text-blue-700"
          >
            My Bookings
          </button>

          <button
            onClick={() => navigate("/about_us")}
            className="w-full text-left py-2 text-gray-700 font-medium hover:text-blue-700"
          >
            About Us
          </button>

          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 py-2 text-gray-700 hover:text-blue-700"
          >
            <IoMdCall /> +91-98765 43210
          </a>

          <button
            onClick={() => navigate("/logout")}
            className="w-full text-left py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
