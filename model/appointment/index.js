// const mongoose = require("mongoose");

// const appointmentSchema = new mongoose.Schema({
//   doctor: { type: String, required: true },
//   patientId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   date: { type: Date, required: true },
//   slotId: { // Reference to TimeSlot
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "TimeSlot",
//     required: true,
//   },
//   time: { type: String, required: true }, // e.g., "09:00 AM - 09:30 AM"
//   doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
//   patientForm: {
//     name: { type: String, required: true },
//     patientname: { type: String, required: true },
//     age: { type: String, required: true },
//     gender: { type: String, enum: ["male", "female", "other"], required: true },
//     email: { type: String, required: true },
//     address: { type: String, required: true },
//     reason: { type: String, required: true },
//     city: { type: String, required: true },
//     number: { type: String, required: true },
//   },
//   status: { type: String, default: "Pending" },
//   isDeleted: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// const AppointmentModel = mongoose.model("AppointmentData", appointmentSchema);
// module.exports = AppointmentModel;










const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
    doctor: {
      type: String,
      required: true,
    },
    patientId:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
    },
    date: {
      type: Date, 
      required: true,
    },
    slot:{
      type:String,
      required:true,
    },
    time: {
      type: String,
      required: true,
    },
    doctorId:{
      type : mongoose.Schema.Types.ObjectId,
      ref:"Doctor",
      required: true
    },
    patientForm:{
      name:{
        type: String,
        required: true,
      },
      patientname: {
      type: String,
      required: true,
      },
      age: {
        type: String,
        required: true
      },
      gender: {
      type: String,
      enum: ["male", "female", "other"], 
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    }
    },
    feedbackForm:{
      rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    feedback:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
    },
    status:{
      type: String,
      default:"Pending",
    },
    isDeleted:{
      type: Boolean,
      default:false
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const AppointmentModel = mongoose.model("AppointmentData", appointmentSchema);
  module.exports = AppointmentModel;
  



