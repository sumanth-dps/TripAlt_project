// import { Route } from "react-router-dom";

// import HotelLayout from "./components/HotelLayout";

// import HotelDashboard from "./pages/HotelDashboard";
// import HotelBookings from "./pages/HotelBookings";
// import HotelRooms from "./pages/HotelRooms";
// import HotelPricing from "./pages/HotelPricing";
// import HotelReviews from "./pages/HotelReviews";


// import ProtectedRoute from "../auth/ProtectedRoute";
// import { ROLES } from "../auth/roles";
// import HotelEarnings from "./pages/HotelEarnings";
// import HotelTransactions from "./pages/HotelTransactions";

// export default function HotelRoutes() {
//   return (
//     <>
//       {/* ---------------- LOGIN (OUTSIDE LAYOUT) ---------------- */}
      

//       {/* ---------------- HOTEL STAFF PANEL ---------------- */}
//       <Route
//         path="/hotel"
//         element={
//           <ProtectedRoute
//             allow={[
//               ROLES.HOTEL_MANAGER,
//               ROLES.HOTEL_STAFF,
//             ]}
//           >
//             <HotelLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* DEFAULT → DASHBOARD */}
//         <Route index element={<HotelDashboard />} />
//         <Route path="dashboard" element={<HotelDashboard />} />

//         {/* BOOKINGS */}
//         <Route path="bookings" element={<HotelBookings />} />

//         {/* ROOMS */}
//         <Route path="rooms" element={<HotelRooms />} />

//         {/* PRICING */}
//         <Route path="pricing" element={<HotelPricing />} />


//         {/* REVIEWS */}
//         <Route path="reviews" element={<HotelReviews />} />
//         <Route path="earnings" element={<HotelEarnings/>} />
// <Route path="transactions" element={<HotelTransactions/>} />

//       </Route>
//     </>
//   );
// }
import { Routes, Route, Navigate } from "react-router-dom";

import HotelLayout from "./components/HotelLayout";

import HotelDashboard from "./pages/HotelDashboard";
import HotelBookings from "./pages/HotelBookings";
import HotelRooms from "./pages/HotelRooms";
import HotelPricing from "./pages/HotelPricing";
import HotelReviews from "./pages/HotelReviews";
import HotelEarnings from "./pages/HotelEarnings";
import HotelTransactions from "./pages/HotelTransactions";

import ProtectedRoute from "../auth/ProtectedRoute";
import { ROLES } from "../auth/roles";

export default function HotelRoutes() {
  return (
    <Routes>
      {/* 🔐 PROTECTED HOTEL PANEL */}
      <Route
        element={
          <ProtectedRoute
            allow={[ROLES.HOTEL_MANAGER, ROLES.HOTEL_STAFF]}
          >
            <HotelLayout />
          </ProtectedRoute>
        }
      >
        {/* DEFAULT REDIRECT */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<HotelDashboard />} />

        {/* BOOKINGS */}
        <Route path="bookings" element={<HotelBookings />} />

        {/* ROOMS */}
        <Route path="rooms" element={<HotelRooms />} />

        {/* PRICING */}
        <Route path="pricing" element={<HotelPricing />} />

        {/* REVIEWS */}
        <Route path="reviews" element={<HotelReviews />} />

        {/* EARNINGS */}
        <Route path="earnings" element={<HotelEarnings />} />

        {/* TRANSACTIONS */}
        <Route path="transactions" element={<HotelTransactions />} />
      </Route>

      {/* ❌ HOTEL 404 */}
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
