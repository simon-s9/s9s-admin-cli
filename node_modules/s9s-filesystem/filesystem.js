/**
 * @overview
 * @author Severalnines AB
 * @license MIT
 * @copyright 2016 Severalnines AB
 */

/**
 * @module Filesystem
 * @description File system module
 */

'use strict';

exports = module.exports = new Filesystem();

const fs = require('fs');
const mkdirp = require('mkdirp');

/**
 * File system class
 * @class Filesystem
 * @constructor
 * @license MIT
 */
function Filesystem() {
}

/**
 * Returns stats for file/directory/symbolic link
 * @param {string} path The path to check
 * @returns {boolean|{}|*}
 */
Filesystem.prototype.getStat = function (path) {
    try {
        return fs.statSync(path);
    } catch (e) {
        return false;
    }
};

/**
 * Checks if the path is a file
 * @param {string} path The path to check
 * @returns {boolean}
 */
Filesystem.prototype.isFile = function (path) {
    var stat;
    if (stat = this.getStat(path)) {
        return stat.isFile();
    }
    return false;
};

/**
 * Checks if the path is a directory
 * @param {string} path The path to check
 * @returns {boolean}
 */
Filesystem.prototype.isDirectory = function (path) {
    var stat;
    if (stat = this.getStat(path)) {
        return stat.isDirectory();
    }
    return false;
};

/**
 * Checks if files exists
 * @param {string} path The path to check
 * @returns {boolean}
 */
Filesystem.prototype.fileExists = function (path) {
    return this.isFile(path);
};

/**
 * Checks if directory exists
 * @param {string} path The path to check
 * @returns {boolean}
 */
Filesystem.prototype.directoryExists = function (path) {
    return this.isDirectory(path);
};

/**
 * Create a new directory (recursively)
 * @param {string} path The path to create
 * @param mode The mode to create a directory with, default 0777 & (~process.umask())
 * @returns {boolean}
 */
Filesystem.prototype.createDirectory = function (path, mode) {
    try {
        mkdirp.sync(path, {
            mode: mode
        });
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Deletes a directory
 * @param {string} path The path to the directory to delete
 * @returns {boolean}
 */
Filesystem.prototype.deleteDirectory = function (path) {
    try {
        fs.rmdirSync(path);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Delete a file
 * @param {string} path Path to file
 * @returns {boolean}
 */
Filesystem.prototype.deleteFile = function (path) {
    try {
        fs.unlinkSync(path);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Renames a file or directory
 * @param {string} oldName Original name
 * @param {string} newName New name
 * @returns {boolean}
 */
Filesystem.prototype.rename = function (oldName, newName) {
    try {
        fs.renameSync(oldName, newName);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Reads file contents
 * @param {string} path Path to file
 * @param {string} [options] Default 'utf8'
 * @returns {boolean|string}
 */
Filesystem.prototype.readFile = function (path, options) {
    options = options || 'utf8';
    try {
        return fs.readFileSync(path, options);
    } catch (error) {
        return false;
    }
};

/**
 * Write file contents
 * @param {string} path Path to file
 * @param {string} data Data to write
 * @param {string} [options] Default 'utf8'
 * @returns {boolean}
 */
Filesystem.prototype.writeFile = function (path, data, options) {
    options = options || 'utf8';
    try {
        fs.writeFileSync(path, data, options);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Reads JSON files and returns a parsed json object
 * @param {string} path Path to JSON file
 * @returns {boolean|Object}
 */
Filesystem.prototype.readJson = function (path) {
    try {
        return JSON.parse(this.readFile(path));
    } catch (error) {
        return false;
    }
};

/**
 * Converts data object to json string and writes to path
 * @param {string} path Path to json file
 * @param {Object} data Data to write
 * @returns {boolean}
 */
Filesystem.prototype.writeJson = function (path, data) {
    try {
        return this.writeFile(path, JSON.stringify(data));
    } catch (error) {
        return false;
    }
};

/**
 * Append data to the end of file
 * @param {string} path Path to file
 * @param {string} data Data to append
 * @param {object|string} [options] Write options, default "utf8"
 * @returns {boolean}
 */
Filesystem.prototype.appendFile = function (path, data, options) {
    options = options || 'utf8';
    try {
        fs.appendFileSync(path, data, options);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Prepend data to the end of file
 * @param {string} path Path to file
 * @param {string} data Data to prepend
 * @param {object|string} [options] Read/Write options, default "utf8"
 * @returns {boolean}
 */
Filesystem.prototype.prependFile = function (path, data, options) {
    options = options || 'utf8';
    try {
        var contents = this.readFile(path, options);
        if (contents === false) {
            return false;
        }
        return this.writeFile(path, data + contents, options);
    } catch (error) {
        return false;
    }
};

/**
 * Returns list of items in directory
 * @param path
 * @returns {boolean}
 */
Filesystem.prototype.listDirectory = function (path) {
    if (!this.directoryExists(path)) {
        return false;
    }
    try {
        return fs.readdirSync(path);
    } catch (error) {
        return false;
    }
};
