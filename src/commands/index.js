// Required modules
const filesystem = require('s9s-filesystem');
const dir = filesystem.listDirectory(__dirname);
/**
 * Commands to export
 * @type {Array}
 */
var commands = {};
exports = module.exports = commands;
// Load the commands
dir.forEach(function(filename) {
    if (filename == 'index.js') {
        return;
    }
    var methods = require(__dirname + '/' + filename);
    methods.forEach(function(method) {
        commands[filename.replace('.js', '') + ':' + method.name] = method;
    });
});