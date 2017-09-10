import React, { Component } from 'react';

import bindModel from '../lib/bindModel';
import { clientSocket } from '../lib/util';
import { createContainer } from '../lib/SimpleStore';
import db from '../lib/rethinkdb';
import employeeList from '../reducers/employeeList';
import Employees from '../models/Employees';
import subscribe from '../lib/subscribe';

let employeeService = null;

export class App extends Component {
  state = { name: '', rank: '' };

  componentDidMount() {
    const { resetEmployees } = this.props;

    subscribe('employees', resetEmployees);
    employeeService = employeeService || new Employees(clientSocket, db);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, rank } = this.state;
    const sn = (new Date()).valueOf();
    const { addEmployee } = this.props;

    addEmployee({ name, rank, sn });
    employeeService.create({ name, rank, sn });

    this.state = { name: '', rank: '' };
  };

  onClick = (employee) => {
    const { removeEmployee } = this.props;

    return () => {
      employeeService.remove(employee);
      removeEmployee(employee);
    };
  };

  render() {
    const { model } = bindModel(this);
    const { employeeList } = this.props;

    return (
        <div>
          <form name="add-employee-form" onSubmit={this.onSubmit}>
            Name: <input type="text" {...model('name')} /><br/>
            Rank: <input type="text" {...model('rank')} /><br/>

            <button type="submit">Add</button>
          </form>

          <ul>
            {employeeList.map((employee) =>
                <li key={employee.sn}>
                  <button onClick={this.onClick(employee)}>Remove</button>
                  &nbsp; {employee.name} - {employee.rank}
                </li>
            )}
          </ul>
        </div>
    );
  }
}

export default createContainer(App, employeeList);
