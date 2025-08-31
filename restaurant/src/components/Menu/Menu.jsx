// src/components/Menu/Menu.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  FaUtensils,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTimes,
  FaChevronLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getServices, createOrder, API_URL } from "../../api"; // adjust path if necessary

const fallbackImg = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/images/placeholder.jpg`;

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [qty, setQty] = useState(1);

  // "stage": 'details' shows item details + Add to Cart,
  // 'checkout' shows the form to confirm order.
  const [stage, setStage] = useState("details");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const checkoutRef = useRef(null);
  const modalScrollRef = useRef(null);

  // fetch services from backend
  useEffect(() => {
    let cancelled = false;
    setMenuLoading(true);
    getServices()
      .then((data) => {
        if (!cancelled) {
          setMenuItems(data || []);
          setMenuLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setMenuError(err.message || "Failed to load menu.");
          setMenuLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // lock background scroll when modal open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  // helpers
  const getCurrentPrice = () => {
    if (selectedItem?.flavors) {
      return selectedFlavor ? Number(selectedFlavor.price) : Number(selectedItem.flavors[0]?.price || 0);
    }
    return Number(selectedItem?.price || 0);
  };

  const openItem = (item) => {
    setSelectedItem(item);
    setQty(1);
    setSelectedFlavor(item.flavors ? item.flavors[0] : null);
    setFormData({ name: "", address: "", contact: "", message: "" });
    setStage("details");
    // ensure scroll top for modal later
    setTimeout(() => {
      modalScrollRef.current && (modalScrollRef.current.scrollTop = 0);
    }, 50);
  };

  const handleChange = (e) => setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  // When "Add to Cart" clicked -> reveal checkout form smoothly
  const handleAddToCart = () => {
    setStage("checkout");
    // scroll checkout into view smoothly after render
    setTimeout(() => {
      checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  // submit order to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    // Basic validation
    if (!formData.name || !formData.contact || !formData.address) {
      alert("Please fill name, contact and address.");
      return;
    }

    const unitPrice = getCurrentPrice();
    const totalPrice = Number((unitPrice * qty).toFixed(2));

    const payload = {
      customerName: formData.name,
      customerEmail: formData.contact,
      address: formData.address,
      message: formData.message,
      items: [
        {
          service: selectedItem._id || selectedItem.id || selectedItem.slug || selectedItem.name,
          serviceName: selectedItem.name,
          flavorName: selectedFlavor?.name || null,
          qty,
          price: unitPrice,
        },
      ],
      totalPrice,
    };

    try {
      setSubmitting(true);
      await createOrder(payload);
      alert(`✅ Order placed: ${qty} x ${selectedItem.name} — Total $${totalPrice}`);
      // reset UI
      setSelectedItem(null);
      setQty(1);
      setSelectedFlavor(null);
      setFormData({ name: "", address: "", contact: "", message: "" });
      setStage("details");
    } catch (err) {
      console.error(err);
      alert("Failed to place order: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  // image onError fallback
  const onImgError = (e) => {
    e.currentTarget.src = fallbackImg;
  };

  return (
    <section id="menu" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 flex justify-center items-center gap-2">
          <FaUtensils className="text-primary animate-bounce" />
          Our <span className="text-primary">Menu</span>
        </h2>
        <p className="text-gray-600 text-2xl italic max-w-xl mx-auto mb-12">
          Explore our delicious meals crafted with love and fresh ingredients.
        </p>

        {menuLoading && <p>Loading menu...</p>}
        {menuError && <p className="text-red-500">{menuError}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <article
              key={item._id || item.id || item.name}
              role="button"
              onClick={() => openItem(item)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden cursor-pointer"
            >
              <img
                src={item.img || `${API_URL}/images/placeholder.jpg`}
                alt={item.name}
                onError={onImgError}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">{item.desc}</p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openItem(item);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-300"
                  >
                    <FaShoppingCart /> View Details
                  </button>

                  {/* quick price display if flavors exist, show price range */}
                  <div className="px-3 py-2 rounded-lg bg-gray-100 text-sm font-semibold">
                    {item.flavors
                      ? `$${Math.min(...item.flavors.map(f => f.price)).toFixed(2)} - $${Math.max(...item.flavors.map(f => f.price)).toFixed(2)}`
                      : item.price
                      ? `$${Number(item.price).toFixed(2)}`
                      : "—"}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Animated Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-lg w-full max-w-3xl relative"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.22 }}
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-red-500 z-10"
                  aria-label="Close"
                >
                  <FaTimes size={20} />
                </button>

                <div
                  ref={modalScrollRef}
                  style={{ maxHeight: "85vh" }}
                  className="overflow-y-auto scroll-smooth p-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* left: image */}
                    <div>
                      <img
                        src={selectedFlavor?.img || selectedItem.img || `${API_URL}/images/placeholder.jpg`}
                        alt={selectedFlavor?.name || selectedItem.name}
                        onError={onImgError}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />

                      {/* flavors (if present) */}
                      {selectedItem.flavors && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Choose an option:</h4>
                          <div className="flex flex-col gap-2">
                            {selectedItem.flavors.map((fl) => (
                              <button
                                key={fl.name}
                                onClick={() => {
                                  setSelectedFlavor(fl);
                                  // keep stage as details until Add to Cart clicked
                                }}
                                className={`w-full text-left p-3 rounded-lg transition ${
                                  selectedFlavor?.name === fl.name ? "bg-primary text-white border-primary" : "bg-gray-100 hover:bg-gray-200"
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="font-semibold">{fl.name}</div>
                                    <div className="text-sm text-gray-700">{fl.desc}</div>
                                  </div>
                                  <div className="font-bold">${Number(fl.price).toFixed(2)}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* right: details / checkout */}
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <h3 className="text-2xl font-bold">{selectedItem.name}</h3>
                        <p className="text-gray-600 mt-2">{selectedItem.desc}</p>
                      </div>

                      {/* Quantity + price */}
                      <div className="flex items-center gap-4 mt-4 mb-4">
                        <button onClick={() => setQty((p) => Math.max(1, p - 1))} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
                          <FaMinus />
                        </button>
                        <span className="text-xl font-semibold">{qty}</span>
                        <button onClick={() => setQty((p) => p + 1)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
                          <FaPlus />
                        </button>
                        <div className="ml-auto text-xl font-bold text-primary">
                          ${(getCurrentPrice() * qty).toFixed(2)}
                        </div>
                      </div>

                      {/* DETAILS STAGE */}
                      <AnimatePresence initial={false} mode="wait">
                        {stage === "details" && (
                          <motion.div
                            key="details"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18 }}
                            className="space-y-4"
                          >
                            <div>
                              <p className="text-sm text-gray-700">Select quantity and option, then click <b>Add to Cart</b> to proceed to checkout.</p>
                            </div>

                            <div className="flex gap-3">
                              <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-green-600 transition"
                              >
                                <FaShoppingCart className="inline mr-2" /> Add to Cart
                              </button>

                              <button
                                onClick={() => setSelectedItem(null)}
                                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* CHECKOUT STAGE */}
                      <AnimatePresence initial={false} mode="wait">
                        {stage === "checkout" && (
                          <motion.div
                            key="checkout"
                            ref={checkoutRef}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 space-y-3"
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => {
                                  setStage("details");
                                  // scroll to top of modal
                                  modalScrollRef.current && modalScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="text-sm flex items-center gap-2 text-primary hover:underline"
                              >
                                <FaChevronLeft /> Back to details
                              </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3">
                              <input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className="w-full border rounded-lg px-3 py-2" />
                              <input name="address" value={formData.address} onChange={handleChange} placeholder="Delivery address" required className="w-full border rounded-lg px-3 py-2" />
                              <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Email or phone" required className="w-full border rounded-lg px-3 py-2" />
                              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Special instructions (optional)" className="w-full border rounded-lg px-3 py-2" />

                              <div className="flex gap-3 mt-2">
                                <button type="submit" disabled={submitting} className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-green-600">
                                  {submitting ? "Placing..." : "Confirm Order"}
                                </button>
                                <button type="button" onClick={() => setStage("details")} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
