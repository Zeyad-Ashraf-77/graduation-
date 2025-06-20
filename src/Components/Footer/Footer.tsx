import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 border-t border-gray-200 py-10 px-6 sm:px-12 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Section 1: Logo and Newsletter */}
        <div>
          <h2 className="text-2xl font-bold text-red-600">Handova</h2>
          <p className="text-sm text-gray-600 mb-4">Subscribe to our Newsletter</p>
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
          />
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            →
          </button>
          <div className="flex gap-3 mt-4 text-red-600">
            <FaFacebookF />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        {/* Section 2: Contact */}
        <div>
          <Link to={"/contactUs"} className="text-lg font-semibold mb-3">CONTACT</Link>
          <p className="text-sm text-gray-600">
            📧 <a href="mailto:Info@carysil.ae">zeyadaltantawy365@gmail.com</a>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            📞 <a href="tel:+971551695202">+0201065767412</a>
          </p>
        </div>

        {/* Section 3: Pages */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Pages</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Media</Link></li>
          </ul>
        </div>

        {/* Section 4: Location */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Location /</h3>
          <p className="text-sm text-gray-600 mb-2">Carysil UAE / Metallica Appliances L.L.C</p>
          <iframe
            className="w-full h-40 rounded-md"
            src="https://www.google.com/maps?q=Metallica%20Appliances%20LLC%20Premium%20Dubai&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
