var express = require('express');
const passport = require('passport');
var router = express.Router();
// const moment = require('moment');
// const DateFormatter = require('../utils/date-fomratter');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'eSitter' });
});

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
    successRedirect : './users/additional-info',
    failureRedirect : '/users/login-failure'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
