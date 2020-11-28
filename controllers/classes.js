const Class = require('../models/class');
const DateFormatter = require('../utils/date-formatter');

//to show all classes
function showAllClasses (req, res, next) {
    
    Class.find(function(err, classes) {
        if (err) return next(err);  
        let formattedClasses = DateFormatter.formatClassesDates(classes);
        res.render('classes/index', {title: 'classes', classes: formattedClasses}); 
    });

    
};
  

function createNewClass (req, res, next) {
    console.log('CHECK 0B *****');
    console.log('req.session: ', req.session);

    console.log('CHECK 10 *****');
    console.log('req.body: ', req.body);
    let newClass;
    newClass = new Class(req.body);
    console.log('CHECK 20 *****');
    console.log('req.user: ', req.user);
    let mentorId = req.user.id; // it is id of user
    //establish Mentor Class relationships
    
    newClass.mentor = mentorId;
    newClass.save(newClass, (err) => {   
        if (err) return next(err);   
        res.redirect('users/user-page/' + mentorId );
    });
}

  module.exports = {
    showAllClasses,
    createNewClass
};