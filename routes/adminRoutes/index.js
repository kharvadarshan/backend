const express = require('express');
const router = express.Router();
const{gettingContact,delettingContact,getAllAppointments,getAllDoctors}=require('../../controllers/adminController');

router.get('/allcontacts', gettingContact);
router.delete('/allcontacts/:id', delettingContact);
router.get('/getAllAppointment',getAllAppointments);
router.get('/doctors', getAllDoctors);
module.exports=router;