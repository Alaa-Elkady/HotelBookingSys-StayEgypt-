import pic from "../Pics/freepik__background__74189.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGuestInfo } from "../Redux/GuestSlice";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Components/Toast";
export function SignIn() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSignIn(e) {
    e.preventDefault();
    if (!email || !password) {
      setToast({
        show: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    fetch(`http://localhost:8080/guests?email=${email}&password=${password}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          dispatch(setGuestInfo(data[0]));
          setToast({
            show: true,
            message: "Signed in successfully!",
            type: "success",
          });
          setTimeout(() => {
            navigate("/profile/" + data[0].id);
          }, 3000);
        } else {
          setToast({
            show: true,
            message: "Invalid email or password.",
            type: "error",
          });
        }
      });
  }
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center h-[600px] p-4 space-y-8 md:space-y-0 md:space-x-4">
      {/* Image with fade-in from left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden md:flex justify-center"
      >
        <img className="w-2/3 h-auto" src={pic} alt="background" />
      </motion.div>

      {/* Form with fade-in from bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full md:w-[600px] bg-[#2c4c74] flex justify-center flex-col rounded-lg shadow-lg p-6"
      >
        <h1
          className="font-bold text-white text-3xl mb-6 text-center"
          style={{ fontFamily: "Kaushan Script" }}
        >
          Guest SignIn
        </h1>

        <div className="flex flex-col mb-4">
          <span className="text-lg font-bold text-white mb-2">Email</span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border border-white text-white rounded-md p-2 bg-transparent focus:outline-none focus:ring focus:ring-white"
          />
        </div>

        <div className="flex flex-col mb-4">
          <span className="text-lg font-bold text-white mb-2">Password</span>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border border-white text-white rounded-md p-2 bg-transparent focus:outline-none focus:ring focus:ring-white"
          />
        </div>

        <button
          style={{ fontFamily: "Kaushan Script" }}
          className="bg-white text-[#2c4c74] rounded-md text-xl mt-4 p-2 cursor-pointer transition hover:opacity-80"
          onClick={handleSignIn}
        >
          SignIn
        </button>
      </motion.div>
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
