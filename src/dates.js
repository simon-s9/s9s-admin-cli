const moment = require('moment');

var options;
var keys = ['created', 'lastseen', 'wallclock', 'time'];

exports = module.exports = function () {
    options = this.options;
    return {
        item: datesItem,
        object: datesObject
    }
};

function parseDate(date) {
    switch (typeof (date)) {
    case 'string':
        // var sql = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
        // if (sql.test(date)) {
        //     var dt = new Date();
        //     var dateInfo = sql.exec(date);
        //     dt.setUTCFullYear(parseInt(dateInfo[1]));
        //     dt.setUTCMonth(parseInt(dateInfo[2])-1);
        //     dt.setUTCDate(parseInt(dateInfo[3]));
        //     dt.setUTCHours(parseInt(dateInfo[4]));
        //     dt.setUTCMinutes(parseInt(dateInfo[5]));
        //     dt.setUTCSeconds(parseInt(dateInfo[6]));
        //     return dt;
        // }
        return moment(date).toDate()
        break;
    default:
        return new Date(date * 1000);
        break;
    }
}

function datesItem(item) {
    if (!options.rawDates) {
        keys.forEach(function (key) {
            if (key in item) {
                item[key] = parseDate(item[key]);
            }
        });
    }
}

function datesObject(data) {
    if (!options.rawDates) {
        data.forEach(datesItem);
    }
}
