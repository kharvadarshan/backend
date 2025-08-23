const express = require('express');
const router  = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req,file,cb) =>{
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

upload.any();

const  {
    addTimeSlot,
    getAvailableTimeSlots,
    getDoctorById,
    acceptAppointment,
    rejectAppointment,
    editProfile ,
    markCompleted,
    addManyTimeSlot, 
    getTimeSlots,
    deleteTimeSlot,
    uploadReport,
    viewReport,
    getDoctor
 }  = require('../../controllers/doctorProfileController');

const {isDoctor }= require('../../middlewares/doctorMiddleware');
const {isUser} = require('../../middlewares/userMiddleware');

router.post('/addSlot',isDoctor,addTimeSlot);
router.post('/addManySlot',isDoctor,addManyTimeSlot);
router.post('/getTimeSlot',isDoctor,getTimeSlots);
router.get('/getTimeSlots/:id',isDoctor,getAvailableTimeSlots);
router.post('/getDoctorById',isDoctor,getDoctorById);
router.get('/getDoctorById/:id',isDoctor,getDoctor);
router.get('/acceptAppointment/:id',isDoctor,acceptAppointment);
router.get('/rejectAppointment/:id',isDoctor,rejectAppointment);
router.get('/markCompleted/:id',isDoctor,markCompleted);
router.post('/editProfile',isDoctor,editProfile);
router.post('/uploadReport/:appointmentId',isDoctor,upload.array('reports', 5),uploadReport);
router.get('/viewReport/:appointmentId',isDoctor,viewReport);
router.get('/deleteTimeSlot',isDoctor,deleteTimeSlot);

module.exports = router;