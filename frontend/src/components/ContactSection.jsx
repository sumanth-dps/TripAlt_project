export default function ContactSection() {
  return (
    <section className="">
      <div className="w-full xl:w-3/4 2xl:w-2/3 mx-auto px-6 text-center rounded-t-xl bg-blue-50 py-12 mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Have Questions or Need Help?
        </h2>
        <p className="text-gray-600 mb-6">
          Our support team is here to assist you 24/7. Reach out anytime for
          help with bookings or inquiries.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=example@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#003566] px-5 py-2 rounded-lg text-white hover:bg-blue-700 transition"
          >
            Email Us
          </a>

          <a
            href="tel:+919876543210"
            className=" px-5 py-2 rounded-lg border border-[#003566] hover:border-blue-700 text-[#003566] hover:bg-blue-700 hover:text-white transition duration-300"
          >
            Call Support
          </a>
        </div>
      </div>
    </section>
  );
}
