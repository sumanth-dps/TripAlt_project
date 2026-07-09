import { useState } from "react";
import axios from "axios";

export default function LocationSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const res = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=YOUR_API_KEY&q=${value}&format=json`
      );
      setResults(res.data.slice(0, 5)); // show top 5 results
    } else {
      setResults([]);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setResults([]);
    if (onSelect) onSelect(place);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search city..."
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {results.length > 0 && (
        <ul className="absolute bg-white border w-full mt-1 rounded-lg shadow-lg z-50">
          {results.map((r, i) => (
            <li
              key={i}
              onClick={() => handleSelect(r)}
              className="p-2 hover:bg-blue-100 cursor-pointer text-gray-700"
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
