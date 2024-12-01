#!/usr/bin/env node

// code
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.stdout.write('Welcome to Holberton School, what is your name?\n');

rl.question('', (name) => {
  process.stdout.write(`Your name is: ${name}\n`);
  rl.close();
  process.stdout.write('This important software is now closing\n');
});
