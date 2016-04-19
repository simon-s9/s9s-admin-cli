# s9s-admin

Command line administration tool for [ClusterConrol](http://severalnines.com/product/clustercontrol). Requires root privileges.

## Installation

```
npm install -g s9s-admin
```

## Usage

```
Usage:
  s9s-admin [OPTIONS] <command> [ARGS]

Info:
  s9s-admin version: 0.0.1

  By default, the program will try to pickup the tokens from *.cnf files in /etc
  if the script is running under root, otherwise you will (most-likely) need to
  provide a token to make requests to the CMON process.

Options:
  -rp, --rpcPort         RPC port (Default is 9500)
  -rh, --rpcHost         RPC host (Default is 127.0.0.1)
  -c, --cluster NUMBER   Cluster ID
  -h, --host STRING      Host ID/Name/Ip
      --raw BOOLEAN      Output raw JSON
      --rawDates BOOLEAN Output raw Dates
  -l, --limit NUMBER     Limit output
  -f, --file FILE        Filename
  -t, --token            Request token (optional)
  -k, --no-color         Omit color from output
      --debug            Show debug information
  -v, --version          Display the current version

Commands:
  clusters:list          Shows the list of clusters
  clusters:hosts         Shows a list of cluster hosts
  config:list            Shows cluster config
  config:vars            Show license info
  config:version         Show version info
  jobs:list              Shows the list of jobs
  jobs:messages          Shows list of messages for a job
  jobs:status            Shows job status
  logs:list              Shows the list of logs
  logs:view              Shows log contents
  settings:list          Shows the list of clusters
  settings:license       Show license info
  settings:version       Show version info
```

## License

Copyright (c) 2016 [Severalnines AB](http://severalnines.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.