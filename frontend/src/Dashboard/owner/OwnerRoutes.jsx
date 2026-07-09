// import React from "react";
// import { Route } from "react-router-dom";

// import OwnerLayout from "../layout/OwnerLayout";

// import OwnerMyHotels from "./pages/OwnerMyHotels";
// import OwnerBookings from "./pages/OwnerBookings";
// import OwnerPricings from "./pages/OwnerPricings";
// import OwnerEarnings from "./pages/OwnerEarnings";

// import ProtectedRoute from "../auth/ProtectedRoute";
// import { ROLES } from "../auth/roles";
// import OwnerViewHotel from "./pages/OwnerViewHotel";
// import OwnerDashboard from "./pages/OwnerDashboard";

// export default function OwnerRoutes() {
//   return (
//     <>
//       <Route
//   path="/owner"
//   element={
//     <ProtectedRoute allow={[ROLES.HOTEL_OWNER, ROLES.HOTEL_MANAGER]}>
//       <OwnerLayout />
//     </ProtectedRoute>
//   }
// >
//   <Route index element={<OwnerDashboard/>} />
//   <Route path="my-hotels" element={<OwnerMyHotels />} />
//   <Route path="dashboard" element={<OwnerDashboard/>} />

//   <Route path="my-hotels/view/:id" element={<OwnerViewHotel />} />
//   <Route path="bookings" element={<OwnerBookings />} />
//   <Route path="pricings" element={<OwnerPricings />} />
//   <Route path="earnings" element={<OwnerEarnings />} />
// </Route>

//     </>
//   );
// }
import { Routes, Route, Navigate } from "react-router-dom";

import OwnerLayout from "../layout/OwnerLayout";

import OwnerMyHotels from "./pages/OwnerMyHotels";
import OwnerBookings from "./pages/OwnerBookings";
import OwnerPricings from "./pages/OwnerPricings";
import OwnerEarnings from "./pages/OwnerEarnings";
import OwnerViewHotel from "./pages/OwnerViewHotel";
import OwnerDashboard from "./pages/OwnerDashboard";

import ProtectedRoute from "../auth/ProtectedRoute";
import { ROLES } from "../auth/roles";

export default function OwnerRoutes() {
  return (
    <Routes>
      {/* 🔐 PROTECTED OWNER PANEL */}
      <Route
        element={
          <ProtectedRoute
            allow={[ROLES.HOTEL_OWNER, ROLES.HOTEL_MANAGER]}
          >
            <OwnerLayout />
          </ProtectedRoute>
        }
      >
        {/* DEFAULT REDIRECT */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<OwnerDashboard />} />

        <Route path="my-hotels" element={<OwnerMyHotels />} />
        <Route path="my-hotels/view/:id" element={<OwnerViewHotel />} />

        <Route path="bookings" element={<OwnerBookings />} />
        <Route path="pricings" element={<OwnerPricings />} />
        <Route path="earnings" element={<OwnerEarnings />} />
      </Route>

      {/* ❌ OWNER 404 */}
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
