const User = require('../models/user');
// const moment = require('moment');
// const DateFormatter = require('../utils/date-fomratter');


module.exports = {
    index: index
};
  

// function index(req, res) {
//     Flight.find({}, function(err, myFlights) {
//       let flights = JSON.parse(JSON.stringify(myFlights));
//       flights = DateFormatter.formatFlightDepartureDates(flights);
//       console.log(flights, ' <============ flights in show page')
//       res.render('flights/index', { title: 'All Flights', flights });
//     });
//   }

  function index (req, res, next) {
    res.render('users/user-page', {});
    // res.render('users/index', {
    //   mySkills: Skill.getAll()
//    user
//     });
//     console.log('this is a user: ', user);
  };