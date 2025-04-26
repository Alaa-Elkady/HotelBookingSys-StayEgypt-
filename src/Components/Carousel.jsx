import { useState, useEffect } from "react";
import img1 from "../Pics/1.jpg";
import img2 from "../Pics/2.jpg";
import img3 from "../Pics/3.jpg";
import img4 from "../Pics/4.jpg";

const images = [img1, img2, img3, img4];

export function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);
  return (
    <div className="w-full ">
      {/* image */}
      <img
        onClick={nextSlide}
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-[600px] object-cover brightness-50 transition-all duration-700 ease-in-out rounded-lg my-3"
      />

      {/* left arrow */}
      <i
        onClick={prevSlide}
        className="absolute top-1/2 left-2  fa-solid fa-arrow-left text-2xl text-white cursor-pointer hover:text-3xl"
      ></i>

      {/* text overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center ">
        <h1
          style={{ fontFamily: "Kaushan Script" }}
          className="text-4xl font-bold mb-4 animate-bounce"
        >
          Discover Your Perfect Stay
        </h1>
        <p className="text-lg">
          Find and book the best hotels in Egypt with exclusive offers
        </p>
      </div>

      {/* right arrow */}
      <i
        onClick={nextSlide}
        className="absolute top-1/2 right-2  fa-solid fa-arrow-right text-2xl text-white cursor-pointer hover:text-3xl"
      ></i>
    </div>
  );
}
