import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGuestInfo } from "../Redux/GuestSlice";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Components/Toast";
export function SignUp() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const dispatch = useDispatch();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // guest info

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("0000 0000 000");
  const [dateOfBirth, setDateOfBirth] = useState("00/00/0000");
  const [job, setJob] = useState("");
  const [gender, setGender] = useState("not selected");
  const [nid, setNid] = useState("00000000000000");
  const [nationality, setNationality] = useState("not selected");
  const [country, setCountry] = useState("not selected");
  const [city, setCity] = useState("not selected");
  const [maritalStatus, setMaritalStatus] = useState("not selected");
  const guest = {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Password: password,
    Address: address,
    Phone: phone,
    DateOfBirth: dateOfBirth,
    Job: job,
    Gender: gender,
    NationalID: nid,
    Nationality: nationality,
    Country: country,
    City: city,
    MaritalStatus: maritalStatus,
    FavoriteHotels: [],
    Bookings: [],
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (!firstName || !email || !password) {
      setToast({
        show: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    fetch("http://localhost:8080/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guest),
    })
      .then((res) => {
        if (res.ok) {
          setToast({
            show: true,
            message: "Signed up successfully!",
            type: "success",
          });
          dispatch(setGuestInfo(guest));
          setTimeout(() => {
            navigate("/profile/" + guest.id);
          }, 3000);
        } else {
          setToast({
            show: true,
            message: "Something went wrong, please try again.",
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full flex flex-col items-center justify-center p-4 space-y-8 md:space-y-0 md:space-x-4"
    >
      {/* heading */}
      <motion.div variants={itemVariants}>
        <h1
          style={{ fontFamily: "Kaushan Script" }}
          className="text-4xl font-bold mb-4 text-[#2c4c74]"
        >
          Sign Up
        </h1>
      </motion.div>

      {/* form */}
      <motion.div
        variants={containerVariants}
        className="bg-[#2c4c74] flex justify-center flex-col w-full md:w-[600px] rounded-lg shadow-lg p-6"
      >
        {[
          {
            label: "National ID",
            type: "text",
            onchange: (e) => setNid(e.target.value),
          },
          {
            label: "First Name",
            type: "text",
            onchange: (e) => setFirstName(e.target.value),
          },
          {
            label: "Last Name",
            type: "text",
            onchange: (e) => setLastName(e.target.value),
          },
          {
            label: "Email",
            type: "email",
            onchange: (e) => setEmail(e.target.value),
          },
          {
            label: "Password",
            type: "password",
            onchange: (e) => setPassword(e.target.value),
          },
          {
            label: "Address",
            type: "text",
            onchange: (e) => setAddress(e.target.value),
          },
          {
            label: "Phone",
            type: "tel",
            onchange: (e) => setPhone(e.target.value),
          },
          {
            label: "Date of Birth",
            type: "date",
            onchange: (e) => setDateOfBirth(e.target.value),
          },
          {
            label: "Job",
            type: "text",
            onchange: (e) => setJob(e.target.value),
          },
          {
            label: "City",
            type: "text",
            onchange: (e) => setCity(e.target.value),
          },
        ].map((field, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col mb-4"
          >
            <span className="text-lg font-bold text-white mb-2">
              {field.label}
            </span>
            <input
              onChange={field.onchange}
              type={field.type}
              className="border border-white text-white rounded-md p-2 bg-transparent focus:outline-none"
            />
          </motion.div>
        ))}

        {/* Select Fields */}
        {[
          {
            label: "Gender",
            options: ["", "Male", "Female"],
            onchange: (e) => setGender(e.target.value),
          },
          {
            label: "Marital Status",
            options: ["", "Married", "Single"],
            onchange: (e) => setMaritalStatus(e.target.value),
          },
          {
            label: "Nationality",
            options: ["", "Egyptian", "Non-Egyptian"],
            onchange: (e) => setNationality(e.target.value),
          },
          {
            label: "Country",
            options: ["", "Egypt", "Non-Egypt"],
            onchange: (e) => setCountry(e.target.value),
          },
        ].map((select, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col mb-4"
          >
            <span className="text-lg font-bold text-white mb-2">
              {select.label}
            </span>
            <select
              className="border border-white text-[#2c4c74] rounded-md p-2 bg-white"
              onChange={select.onchange}
            >
              {select.options.map((option, idx) => (
                <option key={idx} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </motion.div>
        ))}

        {/* button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-4"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#e11d48",
              color: "#fff",
            }}
            transition={{ duration: 0.3 }}
            className="bg-white text-[#2c4c74] font-bold py-2 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Sign Up
          </motion.button>
        </motion.div>
      </motion.div>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </motion.div>
  );
}
