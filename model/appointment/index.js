const mongoose = require("mongoose");


// mongoose.connect("mongodb://127.0.0.1:27017/onlineAppointmentBooking")
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Failed to connect to MongoDB', err));


const appointmentSchema = new mongoose.Schema({
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Reference to the Doctor model
      required: true,
    },
    date: {
      type: String, // Can be changed to Date if needed
      required: true,
    },
    time: {
      type: String, // Example: "10:30 AM"
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const AppointmentModel = mongoose.model("AppointmentData", appointmentSchema);
  module.exports = AppointmentModel;
  



