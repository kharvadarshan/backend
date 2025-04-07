const express = require('express')
const router = express.Router();
const {deleteAppointment, getAllAppointmentsByPatientId, getDeletedAppointmentsByPatientId} = require('../../controllers/appointmentController');

router.delete('/deleteAppointment/:appointmentId',deleteAppointment);
router.get('/getAppointmentByPatientId/:id',getAllAppointmentsByPatientId);
router.get('/getDeletedAppointmentByPatientId/:id',getDeletedAppointmentsByPatientId);
module.exports = router;