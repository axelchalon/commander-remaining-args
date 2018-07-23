# commander-remaining-args

Get the remaining unknown arguments after parsing the CLI with commander.js

Example use case: your program launches a child process. User passes flags to your program. You parse certain flags but want the rest to be passed down to the child process.

Don't forget to set `.allowUnknownOption()` on your commander.js object.

## Usage

```
const cli = require('commander');
const getRemainingArgs = require('commander-remaining-args');

cli
  .allowUnknownOption()
  .option('--some-flag')
  .parse(process.argv);

// node myprogram.js --some-flag --unknown-flag --unknown-arg=value -x

getRemainingArgs(cli); // ['--unknown-flag', '--unknown-arg=value', '-x'])

```

## Caveats

* No support for subcommands