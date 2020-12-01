const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// /asfdas/asdfasdf/asfdasfd/ 

router.post('/:id', reviewsCtrl.create);
router.delete('/:id', reviewsCtrl.delete);

module.exports = router;