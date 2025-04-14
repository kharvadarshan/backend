const express = require('express');
const router = express.Router();
const{
    gettingContact,
    delettingContact,
    getAllAppointments,
    getAllDoctors,
    getAllPatient,
    blockUser,
    unblockUser}=require('../../controllers/adminController');

router.get('/allcontacts', gettingContact);
router.delete('/allcontacts/:id', delettingContact);
router.get('/getAllAppointment',getAllAppointments);
router.get('/doctors', getAllDoctors);
router.get('/getAllPatient',getAllPatient);
router.delete('/blockUser/:id',blockUser);
router.get('/unblockUser/:id',unblockUser);


module.exports=router;