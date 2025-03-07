const express = require('express');
const router  = express.Router();
const  {addTimeSlot,getAvailableTimeSlots}  =require('../../controllers/doctorProfileController');

router.post('/addSlot',addTimeSlot);
router.post('/getTimeSlots',getAvailableTimeSlots);

module.exports = router;