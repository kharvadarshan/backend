const express = require('express')
const router = express.Router();
const {
      deleteAppointment,
      getAllAppointmentsByDoctorId, 
      getAllAppointmentsByPatientId, 
      getDeletedAppointmentsByPatientId, 
      giveFeedback,
      createAppointment
    } = require('../../controllers/appointmentController');


router.post('/appointments', createAppointment);
router.delete('/deleteAppointment/:appointmentId',deleteAppointment);
router.get('/getAppointmentByPatientId/:id',getAllAppointmentsByPatientId);
router.get('/getDeletedAppointmentByPatientId/:id',getDeletedAppointmentsByPatientId);
router.get('/getAppointmentByDoctorId/:id',getAllAppointmentsByDoctorId);
router.post('/giveFeedback',giveFeedback);

module.exports = router;