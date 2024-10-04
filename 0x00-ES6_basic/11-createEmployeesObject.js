export default function createEmployeesObject(departmentName, employees) {
  const theObject = {
    [departmentName]: employees,
  }
  return theObject;
}
