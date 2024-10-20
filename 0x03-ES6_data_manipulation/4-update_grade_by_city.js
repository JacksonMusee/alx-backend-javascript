export default function updateStudentGradeByCity(students, city, newGrades) {
  return students.map((student) => {
    const updatedStudent = { ...student };

    for (const grade of newGrades) {
      if (grade.studentId === student.id) {
        updatedStudent.grade = grade.grade;
      } else {
        updatedStudent.grade = 'N/A';
      }
    }
    return updatedStudent;
  }).filter((student) => student.location === city);
}
