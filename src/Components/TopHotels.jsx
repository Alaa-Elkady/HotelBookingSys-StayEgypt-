import { Hotels } from "../APIs/hotels";
import { motion } from "framer-motion";

export function TopHotels() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* title */}
      <motion.div
        className="row text-[#2c4c74] flex items-center justify-center my-4 p-4 border-1 rounded-full"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <i className="fa-solid fa-hotel text-3xl"></i>
        <span style={{ fontFamily: "Kaushan Script" }} className="text-4xl ml-2">
          Top Hotels
        </span>
      </motion.div>

      {/* cards */}
      <div className="row w-full flex flex-wrap items-center justify-center p-4 gap-4">
        {Hotels.filter((hotel) => hotel.HotelRating >= 4.9)
          .splice(0, 5)
          .map((hotel, index) => (
            <motion.div
              key={hotel.id}
              className="relative group w-[200px] h-[200px] bg-gray-200 rounded-full my-4 overflow-hidden hover:scale-105 transition duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}  // amount 0.3 يعني يبدأ لما 30% من العنصر يظهر
            >
              <img
                src={hotel.HotelImage}
                alt="img"
                className="w-full h-full object-cover rounded-full transition duration-300 group-hover:brightness-50"
              />
              <div
                style={{ fontFamily: "Kaushan Script" }}
                className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition duration-300 p-4 text-center"
              >
                {hotel.HotelName}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}

