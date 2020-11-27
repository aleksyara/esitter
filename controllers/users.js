const { response } = require('express');
const User = require('../models/user');
// const moment = require('moment');
// const DateFormatter = require('../utils/date-fomratter');


module.exports = {
    index: index,
    create,
    show
};
  
function index (req, res, next) {
  res.render('users/user-page', {});
};

  // function create(req, res) {
  //   const user = new User(req.body);
  //   if (req && req.body && req.body.departs === '') {
  //     let date = new Date();
  //     let year = date.getFullYear();
  //     let month = date.getMonth();
  //     let day = date.getDate();
  //     flight.departs = new Date(year + 1, month, day);
  //   }

  //   flight.save(function(err) {
  //     console.log('This is error: ', err);
  //     // one way to handle errors
  //     if (err) return res.redirect('/users/log-in');
  //     console.log('user: ', user);
  //     // for now, redirect right back to new.ejs
  //     res.redirect('/users/user-page');
  //   });
  // }
  
function create(req, res) {
  console.log('req.body: ', req.body);
  User.findById(req.params.id, function(err, myUser) {
    // console.log('myUser: ', myUser);
    if (err || !myUser) return res.redirect('/users/additional-info');
    
    myUser.address = {};
    myUser.emergency = {};

    req.body.roll === 'mentor' ? myUser.isMentor = true : null;
    req.body.roll === 'mentor' ? myUser.isStudent = false : null;
    req.body.roll === 'student' ? myUser.isStudent = true : null;
    req.body.roll === 'student' ? myUser.isMentor = false : null;
    req.body.firstName ? myUser.firstName = req.body.firstName : null;
    req.body.lastName ? myUser.lastName = req.body.lastName : null;

    req.body.addressLine1 ? myUser.address.address1 = req.body.addressLine1 : null;
    req.body.addressLine2 ? myUser.address.address2 = req.body.addressLine2 : null;
    req.body.city ? myUser.address.city = req.body.city : null;
    req.body.state ? myUser.address.state = req.body.state : null;
    req.body.zip ? myUser.address.zip = req.body.zip : null;

    req.body.phone ? myUser.phone = req.body.phone : null;
    req.body.dob ? myUser.dob = req.body.dob : null;
    req.body.about ? myUser.about = req.body.about : null;
    req.body.skills ? myUser.skills = req.body.skills : null;

    req.body.emrgnFirstName ? myUser.emergency.firstName = req.body.emrgnFirstName : null;
    req.body.emrgnLastName ? myUser.emergency.lastName = req.body.emrgnLastName : null;
    req.body.emrgnPhone ? myUser.emergency.phone = req.body.emrgnPhone : null;
    req.body.emrgnEmail ? myUser.emergency.email = req.body.emrgnEmail : null;

    console.log('myUser: ', myUser);

    myUser.save(function(err2) {
      if (err2) return res.render('error');
      res.redirect('/users/' + req.params.id);
    });
  });

}
function show(req, res) {
  console.log("************");
  User.findById(req.params.id, function(err, user) {
    if (err) return res.render('error');
    console.log("user: ", user);
    res.render('users/user-page', {title: 'Your Page', user})
  }); 
}
