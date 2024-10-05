export default function createIteratorObject(report) {
  const employeeArray = [];
  for (const empList of Object.values(report.allEmployees)) {
    employeeArray.push(...empList);
  }

  const reportObjIterable = {
    allEmp: employeeArray,
    [Symbol.iterator]() {
      let index = 0;
      const data = this.allEmp;
      return {
        next: () => {
          let nextVal = {};
          if (index < data.length) {
            nextVal = { value: data[index], done: false };
            index += 1;
          } else {
            nextVal = { done: true };
          }
          return nextVal;
        },
      };
    },
  };
  return reportObjIterable;
}
