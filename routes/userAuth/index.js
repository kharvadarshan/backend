const express = require('express');
const { registerUser,validateLogin,logout } = require('../../controllers/userAuthController/index.js');
const {auth} = require('../../middlewares/auth.js');
const bodyParser=require('body-parser');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.urlencoded());
router.post('/login',validateLogin);
router.post('/signup',registerUser);
router.post('/logout',logout);

module.exports = router;