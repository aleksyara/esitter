const { response } = require('express');
const User = require('../models/user');
const Address = require('../models/address');
var moment = require('moment');


module.exports = {
    index: index,
    create,
    show,
    prepeareToShowAdditionalInfo
};
  
function index (req, res, next) {
  
  User.find({isMentor: true}, function(err, users) {
    if (err) return next(err);
    res.render('users/all-mentors', {title: "All Mentors", users, isLoggedIn: req.isAuthenticated()});
  });
  };
 
function create(req, res) {
  User.findById(req.params.id, function(err, myUser) {
    // console.log('myUser: ', myUser);
    if (err || !myUser) return res.redirect('/users/additional-info');
    
    // myUser.address = [];
    myUser.emergency = {};

    let newAddress = new Address({
      address1: req.body.addressLine1 ? req.body.addressLine1 : null,
      addressLine2: req.body.addressLine2 ? req.body.addressLine2 : null,
      city: req.body.city ? req.body.city : null,
      state: req.body.state ? req.body.state : null,
      zip: req.body.zip ? req.body.zip : null
    });

    myUser.address.push(newAddress);

    req.body.roll === 'mentor' ? myUser.isMentor = true : null;
    req.body.roll === 'mentor' ? myUser.isStudent = false : null;
    req.body.roll === 'student' ? myUser.isStudent = true : null;
    req.body.roll === 'student' ? myUser.isMentor = false : null;
    req.body.firstName ? myUser.firstName = req.body.firstName : null;
    req.body.lastName ? myUser.lastName = req.body.lastName : null;

    req.body.phone ? myUser.phone = req.body.phone : null;
    req.body.dob ? myUser.dob = req.body.dob : null;
    req.body.about ? myUser.about = req.body.about : null;
    req.body.skills ? myUser.skills = req.body.skills : null;

    req.body.emrgnFirstName ? myUser.emergency.firstName = req.body.emrgnFirstName : null;
    req.body.emrgnLastName ? myUser.emergency.lastName = req.body.emrgnLastName : null;
    req.body.emrgnPhone ? myUser.emergency.phone = req.body.emrgnPhone : null;
    req.body.emrgnEmail ? myUser.emergency.email = req.body.emrgnEmail : null;

    console.log('myUser: ', myUser);

    newAddress.save(newAddress, (err) => {   
      if (err) return next(err);

      myUser.save(function(err2) {
        if (err2) return next(err2);
        res.redirect('/users/' + req.params.id);
      });

    });

  });

}

function prepeareToShowAdditionalInfo(req, res, next) {
 
  let loggedInUser = JSON.parse(JSON.stringify(req.user));
  let userId = loggedInUser._id;

  User
  .findById(userId)
  .populate('address')
  .exec((err, user) => {
    if (err) return next(err);
    if (!err && user) {
      let myUser = JSON.parse(JSON.stringify(user));  
      if (myUser.dob) {
      let myDate = moment(myUser.dob).format("YYYY-MM-DD");
        myUser.dob = myDate;
      }
      res.render('users/additional-info', { title: 'Info', user: myUser, isLoggedIn: req.isAuthenticated() });
    } else {
      let error = new Error();
      error.message = 'Could not retrieve user';
      error.status = 400;
      return next(error);
    }
    
  });
}

function show(req, res, next) {
  User
  .findById(req.params.id)
  .populate('classesAsMentor')
  .populate('classesAsStudent')
  .exec((err, user) => {
    if (err) return next(err);
    res.render('users/user-page', {title: 'Your Page', user, isLoggedIn: req.isAuthenticated()})
  })

}
