const express = require('express');
const doctorController = require('../../controllers/doctorController/index.js'); // Adjust the path as needed

const router = express.Router();

// Doctor routes
router.get('/doctors', doctorController.getAllDoctors);
router.get('/doctors/:id', doctorController.getDoctorById);
router.post('/doctors', doctorController.createDoctor);
router.put('/doctors/:id', doctorController.updateDoctor);
router.delete('/doctors/:id', doctorController.deleteDoctor);

module.exports = router;