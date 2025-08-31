import React from "react";
import { motion } from "framer-motion";
import about from "../../assets/about.jpg";

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            About <span className="text-primary">Us</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Welcome to <span className="font-bold text-secondary">Restaurant</span>, 
            where every meal is more than just food—it’s{" "}
            <span className="italic">an experience</span>. We believe dining should delight{" "}
            <span className="text-secondary font-semibold">all your senses</span>, blending
            mouthwatering flavors with warm hospitality and a cozy ambiance.
          </p>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            From <span className="font-semibold">hand-picked ingredients</span> to{" "}
            <span className="font-semibold">chef-inspired recipes</span>, every dish is crafted with{" "}
            <span className="text-secondary font-semibold">passion and love</span>. Whether it’s a casual meal,
            a romantic dinner, or a celebration with friends, our goal is to make
            every moment <span className="font-bold text-secondary">unforgettable 🌿✨</span>
          </p>
        </motion.div>

        {/* Right Image with Attractive Hover */}
        <motion.div
          className="relative flex justify-center group"
          initial={{ opacity: 0, x: -150, scale: 0.8 }}   // starts left & smaller
          whileInView={{ opacity: 1, x: 0, scale: 1 }}    // zooms & slides into place
          transition={{ duration: 1.2, ease: "easeOut" }} // medium speed
          viewport={{ once: true }}
        >
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            whileHover={{
              scale: 1.15,
              rotate: 1,
              y: -10,
              boxShadow: "0px 20px 50px rgba(255, 193, 7, 0.6)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {/* Glow border effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent animate-pulse"></div>

            {/* Image */}
            <motion.img
              src={about}
              alt="about"
              className="rounded-2xl w-96 object-cover 
                         shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
              animate={{ y: [0, 8, 0, 12, 0] }} // floating effect
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}





















