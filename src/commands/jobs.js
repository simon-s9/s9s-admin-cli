const os = require('os');
const Spinner = require('cli-spinner')
    .Spinner;
const CommandsList = require(__dirname + '/../commandsList.js');

exports = module.exports = new CommandsList([
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
                        $this.banner(`Cluster ${clusterId} | Job ${item.jobId} | ${item.time}`, 120,
                            'blue');
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
    },
    {
        name: 'add',
        info: 'Add a job',
        exec: function ($clusterId, $command, $data) {
            const $this = this;
            const clusterId = $clusterId || this.options.cluster || 0;
            var command = $command || this.args[0] || null;
            var data = $data || this.args[1] || null;
            if (this.args.length !== 2 && $command === undefined && $data === undefined) {
                return this.error(`Usage ${this.app} jobs:add <command> <data[json]>`);
            }
            if (typeof (data) === 'string') {
                try {
                    data = JSON.parse(data);
                } catch (error) {
                    return this.error('Failed to parse data JSON');
                }
            }
            const ip = this.getIp()[0].address;
            const job = {
                command: command,
                job_data: data
            };
            const request = {
                ip: ip,
                username: this.app,
                userid: 0,
                job: job
            };
            this.info('Creating job');
            this.rpc(clusterId, 'job', 'createJob', request)
                .then(function (result) {
                    $this.info(`Job created`);
                    $this.info(`Status ${result.status}`);
                    $this.info(`ID ${result.jobId}`);
                    if (result.status == 'DEFINED') {
                        $this.execCommand('jobs:watch', clusterId, result.jobId);
                    }
                })
                .catch(function (error) {
                    $this.error(error);
                });
        }
    },
    {
        name: 'watch',
        info: 'Watch job progress',
        exec: function ($clusterId, $jobId) {
            /**
             * Returns job information
             * @return {Promise}
             */
            function getJobInfo() {
                var data = {};
                return $this
                    .rpc(clusterId, 'job', 'getStatus', {
                        jobId: jobId
                    })
                    .then(function (result) {
                        data.status = result.status;
                        return $this.rpc(clusterId, 'job', 'getJobMessages', {
                            jobId: jobId
                        });
                    })
                    .then(function (result) {
                        data.messages = result.messages;
                        return data;
                    });
            }

            /**
             * Check job status
             */
            function check() {
                getJobInfo()
                    .then(function (data) {
                        spinner.stop();
                        process.stdout.cursorTo(0);
                        data.messages.forEach(function (message) {
                            if (message.id > lastMessage) {
                                $this.info(
                                    `[${message.id}][${message.time}] ${message.message}`
                                );
                                lastMessage = message.id;
                            }
                        });
                        spinner.start();
                        if (data.status !== 'FAILED' && data.status !== 'FINISHED') {
                            setTimeout(check, 1000);
                        } else {
                            spinner.stop();
                            $this.info(`Job ${jobId} ${data.status}`);
                        }
                    })
                    .catch($this.error)
            }

            const $this = this;
            const clusterId = $clusterId || this.options.cluster || 0;
            const jobId = $jobId || this.args[0] || null;

            var spinner = new Spinner(`Watching job ${jobId}.. %s`);
            var lastMessage = 0;

            if (!jobId) {
                return this.error('Job ID is not specified');
            }

            this.info(`Starting job watch on job ${jobId}`);
            this.rpc(clusterId, 'job', 'getStatus', {
                    jobId: jobId
                })
                .then(function (result) {
                    if (result.status == 'FAILED') {
                        $this.info(`Job ${jobId} has failed`);
                        return false;
                    }
                    if (result.status == 'FINISHED') {
                        $this.info(`Job ${jobId} has finished`);
                        return false;
                    }
                    return true;
                })
                .then(function (start) {
                    if (start) {
                        spinner.setSpinnerString('|/-\\');
                        spinner.start();
                        check()
                    }
                })
                .catch(this.error);
        }
    }
]);
