const express = require("express");
const router = express.Router();
const { admin } = require("../config/firebase");
const { createUser } = require("../models/user");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUser({ name, email, password });
    res.json({
      msg: "User Created Successfully!",
      uid: user.uid,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await admin.auth().getUserByEmail(email);
    res.json({
      msg: "Login Successful!",
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
