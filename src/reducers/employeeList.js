class employeeList {
  initialState = [{
    name: 'Bob',
    rank: 'Manager',
    sn: (new Date()).valueOf()
  }];

  addEmployee(employeeList, { name, rank, sn }) {
    employeeList.push({ name, rank, sn });
    return [...employeeList];
  }

  resetEmployees(employeeList, newList) {
    return newList;
  }

  removeEmployee(employeeList, employee) {
    const index = employeeList.indexOf(employee);

    if (index >= 0) {
      employeeList.splice(index, 1);
    }

    return [...employeeList];
  }
}

export default employeeList;
