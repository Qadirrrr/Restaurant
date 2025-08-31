import React, { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import logo from "../../assets/logo.png"; // ✅ Import your logo image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Faster & smooth scroll speed
  const scrollConfig = {
    smooth: true,
    duration: 300,
    offset: -70,
  };

  return (
    <nav
      className="sticky top-0 left-0 w-full 
      bg-gradient-to-r from-black via-primary to-secondary 
      text-white shadow-md z-50 transition-colors duration-500"
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
      
          <span className="hidden sm:inline text-xl font-bold tracking-wide">
            FastFood
          </span>
        

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 font-medium text-lg">
            <li>
              <Link
                {...scrollConfig}
                to="home"
                className="cursor-pointer hover:text-black transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                {...scrollConfig}
                to="about"
                className="cursor-pointer hover:text-black transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                {...scrollConfig}
                to="menu"
                className="cursor-pointer hover:text-black transition-colors duration-300"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                {...scrollConfig}
                to="services"
                className="cursor-pointer hover:text-black transition-colors duration-300"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                {...scrollConfig}
                to="contact"
                className="cursor-pointer hover:text-black transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
          <Link
            {...scrollConfig}
            to="menu"
            className="cursor-pointer hover:text-black transition-colors duration-300"
          >
            <button className="flex items-center gap-2 bg-white text-black font-semibold px-5 py-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition duration-300">
              <FaShoppingCart /> Order
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-black via-primary to-secondary text-white shadow-lg">
          <ul className="flex flex-col items-center gap-6 py-6 font-medium text-lg">
            <li>
              <Link
                {...scrollConfig}
                to="home"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-white/80"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                {...scrollConfig}
                to="about"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-white/80"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                {...scrollConfig}
                to="menu"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-white/80"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                {...scrollConfig}
                to="services"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-white/80"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                {...scrollConfig}
                to="contact"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-white/80"
              >
                Contact
              </Link>
            </li>
            <button className="flex items-center gap-2 bg-white text-black font-semibold px-5 py-2 rounded-full shadow-lg hover:bg-secondary hover:text-white transition duration-300">
              <FaShoppingCart /> Order
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
