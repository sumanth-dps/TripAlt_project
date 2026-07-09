export default function HotelTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "details", label: "Hotel Details" },
    { id: "bookings", label: "Bookings" },
    { id: "reviews", label: "Reviews" },
    { id: "users", label: "Users" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-lg text-[#0A1C4F]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`p-2 px-3 rounded-md font-medium 
          ${
            activeTab === tab.id
              ? "bg-[#0A1C4F] text-white border-[#0A1C4F]"
              : "bg-orange-50 hover:bg-[#003566] hover:text-white border border-[#F5CC00] text-[#F5CC00] duration-300 hover:border-[#0A1C4F]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
