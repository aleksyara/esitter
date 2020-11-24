
var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');
const passport = require('passport');
//const ticketsCtrl = require('../controllers/tickets');

/* GET users listing. */
router.get('/', usersCtrl.index);
router.get('/user-page', function(req, res, next) {
    res.render('users/user-page');
});
router.get('/log-in', function(req, res, next) {
    res.render('users/log-in');
});

// router.get('/new', flightsCtrl.new);
// router.get('/:id', flightsCtrl.show);
// router.post('/', flightsCtrl.create);//it's posting NEW flight FORM

// router.get('/:id/tickets/new', ticketsCtrl.getNewTicketForm);
// router.post('/:id/tickets', ticketsCtrl.addTicketToFlight);


//trigers a login
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
  ));
  //where we go after logout
  // Google OAuth callback route
  router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect : '/students',
      failureRedirect : '/students'
    }
  ));
  
  // OAuth logout route
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  

module.exports = router;
