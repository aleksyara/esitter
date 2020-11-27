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
    console.log('req.body: ', req.body);
    let newClass;
    newClass = new Class(req.body);
    newClass.save(newClass, (err) => {   
        if (err) return next(err);   
        res.redirect('/classes');
    });
}

  module.exports = {
    showAllClasses,
    createNewClass
};