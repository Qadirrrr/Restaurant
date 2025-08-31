import React from "react";
import hero1 from "../../assets/hero1.jpg"; 
import hero2 from "../../assets/hero2.jpg"; 

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden">
      
      {/* Background Images with animation */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Hero1 */}
        <img
          src={hero1}
          alt="hero1"
          className="absolute 
            w-48 h-48 
            sm:w-56 sm:h-56 
            md:w-72 md:h-72 
            object-cover rounded-full shadow-lg 
            top-10 left-4 sm:left-10 md:left-20 
            animate-bounce-shadow-black"
        />

        {/* Hero2 */}
        <img
          src={hero2}
          alt="hero2"
          className="absolute 
            w-52 h-52 
            sm:w-64 sm:h-64 
            md:w-80 md:h-80 
            object-cover rounded-full shadow-xl 
            bottom-10 right-4 sm:right-10 md:right-20 
            animate-circleBounce"
        />
      </div>

      {/* Card Content */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-md shadow-primary rounded-2xl p-6 sm:p-8 md:p-10 max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black drop-shadow-lg">
          Welcome to <span className="text-primary font-bold">Restaurant</span>
        </h1>

        {/* Short Description */}
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
          Quick, delicious, and made just for you. Whether you’re craving juicy burgers,
          pastas, or trying pizza's, we’ve got the perfect meal to fuel your day.
        </p>

        {/* Extra Description */}
        <p className="text-italic mt-3 text-sm sm:text-base md:text-lg text-gray-600">
          Our chefs use only fresh ingredients, and every dish is crafted with care to 
          bring you a taste you’ll never forget. Dine in or order online – satisfaction is guaranteed!
        </p>

      
      </div>
    </section>
  );
}
