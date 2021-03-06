const filesystem = require('s9s-filesystem');
const os = require('os');

var config = {};

/**
 * Export
 * @type {Object}
 */
exports = module.exports = config;

/**
 * Read configuration file
 * @param  {String} filename
 * @return {Object}
 */
function readConfig(filename) {
    var data = filesystem.readFile(filename);
    var result = {};
    if (data !== false) {
        data = data.split(os.EOL);
    }
    data.forEach(function(item) {
        var pair = item.split('=');
        if (pair[1]) {
            result[pair[0]] = pair[1];
        }
    });
    return result;
}

// Default cluster configurations (aka cluster 0) (/etc/cmon.cnf)
config.default = readConfig('/etc/cmon.cnf');

// Subdirectory /etc/cmon.d/*.cnf
if (filesystem.isDirectory('/etc/cmon.d')) {
    var contents = filesystem.listDirectory('/etc/cmon.d');
    if (contents) {
        contents.forEach(function(filename) {
            var conf = readConfig(`/etc/cmon.d/${filename}`);
            config[conf.cluster_id] = conf;
        });
    }
}