// import { createContext, useContext, useEffect, useState } from "react";

// const AdminAuthContext = createContext();

// export function AdminAuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Load stored user on refresh
//   useEffect(() => {
//     const saved = localStorage.getItem("adminUser");
//     if (saved) setUser(JSON.parse(saved));
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("adminUser", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("adminUser");
//   };

//   return (
//     <AdminAuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AdminAuthContext.Provider>
//   );
// }

// export default function useAdminAuth() {
//   return useContext(AdminAuthContext);
// }
import { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("adminUser");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("adminUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("adminUser");
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export default function useAdminAuth() {
  return useContext(AdminAuthContext);
}
