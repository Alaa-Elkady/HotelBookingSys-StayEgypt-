import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Home } from "./Pages/Home";
import { AboutUs } from "./Pages/AboutUs";
import { SignUp } from "./Pages/SignUp";
import { ContactUs } from "./Pages/ContactUs";
import { SignIn } from "./Pages/SignIn";
import { HotelsPage } from "./Pages/Hotels";
import { HotelDetails } from "./Pages/HotelDetails";
import { Profile } from "./Pages/Profile";
import { Bookings } from "./Pages/Bookings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/profile/:guestId" element={<Profile />} />
          <Route path="/bookings/:guestId" element={<Bookings />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
