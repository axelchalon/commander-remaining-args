# commander-remaining-args

Get the remaining unknown arguments after parsing the CLI with commander.js

Example use case: your program launches a child process. You parse some flags
but want the remaining flags to be passed down to the child process.

Don't forget to set `.allowUnknownOption()` on your commander.js object.