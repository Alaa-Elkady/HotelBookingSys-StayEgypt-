import avatar from "../Pics/avatar.avif";
import { Hotels } from "../APIs/hotels";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setGuestInfo } from "../Redux/GuestSlice";
import { useState } from "react";
import { Toast } from "../Components/Toast";
export function HotelDetails() {
  const id = useParams().id;
  const currentHotel = Hotels.find((hotel) => hotel.id === id);
  const guest = useSelector((state) => state.guest.guest);
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  // Handle the case when hotel is not found
  if (!currentHotel) {
    setToast({
      show: true,
      message: "Hotel not found",
      type: "error",
    });
  }

  if (!guest) {
    setToast({
      show: true,
      message: "Guest not logged in",
      type: "error",
    });
  }

  function addToFav(hotel) {
    if (!guest || !guest.id) {
      setToast({
        show: true,
        message: "Guest not logged in or missing ID",
        type: "error",
      });
      return;
    }

    if (guest.FavoriteHotels.find((id) => id === hotel.id)) {
      setToast({
        show: true,
        message: "Hotel already in favorites",
        type: "error",
      });
    } else {
      const currentFavorites = Array.isArray(guest.FavoriteHotels)
        ? guest.FavoriteHotels
        : [];

      fetch(`http://localhost:8080/guests/${guest.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FavoriteHotels: [...currentFavorites, hotel.id],
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              setToast({
                show: true,
                message: "Something went wrong, please try again.",
                type: "error",
              });
            });
          }
          return response.json();
        })
        .then((data) => {
          setToast({
            show: true,
            message: "Hotel added to favorites!",
            type: "success",
          });
          dispatch(
            setGuestInfo({ ...guest, FavoriteHotels: data.FavoriteHotels })
          );
        })
        .catch((error) => {
          setToast({
            show: true,
            message: "Something went wrong, please try again.",
            type: "error",
          });
        });
    }
  }

  return (
   <div className="flex flex-col justify-center items-center p-4">
  {/* top section */}
  <div className="w-full flex flex-col lg:flex-row justify-center items-center">
    {/* left section */}
    <div className="flex flex-col justify-center items-center">
      {/* Hotel name */}
      <div
        style={{ fontFamily: "Kaushan Script" }}
        className="text-3xl font-bold text-[#2c4c74] text-center m-4"
      >
        {currentHotel.HotelName}
      </div>
      {/* hotel img */}
      <img
        className="w-full max-w-[500px] shadow-lg rounded-lg bg-cover bg-center"
        src={currentHotel.HotelImage}
        alt="Hotel"
      />
    </div>

    {/* right section */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-start justify-center p-4 text-[#2c4c74] w-full lg:w-1/2"
    >
      {/* hotel info */}
      <p className="text-lg my-1">
        <i className="fa-solid fa-location-dot mr-2 text-[#2c4c74]"></i>
        {currentHotel.HotelLocation}
      </p>
      <p className="text-lg my-1">
        <span className="font-bold">Price:</span> {currentHotel.HotelPrice}{" "}
        <span className="font-bold">EGP</span>
      </p>
      <p className="text-lg my-1">
        <span className="font-bold">Rating:</span> {currentHotel.HotelRating}
        <i className="fa-solid fa-star text-yellow-400 ml-2"></i>
      </p>
      <p className="text-lg my-1">
        <span className="font-bold">Rooms:</span> {currentHotel.HotelRooms}
      </p>
      <p className="text-lg my-1 w-full flex flex-wrap items-center">
        <span className="font-bold">Services:</span>
        {currentHotel.HotelServices.map((service, index) => (
          <span
            key={index}
            className="m-1 p-2 rounded-full text-xs bg-[#2c4c74] text-white"
          >
            {service}
          </span>
        ))}
      </p>
      <p className="text-lg my-1">
        <span className="font-bold">Description:</span>
        <p className="text-sm w-full border border-[#2c4c74] m-2 p-2 rounded-lg">
          {currentHotel.HotelDescription}
        </p>
      </p>
    </motion.div>
  </div>

  {/* bottom section */}
  <div className="flex flex-col lg:flex-row items-start justify-around p-4 w-full">
    {/* Reviews */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-start justify-center p-4 w-full lg:w-2/3"
    >
      <h2
        style={{ fontFamily: "Kaushan Script" }}
        className="text-3xl font-bold text-[#2c4c74]"
      >
        Reviews
      </h2>
      {currentHotel.HotelReviews.map((review, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="w-full max-w-[700px] m-2 flex flex-col items-start justify-center p-4 text-[#2c4c74] rounded-lg border border-[#2c4c74]"
        >
          <div className="flex items-center">
            <img
              className="w-[40px] h-[40px] m-2 rounded-full"
              src={avatar}
              alt="Reviewer Avatar"
            />
            <span
              style={{ fontFamily: "Kaushan Script" }}
              className="font-bold"
            >
              {review.reviewerName}
            </span>
          </div>
          <p className="text-xs">{review.review}</p>
        </motion.div>
      ))}
    </motion.div>

    {/* buttons */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col justify-center items-center m-4 w-full lg:w-[200px]"
    >
      <Link
        to={`/booking/${currentHotel.id}`}
        className="text-center m-2 p-2 w-full rounded-lg bg-[#2c4c74] text-white"
      >
        Book Now
      </Link>
      <button
        onClick={() => addToFav(currentHotel)}
        className="m-2 p-2 w-full rounded-lg bg-[#2c4c74] text-white cursor-pointer"
      >
        Add to Favourites
      </button>
    </motion.div>
  </div>

  {toast.show && (
    <Toast
      message={toast.message}
      type={toast.type}
      onClose={() => setToast({ ...toast, show: false })}
    />
  )}
</div>

  );
}
