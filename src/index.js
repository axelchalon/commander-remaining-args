module.exports = cli =>
  cli.rawArgs
    // Skip until we reach the first --option
    .slice(Math.max(cli.rawArgs.findIndex(item => item.startsWith('-')), 0))
    // Filter out arguments already parsed by commander.js
    .filter((rawArg, index, rawArgs) => {
      // If the option is consumed by commander.js, then we skip it
      if (cli.optionFor(rawArg)) {
        return false;
      }

      // If it's an argument of an option consumed by commander.js, then we
      // skip it too
      const previousRawArg = rawArgs[index - 1];
      const previousOption = cli.optionFor(previousRawArg);
      if (previousOption) { // Option consumed by commander.js
        const previousKey = previousOption.attributeName();
        if (cli[previousKey] === rawArg) {
          return false;
        }
      }

      return true;
    });
