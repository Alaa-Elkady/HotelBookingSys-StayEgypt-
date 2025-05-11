import avatar from "../Pics/avatar.avif";
import { Hotels } from "../APIs/hotels";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setGuestInfo } from "../Redux/GuestSlice";

export function HotelDetails() {
  const id = useParams().id;
  const currentHotel = Hotels.find((hotel) => hotel.id === id);
  const guest = useSelector((state) => state.guest.guest);
  const dispatch = useDispatch();

  // Handle the case when hotel is not found
  if (!currentHotel) {
    return <p>Hotel not found!</p>;
  }

  // Check if guest is logged in
  if (!guest) {
    return <p>Guest not logged in!</p>;
  }

  function addToFav(hotel) {
    if (!guest || !guest.id) {
      alert("Guest not logged in or missing ID");
      return;
    }

    const currentFavorites = Array.isArray(guest.FavoriteHotels)
      ? guest.FavoriteHotels
      : [];

    console.log("Adding to favorites for guest ID:", guest.id); // Add a log here

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
            throw new Error(text || "Failed to update favorites");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Favorite hotel added successfully:", data);
        alert("Added to favorites!");
        dispatch(setGuestInfo(data)); // Update guest info with new favorites
      })
      .catch((error) => {
        console.error("Error adding to favorites:", error);
        alert("Something went wrong! Please try again later.");
      });
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {/* top section */}
      <div className="w-full flex flex-row justify-center items-center">
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
            className="w-[500px] shadow-lg rounded-lg bg-cover bg-center"
            src={currentHotel.HotelImage}
            alt="Hotel"
          />
        </div>

        {/* right section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start justify-center p-4 text-[#2c4c74]"
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
            <span className="font-bold">Rating:</span>{" "}
            {currentHotel.HotelRating}
            <i className="fa-solid fa-star text-yellow-400 ml-2"></i>
          </p>
          <p className="text-lg my-1">
            <span className="font-bold">Rooms:</span> {currentHotel.HotelRooms}
          </p>
          <p className="text-lg my-1 w-[600px] flex flex-wrap items-center">
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
            <p className="text-sm w-[600px] border border-[#2c4c74] m-2 p-2 rounded-lg">
              {currentHotel.HotelDescription}
            </p>
          </p>
        </motion.div>
      </div>

      {/* bottom section */}
      <div className="flex flex-row items-start justify-around p-4 w-full">
        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-start justify-center p-4"
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
              className="w-[700px] m-2 flex flex-col items-start justify-center p-4 text-[#2c4c74] rounded-lg border border-[#2c4c74]"
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
          className="flex w-[200px] flex-col justify-center items-center m-4"
        >
          <Link to={`/booking/${currentHotel.id}`} className="text-center m-2 p-2 w-full rounded-lg bg-[#2c4c74] text-white">
            Book Now
          </Link>
          <button
            onClick={() => addToFav(currentHotel)}
            className="m-2 p-2 w-full rounded-lg bg-[#2c4c74] text-white"
          >
            Add to Favourites
          </button>
        </motion.div>
      </div>
    </div>
  );
}
