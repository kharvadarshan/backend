const express = require('express');
const router  = express.Router();
const  {addTimeSlot,getAvailableTimeSlots,getDoctorById,acceptAppointment,rejectAppointment, editProfile}  =require('../../controllers/doctorProfileController');

router.post('/addSlot',addTimeSlot);
router.post('/getTimeSlots',getAvailableTimeSlots);
router.post('/getDoctorById',getDoctorById);
router.post('/acceptAppointment',acceptAppointment);
router.post('/rejectAppointment',rejectAppointment);
router.post('/editProfile',editProfile);
module.exports = router;