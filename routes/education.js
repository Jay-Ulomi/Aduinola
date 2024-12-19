const  express = require('express');

const router = express.Router();

//  const {index} = require('../controllers/HomeController'); 

router.get('/',(req,res) => {
    res.render('pages/education/education');
});

module.exports=router;