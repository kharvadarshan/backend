const express = require('express')
const router = express.Router();
const {deleteAppointment} = require('../../controllers/appointmentController');

router.delete('/deleteAppointment/:appointmentId',deleteAppointment);

module.exports = router;