exports = module.exports = [
    {
        name: 'exec',
        info: 'Execute an RPC command',
        exec: function ($clusterId, $scope, $command) {
            const $this = this;
            const clusterId = $clusterId || this.options.cluster || 0;
            const scope = $scope || this.args[0] || null;
            var command = $command || this.args[1] || null;
            if (!scope || !command) {
                return this.error(`Usage: ${this.app} [-c <cluster id>] rpc:exec <scope> <command>`);
            }
            try {
                command = JSON.parse(command);
            } catch (error) {
                return this.error(`Could not parse command, invalid JSON`);
            }
            this.rpc(clusterId, scope, null, command)
                .then(function (result) {
                    $this.prettyJson(result);
                })
                .catch(this.error);
        }
    }
];
