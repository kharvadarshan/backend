const express = require('express');

const { registerUser,validateLogin,logout,sendOTP, verifyOTP } = require('../../controllers/userAuthController/index.js');
const auth = require('../../middlewares/auth');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { isUser } = require('../../middlewares/userMiddleware/index.js');
const {getTimeSlots,getDoctorById,getDoctor} = require('../../controllers/doctorProfileController');
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
router.get('/logout',logout);
router.post('/getTimeSlot',isUser,getTimeSlots);
router.post('/getDoctorById',isUser,getDoctorById);
router.get('/getDoctorById/:id',isUser,getDoctor);

// router.post('/ask',async (req, res) => {
//     const { message } = req.body;

//     try {
//         const response = await openai.createChatCompletion({
//             model: 'gpt-4',
//             messages: [
//                 { role: 'system', content: 'You are a helpful and safe AI health assistant. Give general advice, not diagnosis.' },
//                 { role: 'user', content: message }
//             ],
//         });

//         res.json({ reply: response.data.choices[0].message.content });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to get response from AI' });
//     }
// });

module.exports = router;