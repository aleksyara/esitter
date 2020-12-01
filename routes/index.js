var express = require('express');
const passport = require('passport');
const User = require('../models/user');
var router = express.Router();
var RoutingLogic = require('../utils/routing-logic');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'eSitter', isLoggedIn: req.isAuthenticated()});
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'eSitter', isLoggedIn: req.isAuthenticated()});
});

router.get('/first-responders', function(req, res, next) {
  res.render('first-responders', { title: 'eSitter', isLoggedIn: req.isAuthenticated()});
});

//trigers a login
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
//where we go after logout
// Google OAuth callback route

router.get(
  '/oauth2callback',
  passport.authenticate(
    'google',
    {
      // successRedirect : './users/additional-info',
      // successRedirect : RoutingLogic.determineRedirectRouteAfterGoogleAuthentication(),
      failureRedirect : '/users/login-failure'
    }),
  function(req, res) {
    let myUser = req.user;
    let userId = myUser._id;

    User
    .findById(userId)
    .populate('address')
    .exec(function(err, user) {
      if (err) res.render('error'); 
      res.redirect(RoutingLogic.determineRedirectRouteAfterGoogleAuthentication(user));
    });
  }
);

module.exports = router;
