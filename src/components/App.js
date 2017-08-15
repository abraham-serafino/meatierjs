import React from 'react';
import { createContainer } from '../stores/SimpleStore';
import employeeList from '../stores/employeeList.js'
import appState from '../stores/appState';
import sayHello from '../lib/sayHello';

sayHello();

export function AppComponent({
  employeeList,
  appState,
  addEmployee,
  removeEmployee,
  updateName,
  updateRank,
  reset
}) {
  const { name, rank } = appState;
  const sn = (new Date()).valueOf();

  function onChange(field) {
    const callUpdater = {
      name: updateName,
      rank: updateRank
    };

    return (e) => {
      callUpdater[field](e.target.value);
    };
  }

  return (
    <div>
      <form name="add-employee-form" onSubmit={(e) => {
        e.preventDefault();
        addEmployee({ name, rank, sn });
        reset();
      }}>
        Name:
        <input type="text" value={name} onChange={onChange('name')}/><br/>
        Rank:
        <input type="text" value={rank} onChange={onChange('rank')}/><br/>

        <button type="submit">Add</button>
      </form>
      <ul>
        {employeeList.map(employee =>
          <li key={employee.sn}>
            <button onClick={() => removeEmployee(employee)}>Remove</button>
            &nbsp;
            {employee.name} - {employee.rank}
          </li>
        )}
      </ul>
    </div>
  );
}

export default createContainer(AppComponent, employeeList, appState);
