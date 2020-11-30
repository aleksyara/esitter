const User = require('../models/user');

module.exports = {
create
};

function create(req, res) {
    console.log('***********req.body: ', req.body);

  User.findById(req.params.id, function(err, user) {
    console.log('***************user: ', user);
    console.log('***************user.reviews: ', user.reviews);
    user.reviews.push(req.body);
    console.log('v2*************user.reviews: ', user.reviews);
    user.save(function(err) {
      res.redirect(`/users/${user._id}`);
    });
  });
}