import React, { useRef, useState } from "react";

export default function ImageDropZone({ onFiles }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length) onFiles(files);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition 
      ${drag ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <p className="text-gray-600 text-sm">Drag & Drop Images</p>
      <p className="text-blue-600 text-sm underline mt-1">or Browse</p>
      <input
        type="file"
        ref={inputRef}
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
