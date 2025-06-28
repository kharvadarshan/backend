const express=require('express');
const bodyParser=require('body-parser');
const {renderData}=require('../../controllers/userAuthController');
const router = express.Router();
router.use(bodyParser.urlencoded());

router.get('/',renderData);
module.exports = router;