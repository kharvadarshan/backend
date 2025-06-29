const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    // required: true,
  },
  razorpay_payment_id: {
    type: String,
    // required: true,
  },
  razorpay_signature: {
    type: String,
    // required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    // required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    // required: true,
  },
  appointmentDate: {
    type: String,
    // required: true,
  },
  appointmentTime: {
    type: String,
    // required: true,
  },
  amountPaid: {
    type: Number,
    // required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Success", "Failed"],
    default: "Success",
  },
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment