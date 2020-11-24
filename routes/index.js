var express = require('express');
var router = express.Router();
// const moment = require('moment');
// const DateFormatter = require('../utils/date-fomratter');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'eSitter' });
});

module.exports = router;
