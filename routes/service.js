const  express = require('express');

const router = express.Router();

// const {index} = require('../controllers/HomeController');

router.get('/',(req,res) =>{
    res.render('pages/service/service');
});

router.get('/details',(req,res) =>{
    res.render('pages/service/service-details');
});

module.exports=router;