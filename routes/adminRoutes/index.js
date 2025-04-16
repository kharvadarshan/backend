const express = require('express');
const router = express.Router();
const{
    gettingContact,
    delettingContact,
    getAllAppointments,
    getAllDoctors,
    getAllPatient,
    blockUser,
    unblockUser,
    addDoctor,
    addSpecialization,
    getSpecialization,
}=require('../../controllers/adminController');

router.get('/allcontacts', gettingContact);
router.delete('/allcontacts/:id', delettingContact);
router.get('/getAllAppointment',getAllAppointments);
router.get('/doctors', getAllDoctors);
router.get('/getAllPatient',getAllPatient);
router.delete('/blockUser/:id',blockUser);
router.get('/unblockUser/:id',unblockUser);
router.post('/addDoctor',addDoctor);
router.post('/addSpecialization',addSpecialization);
router.get('/getSpecialization',getSpecialization);



module.exports=router;