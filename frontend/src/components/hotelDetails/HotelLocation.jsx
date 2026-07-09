const HotelLocation = ({ embedUrl }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-[#0A1C4F] py-2">Location</h2>

      <div className="w-full h-[200px] sm:h-[300px] border-2 border-[#F5CC00] rounded-lg overflow-hidden shadow-sm">
        {embedUrl ? (
          <iframe
            title="Hotel Location Map"
            src={embedUrl}
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No location data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelLocation;
