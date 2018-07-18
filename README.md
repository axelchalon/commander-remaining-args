# commander-remaining-args

Get the remaining unknown arguments after parsing the CLI with commander.js

Example use case: your program launches a child process. User passes flags to your program. You parse some of them but want the rest to be passed down to the child process.

Don't forget to set `.allowUnknownOption()` on your commander.js object.