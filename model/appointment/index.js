const mongoose = require("mongoose");


// mongoose.connect("mongodb://127.0.0.1:27017/onlineAppointmentBooking")
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Failed to connect to MongoDB', err));


const appointmentSchema = new mongoose.Schema({
    doctor: {
      type: String,
    // Reference to the Doctor model
      required: true,
    },
    patientId:{
      type: String,
     
      required:true,
    },
    date: {
      type: Date, // Can be changed to Date if needed
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
    status:{
      type: String,
      default:"Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const AppointmentModel = mongoose.model("AppointmentData", appointmentSchema);
  module.exports = AppointmentModel;
  



