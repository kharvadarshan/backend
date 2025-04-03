const express = require('express');
const doctorController = require('../../controllers/doctorController/index.js'); // Adjust the path as needed
const appointmentController = require('../../controllers/appointmentController/index.js')
const contactController = require('../../controllers/contactController');
const router = express.Router();

// Doctor routes
router.get('/doctors', doctorController.getAllDoctors);
router.get('/doctors/:id', doctorController.getDoctorById);
router.post('/doctors', doctorController.createDoctor);
router.put('/doctors/:id', doctorController.updateDoctor);
router.delete('/doctors/:id', doctorController.deleteDoctor);

router.post('/appointments', appointmentController.createAppointment);
router.post('/contact', contactController.createContact);
router.get('/allcontacts', contactController.gettingContact);
router.delete('/allcontacts/:id', contactController.delettingContact);
router.get('/getAllAppointment',appointmentController.getAllAppointments);
router.post('/getAppointmentByDoctorId',appointmentController.getAllAppointmentsByDoctorId);
router.post('/getAppointmentByPatientId',appointmentController.getAllAppointmentsByPatientId);


module.exports = router;