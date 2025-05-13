import { useParams } from "react-router-dom";
import { Hotels } from "../APIs/hotels";
import { useSelector, useDispatch } from "react-redux";
import { setGuestInfo } from "../Redux/GuestSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Components/Toast";
export function BookingForm() {
  const nav = useNavigate();
  const hotelId = useParams().hotelId;
  const hotel = Hotels.find((hotel) => hotel.id === hotelId);
  const guest = useSelector((state) => state.guest.guest);
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [roomType, setRoomType] = useState("Single");
  const [notes, setNotes] = useState("");
  const booking = {
    hotelId: hotelId,
    hotelName: hotel.HotelName,
    hotelLocation: hotel.Location,
    hotelImage: hotel.HotelImage,
    guestId: guest.id,
    guestName: guest.FirstName + " " + guest.LastName,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    numberOfGuests: numberOfGuests,
    numberOfRooms: numberOfRooms,
    roomType: roomType,
    notes: notes,
    bookingStatus: "Pending",
  };
  function book() {
    if (!checkInDate || !checkOutDate) {
      setToast({
        show: true,
        message: "Please select both check-in and check-out dates.",
        type: "error",
      });
      return;
    }
    if (checkOutDate <= checkInDate) {
      setToast({
        show: true,
        message: "Check-out date must be after check-in date.",
        type: "error",
      });
      return;
    }
    if (numberOfGuests < 1 || numberOfRooms < 1) {
      setToast({
        show: true,
        message: "Guests and Rooms must be at least 1.",
        type: "error",
      });
      return;
    }

    const newBookings = Array.isArray(guest.Bookings) ? guest.Bookings : [];
    dispatch(setGuestInfo({ ...guest, Bookings: [...newBookings, booking] }));

    fetch(`http://localhost:8080/guests/${guest.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Bookings: [...newBookings, booking],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            setToast({
              show: true,
              message: "Something went wrong!",
              type: "error",
            });
          });
        }
        return response.json();
      })
      .then((data) => {
        setToast({
          show: true,
          message: "Booking hotel is done successfully.",
          type: "success",
        });
        setTimeout(() => {
          nav(`/bookings/${guest.id}`);
        }, 3000);
      })
      .catch((error) => {
        setToast({
          show: true,
          message: "Something went wrong!",
          type: "error",
        });
      });
  }
  return (
    <div className="flex flex-col items-center">
      {/* title */}
      <h1
        style={{ fontFamily: "Kaushan Script" }}
        className="text-2xl font-bold text-[#2c4c74] text-center m-4"
      >
        Booking " {hotel.HotelName} " Form
      </h1>

      {/* check-in date */}
      <div className="flex flex-col items-center w-[500px]">
        <div className="w-full m-4 mb-2">
          <p className="text-[#2c4c74]">Check-in Date</p>
          <input
            className="border border-[#2c4c74] rounded-lg  p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2c4c74]"
            type="date"
            placeholder="check-in date"
            onChange={(e) => setCheckInDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* check-out date */}
        <div className="w-full m-4">
          <p className="text-[#2c4c74]">Check-out Date</p>
          <input
            className="border border-[#2c4c74] rounded-lg  p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2c4c74]"
            type="date"
            placeholder="check-out date"
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate || new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* number of guests */}
        <input
          className="border border-[#2c4c74] rounded-lg m-4 p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2c4c74]"
          type="number"
          min={1}
          placeholder="Number of guests"
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />

        {/* number of rooms */}
        <input
          className="border border-[#2c4c74] rounded-lg m-4  p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2c4c74]"
          type="number"
          min={1}
          placeholder="Number of rooms"
          onChange={(e) => setNumberOfRooms(e.target.value)}
        />

        {/*  room type */}
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          required
          className="border border-[#2c4c74] rounded-lg m-4 p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2c4c74]"
        >
          <option value="single">single </option>
          <option value="double">double </option>
          <option value="triple">triple </option>
        </select>

        {/* notes */}
        <textarea
          onChange={(e) => setNotes(e.target.value)}
          className="border border-[#2c4c74] rounded-lg m-4 p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2c4c74]"
          placeholder="Additional Notes"
        />

        <button
          onClick={book}
          className="bg-[#2c4c74] text-white rounded-lg p-2 w-full m-4 hover:cursor-pointer "
        >
          Book Now
        </button>
      </div>
      
      {/* toast */}
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
