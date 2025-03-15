const express = require('express');
const router  = express.Router();
const  {addTimeSlot,getAvailableTimeSlots,getDoctorById}  =require('../../controllers/doctorProfileController');

router.post('/addSlot',addTimeSlot);
router.post('/getTimeSlots',getAvailableTimeSlots);
router.post('/getDoctorById',getDoctorById);

module.exports = router;