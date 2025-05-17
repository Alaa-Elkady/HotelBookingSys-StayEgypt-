import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setGuestInfo } from "../Redux/GuestSlice";
import { Toast } from "./Toast";
export function EditProfile() {
  const guest = useSelector((state) => state.guest.guest);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [formData, setFormData] = useState({
    FirstName: guest.FirstName,
    LastName: guest.LastName,
    Email: guest.Email,
    Phone: guest.Phone,
    Address: guest.Address,
    Country: guest.Country,
    City: guest.City,
    DateOfBirth: guest.DateOfBirth,
    Job: guest.Job,
    Gender: guest.Gender,
    NationalID: guest.NationalID,
    Nationality: guest.Nationality,
    MaritalStatus: guest.MaritalStatus,

  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSave(e) {
    e.preventDefault();

    fetch(`http://localhost:8080/guests/${guest.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedGuest) => {
        dispatch(setGuestInfo(updatedGuest));
        setToast({
          show: true,
          message: "Profile updated successfully!",
          type: "success",
        });
        setTimeout(() => {
          navigate("/profile/" + guest.id);
        }, 3000);
      })
      .catch((error) => {
        setToast({
          show: true,
          message: "Something went wrong, please try again.",
          type: "error",
        });
      });
  }

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1
        style={{ fontFamily: "Kaushan Script" }}
        className="text-3xl font-bold text-[#2c4c74] my-6 text-center"
      >
        Edit Your Profile
      </h1>

      <form
        onSubmit={handleSave}
        className="w-full max-w-lg bg-white shadow-md rounded-xl p-6 space-y-5"
      >
        {[
          { label: "First Name", name: "FirstName" },
          { label: "Last Name", name: "LastName" },
          { label: "Email", name: "Email", type: "email" },
          { label: "Phone", name: "Phone", type: "tel" },
          { label: "Address", name: "Address" },
          { label: "Country", name: "Country" },
          { label: "City", name: "City" },
          { label: "Date of Birth", name: "DateOfBirth" },
          { label: "Job", name: "Job" },
          { label: "Gender", name: "Gender" },
          { label: "National ID", name: "NationalID" },
          { label: "Nationality", name: "Nationality" },
          { label: "Marital Status", name: "MaritalStatus" },
        ].map((field) => (
          <div key={field.name} className="mb-4  flex">
            <label className="text-[#2c4c74] font-bold w-[150px] m-1">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2c4c74] transition"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-[#2c4c74] text-white p-3 rounded hover:bg-[#1e3552] transition text-lg font-bold"
        >
          Save Changes
        </button>
      </form>
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
