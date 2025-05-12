import logo from "../Pics/logo.png";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className="w-full grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 items-center p-6 border-t border-[#2c4c74] bg-white ">
      {/* logo */}
      <div className="w-[200px] mx-auto md:mx-0">
        <img src={logo} alt="logo" />
      </div>

      {/* pages */}
      <div className="flex flex-col text-[#2c4c74] text-lg space-y-2 text-center md:text-left">
        <Link className="hover:text-blue-600 transition" to="/">
          Home
        </Link>
        <Link className="hover:text-blue-600 transition" to="/about">
          About
        </Link>
        <Link className="hover:text-blue-600 transition" to="/hotels">
          Hotels
        </Link>
        <Link className="hover:text-blue-600 transition" to="/contact">
          Contact
        </Link>
      </div>

      {/* email & phone */}
      <div className="flex flex-col text-[#2c4c74] text-lg space-y-2 text-center md:text-left">
        <div>
          <i className="fa-solid fa-envelope mr-2"></i>
          <span>stayegypt@gmail.com</span>
        </div>
        <div>
          <i className="fa-solid fa-phone mr-2"></i>
          <span>+20 123 4056 789</span>
        </div>
      </div>

      {/* Social Media */}
      <div className="flex justify-center md:justify-start space-x-4 text-2xl text-[#2c4c74]">
        <Link className="hover:text-blue-600 transition">
          <i className="fa-brands fa-facebook"></i>
        </Link>
        <Link className="hover:text-pink-500 transition">
          <i className="fa-brands fa-instagram"></i>
        </Link>
        <Link className="hover:text-sky-400 transition">
          <i className="fa-brands fa-twitter"></i>
        </Link>
        <Link className="hover:text-red-600 transition">
          <i className="fa-brands fa-youtube"></i>
        </Link>
      </div>
    </div>
  );
}
