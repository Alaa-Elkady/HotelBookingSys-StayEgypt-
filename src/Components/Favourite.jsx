import { motion } from "framer-motion";
import { Hotels } from "../APIs/hotels";
import { useSelector } from "react-redux";
export function Favourite() {
  const guest = useSelector((state) => state.guest.guest);
  const hotels = Hotels.filter(
    (hotel) => guest.FavoriteHotels && guest.FavoriteHotels.includes(hotel.id)
  );

  return (
    <>
      <div
        style={{ fontFamily: "Kaushan Script" }}
        className="text-center text-3xl text-[#2c4c74] m-4 font-bold"
      >
        Your Favorite Hotels
      </div>
      {hotels.map((hotel) => (
        <motion.div
          className="w-full border-b border-gray-300 flex flex-col md:flex-row justify-between p-4 shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          key={hotel.id}
        >
          <img
            className="w-full md:w-[200px] h-[200px] object-cover rounded-lg"
            src={hotel.HotelImage}
            alt="img"
          />
          <div className="flex-1 flex flex-col items-start justify-center p-4">
            <p className="text-2xl  text-[#2c4c74]">{hotel.HotelName}</p>
            <p className="text-sm my-1">
              <i className="fa-solid fa-location-dot mr-2 text-[#2c4c74]"></i>
              {hotel.HotelLocation}
            </p>
            <p className="text-sm my-1">
              <span className="font-bold">Price:</span> {hotel.HotelPrice}{" "}
              <span className="font-bold">EGP</span>
            </p>
            <p className="text-sm my-1">
              <span className="font-bold">Rating:</span> {hotel.HotelRating}
              <i className="fa-solid fa-star text-yellow-400 ml-2"></i>
            </p>
            <div className="flex flex-wrap mt-2">
              {hotel.HotelServices.map((service, index) => (
                <p
                  key={index}
                  className="text-xs border rounded-full px-2 py-1 m-1 text-[#2c4c74] border-[#2c4c74]"
                >
                  {service}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
