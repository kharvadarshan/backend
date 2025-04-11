const express = require('express');
const doctorController = require('../../controllers/doctorController/index.js'); // Adjust the path as needed
const appointmentController = require('../../controllers/appointmentController/index.js')
const contactController = require('../../controllers/contactController');
const { getTimeSlots } = require('../../controllers/timeSlotController/index.js');
const router = express.Router();

// Doctor routes
router.get('/doctors', doctorController.getAllDoctors);
router.get('/doctors/:id', doctorController.getDoctorById);
router.post('/doctors', doctorController.createDoctor);
router.put('/doctors/:id', doctorController.updateDoctor);
router.delete('/doctors/:id', doctorController.deleteDoctor);

 router.post('/appointments', appointmentController.createAppointment);
// router.post('/appointments',appointmentController.bookAppointment);
// router.get('/timeslots',getTimeSlots);
router.post('/contact', contactController.createContact);


router.post('/getAppointmentByDoctorId',appointmentController.getAllAppointmentsByDoctorId);
router.post('/getAppointmentByPatientId',appointmentController.getAllAppointmentsByPatientId);


module.exports = router;