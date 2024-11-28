const http = require('http');
const fs = require('fs');

// Function to read the CSV file asynchronously and parse it
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      resolve(data);
    });
  });
};

// Function to count the students and organize them by field
const countStudents = async (filePath) => {
  try {
    const data = await readCSV(filePath);

    // Split the CSV content by lines
    const lines = data.split('\n');
    const students = {};
    let totalStudents = 0;

    // Loop through each line and process it
    lines.forEach(line => {
      if (line.trim()) {  // Ignore empty lines
        const [firstname, lastname, age, field] = line.split(',');

        if (field && firstname) {  // Only valid entries
          totalStudents++;
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(firstname);
        }
      }
    });

    // Prepare the response string
    let result = `Number of students: ${totalStudents}\n`;

    // Get all the fields in the students object and format the response
    const fieldEntries = Object.entries(students).map(([field, names]) => {
      return `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
    });

    // Join all the field entries with a newline, but no extra newline after the last entry
    result += fieldEntries.join('\n');

    return result;  // Return the formatted student data string
  } catch (error) {
    return `Error: ${error.message}`;  // Return error message if any
  }
};

// Create the HTTP server
const app = http.createServer((req, res) => {
  const urlPath = req.url;
  const method = req.method;

  // Set the response headers
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (urlPath === '/') {
    // For the root path '/', send "Hello Holberton School!"
    res.end('Hello Holberton School!');
  } else if (urlPath === '/students' && method === 'GET') {
    // For '/students', load the students' data
    const filePath = process.argv[2];  // CSV file path passed as argument
    if (filePath) {
      res.write('This is the list of our students');
      countStudents(filePath)
        .then((studentInfo) => {
          res.end(studentInfo);  // Send the formatted student data in the response body
        })
        .catch((err) => {
          res.statusCode = 500;
          res.end(err.message);
        });
    } else {
      res.statusCode = 400;
      res.end('Database file path missing');
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found\n');
  }
});

// Make the server listen on port 1245
app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

// Export the app for external use
module.exports = app;
