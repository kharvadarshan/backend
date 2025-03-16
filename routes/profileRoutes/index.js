const express = require('express');
const router  = express.Router();
const {getUserDetailsById} = require('../../controllers/profileController');
router.post('/edit',getUserDetailsById);
module.exports = router;