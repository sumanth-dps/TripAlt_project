export default function Banner() {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-10 mb-5 px-5 xl:px-0 ">
      <div className="w-full  xl:w-3/4 2xl:w-2/3 flex flex-col justify-center items-center">
        {/* <div className="flex flex-col md:flex-row items-center justify-between md:pb-5">
          <img
            src="./HotelBooking.png"
            className="w-[80%] md:w-[30%] lg:w-1/4"
          ></img>
          <img
            src="./discount.png"
            className="w-[80%] md:w-[30%] lg:w-1/4"
          ></img>
          <img
            src="./cleaning.png"
            className="w-[80%] md:w-[30%] lg:w-1/4"
          ></img>
        </div> */}
        <div className="w-full relative rounded-xl overflow-hidden shadow-lg">

          <img
            src="https://t4.ftcdn.net/jpg/05/72/13/95/360_F_572139541_0weHMYlZsHDOBQzdJBvrpbm9hsyDrWLR.jpg"
            alt="banner"
            className="object-cover w-full h-60"
          />


          <div className="absolute inset-0 bg-black/40"></div>


          <div className="absolute top-0 left-0 p-6 sm:p-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug drop-shadow-md">
              Book Your Perfect Stay <br />
              With <span className="text-orange-500">Exclusive Deals</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/90">
              Comfort, convenience, and budget—all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
