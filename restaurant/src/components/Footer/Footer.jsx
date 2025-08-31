import React from "react";
import {
  FaShippingFast,
  FaUtensils,
  FaHeadset,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaShieldAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl text-primary font-bold text-neon mb-4">Qadir</h2>
          <p className="text-gray-400">
            Providing delicious meals with fast delivery and excellent support.  
            Order anytime, anywhere!
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Services</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 group cursor-pointer">
              <FaShippingFast className="text-neon text-2xl group-hover:scale-125 group-hover:text-yellow-400 transition-transform duration-300" />
              <span className="group-hover:text-neon transition-colors duration-300">
                Fast Delivery
              </span>
            </li>
            <li className="flex items-center gap-3 group cursor-pointer">
              <FaUtensils className="text-neon text-2xl group-hover:rotate-12 group-hover:text-green-400 transition-transform duration-300" />
              <span className="group-hover:text-neon transition-colors duration-300">
                Delicious Meals
              </span>
            </li>
            <li className="flex items-center gap-3 group cursor-pointer">
              <FaHeadset className="text-neon text-2xl group-hover:scale-110 group-hover:text-blue-400 transition-transform duration-300" />
              <span className="group-hover:text-neon transition-colors duration-300">
                24/7 Support
              </span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li className="hover:text-neon transition-colors duration-300 cursor-pointer">
              Home
            </li>
            <li className="hover:text-neon transition-colors duration-300 cursor-pointer">
              About Us
            </li>
            <li className="hover:text-neon transition-colors duration-300 cursor-pointer">
              Menu
            </li>
            <li className="hover:text-neon transition-colors duration-300 cursor-pointer">
              Contact
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Terms & Policies</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 cursor-pointer group">
              <FaShieldAlt className="text-neon text-xl group-hover:scale-125 transition-transform duration-300" />
              <span className="group-hover:text-neon transition-colors duration-300">
                Privacy Policy
              </span>
            </li>
            <li className="flex items-center gap-3 cursor-pointer group">
              <FaShieldAlt className="text-neon text-xl group-hover:scale-125 transition-transform duration-300" />
              <span className="group-hover:text-neon transition-colors duration-300">
                Terms & Conditions
              </span>
            </li>
            <li className="flex items-center gap-3 cursor-pointer group">
              <FaShieldAlt className="text-neon text-xl group-hover:scale-125 transition-transform duration-300" />
              <span className="group-hover:text-neon transition-colors duration-300">
                Refund Policy
              </span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-5">
            <FaFacebook className="text-2xl hover:text-blue-500 transition-transform hover:scale-125 cursor-pointer" />
            <FaTwitter className="text-2xl hover:text-sky-400 transition-transform hover:scale-125 cursor-pointer" />
            <FaInstagram className="text-2xl hover:text-pink-500 transition-transform hover:scale-125 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Qadir All Rights Reserved.
      </div>
    </footer>
  );
}
