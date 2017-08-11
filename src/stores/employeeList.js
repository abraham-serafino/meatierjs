import { createReducer } from './SimpleStore';

const initialState = [{
  name: 'Bob',
  rank: 'Manager',
  sn: (new Date()).valueOf()
}];

const EmployeeActions = {
  addEmployee(employeeList, { name, rank, sn }) {
    employeeList.push({ name, rank, sn });
    return [...employeeList];
  },

  removeEmployee(employeeList, employee) {
    const index = employeeList.indexOf(employee);

    if (index >= 0) {
      employeeList.splice(index, 1);
    }

    return [...employeeList];
  }
};

const employeeList = createReducer('employeeList', EmployeeActions, initialState);

export { employeeList, EmployeeActions };
