const admins = [
  {
    id: "A101",
    name: "Super Admin",
    email: "super@keyo.com",
    phone: "9999999999",
    role: "Super Admin",
    // super admin → access all hotels
    hotelIds: []
  },
  {
    id: "A102",
    name: "Ravi Kumar",
    email: "ravi@keyo.com",
    phone: "9876543210",
    role: "Admin",
    // admin → also access all hotels
    hotelIds: []
  },
  {
    id: "A103",
    name: "Hotel Owner",
    email: "owner@hotel.com",
    phone: "9000000000",
    role: "Hotel Owner",
    // owner → assigned to one hotel (example hardcoded)
    hotelId: "H101"
  },
  {
    id: "A104",
    name: "Hotel Owner",
    email: "manager@hotel.com",
    phone: "8000000000",
    role: "Hotel Owner",
    // manager → assigned to one hotel (example hardcoded)
    hotelId: "H102, H103"
  },
];

export default admins;
