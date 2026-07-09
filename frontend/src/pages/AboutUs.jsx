import React from "react";
import { FaHotel, FaSmileBeam, FaShieldAlt, FaUsers, FaCheckCircle } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="flex justify-center bg-linear-to-b from-blue-50 to-white pb-24">
      <div className="w-full xl:w-3/4 2xl:w-2/3 px-4 sm:px-6 mt-24 xl:px-0">

        {/* HERO SECTION */}
        <div className="bg-linear-to-r from-blue-600 via-blue-700 to-[#003566] text-white rounded-2xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.pega.com/sites/default/files/styles/2560/public/media/images/2024-09/about-pega-hero-bg.png?itok=Zwp0TI-M')] bg-cover"></div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center drop-shadow">
            About Us
          </h1>
          <p className="text-center text-blue-100 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for discovering stays you'll love — with unmatched ease,
            transparency, and comfort.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
            <div className="bg-white/15 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-md">
              Safe & Verified Hotels
            </div>
            <div className="bg-white/15 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-md">
              Best Price Guarantee
            </div>
          </div>
        </div>

        {/* WHO WE ARE */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-[#003566] rounded-full"></div>
            <h2 className="text-3xl font-semibold text-gray-900">Who We Are</h2>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed text-lg">
            We’re a passionate travel-tech brand that believes booking a hotel shouldn’t feel complicated.
            From curated hotels to seamless booking flows, our goal is to make your journey effortless
            and enjoyable from the moment you start planning.
          </p>

          {/* ICON CARDS */}
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FaHotel />, label: "Verified Quality Hotels" },
              { icon: <FaUsers />, label: "Thousands of Happy Guests" },
              { icon: <FaShieldAlt />, label: "Fully Secure Bookings" },
              { icon: <FaSmileBeam />, label: "Support That Cares" },
              { icon: <FaCheckCircle />, label: "Transparent Pricing" },
              { icon: <FaUsers />, label: "Strong Travel Community" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition hover:bg-blue-50 group"
              >
                <div className="text-[#003566] text-4xl mb-3 group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <p className="font-semibold text-gray-800 text-lg">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION + VISION */}
        <section className="mt-16 bg-linear-to-r from-blue-100 to-orange-50 border border-blue-200 rounded-2xl p-10 shadow-md">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            To revolutionize the hotel booking experience with smart technology, transparent systems,
            and a user experience that feels effortless.
          </p>

          <h2 className="text-3xl font-semibold text-gray-900 mt-10 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            To become India’s most trusted hotel booking platform — built around convenience,
            reliability, and memorable travel experiences.
          </p>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-[#F5CC00] rounded-full"></div>
            <h2 className="text-3xl font-semibold text-gray-900">Why Choose Us?</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[
              {
                title: "Best Rated Stays",
                desc: "We partner only with trusted, verified hotels to ensure comfort.",
              },
              {
                title: "Effortless Booking",
                desc: "Simple, clean and intuitive UI for quick and secure reservations.",
              },
              {
                title: "Friendly Support",
                desc: "We resolve issues fast because your time matters.",
              },
              {
                title: "Full Transparency",
                desc: "No hidden prices. No surprises. Only clarity.",
              },
              {
                title: "Smart Deals",
                desc: "Exclusive coupons, bank offers, and seasonal discounts.",
              },
              {
                title: "Customer-First Design",
                desc: "Every feature is built keeping travellers in mind.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl hover:bg-orange-50 transition"
              >
                <h3 className="font-bold text-gray-900 text-xl">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Need Assistance?</h2>
          <p className="text-gray-600 mt-3 text-lg">
            Our support team is here to guide you with bookings, cancellations, or any questions.
          </p>

          <a
            href="tel:+919876543210"
            className="inline-block mt-6 bg-linear-to-r from-[#F5CC00] to-orange-500 text-black px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition"
          >
            📞 Call Us: +91 98765 43210
          </a>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;

