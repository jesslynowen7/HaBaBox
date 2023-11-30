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
const cookieParser = require("cookie-parser");

// Enable CORS for all routes
app.use(cors());

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Middleware to check and verify the Firebase ID token
const verifyToken = async (req, res, next) => {
  const idToken = req.cookies.token;

  if (!idToken) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// API routes
app.use("/auth", authRoutes);
app.use("/hotel", verifyToken, hotelRoutes);
app.use("/room", verifyToken, roomRoutes);
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
