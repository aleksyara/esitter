const User = require('../models/user');

module.exports = {
create
};

function create(req, res, next) {
    console.log('***********req.body: ', req.body);
    User.findById(req.params.id, function(err1, user) {
        if (err1) return next(err1);
        console.log('Expect to give review to user with ID: ', req.params.id);
        console.log('***************user: ', user);
        console.log('***************user.reviews: ', user.reviews);
        user.reviews.push(req.body);
        console.log('v2*************user.reviews: ', user.reviews);
        user.save(function(err2) {
            if (err2) return next(err2);
            res.redirect(`/users/${user._id}`);
        });
  });
}