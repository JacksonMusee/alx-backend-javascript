export default function iterateThroughObject(reportWithIterator) {
  let employeeString = '';
  for (const employee of reportWithIterator) {
    if (employeeString.length === 0) {
      employeeString = `${employee}`;
    } else {
      employeeString = `${employeeString} | ${employee}`;
    }
  }
  return employeeString;
}
