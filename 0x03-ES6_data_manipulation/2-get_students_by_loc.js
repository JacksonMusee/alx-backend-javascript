export default function getStudentsByLocation(studentsArr, city) {
  if (!Array.isArray(studentsArr)) return [];

  return studentsArr.filter((student) => student.location === city);
}
