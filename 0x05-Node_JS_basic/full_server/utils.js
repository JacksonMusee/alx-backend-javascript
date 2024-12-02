import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }

    const lines = data.split('\n');
    const students = {};

    lines.forEach((line) => {
      if (line.trim()) {
        const [firstname, , , field] = line.split(',');
        if (field && firstname) {
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(firstname);
        }
      }
    });

    resolve(students);
  });
});

export default readDatabase;
