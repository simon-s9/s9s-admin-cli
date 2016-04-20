#!/usr/bin/env node

// System modules
const cli = require('cli');
const filesystem = require('s9s-filesystem');
const prettyjson = require('prettyjson');
const clc = require('cli-color');
const os = require('os');

// Custom modules
const pack = filesystem.readJson(`${__dirname}/package.json`);
const commands = require(`${__dirname}/src/commands`);
const isRoot = process.getuid() === 0;

// Set app name and version
cli.setApp(
    pack.name,
    pack.version
);

// Set app usage
cli.setUsage(
    require(`${__dirname}/src/usage`)(cli, clc)
);

// Enable CLI plugins
cli.enable(
    'help',
    'version',
    'status'
);

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

/**
 * Returns the current ip address
 * @return {String}
 */
cli.getIp = function () {
    var ifaces = os.networkInterfaces();
    var ip = [];
    Object.keys(ifaces)
        .forEach(function (ifname) {
            var alias = 0;

            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                    return;
                }

                if (alias >= 1) {
                    // this single interface has multiple ipv4 addresses
                    // console.log(ifname + ':' + alias, iface.address);
                    ip.push({
                        iface: ifname,
                        address: iface.address
                    });
                } else {
                    // this interface has only one ipv4 adress
                    // console.log(ifname, iface.address);
                    ip.push({
                        iface: ifname,
                        address: iface.address
                    });
                }
                ++alias;
            });
        });
    return ip;
};

/**
 * Execute a command
 */
cli.execCommand = function () {
    var args = Array.prototype.slice.call(arguments);
    var command = args.shift();
    if (command in commands) {
        commands[command]
            .exec
            .apply(this, args);
    }
};

cli.parse(
    require(`${__dirname}/src/options`),
    (function () {
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
    // Try to load configs from /etc/cmon.cnf and /etc/cmon.d/*.cnf
    cli.config = require(`${__dirname}/src/config`);

    // Dates parser
    cli.dates = require(`${__dirname}/src/dates`)
        .call(this);

    // RPC module
    cli.rpc = require(`${__dirname}/src/rpc`)
        .call(this);

    // Execute command
    this.execCommand(cli.command);
});
