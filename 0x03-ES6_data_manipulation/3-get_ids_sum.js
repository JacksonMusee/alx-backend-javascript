export default function getStudentIdsSum(students) {
  if (!Array.isArray(students)) return "Students must be an array";

  return students.reduce((accumulator, student) => accumulator + student.id, 0);
}
