
var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');
const user = require('../models/user');

//const ticketsCtrl = require('../controllers/tickets');

/* GET users listing. */
router.get('/', usersCtrl.index);
router.get('/user-page', function(req, res, next) {
    res.render('users/user-page');
});
router.get('/log-in', function(req, res, next) {
    res.render('users/log-in');
});
router.get('/additional-info', function(req, res, next) {
    res.render('users/additional-info');
});
router.post('/:id', usersCtrl.saveAdditionalInfo) //req, res, req.id, findById, svae

// router.get('/new', flightsCtrl.new);
// router.get('/:id', flightsCtrl.show);
// router.post('/', flightsCtrl.create);//it's posting NEW flight FORM

// router.get('/:id/tickets/new', ticketsCtrl.getNewTicketForm);
// router.post('/:id/tickets', ticketsCtrl.addTicketToFlight);



  

module.exports = router;
