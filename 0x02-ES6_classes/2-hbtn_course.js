export default class HolbertonCourse {
  constructor(name, length, students) {
    if (typeof name !== 'string') throw new Error('Name must be a string');
    if (typeof length !== 'number') throw new Error('Length must be number');
    if (!Array.isArray(students)) throw new Error('Students must be an array');

    this._name = name;
    this._length = length;
    this._students = students;
  }

  get name() {
    return this._name;
  }

  get length() {
    return this._length;
  }

  get students() {
    return this._students;
  }

  set name(newName) {
    if (typeof newName !== 'string') {
      throw new Error('Name must be a string');
    } else {
      this._name = newName;
    }
  }

  set length(newLen) {
    if (typeof newLen !== 'string') {
      throw new Error('Name must be a number');
    } else {
      this._length = newLen;
    }
  }

  set students(newStudents) {
    if (!(Array.isArray(newStudents) && newStudents.every((item) => typeof item === 'string'))) {
      throw new Error('Name must be a string');
    } else {
      this._students = newStudents;
    }
  }
}
