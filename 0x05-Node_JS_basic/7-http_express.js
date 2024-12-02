const express = require('express');
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
  try {
    const data = await readCSV(filePath);

    const lines = data.split('\n');
    const students = {};
    let totalStudents = 0;

    lines.slice(1).forEach((line) => {
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
  } catch (error) {
    return `${error.message}`;
  }
};

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const filePath = process.argv[2];
  if (filePath) {
    countStudents(filePath)
      .then((studentInfo) => {
        res.status(200).send(`This is the list of our students\n${studentInfo}`);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    res.status(500).send('Cannot load the database');
  }
});

app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = app;
