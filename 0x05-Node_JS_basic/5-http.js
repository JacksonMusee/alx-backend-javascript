const http = require('http');
const fs = require('fs');
const path = require('path');

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

const countStudents = async (filePath) => {
  try {
    const data = await readCSV(filePath);

    const lines = data.split('\n');
    const students = {};
    let totalStudents = 0;

    lines.forEach(line => {
      if (line.trim()) {
        const [firstname, lastname, age, field] = line.split(',');

        if (field && firstname) {
          totalStudents++;
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(firstname);
        }
      }
    });

    console.log(`Number of students: ${totalStudents}`);
    Object.keys(students).forEach(field => {
      console.log(`Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

const app = http.createServer((req, res) => {
  const urlPath = req.url;
  const method = req.method;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (urlPath === '/') {
    res.end('Hello Holberton School!');
  } else if (urlPath === '/students' && method === 'GET') {
    const filePath = process.argv[2];
    if (filePath) {
      res.write('This is the list of our students');
      countStudents(filePath)
        .then(() => res.end())
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
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = app;
