// import { useState } from "react";
// import OwnerSidebar from "../owner/components/OwnerSidebar";
// import Topbar from "../components/Topbar";
// import { Outlet } from "react-router-dom";

// export default function OwnerLayout({ title }) {
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex">
      
//       {/* Sidebar */}
//       <OwnerSidebar
//         mobileSidebarOpen={mobileSidebarOpen}
//         setMobileSidebarOpen={setMobileSidebarOpen}
//       />

//       {/* MAIN CONTENT */}
//       <div className="flex-1 lg:ml-64">  {/* ⭐ FIX: CONTENT SHIFTS RIGHT */}
//         <Topbar
//           title={title}
//           setMobileSidebarOpen={setMobileSidebarOpen}
//         />

//         <main className="pt-20 px-6 pb-10">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import OwnerSidebar from "../owner/components/OwnerSidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

export default function OwnerLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOPBAR */}
      <Topbar setMobileSidebarOpen={setMobileSidebarOpen} />

      <div className="flex">

        {/* SIDEBAR */}
        <OwnerSidebar
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        {/* MAIN CONTENT */}
        <main
          className="
            flex-1
            pt-20                 /* space for topbar */
            px-4 md:px-6 lg:px-6 
            pb-10              /* sidebar width offset */
          "
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
}
