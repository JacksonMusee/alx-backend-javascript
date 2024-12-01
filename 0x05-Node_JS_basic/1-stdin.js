#!/usr/bin/env node

process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('readable', () => {
  const name = process.stdin.read();

  if (name !== null) {
    process.stdout.write(`Your name is: ${name.toString()}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});

process.stdin.on('error', (err) => {
  process.stderr.write(`An error occurred: ${err.message}\n`);
});
