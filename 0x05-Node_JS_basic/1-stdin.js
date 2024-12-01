#!/usr/bin/env node

// code
/* 
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.stdout.write('Welcome to Holberton School, what is your name?\n');

rl.question('', (name) => {
  process.stdout.write(`Your name is: ${name}\r`);
  rl.close();
  process.stdout.write('This important software is now closing\n');
});
*/


process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for readable input
process.stdin.on('readable', () => {
  const name = process.stdin.read();

  // If there's data, convert the buffer to a string and display the name
  if (name !== null) {
    process.stdout.write(`Your name is: ${name.toString()}`);
  }
});

// Listen for the end of the input stream (EOF or Ctrl+D)
process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});

// Handle the 'error' event to gracefully manage unexpected issues
process.stdin.on('error', (err) => {
  process.stderr.write(`An error occurred: ${err.message}\n`);
});
