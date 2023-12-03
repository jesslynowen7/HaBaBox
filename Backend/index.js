const express = require("express");
const app = express();
const authRoutes = require("./src/auth");
const hotelRoutes = require("./src/hotel");
const roomRoutes = require("./src/room");
const roomTypeRoutes = require("./src/room_type");
const transactionRoutes = require("./src/transaction");
const userRoutes = require("./src/user");
const eTicketRoutes = require("./src/e_ticket");
const promoRoutes = require("./src/promo");
const cors = require("cors");

// Enable CORS for all routes
app.use(cors({ origin: "http://127.0.0.1:3000", credentials: true }));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API routes
app.use("/auth", authRoutes);
app.use("/hotel", hotelRoutes);
app.use("/room", roomRoutes);
app.use("/room_type", roomTypeRoutes);
app.use("/transaction", transactionRoutes);
app.use("/user", userRoutes);
app.use("/e_ticket", eTicketRoutes);
app.use("/promo", promoRoutes);
// app.use('/', progressRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Set port and listen for our requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
