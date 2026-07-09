const hotels = [

{
  id: 1,
  name: "The Palace",
  city: "Hyderabad",
  area: "Banjara Hills",
  country: "India",
  address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 4000,
  originalPrice: 6250,
  rating: 4.5, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating:3.0, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 150,
  type: "Hotels",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
}
,
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples"],
  sportCategories:[
              "Pickle Ball",
              "Box Cricket",
              "Badminton",
              "Tennis",
            ],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
  ],
paymentOptions :["Free Cancellation", "Pay at Property"],
  bookings: [
    {
      id: "A001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      bookingDate: "2025-12-22",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "A002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      bookingDate: "2025-12-22",
      price: 2800,
      status: "Pending"
    },
    {
      id: "A003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      bookingDate: "2025-12-22",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          bookingDate: "2025-12-22",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          bookingDate: "2025-12-22",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          bookingDate: "2025-12-22",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      mealOptions: [
    "Breakfast included",
            "Lunch included",
  ],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      mealOptions: [
    "Breakfast included",
            "Lunch included",
  ], 
      mealOptions: [
    "Breakfast included",
            "Lunch included",
  ],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      mealOptions: [
    "Breakfast included",
            "Lunch included",
  ],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 2,
  name: "The Star Hotel",
  city: "Hyderabad",
  area: "kukatpally",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 3700,
  originalPrice: 4250,
  rating: 4.0, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 119,
  guestRating: 2.5, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Villas",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
}
,
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families","Business Travellers",
              "Groups",
              "Solo Travellers",],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "ELEVATOR",
    "POWER BACKUP"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive"
  ],
