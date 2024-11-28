const http = require('http');
const fs = require('fs');

// Function to read CSV file asynchronously
const readCSV = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    resolve(data);
  });
});

// Function to process the CSV and count students
const countStudents = async (filePath) => {
  const data = await readCSV(filePath);

  const lines = data.split('\n');
  const students = {};
  let totalStudents = 0;

  // Process each line in the CSV
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

  // Create the result with the total number of students and the breakdown per field
  let result = `Number of students: ${totalStudents}\n`;

  // Format the students per field
  const fieldEntries = Object.entries(students).map(([field, names]) => `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);

  result += fieldEntries.join('\n');

  return result; // Return the formatted string
};

// Create an HTTP server
const app = http.createServer((req, res) => {
  const urlPath = req.url;
  const { method } = req;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // Handle root endpoint
  if (urlPath === '/') {
    res.end('Hello Holberton School!');
  } else if (urlPath === '/students' && method === 'GET') {
    const filePath = process.argv[2];

    // Check if filePath is provided
    if (filePath) {
      countStudents(filePath)
        .then((studentInfo) => {
          res.write('This is the list of our students\n'); // Only write this line if students info is available
          res.end(studentInfo); // End with the formatted student data
        })
        .catch((err) => {
          res.statusCode = 500;
          res.end(err.message);
        });
    } else {
      res.statusCode = 500;
      res.end('Cannot load the database'); // Send the error if filePath is not provided
    }
  } else {
    res.statusCode = 404; // Not found for unsupported routes
    res.end('Cannot load the database'); // Respond with a proper error message for unsupported routes
  }
});

// Start the server on port 1245
app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

// Export the app for testing purposes
module.exports = app;
