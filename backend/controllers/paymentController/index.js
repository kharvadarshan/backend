const  instance  = require("../../utils/rajorpay.js");
const crypto = require("crypto");
const  Payment  = require("../../model/payment");
const Appointment = require('../../model/appointment');

// console.log("Instance: ", instance); //


exports.checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};



exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, notes } =
    req.body;



  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

   const payment= await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentId: notes?.appointmentId,
      doctorId: notes?.doctorId,
      patientId: notes?.patientId,
      appointmentDate:notes?.appointmentDate,
      appointmentTime: notes?.appointmentTime,
      amountPaid: notes?.amount,
      paymentStatus: "Success",
    });

    await payment.save();

    await Appointment.findByIdAndUpdate(notes.appointmentId, {
      paymentStatus: "Completed",
    });
    
    res.redirect(
      `http://localhost:5173/payment-success?reference=${razorpay_payment_id}`
    );
  } else {

    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentId: notes.appointmentId,
      patientId: notes.patientId,
      doctorId: notes.doctorId,
      appointmentDate: notes.appointmentDate,
      appointmentTime: notes.appointmentTime,
      amountPaid: notes.amount,
      paymentStatus: "Failed",
    });
    await payment.save();

    await Appointment.findByIdAndUpdate(notes.appointmentId, {
      paymentStatus: "Failed",
    });

    res.redirect(`http://localhost:5173/payment-failed`);
  }
  
};