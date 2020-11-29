var express = require('express');
var router = express.Router();

var classesCtrl = require('../controllers/classes');

router.get('/', classesCtrl.showAllClasses);
router.get('/new', function(req, res, next) {
    res.render('classes/new-class', { title: "Add New Class" });
});

router.post('/', classesCtrl.createNewClass); 

router.get('/enroll/:id', classesCtrl.enrollIntoClass); 


module.exports = router;

