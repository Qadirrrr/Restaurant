import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import service1 from "../../assets/service1.jpg";
import service2 from "../../assets/service2.jpg";
import service3 from "../../assets/service3.jpg";

const servicesData = [
  {
    id: 1,
    title: "Fast Delivery",
    img: service1,
    short: "Get your favorite and Delicious meals delivered fast.",
    desc: "We ensure your meals reach you piping hot and fresh in record time. Our dedicated delivery team makes your experience seamless.",
  },
  {
    id: 2,
    title: "Delicious Meals",
    img: service2,
    short: "Chef-crafted dishes with fresh ingredients.",
    desc: "Every dish is prepared with love and premium quality ingredients. Enjoy authentic taste and unforgettable flavors.",
  },
  {
    id: 3,
    title: "Cozy Ambiance",
    img: service3,
    short: "Dine in a warm and welcoming environment.",
    desc: "Our ambiance is designed to give you comfort and relaxation — perfect for family dinners, dates, or casual hangouts.",
  },
];

export default function Services() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background floating images */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <img
          src={service1}
          alt="service1"
          className="absolute w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-full shadow-lg top-10 left-4 sm:left-10 animate-bounce-shadow-black"
        />
        <img
          src={service2}
          alt="service2"
          className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-full shadow-xl top-1/2 right-4 sm:right-10 animate-circleBounce"
        />
        <img
          src={service3}
          alt="service3"
          className="absolute w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full shadow-lg bottom-10 left-10 animate-bounce-shadow-black"
        />
      </div>

      {/* Section content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
          Our <span className="text-primary">Services</span>
        </h2>
        <p className="text-gray-600 text-2xl text-bold text italic max-w-xl mx-auto mb-12">
          We provide delicious meals, quick delivery, and an unforgettable dining experience. Explore what makes our restaurant unique.
        </p>

        {/* Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="relative flex flex-col items-center text-center group cursor-pointer"
              onClick={() => setSelected(service)}
            >
              <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-white -mb-14 z-10 group-hover:scale-110 transition-transform duration-500">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <div className="bg-primary rounded-2xl shadow-xl p-8 pt-16 w-full hover:shadow-2xl transition-all duration-500 group-hover:bg-yellow-500">
                <h3 className="text-2xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/90">{service.short}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)} // close on outside click
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
                >
                  ✕
                </button>

                {/* Modal Content */}
                <img src={selected.img} alt={selected.title} className="w-full h-56 object-cover" />
                <div className="p-6 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{selected.title}</h3>

                  {/* Main Description */}
                  <p className="text-gray-700 mb-6">{selected.desc}</p>

                  {/* Additional Details */}
                  <div className="space-y-3 text-gray-600">
                    <p>
                      <span className="font-semibold">Highlights:</span> Fresh ingredients,
                      hygienic cooking, and quick service.
                    </p>
                    <p>
                      <span className="font-semibold">Perfect For:</span> Family dinners,
                      date nights, and casual hangouts.
                    </p>
                    <p>
                      <span className="font-semibold">Specialty:</span> Authentic taste with
                      premium quality.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
