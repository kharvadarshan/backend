const express = require('express');
const multer = require('multer');
const router  = express.Router();
const {getUserDetailsById,editProfile,viewReport} = require('../../controllers/profileController');

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


router.post('/edit',getUserDetailsById);
router.post('/editProfile',upload.single('image'),editProfile);
router.get('/viewReport/:appointmentId',viewReport);

module.exports = router;