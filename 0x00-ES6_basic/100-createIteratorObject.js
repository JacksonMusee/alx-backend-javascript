export default function createIteratorObject(report) {
let employeeArray = []
for (const empList of report) {
  employeeArray.push(...empList);
};

const reportObjIterable = {
  const allEmp = employeeArray,
  [Symbol.iterator]() {
    let index;
    const data = this.allEmp;
    return {
      next: => {
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
