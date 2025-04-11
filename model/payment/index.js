import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AppointmentData",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "INR",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "succeeded", "failed"],
    default: "pending",
  },
  transactionId: {
    type: String,
  },
  paymentGateway: {
    type: String,
    enum: ["Stripe", "Razorpay"],
    required: true,
    default : "Stripe",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const PaymentModel = mongoose.model("Payment", paymentSchema);
module.exports = PaymentModel;
