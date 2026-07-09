import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";

export default function LocationPopup({ onLocationSet }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (!savedLocation) {
      setOpen(true);
    }
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // Reverse geocode using OpenStreetMap (FREE)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown";

          localStorage.setItem("userLocation", city);
          onLocationSet?.(city);

          setOpen(false);
        } catch (err) {
          alert("Failed to detect city");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("Location permission denied");
        setLoading(false);
      }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9000 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 text-center shadow-lg">

        <MdLocationOn className="text-5xl text-[#F5CC00] mx-auto mb-3" />

        <h2 className="text-xl font-semibold text-[#0A1C4F]">
          Enable Location
        </h2>

        <p className="text-gray-600 text-sm mt-2">
          We use your location to show nearby hotels and better deals.
        </p>

        <button
          onClick={getLocation}
          disabled={loading}
          className="mt-6 w-full py-3 bg-[#0A1C4F] text-white rounded-lg
                     hover:bg-[#003566] transition"
        >
          {loading ? "Detecting..." : "Use my current location"}
        </button>

        <button
          onClick={() => setOpen(false)}
          className="mt-3 text-sm text-gray-500 hover:underline"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
