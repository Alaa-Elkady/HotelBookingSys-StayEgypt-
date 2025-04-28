import { motion } from 'framer-motion';
import image from "../Pics/Media player-amico (1).png";

export function AboutUs() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center p-8 max-w-6xl mx-auto">
      {/* Left Section (Image) */}
      <motion.div
        className="w-full md:w-1/2 mb-6 md:mb-0 md:mr-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img className="w-full" src={image} alt="About stayEgypt" />
      </motion.div>

      {/* Right Section (Text) */}
      <motion.div
        className="w-full md:w-1/2 text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          style={{ fontFamily: "Kaushan Script" }}
          className="text-3xl font-bold text-[#2c4c74] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Welcome to stayEgypt — Your Gateway to the Best Hotels in Egypt!
        </motion.div>

        <motion.q
          className="text-[#2c4c74] mb-4 text-base leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          At stayEgypt, we believe every journey should be unforgettable,
          starting with the perfect place to stay. Our mission is to help you
          easily discover and book the best hotels across Egypt, whether you're
          looking for a luxury escape, a cozy retreat, or a convenient stopover.
        </motion.q>

        <motion.div
          style={{ fontFamily: "Kaushan Script" }}
          className="text-2xl font-bold text-[#2c4c74] mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Why Choose stayEgypt?
        </motion.div>

        <motion.ul
          className="text-[#2c4c74] mb-4 text-base list-disc list-inside space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <li>Top-rated hotels: Discover hotels with trusted reviews and high ratings.</li>
          <li>Wide variety of options: From seaside resorts to charming city hotels.</li>
          <li>Simple, fast booking: Reserve your stay in just a few easy steps.</li>
          <li>Local hospitality: Experience authentic Egyptian warmth wherever you go.</li>
        </motion.ul>

        <motion.div
          style={{ fontFamily: "Kaushan Script" }}
          className="text-2xl font-bold text-[#2c4c74] mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Our Vision:
        </motion.div>

        <motion.q
          className="text-[#2c4c74] mb-4 text-base leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          To be Egypt’s most trusted hotel booking platform, making travel easier, smoother, and more enjoyable for everyone.
        </motion.q>

        <motion.div
          style={{ fontFamily: "Kaushan Script" }}
          className="text-xl font-bold text-[#2c4c74] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          Book your next stay with stayEgypt and start your adventure today!
        </motion.div>
      </motion.div>
    </div>
  );
}
