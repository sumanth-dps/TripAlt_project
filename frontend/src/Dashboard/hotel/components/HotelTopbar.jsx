import { IoMenu } from "react-icons/io5";
import { BiSolidBell } from "react-icons/bi";

export default function HotelTopbar({ setMobileSidebarOpen }) {
  return (
    <header
      className="
        fixed top-0 left-0 right-0 h-16 bg-white z-30
        flex items-center justify-between px-4 md:px-6
        border-b border-gray-200 shadow-sm
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* MOBILE MENU */}
        <button
          className="lg:hidden text-3xl text-[#003566]"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <IoMenu />
        </button>

        <h1 className="text-lg font-semibold text-[#003566] hidden sm:block">
          Hotel Panel
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        <BiSolidBell className="text-2xl text-[#003566] cursor-pointer" />

        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-[#003566] text-white flex items-center justify-center font-semibold">
            H
          </div>
          <span className="hidden md:block text-sm font-medium">
            Hotel Staff
          </span>
        </div>
      </div>
    </header>
  );
}
