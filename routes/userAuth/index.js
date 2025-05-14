const express = require('express');
const { registerUser,validateLogin,logout,sendOTP, verifyOTP } = require('../../controllers/userAuthController/index.js');
const auth = require('../../middlewares/auth');
const router = express.Router();
const rateLimit = require('express-rate-limit');

router.use(express.urlencoded({ extended: true }));

const otpRateLimiter = rateLimit({
    windowMs:5*60*1000,
    max:15,
    message:"Too many OTP requests, please try again later."
 });


router.post('/login',validateLogin);
router.post('/signup',registerUser);
router.post('/sendOTP',otpRateLimiter,sendOTP);
router.post('/verifyOTP',verifyOTP);
router.post('/logout',logout);

module.exports = router;