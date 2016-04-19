exports = module.exports = function (cli, clc) {
    return `${cli.app} [OPTIONS] <command> [ARGS]

` + clc.bold('Info:') +
        `
  ${cli.app} version: ${cli.version}

  By default, the program will try to pickup the tokens from *.cnf files in /etc
  if the script is running under root, otherwise you will (most-likely) need to
  provide a token to make requests to the CMON process.`
};
