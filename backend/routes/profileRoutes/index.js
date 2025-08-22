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

const {isUser}=require('../../middlewares/userMiddleware');

router.post('/edit',isUser,getUserDetailsById);
router.post('/editProfile',upload.single('image'),isUser,editProfile);
router.get('/viewReport/:appointmentId',isUser,viewReport);

module.exports = router;