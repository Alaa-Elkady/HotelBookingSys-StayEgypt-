export function BookingCard({
  booking,
  guestId,
  onUpdateStatus,
  isActionable,
}) {
  return (
    <div className="p-4 m-4 w-full max-w-[800px] flex flex-col md:flex-row items-center rounded-lg shadow-lg">
      <div className="w-full md:w-[200px] h-[200px] mb-4 md:mb-0">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={booking.hotelImage}
          alt=""
        />
      </div>

      <div className="flex-1 flex flex-col items-start justify-center md:pl-4 text-[#2c4c74] w-full">
        <div
          style={{ fontFamily: "Kaushan Script" }}
          className="text-3xl font-bold mb-2 text-center md:text-left"
        >
          {booking.hotelName}
        </div>
        <div className="flex items-center m-1">
          <i className="fa-solid fa-calendar-days mr-2"></i>
          <span className="font-bold">Check-in:</span>
          <p className="text-sm ml-1">{booking.checkInDate}</p>
        </div>
        <div className="flex items-center m-1">
          <i className="fa-solid fa-calendar-days mr-2"></i>
          <span className="font-bold">Check-out:</span>
          <p className="text-sm ml-1">{booking.checkOutDate}</p>
        </div>
        <div className="flex items-center m-1">
          <i className="fa-solid fa-users mr-2"></i>
          <span className="font-bold">Guests:</span>
          <p className="text-sm ml-1">{booking.numberOfGuests}</p>
        </div>
        <div className="flex items-center m-1">
          <i className="fa-solid fa-door-open mr-2"></i>
          <span className="font-bold">Rooms:</span>
          <p className="text-sm ml-1">{booking.numberOfRooms}</p>
        </div>
        <div className="flex items-center m-1">
          <span className="font-bold">Room Type:</span>
          <p className="text-sm ml-1">{booking.roomType}</p>
        </div>
      </div>

      <div className="w-full md:w-[180px] flex flex-col items-center mt-4 md:mt-0">
        <span
          className={`w-full font-bold border text-center rounded p-2 mb-2 ${
            booking.bookingStatus === "Pending"
              ? "text-green-600 border-green-600"
              : booking.bookingStatus === "Cancelled"
              ? "text-red-600 border-red-600"
              : "text-yellow-600 border-yellow-600"
          }`}
        >
          {booking.bookingStatus}
        </span>
        {isActionable && (
          <>
            <button
              onClick={() => onUpdateStatus(guestId, booking.id, "Confirmed")}
              className="w-full font-bold text-yellow-600 border border-yellow-600 rounded p-2 mb-2 cursor-pointer hover:bg-yellow-600 hover:text-white"
            >
              Confirm Booking
            </button>
            <button
              onClick={() => onUpdateStatus(guestId, booking.id, "Cancelled")}
              className="w-full font-bold text-red-600 border border-red-600 rounded p-2 cursor-pointer hover:bg-red-600 hover:text-white"
            >
              Cancel Booking
            </button>
          </>
        )}
      </div>
    </div>
  );
}
