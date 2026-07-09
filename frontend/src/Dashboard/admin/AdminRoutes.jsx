import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import HotelsList from "./pages/HotelsList";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";
import ViewHotel from "./pages/ViewHotel";
import AdminBookings from "./pages/AdminBookings";
import AdminTransactions from "./pages/AdminTransactions";
import AdminList from "./pages/AdminList";
import AddAdmin from "./pages/AddAdmin";
import EditAdmin from "./pages/EditAdmin";
import AdminLogin from "../pages/AdminLogin";

import ProtectedRoute from "../auth/ProtectedRoute";
import { ROLES } from "../auth/roles";
import Customizations from "./pages/Customizations";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* ✅ LOGIN (PUBLIC) ,*/}
      <Route path="login" element={<AdminLogin />} />

      {/* ✅ PROTECTED ADMIN LAYOUT */}
      <Route
        element={
          <ProtectedRoute
            allow={[
              ROLES.ADMIN,
              ROLES.PROPERTY_MANAGER,
              ROLES.ACCOUNTANT,
              ROLES.CRE,
            ]}
          >
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="hotels" element={<HotelsList />} />
        <Route path="hotel/add" element={<AddHotel />} />
        <Route path="hotels/edit/:id" element={<EditHotel />} />
        <Route path="hotels/view/:id" element={<ViewHotel />} />

        <Route path="bookings" element={<AdminBookings />} />
        <Route path="transactions" element={<AdminTransactions />} />
        <Route path="customizations" element={<Customizations />} />

        <Route path="admins" element={<AdminList />} />
        <Route path="admins/add" element={<AddAdmin />} />
        <Route path="admins/edit/:id" element={<EditAdmin />} />
      </Route>

      {/* ✅ CATCH-ALL (VERY IMPORTANT) */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
