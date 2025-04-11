const mongoose = require("mongoose");
const contactModel = require("../../model/contact");

// Create a new contactUs
exports.createContact = async (req, res) => {
  try {
    
    const {name,email,message} = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new contactModel({name,email,message});
    const savedContactUs = await newContact.save();

    res.status(201).json(savedContactUs);
  } catch (error) {
    console.error("Error creating contactUs:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }

};





