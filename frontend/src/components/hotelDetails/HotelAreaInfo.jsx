import {
  MdLocationCity,
  MdDirectionsBus,
  MdOutlineEmojiNature,
} from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiAirplaneDeparture } from "react-icons/gi";

export default function HotelAreaInfo({ areaInfo }) {
  if (!areaInfo) return null;

  const sections = [
    { key: "attractions", icon: MdLocationCity, label: "Attractions" },
    { key: "restaurants", icon: IoFastFoodOutline, label: "Restaurants" },
    { key: "transport", icon: MdDirectionsBus, label: "Transport" },
    { key: "airports", icon: GiAirplaneDeparture, label: "Airports" },
    { key: "naturalBeauty", icon: MdOutlineEmojiNature, label: "Natural Beauty" },
  ];

  return (
    <div className="mt-4">
      <h3 className="font-bold text-lg mb-2">Area Info</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        {sections.map(
          (section) =>
            areaInfo[section.key]?.length > 0 && (
              <div key={section.key}>
                <div className="flex flex-row items-center mb-1">
                  <section.icon className="text-2xl mr-2 text-gray-700" />
                  <p className="font-semibold text-lg">{section.label}</p>
                </div>
                <ul className="list-none list-inside text-md ml-8">
                  {areaInfo[section.key].map((item, i) => (
                    <li key={i} className="flex justify-between pr-4">
                      <span className="w-5/6">{item.name}</span>
                      <span className="text-gray-500">{item.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
    </div>
  );
}
