

function determineRedirectRouteAfterGoogleAuthentication(user) {
    let redirectRoute;
    let isAdditionalInfoNeeded = true;
    // console.log('CHECK 1 *****');
    // console.log('user: ', user);
    // set isAdditionalInfoNeeded to true or false
    if (
        user.firstName &&
        user.lastName &&
        user.address &&
        user.address.address1 &&
        user.address.city &&
        user.address.state &&
        user.address.zip &&
        user.phone &&
        user.dob &&
        user.skills &&
        user.about &&
        user.emergency &&
        user.emergency.firstName &&
        user.emergency.lastName &&
        user.emergency.phone &&
        user.emergency.email &&
        (user.isMentor || user.isStudent)
    ) {
        isAdditionalInfoNeeded = false;
    } else {
        isAdditionalInfoNeeded = true;
    }
    
  
    if (isAdditionalInfoNeeded) {
      redirectRoute = './users/additional-info';
    } else {
      redirectRoute = './users/user-page/' + user.id;
    }
    
    return redirectRoute;
  }

  module.exports = {
    determineRedirectRouteAfterGoogleAuthentication
  }