exports = module.exports = [
    {
        name: 'list',
        info: 'Shows the list of jobs',
        exec: function () {
            const $this = this;
            const clusterId = this.options.cluster || 0;
            this.banner(`Cluster ${clusterId} | Jobs list`);
            this.rpc(clusterId, 'job', 'getJobs')
                .then(function (data) {
                    $this.dates.object(data.jobs);
                    $this.info(`Found ${data.jobs.length} jobs.`);
                    $this.nn();
                    data.jobs.forEach(function (item) {
                        if (item.jobStr) {
                            try {
                                item.jobStr = JSON.parse(item.jobStr);
                            } catch (e) {}
                        }
                        $this.banner(`Cluster ${clusterId} | Job ${item.jobId} | ${item.time}`, 120, 'blue');
                        $this.prettyJson(item);
                        $this.nn()
                    });
                })
                .catch($this.error);
        }
    },
    {
        name: 'messages',
        info: 'Shows list of messages for a job',
        exec: function () {
            const $this = this;
            const clusterId = this.options.cluster || 0;
            const jobId = this.args[0] || null;
            if (jobId === null) {
                return this.error('Job ID is not specified');
            }
            this.banner(`Cluster ${clusterId} | Job ${jobId} | Messages`);
            this.rpc(clusterId, 'job', 'getJobMessages', {
                    jobId: jobId
                })
                .then(function (data) {
                    $this.dates.object(data.messages);
                    $this.prettyJson(data.messages);
                })
                .catch($this.error);
        }
    },
    {
        name: 'status',
        info: 'Shows job status',
        exec: function () {
            const $this = this;
            const clusterId = this.options.cluster || 0;
            const jobId = this.args[0] || null;
            if (jobId === null) {
                return this.error('Job ID is not specified');
            }
            this.banner(`Cluster ${clusterId} | Job ${jobId} | Job status`);
            this.rpc(clusterId, 'job', 'getStatus', {
                    jobId: jobId
                })
                .then(function (data) {
                    $this.prettyJson({
                        status: data.status,
                        statusText: data.statusText
                    });
                })
                .catch($this.error);
        }
    }
];
