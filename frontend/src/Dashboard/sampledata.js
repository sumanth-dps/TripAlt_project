const hote=[{
  "_id": "hotel_12345",
  "name": "Ocean View Resort",
  "city": "Goa",
  "area": "Calangute",
  "address": "Near Calangute Beach Road, Goa",
  "state": "Goa",
  "pincode": "403516",
  "country": "India",
  "description": "A premium beachfront resort offering modern rooms, great ambience, and excellent hospitality.",
  "price": 3499,
  "originalPrice": 4999,
  "rating": 4.4,
  "taxes": 399,
  "type": "Resorts",

  "travellerCategories": ["Couples", "Families", "Friends"],
  
  "amenities": [
    "wifi",
    "ac",
    "tv",
    "parking",
    "roomService",
    "pool",
    "diningArea",
    "creditCard"
  ],

  "mealOptions": ["Breakfast Included", "Dinner Included"],

  "freeCancellation": true,
  "payAtProperty": false,

  "images": {
    "rooms": [
      { "id": "img1", "url": "https://placehold.co/600x400?text=Room+1" },
      { "id": "img2", "url": "https://placehold.co/600x400?text=Room+2" }
    ],
    "entrance": [
      { "id": "img3", "url": "https://placehold.co/600x400?text=Entrance" }
    ],
    "facade": [],
    "washroom": [],
    "lobby": [
      { "id": "img4", "url": "https://placehold.co/600x400?text=Lobby" }
    ],
    "other": []
  },

  "roomTypes": [
    {
      "id": "room_1",
      "name": "Deluxe Room",
      "price": 3499,
      "originalPrice": 4999,
      "taxes": 399,
      "bedType": "King Bed",
      "bedCount": 1,
      "maxAdults": 2,
      "maxChildren": 1,
      "size": "280 sq ft",
      "description": "Spacious deluxe room with balcony and beach view.",
      "image": "https://placehold.co/300x200?text=Deluxe",
      "amenities": ["AC", "WiFi", "Balcony", "TV", "Room Service"]
    },
    {
      "id": "room_2",
      "name": "Suite Room",
      "price": 5999,
      "originalPrice": 7999,
      "taxes": 599,
      "bedType": "Queen Bed",
      "bedCount": 2,
      "maxAdults": 4,
      "maxChildren": 2,
      "size": "450 sq ft",
      "description": "Luxury suite with ocean view and private living area.",
      "image": "https://placehold.co/300x200?text=Suite",
      "amenities": ["AC", "TV", "WiFi", "Mini Bar", "Jacuzzi", "Sea View"]
    }
  ],

  "areaInfo": {
    "restaurants": [
      "Fisherman's Wharf - 1.2 km",
      "Bistro Shack - 900 m"
    ],
    "attractions": [
      "Calangute Beach - 500 m",
      "Baga Beach - 1.8 km"
    ],
    "transport": [
      "Local Bus Stop - 200 m",
      "Taxi Stand - 300 m"
    ],
    "airports": [
      "Dabolim Airport - 38 km"
    ],
    "naturalBeauty": [
      "Sinquerim Beach - 4.2 km"
    ]
  },

  "houseRules": {
    "checkIn": "From 12:00 PM",
    "checkOut": "Until 11:00 AM",
    "cancellation": "Free cancellation up to 48 hours before check-in.",
    "childrenAndBeds": "All children are welcome.",
    "ageRestriction": "Minimum age for check-in is 18",
    "pets": "Pets are not allowed.",
    "acceptedCards": ["Visa", "MasterCard", "Cash"]
  }
}
]
export default hote