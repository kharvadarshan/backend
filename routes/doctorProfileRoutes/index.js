const express = require('express');
const router  = express.Router();
const  {addTimeSlot}  =require('../../controllers/doctorProfileController');

router.post('/addSlot',addTimeSlot);

module.exports = router;