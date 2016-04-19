const http = require('http');
const querystring = require('querystring');
const Promise = require('promise');
exports = module.exports = function () {
    const encoding = 'utf8';
    const rpcHost = '127.0.0.1';
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

    return function (clusterId, scope, operation, data) {
        data = data || {};
        if ($this.options.token) {
            data.token = this.options.token;
        } else if (hasToken(clusterId)) {
            data.token = getToken(clusterId);
        }

        if (operation) {
            data.operation = operation;
        }
        return new Promise(function (resolve, reject) {
            var request = http.request({
                hostname: rpcHost,
                port: rpcPort,
                path: '/' + clusterId + '/' + scope,
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
