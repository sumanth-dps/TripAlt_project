import { useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";

const CATEGORIES = [
  "rooms",
  "lobby",
  "reception",
  "facade",
  "entrance",
  "washroom",
  "other",
];


export default function HotelGallery({ imagesByCategory }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("rooms");
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeImages = imagesByCategory || {};
  const roomImages = safeImages.rooms || [];
  const allImages = safeImages[activeCategory] || [];

  const openGallery = (category, index) => {
    setActiveCategory(category);
    setCurrentIndex(index);
    setGalleryOpen(true);
  };
useEffect(() => {
  if (galleryOpen) {
    document.body.classList.add("body-lock");
  } else {
    document.body.classList.remove("body-lock");
  }

  // Cleanup when component unmounts
  return () => document.body.classList.remove("body-lock");
}, [galleryOpen]);
  const nextImage = () => {
    const currentCategoryImages = safeImages[activeCategory] || [];
    const total = currentCategoryImages.length;

    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      return;
    }

    const currentCatIndex = CATEGORIES.indexOf(activeCategory);
    const nextCatIndex = (currentCatIndex + 1) % CATEGORIES.length;
    const nextCat = CATEGORIES[nextCatIndex];

    setActiveCategory(nextCat);
    setCurrentIndex(0);
  };

  const prevImage = () => {
    const currentCategoryImages = safeImages[activeCategory] || [];

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      return;
    }

    const currentCatIndex = CATEGORIES.indexOf(activeCategory);
    const prevCatIndex =
      (currentCatIndex - 1 + CATEGORIES.length) % CATEGORIES.length;

    const prevCat = CATEGORIES[prevCatIndex];
    const prevCatImages = safeImages[prevCat] || [];

    setActiveCategory(prevCat);
    setCurrentIndex(Math.max(prevCatImages.length - 1, 0));
  };

  const combinedThumbnails = CATEGORIES.flatMap((cat) =>
    (safeImages[cat] || []).map((img) => ({
      ...img,
      category: cat,
    }))
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-2 rounded-xl  overflow-hidden  ">
        <div className=" cursor-pointer">
          <img
            src={roomImages[0]?.url}
            alt="Main"
            className="w-full h-42 md:h-82 object-cover rounded-xl shadow-md"
            onClick={() => openGallery("rooms", 0)}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <img
            src={roomImages[1]?.url || roomImages[0]?.url}
            alt="Side1"
            className="h-20 md:h-40 w-full object-cover  rounded-xl cursor-pointer shadow-md"
            onClick={() => openGallery("rooms", 1)}
          />
          <div className="grid grid-cols-2 gap-2">
            <img
              src={roomImages[2]?.url || roomImages[0]?.url}
              alt="Side2"
              className="w-full h-20 md:h-40 object-cover rounded-xl cursor-pointer shadow-md"
              onClick={() => openGallery("rooms", 2)}
            />
            <div
              className="relative h-20 w-full md:h-40 cursor-pointer "
              onClick={() => openGallery("rooms", 3)}
            >
              <img
                src={roomImages[3]?.url || roomImages[0]?.url}
                alt="Side3"
                className="w-full h-20 md:h-40 object-cover rounded-xl shadow-md"
              />

              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm md:text-lg md:font-semibold rounded-xl">
                {roomImages.length > 4
                  ? `+${roomImages.length - 4} more`
                  : "View More"}
              </div>
            </div>
          </div>
        </div>
      </div>
      {galleryOpen && (
        <div className="fixed h-screen inset-0 bg-black/90 z-9999 flex flex-col">
          <button
            onClick={() => setGalleryOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-[#F5CC00] duration-300 text-2xl lg:text-3xl font-bold cursor-pointer"
          >
            <RxCross2 />
          </button>
          <div className="flex lg:justify-center gap-6 text-white text-lg mt-15 xl:mt-10 border-b border-white/30 pb-3 overflow-x-auto whitespace-nowrap scrollbar-none px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`pb-2 capitalize transition-all cursor-pointer
        ${
          activeCategory === cat
            ? " text-[#F5CC00] font-semibold duration-300"
            : "text-gray-300 hover:text-[#F5CC00] duration-300"
        }
      `}
                style={{ flexShrink: 0 }}
              >
                {cat} ({(safeImages[cat] || []).length})
              </button>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            {allImages.length > 0 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute cursor-pointer left-3 lg:left-6 text-white text-2xl md:text-4xl hover:text-[#F5CC00] duration-300  md:px-4 rounded-full"
                >
                  <MdOutlineArrowBackIos />
                </button>

                <img
                  src={allImages[currentIndex]?.url}
                  alt="big"
                  className="max-w-[95vw] md:max-w-[80vw] max-h-[70vh] object-cover rounded-xl shadow-xl mt-3"
                />

                <button
                  onClick={nextImage}
                  className="absolute cursor-pointer right-3 lg:right-6 text-white text-2xl md:text-4xl hover:text-[#F5CC00] duration-300   md:px-4 rounded-full"
                >
                  <MdOutlineArrowForwardIos />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-3 overflow-x-auto py-4 px-6 bg-black/40 scrollbar-none">
            {combinedThumbnails.map((thumb, i) => (
              <img
                key={thumb.id}
                src={thumb.url}
                onClick={() => {
                  setActiveCategory(thumb.category);
                  const indexInCategory = safeImages[thumb.category].findIndex(
                    (x) => x.id === thumb.id
                  );
                  setCurrentIndex(indexInCategory);
                }}
                className={`h-20 w-32 object-cover rounded-lg cursor-pointer 
        ${
          thumb.category === activeCategory &&
          safeImages[thumb.category][currentIndex]?.id === thumb.id
            ? "ring-4 ring-[#F5CC00] scale-105"
            : "opacity-70 hover:opacity-100"
        }
      `}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
