const mongoose = require("mongoose");
const AppointmentModel = require("../../model/appointment");

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;

    // Validate required fields
    if (!doctor || !date || !time || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure the doctor ID is valid
    if (!mongoose.Types.ObjectId.isValid(doctor)) {
      return res.status(400).json({ error: "Invalid doctor ID" });
    }

    const newAppointment = new AppointmentModel({ doctor, date, time, reason });
    const savedAppointment = await newAppointment.save();

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
