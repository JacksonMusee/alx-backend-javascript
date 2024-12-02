import { readDatabase } from '../utils';

export default class StudentsController {
  static async getAllStudents(req, res) {
    const filePath = process.argv[2];

    try {
      const students = await readDatabase(filePath);
      delete students.field;

      let response = 'This is the list of our students\n';
      const sortedFields = Object.keys(students)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

      // Collect the responses for each field in an array
      const fieldResponses = sortedFields.map((field) => `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`);

      // Join all the field responses with a newline
      response += fieldResponses.join('\n');
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    const filePath = process.argv[2];

    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const students = await readDatabase(filePath);
      const majorStudents = students[major];

      if (!majorStudents) {
        return res.status(500).send('Cannot load the database');
      }

      res.status(200).send(`List: ${majorStudents.join(', ')}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
    return null;
  }
}
