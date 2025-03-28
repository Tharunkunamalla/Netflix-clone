const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const USERS_FILE = "./assets/users.json";

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
app.listen(5000, () => console.log("Server running on port 5000"));
