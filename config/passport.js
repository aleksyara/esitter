const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log('CHEC 1 *****');
    // console.log('profile: ', profile);
    // console.log('profile.emails: ', profile.emails);
    // console.log('profile.emails[0].value: ', profile.emails[0].value);
    
    User.findOne({ 'googleId': profile.id }, function(err, myUser) {
        if (err) return cb(err);
        if (!err && myUser) {
            // console.log('CHECK 2A *****');
            // console.log('err: ', err);
            // console.log('myUser: ', myUser);
            // we know this is a returning customer
            // check if there any missing information
            // if missing InputDeviceInfo, redirect to miising info form
            return cb(err, myUser);
        } else if (!err && !myUser) {
            // console.log('CHECK 2B *****');
            if (
                profile &&
                profile.id &&
                profile.emails &&
                profile.emails.length >= 1 &&
                profile.emails[0].value
            ) {
                //create new user
                let email = profile.emails[0].value;
                let googleId = profile.id;
                let newUser = new User({email, googleId});
                // console.log('newUser: ', newUser);
                newUser.save(newUser, (err2) => {
                    // console.log('CHECK 3 *****');
                    // console.log('err2', err2);
                    return cb(err2, newUser);
                });
                // new customer
                // need to save/add customer/user
            } else {
                let error = new Error();
                error.status = 400;
                error.message = 'Failed to retrieve Google profile.'
                return cb(error);
            }
            
            
        } else {
            return cb(err, myUser);
        }
    });
  }
));

//after login, done allows us to store information about user?
//you will be changing student.id and Student....
passport.serializeUser(function(user, done) { //student will be a value of newStudent (see above)
    // done();
    // console.log('CHECK 4 *****');
    // console.log('user: ', user);
    done(null, user.id);//storing our id in our seccion
});

//deside what we want to do with information next..
//will be called every time ar request comes from our server
passport.deserializeUser(function(id, done) {
    // done();
    // console.log('CHECK 5 *****');
    // console.log('id: ', id);
    //this is wehre we find the document to attach to req.user
    User.findById(id, function(err, user) {
        // console.log('CHECK 6 *****');
        // console.log('err: ', err);
        // console.log('user: ', user);
        done(err, user); // assigns our documet to req.user/ 
    });
});



