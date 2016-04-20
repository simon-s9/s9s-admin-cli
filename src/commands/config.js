const moment = require('moment');

/**
 * Export
 * @type {Array}
 */
exports = module.exports = [
    {
        name: 'list',
        info: 'Shows cluster config',
        exec: function () {
            const $this = this;
            const clusterId = this.options.cluster || 0;
            this.banner(`Cluster ${clusterId} | Config`);
            this.rpc(clusterId, 'config', 'list')
                .then(function (data) {
                    $this.prettyJson(data.data);
                    $this.end();
                })
                .catch($this.error);
        }
    },
    {
        name: 'vars',
        info: 'Show license info',
        exec: function () {
            const $this = this;
            const clusterId = this.options.cluster || 0;
            if (!this.options.host) {
                return this.error('Hostname not specified, please use -h <hostname>');
            }
            this.banner(`Cluster ${clusterId} | Config variables`);
            this.rpc(clusterId, 'config', 'variables')
                .then(function (data) {
                    data.data.forEach(function (item) {
                        $this.banner(`Cluster ${clusterId} | Host ${item.hostname}`, 120, 'blue');
                        var vars = {};
                        item.variables.forEach(function (variable) {
                            var filepath = variable.filepath || 'default';
                            var section = variable.section || 'default';
                            if (!(filepath in vars)) {
                                vars[filepath] = {};
                            }
                            if (!(section in vars[filepath])) {
                                vars[filepath][section] = {};
                            }
                            vars[filepath][section][variable.variablename] = variable.value;
                        });
                        $this.prettyJson(vars);
                    });
                    // $this.prettyJson(data.data);
                    $this.end();
                })
                .catch($this.error);
        }
    },
    {
        name: 'version',
        info: 'Show version info',
        exec: function () {
            const $this = this;
            this.rpc(0, 'clusters')
                .then(function (data) {
                    $this.prettyJson({
                        version: data.info.version
                    });
                    $this.end();
                })
                .catch($this.error);
        }
    }
];
