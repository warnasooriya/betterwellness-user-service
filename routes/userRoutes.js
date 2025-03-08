const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Create a new event
router.post("/user", async (req, res) => {
  const { userName, role, attributes } = req.body;

  if(attributes?.sub === undefined) {
    res.status(400).json({ message: "User not authenticated" });
    return;
  }

  if (userName === undefined ) {
    res.status(400).json({ message: "Username is required" });
    return;
  }

  if (role === undefined ) {
    res.status(400).json({ message: "Role is required" });
    return;
  }

  const existUser = await User.findOne({cognito_id: attributes.sub});
  if(existUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  
  try {
    const newUser = new User(
      { 
        username: userName,
        role: role,
        email: attributes?.email,
        family_name: attributes?.family_name,
        given_name: attributes?.given_name,
        cognito_id: attributes?.sub,
        
       }
    );
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all events
router.get("/user", async (req, res) => {
  try {
    const Counsellors = await User.find({role: 'Counsellor'});
    res.status(200).json(Counsellors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single event
router.get("/user/:id",  async (req, res) => {
    const user =   await User.findById(req.params.id);
    res.json(user);
});

module.exports = router;
