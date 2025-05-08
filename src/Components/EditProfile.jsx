import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setGuestInfo } from "../Redux/GuestSlice";

export function EditProfile() {
  const guest = useSelector((state) => state.guest.guest);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FirstName: guest.FirstName,
    LastName: guest.LastName,
    Email: guest.Email,
    Phone: guest.Phone,
    Address: guest.Address,
    Country: guest.Country,
    City: guest.City,
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
        alert("Profile updated successfully!");
        navigate("/profile/" + guest.id);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Something went wrong, please try again.");
      });
  }

  return (
    <div>
      <h1
        style={{ fontFamily: "Kaushan Script" }}
        className="text-3xl font-bold text-[#2c4c74] my-6 text-center"
      >
        Edit Your Profile
      </h1>

      <form onSubmit={handleSave} className="w-full max-w-md space-y-4">
        {[
          { label: "First Name", name: "FirstName" },
          { label: "Last Name", name: "LastName" },
          { label: "Email", name: "Email", type: "email" },
          { label: "Phone", name: "Phone", type: "tel" },
          { label: "Address", name: "Address" },
          { label: "Country", name: "Country" },
          { label: "City", name: "City" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-[#2c4c74] font-bold mb-2">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2c4c74]"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-[#2c4c74] text-white p-2 rounded hover:bg-[#1e3552] transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
