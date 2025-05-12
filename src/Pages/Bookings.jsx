import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setGuestInfo } from "../Redux/GuestSlice";
import { BookingCard } from "../Components/BookingCard";
import { Toast } from "../Components/Toast";
export function Bookings() {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const guest = useSelector((state) => state.guest.guest);
  const bookings = guest.Bookings;
  const dispatch = useDispatch();
  const [status, setStatus] = useState(0);

  // Update booking status function
  function updateBookingStatus(guestId, bookingId, newStatus) {
    fetch(`http://localhost:8080/guests/${guestId}`)
      .then((res) => res.json())
      .then((guest) => {
        const updatedBookings = guest.Bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, bookingStatus: newStatus }
            : booking
        );

        fetch(`http://localhost:8080/guests/${guestId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Bookings: updatedBookings }),
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(setGuestInfo({ ...guest, Bookings: updatedBookings }));
            setToast({
              show: true,
              message: "Booking status updated!",
              type: "success",
            });
          })
          .catch((err) =>
            setToast({
              show: true,
              message: "Something went wrong, please try again.",
              type: "error",
            })
          );
      });
  }

  // Filter bookings by status
  const getFilteredBookings = () => {
    switch (status) {
      case 0:
        return bookings.filter(
          (booking) =>
            booking.bookingStatus !== "Cancelled" &&
            booking.bookingStatus !== "Confirmed"
        );
      case 1:
        return bookings.filter(
          (booking) => booking.bookingStatus === "Cancelled"
        );
      case 2:
        return bookings.filter(
          (booking) => booking.bookingStatus === "Confirmed"
        );
      default:
        return bookings;
    }
  };

  const statusTitles = ["Pending", "Cancelled", "Confirmed"];
  const icons = [
    "fa-spinner animate-spin",
    "fa-xmark animate-ping",
    "fa-check animate-bounce",
  ];

  return (
    <>
      <div>
        <h1
          style={{ fontFamily: "Kaushan Script" }}
          className="text-4xl font-bold text-[#2c4c74] text-center m-4"
        >
          Your Bookings
        </h1>
        <div className="flex items-center justify-center">
          {statusTitles.map((title, idx) => (
            <button
              key={idx}
              className="bg-[#2c4c74] text-white px-4 py-2 rounded-lg m-4 cursor-pointer hover:bg-white hover:text-[#2c4c74] hover:border-[#2c4c74] border-2"
              onClick={() => setStatus(idx)}
            >
              {title} <i className={`fa-solid ${icons[idx]} ml-2`}></i>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-screen flex flex-col items-center w-full p-4">
        {getFilteredBookings().length > 0 ? (
          getFilteredBookings().map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              guestId={guest.id}
              onUpdateStatus={updateBookingStatus}
              isActionable={status === 0}
            />
          ))
        ) : (
          <div className="h-full w-full flex align-center justify-center text-center text-2xl text-[#2c4c74] font-bold mt-10">
            <i className="fa-solid fa-bell animate-pulse text-red-600 mr-2 text-3xl"></i>
            {`No ${statusTitles[status]} bookings found.`}
          </div>
        )}
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}
      </div>
    </>
  );
}
