const  express = require('express');

const router = express.Router();

//  const {index} = require('../controllers/HomeController'); 

router.get('/',(req,res) => {
    res.render('pages/projects/projects');
});

module.exports=router;