const express = require('express');
const fs = require('fs');

// Function to read the CSV file asynchronously
const readCSV = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    resolve(data);
  });
});

// Function to count students and format them for the /students endpoint
const countStudents = async (filePath) => {
  try {
    const data = await readCSV(filePath);

    const lines = data.split('\n');
    const students = {};
    let totalStudents = 0;

    // Process each line and group students by their field
    lines.forEach((line) => {
      if (line.trim()) {
        const [firstname, , , field] = line.split(',');

        if (field && firstname) {
          totalStudents += 1;
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(firstname);
        }
      }
    });

    // Create the response text for the number of students and their fields
    let result = `Number of students: ${totalStudents}\n`;

    const fieldEntries = Object.entries(students).map(([field, names]) => 
      `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);

    result += fieldEntries.join('\n');

    return result;
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

// Initialize Express app
const app = express();

// Route for the root endpoint (/)
app.get('/', (req, res) => {
  res.status(200).send('Hello Holberton School!');
});

// Route for the /students endpoint
app.get('/students', (req, res) => {
  const filePath = process.argv[2]; // Get the database file path from the command line arguments
  if (filePath) {
    countStudents(filePath)
      .then((studentInfo) => {
        res.status(200).send('This is the list of our students\n' + studentInfo);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    res.status(500).send('Cannot load the database');
  }
});

// Start the server and listen on port 1245
app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = app;
