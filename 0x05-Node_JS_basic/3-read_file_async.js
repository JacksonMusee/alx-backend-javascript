const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, 'utf8')
    .then((data) => {
      const lines = data.trim().split('\n');

      const students = lines.slice(1);

      const fields = {};

      students.forEach((student) => {
        const [firstname, , , field] = student.split(',');

        if (!firstname || !field) {
          return;
        }

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstname);
      });

      const totalStudents = students.length;
      console.log(`Number of students: ${totalStudents}`);

      Object.keys(fields).forEach((field) => {
        const studentList = fields[field].join(', ');
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${studentList}`);
      });
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
