const http = require('http');
const querystring = require('querystring');
const Promise = require('promise');
const encoding = 'utf8';

/**
 * Export
 * @return {Function}
 */
exports = module.exports = function () {
    const rpcHost = this.options.rpcHost;
    const rpcPort = this.options.rpcPort;
    const $this = this;

    /**
     * Checks if cluster has a token in config
     * @param  {Number}  clusterId 
     * @return {Boolean}           
     */
    function hasToken(clusterId) {
        return hasConfig(clusterId) && 'rpc_key' in $this.getConfig(clusterId)
    }

    /**
     * Returns cluster token
     * @param  {Number} clusterId 
     * @return {String}           
     */
    function getToken(clusterId) {
        return $this
            .getConfig(clusterId)
            .rpc_key;
    }

    /**
     * Checks if cluster has a config
     * @param  {Number}  clusterId 
     * @return {Boolean}           
     */
    function hasConfig(clusterId) {
        return $this.getConfig(clusterId) !== null;
    }

    /**
     * Make a request to RPC server
     * @param  {Number} clusterId
     * @param  {String} scope
     * @param  {String} [operation]
     * @param  {Object} [data]
     * @return {Promise}
     */
    return function (clusterId, scope, operation, data) {
        data = data || {};
        if (!data.token) {
            if ($this.options.token) {
                data.token = this.options.token;
            } else if (hasToken(clusterId)) {
                data.token = getToken(clusterId);
            }
        }
        if (operation) {
            data.operation = operation;
        }
        return new Promise(function (resolve, reject) {
            var request = http.request({
                hostname: rpcHost,
                port: rpcPort,
                path: `/${clusterId}/${scope}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, function (response) {
                var body = '';
                response.setEncoding(encoding);
                response.on('data', function (chunk) {
                    body += chunk;
                });
                response.on('end', function () {
                    try {
                        body = JSON.parse(body);
                    } catch (error) {
                        return reject(new Error('Failed to parse json'));
                    }
                    if (body.requestStatus == 'ok') {
                        resolve(body);
                    } else {
                        reject(new Error(body.errorString || 'Unknown error'));
                    }
                });
            });
            request.on('error', reject);
            request.end(JSON.stringify(data), encoding);
        });
    };
};
