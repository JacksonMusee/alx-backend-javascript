export default function createIteratorObject(report) {
let employeeArray = []
for (const empList of report) {
  employeeArray.push(...empList);
};

const reportObjIterable = {
  allEmp: employeeArray,
  [Symbol.iterator]() {
    let index = 0;
    const data = this.allEmp;
    return {
      next: () => {
        if (index < data.length) {
	  return {value: data[index++], done: false};
	}else {
           return { done: true};
	}
      }
    };
  },
};
return reportObjIterable;
}
