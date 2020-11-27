var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');
const user = require('../models/user');
var app = express();
var moment = require('moment');
// const classesCtrl = require('../controllers/classes');
//const ticketsCtrl = require('../controllers/tickets');

/* GET users listing. */
router.get('/', usersCtrl.index);
router.get('/user-page', function(req, res, next) {
    let myUser = JSON.parse(JSON.stringify(req.user));
    res.render('users/user-page', {user: myUser});
});

router.get('/user-page/:id', function(req, res, next) {
    let myUser = JSON.parse(JSON.stringify(req.user));
    res.render('users/user-page', {user: myUser});
});

router.get('/log-in', function(req, res, next) {
    res.render('users/log-in');
});


router.get('/additional-info', function(req, res, next) {

    let myUser = JSON.parse(JSON.stringify(req.user));
    console.log('myUser: ', myUser);
    if (myUser.dob) {
        let myDate = moment(myUser.dob).format("YYYY-MM-DD");
        myUser.dob = myDate;
    }

    res.render('users/additional-info', { title: 'eSitter', user: myUser });
});

router.post('/:id', usersCtrl.create); 
router.get('/:id', usersCtrl.show);




// router.get('/new', flightsCtrl.new);
// router.get('/:id', flightsCtrl.show);
// router.post('/', flightsCtrl.create);//it's posting NEW flight FORM

// router.get('/:id/tickets/new', ticketsCtrl.getNewTicketForm);
// router.post('/:id/tickets', ticketsCtrl.addTicketToFlight);


module.exports = router;
