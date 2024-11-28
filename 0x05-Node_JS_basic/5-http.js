const http = require('http');
const fs = require('fs');

const readCSV = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    resolve(data);
  });
});

const countStudents = async (filePath) => {
  const data = await readCSV(filePath);

  const lines = data.split('\n');
  const students = {};
  let totalStudents = 0;

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

  let result = `Number of students: ${totalStudents}\n`;

  const fieldEntries = Object.entries(students).map(([field, names]) => `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);

  result += fieldEntries.join('\n');

  return result;
};

const app = http.createServer((req, res) => {
  const urlPath = req.url;
  const { method } = req;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (urlPath === '/') {
    res.end('Hello Holberton School!');
  } else if (urlPath === '/students' && method === 'GET') {
    const filePath = process.argv[2];

    if (filePath) {
      countStudents(filePath)
        .then((studentInfo) => {
          res.write('This is the list of our students\n');
          res.end(studentInfo);
        })
        .catch((err) => {
          res.statusCode = 500;
          res.end(err.message);
        });
    } else {
      res.statusCode = 500;
      res.end('Cannot load the database');
    }
  } else {
    res.statusCode = 404;
    res.end('Cannot load the database');
  }
});

app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = app;
