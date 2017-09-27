import merge from 'lodash.merge';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  Button,
  Col,
  Glyphicon,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap';

import { clientSocket } from '../lib/util';
import db from '../lib/rethinkdb';
import Employees from '../models/Employees';

import './EmployeeList.scss';

let employeeService = null;

class EmployeeList extends Component {
  state = {
    employees: [{
      name: `Bob`,
      rank: `Manager`,
      sn: `12345`
    }],
    username: localStorage.getItem(`username`) || ``,
    password: localStorage.getItem(`password`) || ``
  };

  componentDidMount() {
    db.subscribe(`employees`, this);
    employeeService = employeeService || new Employees(clientSocket, db);
  }

  removeEmployee = (employee) =>
    () => {
      const { employees, username, password } = this.state;
      const index = employees.indexOf(employee);

      if (index >= 0) {
        employees.splice(index, 1);
      }

      this.setState({ employees }, () => {
        employeeService.remove(merge(employee, { username, password }));
      });
    };

  render() {
    const { employees } = this.state;
    const { router } = this.props;

    return (
      <div>
        <Row>
          <Col smOffset={1} sm={3}>
            <ListGroup>
              {employees.map((employee) =>
                <ListGroupItem key={employee.sn}>
                  {employee.name} - {employee.rank}
                  <Glyphicon glyph="remove" onClick={this.removeEmployee(employee)} />
                </ListGroupItem>
              )}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col smOffset={1} sm={3}>
            <Button onClick={() => {
              router.navigate(`/edit`);
            }}>Add</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

EmployeeList.propTypes = {
  router: PropTypes.object
};

export default EmployeeList;
