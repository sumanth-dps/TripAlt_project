import {
  MdFreeCancellation,
  MdChildCare,
  MdOutlinePets,
} from "react-icons/md";
import {
  BsPersonCheckFill,
  BsArrowBarRight,
  BsArrowBarLeft,
} from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa";

export default function HotelHouseRules({ houseRules }) {
  if (!houseRules) return null;

  const rules = [
    { icon: BsArrowBarRight, label: "Check-in", value: houseRules.checkIn },
    { icon: BsArrowBarLeft, label: "Check-out", value: houseRules.checkOut },
    {
      icon: MdFreeCancellation,
      label: "Cancellation",
      value: houseRules.cancellation,
    },
    {
      icon: MdChildCare,
      label: "Children",
      value: houseRules.childrenAndBeds,
    },
    {
      icon: BsPersonCheckFill,
      label: "Age Restriction",
      value: houseRules.ageRestriction,
    },
    { icon: MdOutlinePets, label: "Pets", value: houseRules.pets },
    {
      icon: FaRegCreditCard,
      label: "Accepted Payment Methods",
      value: houseRules.acceptedCards.join(", "),
    },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">House Rules</h2>
      <ul className="list-disc list-inside text-md text-gray-700 space-y-2">
        {rules.map((rule, idx) => (
          <li key={idx} className="flex flex-row items-center">
            <div className="flex flex-row w-32 sm:w-40 md:w-48">
              <rule.icon className="text-2xl mr-2" />
              <strong>{rule.label}:</strong>
            </div>
            <span>{rule.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
