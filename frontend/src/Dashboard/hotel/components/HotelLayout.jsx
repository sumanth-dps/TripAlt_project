import { useState } from "react";
import { Outlet } from "react-router-dom";
import HotelSidebar from "./HotelSidebar";
import Topbar from "../../components/Topbar";

export default function HotelLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen  bg-gray-50">
      <Topbar setMobileSidebarOpen={setMobileSidebarOpen} />
      <div className="flex">
        <HotelSidebar
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
        <main
          className="
            flex-1 
            pt-20            
            px-4 md:px-6 lg:px-6
            pb-10
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
