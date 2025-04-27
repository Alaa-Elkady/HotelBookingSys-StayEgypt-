import { Hotels } from "../APIs/hotels";
export function TopHotels() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* title */}
      <div className="row text-[#2c4c74] flex items-center justify-center my-4 p-4 border-1 rounded-full  ">
        <i class="fa-solid fa-hotel text-3xl"></i>
        <span style={{ fontFamily: "Kaushan Script" }} className="text-4xl">
          Top Hotels
        </span>
      </div>
      
      {/* cards */}
      <div className="row w-full flex flex-wrap items-center justify-center p-4 gap-4">
        {Hotels.filter((hotel) => hotel.HotelRating >= 4.9)
          .splice(0, 5)
          .map((hotel) => (
            <div
              key={hotel.id}
              className="relative group w-[200px] h-[200px] bg-gray-200 rounded-full my-4 overflow-hidden hover:scale-105 transition duration-300"
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
            </div>
          ))}
      </div>
    </div>
  );
}
