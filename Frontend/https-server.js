const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();

const options = {
  key: fs.readFileSync("./private-key.pem"),
  cert: fs.readFileSync("./certificate.pem"),
};

// Enable CORS for all routes
app.use(cors({ origin: "https://localhost:8080", credentials: true }));

// Serve static files from the 'public' folder
app.use(express.static(__dirname, { index: false }));

// Serve login.html as the default page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

// Handle other routes as needed

const server = https.createServer(options, app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}/`);
});
