// import { useState } from "react";
// import AdminSidebar from "../admin/components/AdminSidebar";
// import Topbar from "../components/Topbar";
// import { Outlet } from "react-router-dom";

// export default function AdminLayout() {
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen  flex ">
//       <AdminSidebar
//         mobileSidebarOpen={mobileSidebarOpen}
//         setMobileSidebarOpen={setMobileSidebarOpen}
//       />

//       <div className="flex-1">
//         <Topbar setMobileSidebarOpen={setMobileSidebarOpen} />

//         <main className="pt-20 px-6 pb-10">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import AdminSidebar from "../admin/components/AdminSidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOPBAR */}
      <Topbar setMobileSidebarOpen={setMobileSidebarOpen} />

      <div className="flex">

        {/* SIDEBAR (lg+) */}
        <AdminSidebar
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        {/* MAIN CONTENT */}
        <main
          className="
            flex-1 
            pt-20            /* space for topbar */
            px-4 md:px-6 lg:px-3
            pb-10
             /* sidebar width offset */
          "
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
}
