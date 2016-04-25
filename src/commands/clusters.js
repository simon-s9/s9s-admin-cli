const jobs = require(__dirname + '/jobs.js');

/**
 * Export
 * @type {Array}
 */
exports = module.exports = [
    {
        name: 'list',
        info: 'Shows the list of clusters',
        exec: function () {
            const $this = this;
            this.banner('Listing clusters');
            this.rpc(0, 'clusters')
                .then(function (data) {
                    $this.info(`Found ${data.clusters.length} clusters.`);
                    $this.nn();
                    data.clusters.forEach(function (cluster) {
                        $this.banner(cluster.name, 120, 'blue');
                        $this.prettyJson(cluster);
                        $this.nn();
                    });
                })
                .catch($this.error);
        }
    },
    {
        name: 'hosts',
        info: 'Shows a list of cluster hosts',
        exec: function () {
            const $this = this;
            if (!this.options.cluster) {
                return this.error('Cluster ID not provided');
            }
            this.banner(`Listing hosts for cluster ${this.options.cluster}`)
            this.rpc(this.options.cluster, 'stat', 'getHosts')
                .then(function (data) {
                    $this.dates.object(data.data);
                    data.data.forEach(function (host) {
                        $this.banner(
                            `Cluster ${$this.options.cluster} | Host ${host.hostId} | ${host.hostname}`,
                            120, 'blue');
                        $this.prettyJson(host);
                        $this.nn();
                    });
                })
                .catch($this.error);
        }
    },
    {
        name: 'remove',
        info: 'Remove a cluster',
        exec: function () {
            if (!this.options.cluster) {
                return this.error('Cluster ID not provided');
            }

            jobs.getByName('add')
                .exec
                .call(this, this.options.cluster, 'remove_cluster', {
                    clusterid: this.options.cluster
                });
        }
    }
];
