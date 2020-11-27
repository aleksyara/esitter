const moment = require('moment');

function formatClassesDates(listOfClasses) {
    let output;
    output = listOfClasses.map((elem) => {
        let formatedStartDate = moment(elem.startDate).format('ll');
        let formatedEndDate = moment(elem.endDate).format('ll');
        elem.startDate = formatedStartDate;
        elem.endDate = formatedEndDate;

        return elem;
    });
    return output;
}

module.exports = {
    formatClassesDates
};