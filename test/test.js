const { Command } = require('commander');
const test = require('tape');
const getRemainingArgs = require('../');

test('should get remaining args', t => {
  const cli = new Command()
    .allowUnknownOption()
    .option('--existing')
    .option('--existing-two')
    .parse(['node', 'test.js', '--existing', '--existing-two', '--extra', 'value', '--extra-two']);

  t.deepEqual(getRemainingArgs(cli), ['--extra', 'value', '--extra-two']);

  t.end();
});

test('should have no side effects', t => {
  const cli = new Command()
    .allowUnknownOption()
    .option('--existing')
    .option('--existing-two')
    .parse(['node', 'test.js', '--existing', '--existing-two', '--extra', 'value', '--extra-two']);

  t.deepEqual(getRemainingArgs(cli), ['--extra', 'value', '--extra-two']);
  t.deepEqual(getRemainingArgs(cli), ['--extra', 'value', '--extra-two']);

  t.end();
});

test('should work with no arguments', t => {
  const cli = new Command()
    .allowUnknownOption()
    .parse(['node', 'test.js']);

  t.deepEqual(getRemainingArgs(cli), []);

  t.end();
});

test('order should not matter', t => {
  const cli = new Command()
    .allowUnknownOption()
    .option('--existing')
    .option('--existing-two')
    .parse(['node', 'test.js', '--existing', '--extra', 'value', '--existing-two', '--extra-two']);

  t.deepEqual(getRemainingArgs(cli), ['--extra', 'value', '--extra-two']);

  t.end();
});

test('should work with no known options', t => {
  const cli = new Command()
    .allowUnknownOption()
    .option('--existing')
    .option('--existing-two')
    .parse(['node', 'test.js', '--extra=value']);

  t.deepEqual(getRemainingArgs(cli), ['--extra=value']);

  t.end();
});

test('should work with short flags', t => {
  const cli = new Command()
    .allowUnknownOption()
    .option('-a')
    .option('-b')
    .parse(['node', 'test.js', '-a', '-c', '-b']);

  t.deepEqual(getRemainingArgs(cli), ['-c']);

  t.end();
});

test('should work with values', t => {
  const cli = new Command()
    .allowUnknownOption()
    .option('-a <value>')
    .option('-b')
    .parse(['node', 'test.js', '-a', 'aa', '-c', 'cc', '-b']);

  t.deepEqual(getRemainingArgs(cli), ['-c', 'cc']);

  t.end();
});
