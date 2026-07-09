import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import HotelDetails from "./pages/HotelDetails";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Booking from "./pages/Booking";
import OwnerRoutes from "./Dashboard/owner/OwnerRoutes";
import HotelRoutes from "./Dashboard/hotel/HotelRoutes";
import AboutUs from "./pages/AboutUs";
import ProfilePage from "./pages/ProfilePage";
import MyBookings from "./pages/MyBookings";
import BookingConfirmation from "./pages/BookingConfirmation";
import PaymentPage from "./pages/PaymentPage";
import { AdminAuthProvider } from "./Dashboard/auth/AdminAuthContext";
import AdminRoutes from "./Dashboard/admin/adminRoutes";
import FloatingSupport from "./components/FloatingSupport";
import LocationPopup from "./components/LocationPopup";
import { useState } from "react";

function AppWrapper() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

function App() {
  const [city, setCity] = useState(
    localStorage.getItem("userLocation") || ""
  )
  const location = useLocation();

  const hidePublicUI =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/owner") ||
    location.pathname.startsWith("/hotel");

  return (
    <>
      <ScrollToTop />
<LocationPopup onLocationSet={setCity} />
      {!hidePublicUI && <NavBar />}

      <Routes>
        {/* 🔐 DASHBOARD ROUTES */}
        <Route path="/admin/*" element={<AdminRoutes/>} />
        <Route path="/owner/*" element={<OwnerRoutes />} />
        <Route path="/hotel/*" element={<HotelRoutes />} />

        <Route path="/" element={<Home />} />
<Route path="/:city" element={<Home />} />

        <Route path="/:city_area/search" element={<SearchPage />} />
        <Route path="/:city_area/:name" element={<HotelDetails />} />
        <Route path="/:city_area/:name/booking" element={<Booking />} />

        <Route path="/login" element={<SignUp />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/payment" element={<PaymentPage />} />
        
      </Routes>

      {!hidePublicUI && (
        <>
          <ContactSection />
          <Footer />
        </>
      
      )}
      <FloatingSupport/>
      </>
  );
}

export default AppWrapper;
