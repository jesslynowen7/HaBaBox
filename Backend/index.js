const express = require("express");
const app = express();
<<<<<<< HEAD
const authRoutes = require('./src/auth');
const hotelRoutes = require('./src/hotel');
const roomRoutes = require('./src/room');
const roomTypeRoutes = require('./src/room_type');
const transactionRoutes = require('./src/transaction');
const userRoutes = require('./src/user');
const eTicketRoutes = require('./src/e_ticket');
const promoRoutes = require('./src/promo');
=======
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
>>>>>>> 3d46698 (Test)

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
<<<<<<< HEAD
app.use('/auth', authRoutes);
app.use('/hotel', hotelRoutes);
app.use('/room', roomRoutes);
app.use('/room_type', roomTypeRoutes);
app.use('/transaction', transactionRoutes);
app.use('/user', userRoutes);
app.use('/e_ticket', eTicketRoutes);
app.use('/promo', promoRoutes);
=======
app.use("/auth", authRoutes);
app.use("/hotel", verifyToken, hotelRoutes);
app.use("/room", verifyToken, roomRoutes);
app.use("/room_type", roomTypeRoutes);
app.use("/transaction", transactionRoutes);
app.use("/member", memberRoutes);
app.use("/e_ticket", eTicketRoutes);
>>>>>>> 3d46698 (Test)
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
