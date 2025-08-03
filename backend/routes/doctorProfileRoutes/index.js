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

router.post('/addSlot',addTimeSlot);
router.post('/addManySlot',addManyTimeSlot);
router.post('/getTimeSlot',getTimeSlots);
router.get('/getTimeSlots/:id',getAvailableTimeSlots);
router.post('/getDoctorById',getDoctorById);
router.get('/getDoctorById/:id',getDoctor);
router.get('/acceptAppointment/:id',acceptAppointment);
router.get('/rejectAppointment/:id',rejectAppointment);
router.get('/markCompleted/:id',markCompleted);
router.post('/editProfile',editProfile);
router.post('/uploadReport/:appointmentId',upload.array('reports', 5),uploadReport);
router.get('/viewReport/:appointmentId',viewReport);
router.get('/deleteTimeSlot',deleteTimeSlot);

module.exports = router;