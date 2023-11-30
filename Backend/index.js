const express = require("express");
const app = express();
const authRoutes = require("./src/auth");
const hotelRoutes = require("./src/hotel");
const roomRoutes = require("./src/room");
const roomTypeRoutes = require("./src/room_type");
const transactionRoutes = require("./src/transaction");
const memberRoutes = require("./src/member");
const eTicketRoutes = require("./src/e_ticket");
const cors = require("cors");

// Enable CORS for all routes
app.use(cors());

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API routes
app.use("/auth", authRoutes);
app.use("/hotel", hotelRoutes);
app.use("/room", roomRoutes);
app.use("/room_type", roomTypeRoutes);
app.use("/transaction", transactionRoutes);
app.use("/member", memberRoutes);
app.use("/e_ticket", eTicketRoutes);
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
