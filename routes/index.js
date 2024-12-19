const  express = require('express');

const router = express.Router();

const {index} = require('../controllers/HomeController');

router.get('/',index);

module.exports=router;

