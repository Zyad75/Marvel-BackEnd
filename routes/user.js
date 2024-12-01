const express = require("express");
const router = express.Router();

const User = require("../model/User");

// packages pour gestion de mdp

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

router.post("/user/signup", async (req, res) => {
  console.log("route user");
  //   console.log(req.body);
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "invalid data" });
    }
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({ error: "email already used" });
    }
    // création du hash salt et mon token

    const token = uid2(16);
    const salt = uid2(16);

    const hash = SHA256(password + salt).toString(encBase64);

    // créer mon user :

    const newUser = new User({
      username: username,
      email: email,
      salt: salt,
      hash: hash,
      token: token,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      token: newUser.token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
