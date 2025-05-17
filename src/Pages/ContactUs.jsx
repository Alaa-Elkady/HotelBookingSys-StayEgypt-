import { motion } from "framer-motion";
import { useState } from "react";
import { Toast } from "../Components/Toast";
import { useNavigate } from "react-router-dom";
export function ContactUs() {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const contactInfo = {
    fullName: fname + " " + lname,
    Phone: phone,
    Email: email,
    Message: message,
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (!fname || !lname || !phone || !email || !message) {
      setToast({
        show: true,
        message: "Please fill in all required fields",
        type: "error",
      });
    } else {
      fetch("http://localhost:8080/Feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactInfo),
      })
        .then((response) => {
          if (!response.ok) {
            setToast({
              show: true,
              message: "Something went wrong!",
              type: "error",
            });
          }
        })
        .then((data) => {
          setToast({
            show: true,
            message: "Message sent successfully!",
            type: "success",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    }
  }
  return (
    <div className="w-full flex flex-col md:flex-row items-left justify-center">
      {/* Left Section */}
      <motion.div
        className="md:w-1/2 w-full col bg-[#2c4c74] text-white p-[30px] flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1
          style={{ fontFamily: "Kaushan Script" }}
          className="text-4xl font-bold mb-4"
        >
          Contact StayEgypt
        </h1>
        <q className="mb-4 p-4 text-sm w-full">
          We're here to help! If you have any questions, feedback, or need
          assistance, don't hesitate to contact us. We're dedicated to providing
          you with the best experience possible. Your satisfaction is our top
          priority. Thank you for choosing stayEgypt!
        </q>
        <div className="flex flex-col text-lg space-y-2 text-center md:text-left">
          <div>
            <i className="fa-solid fa-envelope mr-2"></i>
            <span>stayegypt@gmail.com</span>
          </div>
          <div>
            <i className="fa-solid fa-phone mr-2"></i>
            <span>+20 123 4056 789</span>
          </div>
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="md:w-1/2 w-full col bg-white text-[#2c4c74] p-[30px] flex flex-col items-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full flex flex-row justify-between">
          <motion.div
            className="flex flex-col space-y-2 mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-lg font-bold">First Name</span>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) => setFname(e.target.value)}
              placeholder="First Name"
            />
          </motion.div>
          <motion.div
            className="flex flex-col space-y-2 mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-lg font-bold">Last Name</span>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) => setLname(e.target.value)}
              placeholder="Last Name"
            />
          </motion.div>
        </div>
        <motion.div
          className="flex flex-col space-y-2 mb-4 w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="text-lg font-bold">Email</span>
          <input
            type="email"
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </motion.div>
        <motion.div
          className="flex flex-col space-y-2 mb-4  w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="text-lg font-bold">Phone Number</span>
          <input
            type="phone"
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
        </motion.div>
        <motion.div
          className="flex flex-col space-y-2 mb-4  w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <span className="text-lg font-bold">Message</span>
          <textarea
            rows="4"
            cols="50"
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          ></textarea>
        </motion.div>
        <motion.button
          className="bg-[#2c4c74] text-white py-2 px-4 rounded-md w-full transition hover:opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          onClick={handleSubmit}
        >
          Submit
        </motion.button>
      </motion.div>
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
