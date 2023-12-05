const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const authRoutes = require("./src/auth");
const hotelRoutes = require("./src/hotel");
const roomRoutes = require("./src/room");
const roomTypeRoutes = require("./src/room_type");
const transactionRoutes = require("./src/transaction");
const userRoutes = require("./src/user");
const eTicketRoutes = require("./src/e_ticket");
const promoRoutes = require("./src/promo");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");

// Enable CORS for all routes
app.use(cors({ origin: "https://localhost:3000", credentials: true }));

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/images/"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("pfp_input"), (req, res) => {
  const targetPath = path.join(
    __dirname,
    "../Frontend/images/" + req.file.originalname
  );

  // Check if file already exists
  if (fs.existsSync(targetPath)) {
    return res.status(200).json({
      message: "File already exists",
      path: "images/" + req.file.originalname,
    });
  }

  // File is now uploaded and req.file is set
  res.status(200).json({ path: "images/" + req.file.originalname });
});

// API routes
app.use("/auth", authRoutes);
app.get("/api/data", (req, res) => {
  // Access data from the cookies
  const accessToken = req.cookies.access_token;
  const email = req.cookies.email;
  const name = req.cookies.name;
  const points = req.cookies.points;
  const profilePic = req.cookies.profilePic;

  // Use the data as needed
  const userData = {
    accessToken,
    email,
    name,
    points,
    profilePic,
  };

  if (userData.accessToken && userData.email && userData.name) {
    // Success: All required data is present
    res.status(200).json({ status: "success", data: userData });
  } else {
    // Error: Some or all required data is missing
    res
      .status(400)
      .json({ status: "error", message: "User data not found in cookies" });
  }
});
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
const privateKey = fs.readFileSync("./private-key.pem", "utf8");
const certificate = fs.readFileSync("./certificate.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

// Create an HTTPS server
const PORT = process.env.PORT || 8080;
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
