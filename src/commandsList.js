exports = module.exports = CommandsList;

/**
 * JobsList class
 * @constructor
 * @extends {Array}
 */
function CommandsList(list) {
    var $this = this;
    list = list || [];
    list.forEach(function (item) {
        $this.push(item);
    });
}

/**
 * @type {Array}
 */
CommandsList.prototype = [];

/**
 * Returns a job by name
 * @param  {string} name
 * @return {Object|null}
 */
CommandsList.prototype.getByName = function (name) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].name === name) {
            return this[i];
        }
    }
    return null;
};
