exports = module.exports = [
    {
        name: 'list',
        info: 'Shows the list of logs',
        exec: function () {
            const $this = this;
            const clusterId = this.options.cluster || 0;
            this.banner(`Cluster ${clusterId} | Logs list`);
            this.rpc(clusterId, 'log', 'list')
                .then(function (data) {
                    $this.dates.object(data.data);
                    if (!$this.options.raw) {
                        data.data.forEach(function (item) {
                            item['view-command'] = `${$this.app} -c ${clusterId} -h ${item.hostname} -f ${item.filename} logs:view`;
                        });
                    }
                    $this.prettyJson(data.data);
                    $this.nn();
                })
                .catch($this.error);
        }
    },
    {
        name: 'view',
        info: 'Shows log contents',
        exec: function () {
            const $this = this;
            const clusterId = this.options.cluster || 0;
            var data = {};
            if (this.options.host) {
                data.hostname = this.options.host;
            }
            if (this.options.file) {
                data.filename = this.options.file;
            }
            if (this.options.limit) {
                data.limit = this.options.limit;
            }
            this.banner(`Cluster ${clusterId}`
                + (data.hostname ? ` | Host ${data.hostname}` : '')
                + (data.filename ? ` | File ${data.filename}` : '')
                + (data.limit ? ` | Limit ${data.limit}` : ''));
            this.rpc(clusterId, 'log', 'contents', data)
                .then(function (data) {
                    if (!$this.options.rawDates) {
                        data.data.forEach(function (item) {
                            if (item.created) {
                                item.created = new Date(item.created * 1000);

                            }
                        });
                    }
                    $this.prettyJson(data.data);
                    $this.end();
                })
                .catch($this.error);
        }
    }
];
