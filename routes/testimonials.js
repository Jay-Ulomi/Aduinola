const  express = require('express');

const router = express.Router();

const {index} = require('../controllers/HomeController');

router.get('/',(req, res) => {
    res.render('pages/testimonials/testimonials');
});

module.exports=router;