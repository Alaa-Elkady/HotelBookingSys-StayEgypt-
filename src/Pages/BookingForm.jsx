import { useParams } from "react-router-dom";
import { Hotels } from "../APIs/hotels";
import { useSelector, useDispatch } from "react-redux";
import { setGuestInfo } from "../Redux/GuestSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function BookingForm() {
    const nav = useNavigate();
  const hotelId = useParams().hotelId;
  const hotel = Hotels.find((hotel) => hotel.id === hotelId);
  const guest = useSelector((state) => state.guest.guest);
  const dispatch = useDispatch();
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
      alert("Please select both check-in and check-out dates.");
      return;
    }
    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    if (numberOfGuests < 1 || numberOfRooms < 1) {
      alert("Guests and Rooms must be at least 1.");
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
            throw new Error(text || "Failed to update bookings");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Booking hotel is done successfully:", data);
        alert("Added to Bookings!");
        nav(`/bookings/${guest.id}`)
      })
      .catch((error) => {
        console.error("Error adding to favorites:", error);
        alert("Something went wrong! Please try again later.");
      });
  }
  return (
    <div className="flex flex-col items-center">
      <h1
        style={{ fontFamily: "Kaushan Script" }}
        className="text-2xl font-bold text-[#2c4c74] text-center m-4"
      >
        Booking " {hotel.HotelName} " Form
      </h1>
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
        <input
          className="border border-[#2c4c74] rounded-lg m-4 p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2c4c74]"
          type="number"
          min={1}
          placeholder="Number of guests"
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
        <input
          className="border border-[#2c4c74] rounded-lg m-4  p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2c4c74]"
          type="number"
          min={1}
          placeholder="Number of rooms"
          onChange={(e) => setNumberOfRooms(e.target.value)}
        />

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
    </div>
  );
}
