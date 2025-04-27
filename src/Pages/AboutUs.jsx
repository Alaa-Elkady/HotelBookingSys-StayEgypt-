import image from "../Pics/Media player-amico (1).png";

export function AboutUs() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center p-8 max-w-6xl mx-auto">
      {/* left */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0 md:mr-8">
        <img className="w-full" src={image} alt="About stayEgypt" />
      </div>
      {/* right */}
      <div className="w-full md:w-1/2 text-left">
        <div
          style={{ fontFamily: "Kaushan Script" }}
          className="text-3xl font-bold text-[#E11D48] mb-4"
        >
          Welcome to stayEgypt — Your Gateway to the Best Hotels in Egypt!
        </div>
        <q className="text-[#2c4c74] mb-4 text-base leading-relaxed">
          At stayEgypt, we believe every journey should be unforgettable,
          starting with the perfect place to stay. Our mission is to help you
          easily discover and book the best hotels across Egypt, whether you're
          looking for a luxury escape, a cozy retreat, or a convenient stopover.
        </q>

        <div
          style={{ fontFamily: "Kaushan Script" }}
          className="text-2xl font-bold text-[#E11D48] mb-3"
        >
          Why Choose stayEgypt?
        </div>
        <ul className="text-[#2c4c74] mb-4 text-base list-disc list-inside space-y-2">
          <li>
            Top-rated hotels: Discover hotels with trusted reviews and high
            ratings.
          </li>
          <li>
            Wide variety of options: From seaside resorts to charming city
            hotels.
          </li>
          <li>
            Simple, fast booking: Reserve your stay in just a few easy steps.
          </li>
          <li>
            Local hospitality: Experience authentic Egyptian warmth wherever you
            go.
          </li>
        </ul>

        <div
          style={{ fontFamily: "Kaushan Script" }}
          className="text-2xl font-bold text-[#E11D48] mb-1"
        >
          Our Vision:
        </div>
        <q className="text-[#2c4c74] mb-4 text-base leading-relaxed">
          To be Egypt’s most trusted hotel booking platform, making travel
          easier, smoother, and more enjoyable for everyone.
        </q>

        <div
          style={{ fontFamily: "Kaushan Script" }}
          className="text-xl font-bold text-[#E11D48] mb-4"
        >
          Book your next stay with stayEgypt and start your adventure today!
        </div>

        {/* <button className="mt-4 px-6 py-2 bg-[#E11D48] text-white rounded-full shadow hover:bg-[#be123c] transition duration-300">
          Book Now
        </button> */}
      </div>
    </div>
  );
}
