// src/components/Contact/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import contactBg from "../../assets/contactBg.jpg";
import { sendContact } from "../../api"; // adjust path if needed

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill name, email and message.");
      return;
    }
    try {
      setLoading(true);
      await sendContact(form);
      alert("✅ Message sent — thank you!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send message: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background floating image */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <img
          src={contactBg}
          alt="contact-bg"
          className="absolute w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 object-cover rounded-full shadow-lg top-10 right-10 animate-bounce-shadow-black"
        />
      </div>

      {/* Section content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Get in <span className="text-primary">Touch</span>
        </h2>
        <p className="text-gray-600 text-2xl text-bold text italic max-w-xl mx-auto mb-12">
          Have questions, suggestions, or want to make an order? Fill out the form below and we’ll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="p-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary transition duration-300 outline-none w-full"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="p-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary transition duration-300 outline-none w-full"
            whileFocus={{ scale: 1.02 }}
          />
          
          <motion.textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            required
            className="p-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary transition duration-300 outline-none w-full sm:col-span-2 resize-none"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            disabled={loading}
            className="bg-primary text-black font-semibold px-6 py-3 rounded-xl sm:col-span-2 hover:bg-secondary transition duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(255,192,1,0.6)" }}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
