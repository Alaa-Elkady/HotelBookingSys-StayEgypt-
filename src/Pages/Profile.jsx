import { useSelector } from "react-redux";
import male from "../Pics/male.jpg";
import female from "../Pics/female.jpg";
import { ProfileInfo } from "../Components/ProfileInfo";
import { Favourite } from "../Components/Favourite";
import { useState } from "react";
import { EditProfile } from "../Components/EditProfile";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const nav = useNavigate();
  const guest = useSelector((state) => state.guest.guest);
  const [edit, setEdit] = useState(false);
  const [fav, setFav] = useState(false);

  if (!guest) {
    return (
      <div className="text-center text-2xl text-[#2c4c74] mt-10">
        No guest information found.
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Sidebar */}
      <div className="w-full md:w-[350px] bg-[#2c4c74] p-4 flex flex-col items-center text-white">
        {/* Profile Image */}
        <div className="rounded-full w-[180px] h-[180px] m-4 overflow-hidden">
          <img
            src={guest.Gender === "Male" ? male : female}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <p
          style={{ fontFamily: "Kaushan Script" }}
          className="text-2xl font-bold text-center mb-5"
        >
          {guest.FirstName + " " + guest.LastName}
        </p>

        {/* Sidebar Buttons */}
        {[
          {
            label: "My Profile",
            icon: <i className="fa-solid fa-user"></i>,
            onclick: () => {
              setEdit(false);
              setFav(false);
            },
          },
          {
            label: "Edit Profile",
            icon: <i className="fa-solid fa-user-pen"></i>,
            onclick: () => {
              setEdit(true);
              setFav(false);
            },
          },
          {
            label: "Bookings",
            icon: <i className="fa-solid fa-hotel"></i>,
            onclick: () => {
              nav(`/bookings/${guest.id}`);
            },
          },
          {
            label: "Favourite Hotels",
            icon: <i className="fa-solid fa-star"></i>,
            onclick: () => {
              setFav(true);
              setEdit(false);
            },
          },
        ].map((item, index) => (
          <button
            key={index}
            className="bg-white w-full max-w-[220px] text-[#2c4c74] p-2 my-2 cursor-pointer rounded-full active:bg-[#2c4c74] active:text-white active:scale-95 transition-all duration-300 ease-in-out"
            onClick={() => item.onclick && item.onclick()}
          >
            {item.icon} <span className="ml-2">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 flex flex-col items-start justify-start">
        {!edit && !fav && <ProfileInfo />}
        {edit && !fav && <EditProfile />}
        {fav && !edit && <Favourite />}
      </div>
    </div>
  );
}
