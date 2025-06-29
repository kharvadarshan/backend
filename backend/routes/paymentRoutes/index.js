const express = require('express');
const { checkout, paymentVerification } = require("../../controllers/paymentController");


const router = express.Router();

router.post("/checkout",checkout);

router.post("/paymentverification",paymentVerification);

router.get("/getkey", (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
);

module.exports = router;