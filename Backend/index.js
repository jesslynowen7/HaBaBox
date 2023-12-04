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
const https = require("https");
const fs = require("fs");

// Enable CORS for all routes
app.use(cors({ origin: "https://localhost:3000", credentials: true }));

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

// Load SSL/TLS certificates
const privateKey = fs.readFileSync("./Backend/private-key.pem", "utf8");
const certificate = fs.readFileSync("./Backend/certificate.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

// Create an HTTPS server
const PORT = process.env.PORT || 8080;
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
