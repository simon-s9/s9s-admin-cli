const moment = require('moment');
exports = module.exports = [
    {
        name: 'list',
        info: 'Shows the list of clusters',
        exec: function () {
            const $this = this;
            const clusterId = this.options.cluster || 0;
            this.banner(`Cluster ${clusterId} | Settings`);
            this.rpc(clusterId, 'settings', 'list')
                .then(function (data) {
                    $this.prettyJson(data.data);
                    $this.end();
                })
                .catch($this.error);
        }
    },
    {
        name: 'license',
        info: 'Show license info',
        exec: function () {
            const $this = this;
            this.banner('License');
            this.rpc(0, 'clusters')
                .then(function (data) {
                    delete data.info.version;
                    data.info.expires = moment()
                        .add(data.info.licenseExpires, 'days')
                        .toDate();
                    $this.prettyJson(data.info);
                    $this.end()
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
