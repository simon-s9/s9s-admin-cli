#!/usr/bin/env node

const cli = require('cli');
const filesystem = require('s9s-filesystem');
const pack = filesystem.readJson(__dirname + '/package.json');
const isRoot = process.getuid() === 0;
const commands = require(__dirname + '/src/commands');
const prettyjson = require('prettyjson');
const clc = require('cli-color');
const os = require('os');

// Set app name and version
cli.setApp(pack.name, pack.version);

// Enable CLI plugins
cli.enable('help', 'version', 'status');

/**
 * Helper: returns cluster configuration by id
 * @param  {Number} clusterId
 * @return {Object}         
 */
cli.getConfig = function (clusterId) {
    if (clusterId == 0) {
        clusterId = 'default';
    }
    if (clusterId in this.config) {
        return this.config[clusterId];
    }
    return null;
};

/**
 * Helper: returns pretified json
 * @param  {Object} data
 * @return {String}
 */
cli.getPrettyJson = function (data) {
    if (this.options.raw) {
        return JSON.stringify(data);
    }
    return prettyjson.render(data, {
        noColor: this.no_color
    });
};

/**
 * Helper: output pretty json
 * @param  {Object} data
 */
cli.prettyJson = function (data) {
    console.log(this.getPrettyJson(data));
};

/**
 * Output banner
 * @param {String} message
 * @param {Number} [maxLen]
 * @param {String} [color]
 */
cli.banner = function (message, maxLen, color) {
    /**
     * String page
     * @param  {String} str  
     * @param  {Number} len  
     * @param  {String} char 
     * @return {String}      
     */
    function pad(str, len, char) {
        while (str.length <= len) {
            str += char;
        }
        return str;
    }

    var consoleWidth = process.stdout.columns;
    var width = consoleWidth;

    if (consoleWidth > 120) {
        consoleWidth = 120;
    }
    if (maxLen !== undefined) {
        width = maxLen;
    }
    if (width > consoleWidth) {
        width = consoleWidth;
    }
    color = color || 'yellow';
    var info = [
        clc[color]('╔' + pad('', width - 4, '═') + '╗'),
        clc[color]('║ ') + pad(message, width - 6, ' ') + clc[color](' ║'),
        clc[color]('╚' + pad('', width - 4, '═') + '╝')
    ];
    console.log(info.join(os.EOL));
};

/**
 * Draw newline
 * @param  {Number} len
 */
cli.nn = function (len) {
    len = len || 1;
    for (var i = 0; i < len; i++) {
        console.log();
    }
};

/**
 * End the program
 * @param  {Number} [code]
 */
cli.end = function (code) {
    this.nn();
    this.exit(code || 0)
};

cli.setUsage(
    `${cli.app} [OPTIONS] <command> [ARGS]

` + clc.bold('Info:') +
    `
  ${cli.app} version: ${cli.version}

  By default, the program will try to pickup the tokens from *.cnf files in /etc
  if the script is running under root, otherwise you will (most-likely) need to
  provide a token to make requests to the CMON process.`
);

cli.parse({
    rpcPort: ['rp', 'RPC port', null, 9500],
    rpcHost: ['rh', 'RPC host', null, '127.0.0.1'],
    cluster: ['c', 'Cluster ID', 'int', null],
    host: ['h', 'Host ID/Name/Ip', 'string', null],
    raw: [null, 'Output raw JSON', 'boolean', false],
    rawDates: [null, 'Output raw Dates', 'boolean', false],
    limit: ['l', 'Limit output', 'int', null],
    file: ['f', 'Filename', 'file', null],
    token: ['t', 'Request token (optional)']
}, (function () {
    var list = {};
    for (var i in commands) {
        if (commands.hasOwnProperty(i)) {
            list[i] = commands[i].info;
        }
    }
    return list;
})());

// Run the app
cli.main(function (args, options) {
    // if (!isRoot || options.token) {
    //     return cli.error('You must have root priveleges!');
    // }
    cli.config = require(__dirname + '/src/config');
    cli.dates = require(__dirname + '/src/dates')
        .call(this);
    cli.rpc = require(__dirname + '/src/rpc')
        .call(this);
    if (cli.command in commands) {
        commands[cli.command].exec.call(this);
    }
});
