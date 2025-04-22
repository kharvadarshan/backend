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
    deleteSpecialization,
}=require('../../controllers/adminController');

const {isAdmin} = require('../../middlewares/adminMiddleware');

router.get('/allcontacts', isAdmin,gettingContact);
router.delete('/allcontacts/:id', isAdmin, delettingContact);
router.get('/getAllAppointment', isAdmin,getAllAppointments);
router.get('/doctors', isAdmin, getAllDoctors);
router.get('/getAllPatient', isAdmin,getAllPatient);
router.delete('/blockUser/:id', isAdmin,blockUser);
router.get('/unblockUser/:id', isAdmin,unblockUser);
router.post('/addDoctor', isAdmin,addDoctor);
router.post('/addSpecialization', isAdmin,addSpecialization);
router.get('/getSpecialization', isAdmin,getSpecialization);
router.delete('/deleteSpecialization/:id', isAdmin,deleteSpecialization);



module.exports=router;