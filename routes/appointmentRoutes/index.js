const express = require('express')
const router = express.Router();
const {
      deleteAppointment,
      getAllAppointmentsByDoctorId, 
      getAllAppointmentsByPatientId, 
      getDeletedAppointmentsByPatientId, 
      giveFeedback,
      createAppointment,
    
    } = require('../../controllers/appointmentController');
const {isUser}= require('../../middlewares/userMiddleware');
const {isDoctor}=require('../../middlewares/doctorMiddleware');

router.post('/appointments',isUser, createAppointment);
router.delete('/deleteAppointment/:appointmentId',deleteAppointment);
router.get('/getAppointmentByPatientId/:id',isUser,getAllAppointmentsByPatientId);
router.get('/getDeletedAppointmentByPatientId/:id',isUser,getDeletedAppointmentsByPatientId);
router.get('/getAppointmentByDoctorId/:id',isDoctor,getAllAppointmentsByDoctorId);
router.post('/giveFeedback',isUser,giveFeedback);

module.exports = router;