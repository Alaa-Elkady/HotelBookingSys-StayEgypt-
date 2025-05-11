import { useSelector } from "react-redux";
import male from "../Pics/male.jpg";
import female from "../Pics/female.jpg";
import { ProfileInfo } from "../Components/ProfileInfo";
import { Favourite } from "../Components/Favourite";
import { useState } from "react";
import { EditProfile } from "../Components/EditProfile";
export function Profile() {
  const guest = useSelector((state) => state.guest.guest);
  const [edit, setEdit] = useState(false);
  const [fav, setFav] = useState(false);
  console.log(guest);
  if (!guest) {
    return (
      <div className="text-center text-2xl text-[#2c4c74] mt-10">
        No guest information found.
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row  h-full min-h-screen w-full ">
      <div className="w-[400px]  bg-[#2c4c74]  p-4 flex flex-col items-center text-white">
        <div className="rounded-full w-[200px] h-[200px] m-4">
          {guest.Gender === "Male" ? (
            <img src={male} alt="male" className="rounded-full " />
          ) : (
            <img src={female} alt="female" className="rounded-full " />
          )}
        </div>
        <p
          style={{ fontFamily: "Kaushan Script" }}
          className="text-2xl font-bold m-5"
        >
          {guest.FirstName + " " + guest.LastName}
        </p>
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
          { label: "Bookings", icon: <i className="fa-solid fa-hotel"></i> },
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
            className="bg-white w-[200px] text-[#2c4c74] p-2 m-2 cursor-pointer rounded-full active:bg-[#2c4c74] active:text-white active:scale-90 transition-all duration-300 ease-in-out"
            onClick={() => item.onclick && item.onclick()}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
      {!edit && !fav && (
        <div className="w-full flex flex-col items-left  p-4">
          <ProfileInfo />
        </div>
      )}
      {edit && !fav && (
        <div className="w-full flex flex-col items-left justify-center p-4">
          <EditProfile />
        </div>
      )}
      {fav && !edit && (
        <div className="w-full flex flex-col items-left  p-4">
          <Favourite />
        </div>
      )}
    </div>
  );
}
