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
import { createContainer } from '../lib/SimpleStore';
import db from '../lib/rethinkdb';
import employeeList from '../reducers/employeeList';
import Employees from '../models/Employees';

import './App.scss';

let employeeService = null;

export class App extends Component {
  state = { name: '', rank: '' };

  componentDidMount() {
    const { resetEmployees } = this.props;

    db.subscribe('employees', resetEmployees);
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

export default createContainer(App, employeeList);
