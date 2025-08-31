// backend/seed/seedServices.js
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const base = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;

const services = [
  {
    name: "Grilled Chicken",
    slug: "grilled-chicken",
    desc: "Juicy grilled chicken with spices & herbs.",
    img: `${base}/images/chicken.jpg`,
    flavors: [
      { name: "Classic Grilled", price: 12.99, desc: "Simple yet delicious grilled chicken.", img: `${base}/images/chicken.jpg` },
      { name: "Spicy Grilled", price: 13.99, desc: "Hot and fiery chicken for spice lovers.", img: `${base}/images/spicychicken.jpg` },
      { name: "Garlic Herb", price: 14.49, desc: "Marinated with garlic & fresh herbs.", img: `${base}/images/garlicchicken.jpg` }
    ]
  },
  {
    name: "Pizza",
    slug: "pizza",
    desc: "Choose from our delicious pizza flavors.",
    img: `${base}/images/pizza.jpg`,
    flavors: [
      { name: "Margherita", price: 8.99, desc: "Classic pizza with fresh mozzarella & basil.", img: `${base}/images/margherita.jpg` },
      { name: "Pepperoni", price: 10.99, desc: "Topped with spicy pepperoni & mozzarella.", img: `${base}/images/pepperoni.jpg` },
      { name: "BBQ Chicken", price: 12.49, desc: "Tangy BBQ sauce with grilled chicken & onions.", img: `${base}/images/bbqchicken.jpg` }
    ]
  },
  {
    name: "Pasta",
    slug: "pasta",
    desc: "Creamy pasta with parmesan cheese.",
    img: `${base}/images/pasta.jpg`,
    flavors: [
      { name: "Alfredo", price: 10.49, desc: "Rich creamy white sauce with parmesan.", img: `${base}/images/alfredo.jpg` },
      { name: "Pesto Pasta", price: 11.49, desc: "Fresh basil pesto with olive oil.", img: `${base}/images/pesto.jpg` },
      { name: "Tomato Pasta", price: 9.99, desc: "Zesty tomato sauce with Italian herbs.", img: `${base}/images/tomatopasta.jpg` }
    ]
  },
  {
    name: "Burger",
    slug: "burger",
    desc: "Classic burger served with fries.",
    img: `${base}/images/burger.jpg`,
    flavors: [
      { name: "Classic Burger", price: 8.99, desc: "Beef patty, cheese, and fresh veggies.", img: `${base}/images/zinger.jpg` },
      { name: "Double Cheese", price: 10.49, desc: "Double layers of cheese and beef patty.", img: `${base}/images/doublecheese.jpg` },
      { name: "Veggie Burger", price: 7.99, desc: "Healthy veggie patty with fresh toppings.", img: `${base}/images/veggieburger.jpg` }
    ]
  }
];

(async () => {
  await connectDB();
  console.log('Seeding services...');
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log('✅ Services seeded');
  process.exit();
})();
