const express = require('express');
const router  = express.Router();
const multer = require('multer');
const  {addTimeSlot,getAvailableTimeSlots,getDoctorById,acceptAppointment,rejectAppointment, editProfile ,markCompleted}  =require('../../controllers/doctorProfileController');
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req,file,cb) =>{
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/addSlot',addTimeSlot);
router.post('/getTimeSlots',getAvailableTimeSlots);
router.post('/getDoctorById',getDoctorById);
router.get('/acceptAppointment/:id',acceptAppointment);
router.get('/rejectAppointment/:id',rejectAppointment);
router.get('/markCompleted/:id',markCompleted);
router.post('/editProfile',upload.single('image'),editProfile);
module.exports = router;