paymentOptions :["Free Cancellation"],

  bookings: [
    {
      id: "B011",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      bookingDate: "2025-12-22",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "B012",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      bookingDate: "2025-12-22",
      price: 2800,
      status: "Pending"
    },
    {
      id: "B013",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      bookingDate: "2025-12-22",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          bookingDate: "2025-12-22",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          bookingDate: "2025-12-22",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          bookingDate: "2025-12-22",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 3,
  name: "Keyo Townhouse",
  city: "Hyderabad",
  area: "Madhapur",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 4500,
  originalPrice: 6250,
  rating: 3.5, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating: 4.7, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Villas",
owner: {
  name: "Harish Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
}
,
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    
            "Lunch included",
            "Dinner included"
  ],
paymentOptions :["Pay at Property"],

  bookings: [
    {
      id: "B001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      bookingDate: "2023-12-22",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "B002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      bookingDate: "2024-12-22",
      price: 2800,
      status: "Pending"
    },
    {
      id: "B003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      bookingDate: "2025-01-20",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          bookingDate: "2024-12-21",
          status: "Pending",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          bookingDate: "2025-12-10",
          status: "Cancelled",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          bookingDate: "2025-12-12",
          status: "Confirmed",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 4,
  name: "Grand Hotel",
  city: "Chennai",
  area: "Sholinganallur",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 5000,
  originalPrice: 7250,
  rating: 2.0, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating: 4.3, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Resorts",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
},
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Business Travellers",
              "Groups",
              "Solo Travellers"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "ELEVATOR",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Dinner included"
  ],
paymentOptions :["Free Cancellation", "Pay at Property"],

  bookings: [
    {
      id: "C001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "C002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      price: 2800,
      status: "Pending"
    },
    {
      id: "C003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 5,
  name: "The Vista",
  city: "Chennai",
  area: "Banjara Hills",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 4500,
  originalPrice: 6250,
  rating: 4.0, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating: 4.7, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Hotels",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
},
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "ELEVATOR",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive"
  ],

  paymentOptions :["Free Cancellation"],

  bookings: [
    {
      id: "D001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      bookingDate: "2025-12-22",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "D002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      bookingDate: "2025-12-22",
      price: 2800,
      status: "Pending"
    },
    {
      id: "D003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      bookingDate: "2025-12-22",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          bookingDate: "2025-12-22",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          bookingDate: "2025-12-22",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          bookingDate: "2025-12-22",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 6,
  name: "Four Seasons Hotel",
  city: "Delhi",
  area: "Banjara Hills",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 6500,
  originalPrice: 8250,
  rating: 4.5, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 159,
  guestRating: 3.9, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Hotels",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
},
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "ELEVATOR",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive"
  ],
paymentOptions :["Pay at Property"],

  bookings: [
    {
      id: "E001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "E002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      price: 2800,
      status: "Pending"
    },
    {
      id: "E003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 7,
  name: "Noble Nest",
  city: "Delhi",
  area: "Chandni Chowk",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 3700,
  originalPrice: 5250,
  rating: 3.4, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating: 3.4, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Hotels",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
},
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "ELEVATOR",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive"
  ],
paymentOptions :["Free Cancellation", "Pay at Property"],

  bookings: [
    {
      id: "F001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "F002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      price: 2800,
      status: "Pending"
    },
    {
      id: "F003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 8,
  name: "The Elite",
  city: "Delhi",
  area: "Vasant Kunj",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 4500,
  originalPrice: 6250,
  rating: 4.5, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating: 4.7, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Hotels",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
},
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "ELEVATOR",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive"
  ],
paymentOptions :["Free Cancellation"],

  bookings: [
    {
      id: "G001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "G002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      price: 2800,
      status: "Pending"
    },
    {
      id: "G003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 9,
  name: "Atlas Hotell",
  city: "Hyderabad",
  area: "Banjara Hills",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 3500,
  originalPrice: 6250,
  rating: 4.5, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating: 4.0, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Hotels",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
},
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "ELEVATOR",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive"
  ],
paymentOptions :[ "Pay at Property"],

  bookings: [
    {
      id: "H001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "H002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      price: 2800,
      status: "Pending"
    },
    {
      id: "H003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},


{
  id: 10,
  name: "Emerald ",
  city: "Mumbai",
  area: "Worli",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 4000,
  originalPrice: 6250,
  rating: 4.5, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating: 4.0, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Hotels",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
},
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "ELEVATOR",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive"
  ],
paymentOptions :["Free Cancellation", "Pay at Property"],

  bookings: [
    {
      id: "J001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "J002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      price: 2800,
      status: "Pending"
    },
    {
      id: "J003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 11,
  name: "The Urban Finch ",
  city: "Mumbai",
  area: "Nariman Point",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 4000,
  originalPrice: 6250,
  rating: 4.5, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating: 4.0, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Hotels",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
},
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "ELEVATOR",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive"
  ],

paymentOptions :[ "Pay at Property"],

  bookings: [
    {
      id: "K001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "K002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      price: 2800,
      status: "Pending"
    },
    {
      id: "K003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 12,
  name: "The Palace",
  city: "Vijayawada",
  area: "Benz Circle",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 4500,
  originalPrice: 6250,
  rating: 3.7, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating: 2.0, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Hotels",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
},
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "ELEVATOR",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive"
  ],
paymentOptions :["Free Cancellation", ],

  bookings: [
    {
      id: "L001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "L002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      price: 2800,
      status: "Pending"
    },
    {
      id: "L003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 13,
  name: "The Marbled Fox",
  city: "Visakhapatnam",
  area: "Rishikonda",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 4500,
  originalPrice: 6250,
  rating: 4.5, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating: 2.0, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Resorts",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
},
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "ELEVATOR",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive"
  ],
paymentOptions :["Free Cancellation", "Pay at Property"],

  bookings: [
    {
      id: "M001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "M002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      price: 2800,
      status: "Pending"
    },
    {
      id: "M003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},
{
  id: 14,
  name: "The Palace",
  city: "Visakhapatnam",
  area: "Bheemunipatnam",
  country: "India",
 address:"Near Metro Station",
  description:
    "KEYO Townhouse is based on the needs of the millennial traveler. Every element of the hotel – from the breakfast menu to the booking process – has been re-engineered for comfort, efficiency, convenience, and affordability.",

  price: 4500,
  originalPrice: 6250,
  rating: 3.7, // ⭐ Hotel rating (used for 'Hotel Rating' filter)
  taxes: 139,
  guestRating: 2.0, // ⭐ User review rating (used for 'Guest Rating' filter)
  reviewsCount: 1520,
  type: "Hotels",
owner: {
  name: "Ramesh Kumar",
  phone: "9876543210",
  email: "ramesh.kumar@example.com",
  aadhar: "1234 5678 9000",
  pan: "ABCDE1234F"
},
  // ⭐ Traveller Category (works with filter)
  travellerCategories: ["Couples", "Families"],

  // ⭐ AMENITIES — EXACT MATCH with filter names
  amenities: [
    "WIFI",
    "AC",
    "TV",
    "CCTV",
    "PARKING",
    "ROOM SERVICE",
    "CREDIT CARD",
    "ELEVATOR",
    "POWER BACKUP",
    "POOL",
    "DINING AREA"
  ],

  // ⭐ FILTER-COMPATIBLE MEAL OPTIONS
  mealOptions: [
    "Breakfast included",
            "Lunch included",
            "Dinner included",
            "All-inclusive"
  ],

 paymentOptions :["Free Cancellation", "Pay at Property"],

  bookings: [
    {
      id: "N001",
      user: "Rahul Sharma",
      roomType: "Deluxe Room",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      price: 4800,
      status: "Confirmed"
    },
    {
      id: "N002",
      user: "Priya Patel",
      roomType: "Classic Room",
      checkIn: "2025-02-11",
      checkOut: "2025-02-12",
      price: 2800,
      status: "Pending"
    },
    {
      id: "N003",
      user: "Amit Verma",
      roomType: "Family Suite",
      checkIn: "2025-02-15",
      checkOut: "2025-02-18",
      price: 6200,
      status: "Cancelled"
    }
  ],

  users: [
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-03-01",
          checkOut: "2025-03-03",
          amount: 5600
        }
      ]
    },

    {
      id: "U102",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9000001111",
      bookings: [
        {
          bookingId: "B102",
          roomType: "Deluxe Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-17",
          amount: 8500
        }
      ]
    },

    {
      id: "U103",
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543110",
      bookings: [
        {
          bookingId: "B101",
          roomType: "Classic Room",
          checkIn: "2025-02-15",
          checkOut: "2025-02-18",
          amount: 6200
        }
      ]
    }
  ],

  reviews: [
    {
      id: "R101",
      user: "Rahul Sharma",
      rating: 5,
      comment: "Amazing hotel! Clean rooms and great service.",
      date: "2025-01-10"
    },
    {
      id: "R102",
      user: "Priya Patel",
      rating: 4,
      comment: "Nice stay but breakfast could be better.",
      date: "2025-01-15"
    },
    {
      id: "R103",
      user: "Arjun Mehta",
      rating: 3,
      comment: "Average experience. Room was small.",
      date: "2025-02-02"
    },
    {
      id: "R104",
      user: "Nisha Gupta",
      rating: 5,
      comment: "Loved the hotel! Staff was friendly.",
      date: "2025-02-18"
    }
  ],

  /* ---------------------------
      ⭐ OYO-STYLE GALLERY FORMAT 
     --------------------------- */
  imagesByCategory: {
    rooms: [
      { id: "r1", url: "/images/h1room.jpeg" },
      { id: "r2", url: "/images/h2room.jpeg" },
      { id: "r3", url: "/images/h3room.jpeg" },
      { id: "r4", url: "/images/h4room.jpeg" }
    ],

    lobby: [
      { id: "l1", url: "/images/h2room.jpeg" },
      { id: "l2", url: "/images/h3room.jpeg" }
    ],

    reception: [{ id: "rc1", url: "/images/h4room.jpeg" }],

    facade: [
      { id: "f1", url: "/images/h3room.jpeg" },
      { id: "f2", url: "/images/h4room.jpeg" }
    ],

    entrance: [{ id: "e1", url: "/images/h1room.jpeg" }],

    washroom: [
      { id: "w1", url: "/images/h3room.jpeg" },
      { id: "w2", url: "/images/h4room.jpeg" }
    ],

    other: [{ id: "o1", url: "/images/h4room.jpeg" }]
  },

  /* ---------------------------
        ⭐ ROOM TYPES 
     --------------------------- */
  roomTypes: [
    {
      name: "Classic Room",
      price: 2800,
      originalPrice: 3500,
      taxes: 129,
      image: "/images/h1room.jpeg",
      amenities: ["AC", "TV", "WIFI"],
      bedType: "Queen Bed",
      bedCount: 1,
      maxAdults: 2,
      maxChildren: 1,
      totalRooms: 5,
      size: "9 sqm approx",
      rooms: [
        { roomNo: "C101", isBooked: false },
        { roomNo: "C102", isBooked: false },
        { roomNo: "C103", isBooked: true },
        { roomNo: "C104", isBooked: false },
        { roomNo: "C105", isBooked: true }
      ]
    },

    {
      name: "Deluxe Room",
      price: 4200,
      originalPrice: 5200,
      taxes: 179,
      image: "/images/h2room.jpeg",
      amenities: ["AC", "TV", "WIFI", "MINI BAR", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 3,
      size: "14 sqm approx",
      rooms: [
        { roomNo: "D201", isBooked: false },
        { roomNo: "D202", isBooked: false },
        { roomNo: "D203", isBooked: false }
      ]
    },

    {
      name: "Family Suite",
      price: 6200,
      originalPrice: 7800,
      taxes: 220,
      image: "/images/h3room.jpeg",
      amenities: ["2 QUEEN BEDS", "AC", "TV", "ROOM SERVICE"],
      bedType: "Queen Bed",
      bedCount: 2,
      maxAdults: 4,
      maxChildren: 2,
      totalRooms: 2,
      size: "20 sqm approx",
      rooms: [
        { roomNo: "F301", isBooked: true },
        { roomNo: "F302", isBooked: false }
      ]
    },

    {
      name: "Premium Suite",
      price: 7200,
      originalPrice: 8800,
      taxes: 250,
      image: "/images/h4room.jpeg",
      amenities: ["AC", "TV", "WIFI", "JACUZZI", "BALCONY"],
      bedType: "King Bed",
      bedCount: 1,
      maxAdults: 3,
      maxChildren: 2,
      totalRooms: 1,
      size: "25 sqm approx",
      rooms: [{ roomNo: "P401", isBooked: true }]
    }
  ],

  get isRoomTypeBooked() {
    this.roomTypes.forEach((r) => {
      r.isBooked = r.rooms.every((x) => x.isBooked);
    });
    return this.roomTypes.some((r) => r.isBooked);
  },

  /* ---------------------------
       ⭐ AREA INFORMATION 
     --------------------------- */
  areaInfo: {
    restaurants: [
      { name: "Olive Bistro", distance: "5 km" },
      { name: "Barbeque Nation", distance: "7 km" }
    ],
    attractions: [
      { name: "Golkonda Fort", distance: "10 km" },
      { name: "Birla Mandir", distance: "8 km" }
    ],
    transport: [
      { name: "Banjara Hills Metro Station", distance: "2 km" },
      { name: "Bus Stop - Road No. 3", distance: "3 km" }
    ],
    airports: [
      { name: "Rajiv Gandhi International Airport", distance: "25 km" }
    ],
    naturalBeauty: [
      { name: "KBR National Park", distance: "10 km" }
    ]
  },

  location: {
    locationEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.828951316118!2d78.40898931026459!3d17.42480660938393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c8b88d1c6d%3A0xc1fe47535add38d3!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1765175494008!5m2!1sen!2sin"
  },

  houseRules: {
    checkIn: "From 12:00 PM",
    checkOut: "Until 11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in.",
    childrenAndBeds: "All children are welcome.",
    ageRestriction: "Minimum age for check-in is 18",
    pets: "Pets are not allowed.",
    acceptedCards: ["Visa", "MasterCard", "Cash"]
  }
},


];

export default hotels;
