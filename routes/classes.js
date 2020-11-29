var express = require('express');
var router = express.Router();

var classesCtrl = require('../controllers/classes');

router.get('/', isLoggedIn, classesCtrl.showAllClasses);
router.get('/new', isLoggedIn, function(req, res, next) {
    res.render('classes/new-class', { title: "Add New Class" });
});

router.post('/', isLoggedIn, classesCtrl.createNewClass); 

router.get('/enroll/:id', isLoggedIn, classesCtrl.enrollIntoClass); 

router.post('/enroll/:id', isLoggedIn, classesCtrl.enrollIntoClass); 

router.get('/confirm-enrollment/:classId', isLoggedIn, classesCtrl.prepareToEnroll); 


// define our authorization function on the server
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/auth/google')
    }
}

module.exports = router;

