// import { Navigate } from "react-router-dom";
// import useAdminAuth from "./AdminAuthContext";

// export default function ProtectedRoute({ allow = [], children }) {
//   const { user } = useAdminAuth();

//   // ❌ Not logged in → redirect to login page
//   if (!user) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   // ❌ Logged in but role not allowed → show no access message
//   if (!allow.includes(user.role)) {
//     return (
//       <div className="p-10 text-center text-red-600 text-xl font-semibold">
//         ❌ You are not authorized to access this page.
//       </div>
//     );
//   }

//   // ✅ Allowed → show the protected page
//   return children;
// }
import { Navigate } from "react-router-dom";
import useAdminAuth from "./AdminAuthContext";

export default function ProtectedRoute({ allow = [], children }) {
  const { user, loading } = useAdminAuth();

  // ⏳ Wait until auth is initialized
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!allow.includes(user.role)) {
    return (
      <div className="p-10 text-center text-red-600 text-xl font-semibold">
        ❌ You are not authorized to access this page.
      </div>
    );
  }

  return children;
}
