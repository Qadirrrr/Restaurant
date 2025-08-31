// backend/server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const servicesRoute = require('./routes/services');
const ordersRoute = require('./routes/orders');
const contactRoute = require('./routes/contact');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));

// connect DB
connectDB();

// serve images (copy your images into backend/public/images)
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// api routes
app.use('/api/services', servicesRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/contact', contactRoute);

app.get('/', (req, res) => res.send('Restaurant API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
