import React, { Component } from 'react';

import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Glyphicon,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap';

import bindModel from '../lib/bindModel';
import { clientSocket } from '../lib/util';
import db from '../lib/rethinkdb';
import Employees from '../models/Employees';

import './App.scss';

let employeeService = null;

export class App extends Component {
  state = {
    name: '',
    rank: '',

    employeeList: [{
      name: 'Bob',
      rank: 'Manager',
      sn: '12345'
    }]
  };

  componentDidMount() {
    db.subscribe('employees', (employeeList) => {
      this.setState({ employeeList });
    });

    employeeService = employeeService || new Employees(clientSocket, db);
  }

  addEmployee = ({ name, rank, sn }) => {
    const { employeeList } = this.state;
    employeeList.push({ name, rank, sn });
    this.setState({ employeeList });
    employeeService.create({ name, rank, sn });
  };

  removeEmployee = (employee) => {
    const { employeeList } = this.state;
    const index = employeeList.indexOf(employee);

    if (index >= 0) {
      employeeList.splice(index, 1);
    }

    this.setState({ employeeList });
    employeeService.remove(employee);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, rank } = this.state;
    const sn = (new Date()).valueOf();

    this.addEmployee({ name, rank, sn });
    this.setState ({ name: '', rank: '' });
  };

  onClick = (employee) => {
    return () => {
      employeeService.remove(employee);
      this.removeEmployee(employee);
    };
  };

  render() {
    const { model } = bindModel(this);
    const { employeeList } = this.state;

    return (
      <Row>
        <Col sm={5}>
          <Form horizontal name="add-employee-form" onSubmit={this.onSubmit}>
            <FormGroup controlId="formName">
              <Col componentClass={ControlLabel} sm={4}>
                Full Name
              </Col>
              <Col sm={8}>
                <FormControl type="text" {...model('name')} /><br/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formRank">
              <Col componentClass={ControlLabel} sm={4}>
                Rank
              </Col>
              <Col sm={8}>
                <FormControl type="text" {...model('rank')} /><br/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={4} sm={3}>
                <Button type="submit">Add</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>

        <Col smOffset={1} sm={3}>
          <ListGroup>
            {employeeList.map((employee) =>
              <ListGroupItem key={employee.sn}>
                {employee.name} - {employee.rank}
                <Glyphicon glyph="remove" onClick={this.onClick(employee)} />
              </ListGroupItem>
            )}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default App;
