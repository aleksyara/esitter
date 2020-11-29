const Class = require('../models/class');
const User = require('../models/user');
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
    let newClass;
    newClass = new Class(req.body);
    let mentorId = req.user.id; // it is id of user
    //establish Mentor Class relationships
    
    newClass.mentor = mentorId;
    newClass.save(newClass, (err) => {   
        if (err) return next(err);   
        User.findById(mentorId, function(err2, user) {
            if (err2) return next(err2); 
            user.classesAsMentor.push(newClass.id);
            user.save(user, (err3) => {
                if (err3) return next(err3); 
                res.redirect('users/user-page/' + mentorId );
            });   
        });  
    });
}

function prepareToEnroll(req, res, next) {
    let classId = req.params.classId;
    let studentId = req.user.id;
    res.render('classes/confirm-enrollment', {title: 'Confirm Enrollment', classId, studentId}); 
}

function enrollIntoClass(req, res, next) {
    let classId = req.params.id;
    let studentId = req.user.id;
    
    User.findById(studentId, (err, user) => {
        if (err) return next(err); 

        let classesArr = user.classesAsStudent;
        let indexOfClassId = -1;
        if (classesArr.length) {
            indexOfClassId = classesArr.indexOf(classId);
        }
    
        if (classesArr.length && indexOfClassId >= 0) {
            let uniqueConstraintError = new Error();
            uniqueConstraintError.message = 'Student should not be enrolled in the same class twice.';
            uniqueConstraintError.status = 409;
            return next(uniqueConstraintError);
        }

        user.classesAsStudent.push(classId);
        user.save(user, (err2) => {
            if (err2) return next(err2);
            Class.findById(classId, (err3, myClass) => {
                if (err3) return next(err3);            
                myClass.students.push(studentId);
                myClass.save(myClass, (err4) => {
                    if (err4) return next(err4);
                    res.redirect('http://localhost:3000/users/user-page/' + studentId );
                });
            });
        });
    });
}

  module.exports = {
    showAllClasses,
    createNewClass,
    enrollIntoClass,
    prepareToEnroll
};