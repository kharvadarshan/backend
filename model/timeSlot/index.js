const mongoose= require('mongoose');

const timeRangeSchema = new mongoose.Schema({
    start:{
        type :String,
        required:true
    },
    end:{
        type:String,
        required:true
    },
    status:{
        type: String,
        enum : ['Available','Booked'],
        default:'Available'
    },
    appointmentId:{
      type:mongoose.Schema.Types.ObjectId,
      required:false,
      default:null
    },
    isDelete:{
        type:Boolean,
        required:false,
        default:false
    }
});


const timeSlotSchema = new mongoose.Schema({
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    date:{
        type: Date,
        required:true
    },
    slot: [timeRangeSchema],
});

const TimeSlot  = mongoose.model('TimeSlot',timeSlotSchema);
module.exports = TimeSlot;




// const mongoose = require("mongoose");

// const timeSlotSchema = new mongoose.Schema({
//   doctorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Doctor",
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   start: {
//     type: String, // e.g., "09:00 AM"
//     required: true,
//   },
//   end: {
//     type: String, // e.g., "09:30 AM"
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["Available", "Booked"],
//     default: "Available",
//   },
//   appointmentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "AppointmentData",
//     default: null, // Set when booked
//   },
// });

// const TimeSlotModel = mongoose.model("TimeSlot", timeSlotSchema);
// module.exports = TimeSlotModel;