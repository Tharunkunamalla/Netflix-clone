const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const USERS_FILE = "assets/users.json";

app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Serves static files like HTML, CSS, JS

// Read Users from File
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
};

// Write Users to File
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Signup Endpoint
app.post("/signup", (req, res) => {
  const {email, password} = req.body;
  let users = readUsers();

  if (users.some((user) => user.email === email)) {
    return res.json({message: "User already exists! Try logging in."});
  }

  users.push({email, password});
  writeUsers(users);
  res.json({message: "Sign Up Successful! Now login."});
});

// Login Endpoint
app.post("/login", (req, res) => {
  const {email, password} = req.body;
  let users = readUsers();

  let validUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (validUser) {
    res.json({success: true, message: "Login Successful!"});
  } else {
    res.json({success: false, message: "Invalid Email or Password!"});
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
