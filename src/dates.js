const moment = require('moment');
const keys = [
    'created',
    'lastseen',
    'wallclock',
    'time'
];

var options;

/**
 * Export
 * @return {Object}
 */
exports = module.exports = function () {
    options = this.options;
    return {
        item: datesItem,
        object: datesObject
    }
};

/**
 * Parse date from input
 * @param  {*} date
 * @return {Date}
 */
function parseDate(date) {
    switch (typeof (date)) {
    case 'string':
        return moment(date)
            .toDate();
        break;
    default:
        return new Date(date * 1000);
        break;
    }
}

/**
 * Parse dates in object
 * @param  {Object} item
 */
function datesItem(item) {
    if (!options.rawDates) {
        keys.forEach(function (key) {
            if (key in item) {
                item[key] = parseDate(item[key]);
            }
        });
    }
}

/**
 * Parse dates in list
 * @param  {Array} data
 */
function datesObject(data) {
    if (!options.rawDates) {
        data.forEach(datesItem);
    }
}
