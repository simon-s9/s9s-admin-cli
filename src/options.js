exports = module.exports = {
    rpcPort: ['P', 'RPC port', null, 9500],
    rpcHost: ['H', 'RPC host', null, '127.0.0.1'],
    cluster: ['c', 'Cluster ID', 'int', null],
    host: ['h', 'Host ID/Name/Ip', 'string', null],
    raw: [null, 'Output raw JSON', 'boolean', false],
    rawDates: [null, 'Output raw Dates', 'boolean', false],
    limit: ['l', 'Limit output', 'int', null],
    file: ['f', 'Filename', 'file', null],
    token: ['t', 'Request token (optional)']
};
