const fs = require('fs');

function countStudents(path) {
    try {
        const data = fs.readFileSync(path, 'utf8');
        
        const lines = data.split('\n').filter(line => line.trim() !== '');

        const students = lines.slice(1);
        const studentCount = students.length;
        
        const fields = {};

        students.forEach(student => {
            const [firstname, lastname, age, field] = student.split(',');

            if (!fields[field]) {
                fields[field] = [];
            }

            fields[field].push(firstname);
        });

        console.log(`Number of students: ${studentCount}`);

        Object.keys(fields).forEach(field => {
            console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
        });
    } catch (err) {
        throw new Error('Cannot load the database');
    }
}

module.exports = countStudents;
