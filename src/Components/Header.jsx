import logo from "../Pics/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutGuest } from "../Redux/GuestSlice";
import { useState } from "react";
export function Header() {
  const guest = useSelector((state) => state.guest.guest);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="w-full flex flex-wrap justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-50 ">
      {/* logo */}
      <Link to="/">
        <img className="w-[150px]" src={logo} alt="logo" />
      </Link>

      {/* pages */}
      <div className=" hidden md:flex text-[#2c4c74] text-lg flex-wrap items-center ">
        <Link
          className="mr-4 hover:border-b-2 hover:border-[#2c4c74] transition"
          to="/"
        >
          Home
        </Link>
        <Link
          className="mr-4 hover:border-b-2 hover:border-[#2c4c74] transition"
          to="/about"
        >
          About
        </Link>
        <Link
          className="mr-4 hover:border-b-2 hover:border-[#2c4c74] transition"
          to="/contact"
        >
          Contact
        </Link>
        <Link
          className="mr-4 hover:border-b-2 hover:border-[#2c4c74] transition"
          to="/hotels"
        >
          Hotels
        </Link>

        {guest && (
          <Link
            className="mr-4 hover:border-b-2 hover:border-[#2c4c74] transition"
            to={`/bookings/${guest.id}`}
          >
            Bookings
          </Link>
        )}
      </div>

      {/* buttons */}
      {!guest && (
        <div className="flex items-center mt-2 sm:mt-0">
          <button className="bg-[#2c4c74] text-white px-4 py-2 rounded-full mr-4 hover:bg-[#1e3552] transition">
            <Link to="/signin">Sign In</Link>
          </button>
          <div className="mr-2 text-gray-400">|</div>
          <button className="bg-[#2c4c74] text-white px-4 py-2 rounded-full hover:bg-[#1e3552] transition">
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      )}

      {/* guest name and logout */}
      {guest && (
        <div className="flex items-center">
          <Link to={`/profile/${guest.id}`} className="cursor-pointer">
            <i className="fa-solid fa-user text-[#2c4c74] mr-4"></i>
            <span
              style={{ fontFamily: "Kaushan Script" }}
              className="text-[#2c4c74] mr-4"
            >
              {guest.FirstName + " " + guest.LastName}
            </span>
          </Link>

          <button
            onClick={() => dispatch(logoutGuest())}
            className="text-[#2c4c74] text-xl px-4 py-2 rounded-full cursor-pointer hover:animate-pulse transition"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      )}

      {/* mobile menu */}
      <div
        className="text-[#2c4c74] md:hidden text-2xl cursor-pointer relative"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <i className="fa-solid fa-bars"></i>
        {showDropdown && (
          <div className="w-[200px] bg-white p-4 rounded-lg text-[#2c4c74]  flex flex-col absolute right-0 top-14">
            <Link
              className="mr-4 hover:border-b-2 hover:border-[#2c4c74] transition"
              to="/"
            >
              Home
            </Link>
            <Link
              className="mr-4 hover:border-b-2 hover:border-[#2c4c74] transition"
              to="/about"
            >
              About
            </Link>
            <Link
              className="mr-4 hover:border-b-2 hover:border-[#2c4c74] transition"
              to="/contact"
            >
              Contact
            </Link>
            <Link
              className="mr-4 hover:border-b-2 hover:border-[#2c4c74] transition"
              to="/hotels"
            >
              Hotels
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
