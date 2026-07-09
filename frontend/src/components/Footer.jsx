import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className=" text-gray-300">
      <div className="w-full xl:w-3/4 2xl:w-2/3 mx-auto px-6 bg-gray-900 py-10">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div>
            <img src="./logo_footer.svg" alt="" className="w-35 mb-6" />
            <p className="text-sm">
              Discover and book your perfect stay — from budget-friendly rooms
              to luxury hotels, all in one place.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@TripAlt.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Hyderabad, India</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between md:items-center mt-8 mr-0 lg:mr-15 xl:mr-8 2xl:mr-14">
          <div className=" flex flex-row gap-x-5 text-2xl text-white cursor-pointer">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.x.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>
          </div>
          <div className="text-sm text-gray-500 mt-5 md:mt-0">
            © {new Date().getFullYear()} Trip Alt. All rights reserved.
          </div>
        </div>

        <div></div>
      </div>
    </footer>
  );
}
