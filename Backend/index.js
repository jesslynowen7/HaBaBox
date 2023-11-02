const express = require('express');
const app = express();
const authRoutes = require('./src/auth');
const hotelRoutes = require('./src/hotel');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API routes
app.use('/auth', authRoutes);
app.use('/hotel', hotelRoutes);
// app.use('/', progressRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Set port and listen for our requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
})