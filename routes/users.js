var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');
const user = require('../models/user');

/* GET users listing. NEED TO FIX LATER */
router.get('/', isLoggedIn, usersCtrl.index);

router.get('/all-mentors', usersCtrl.index);

// Route is not typically used, it was created during development/testing phase
router.get('/user-page', isLoggedIn, function(req, res, next) {
    let myUser = JSON.parse(JSON.stringify(req.user));
    res.redirect(process.env.HOST + '/users/user-page/' + myUser._id);
});

router.get('/user-page/:id', isLoggedIn, usersCtrl.show);

router.get('/log-in', function(req, res, next) {
    res.render('users/log-in');
});

// OAuth logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/additional-info', isLoggedIn, usersCtrl.prepeareToShowAdditionalInfo);

router.post('/:id', isLoggedIn, usersCtrl.create); 
router.get('/:id', isLoggedIn, usersCtrl.show);

// define our authorization function on the server
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/auth/google')
    }
}


module.exports = router;
