var express = require('express');
const passport = require('passport');
var router = express.Router();
var RoutingLogic = require('../utils/routing-logic');
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
// router.get('/oauth2callback', passport.authenticate(
//   'google',
//   {
//     // successRedirect : './users/additional-info',
//     successRedirect : RoutingLogic.determineRedirectRouteAfterGoogleAuthentication(),
//     failureRedirect : '/users/login-failure'
//   }
// ));

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
    res.redirect(RoutingLogic.determineRedirectRouteAfterGoogleAuthentication(myUser));
  }
);





module.exports = router;
