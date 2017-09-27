import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Row
} from 'react-bootstrap';

import bindModel from '../lib/bindModel';
import { clientSocket } from '../lib/util';
import db from '../lib/rethinkdb';
import Employees from '../models/Employees';

import './EmployeeEditor.scss';

let employeeService = null;

class EmployeeEditor extends Component {
  state = {
    name: ``,
    rank: ``,
    username: localStorage.getItem(`username`) || ``,
    password: localStorage.getItem(`password`) || ``
  };

  componentDidMount() {
    employeeService = employeeService || new Employees(clientSocket, db);
  }

  addEmployee = ({ name, rank, sn }) => {
    const { username, password } = this.state;
    employeeService.create({ name, rank, sn, username, password });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { router } = this.props;
    const { name, rank } = this.state;
    const sn = (new Date()).valueOf();

    this.addEmployee({ name, rank, sn });
    router.navigate(`/`);
  };

  render() {
    const { model } = bindModel(this);

    return (
      <Row>
        <Col sm={5}>
          <Form horizontal name="add-employee-form" onSubmit={this.onSubmit}>
            <FormGroup controlId="formName">
              <Col componentClass={ControlLabel} sm={4}>
                Full Name
              </Col>
              <Col sm={8}>
                <FormControl type="text" {...model(`name`)} /><br/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formRank">
              <Col componentClass={ControlLabel} sm={4}>
                Rank
              </Col>
              <Col sm={8}>
                <FormControl type="text" {...model(`rank`)} /><br/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={4} sm={3}>
                <Button type="submit">Save</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

EmployeeEditor.propTypes = {
  router: PropTypes.object
};

export default EmployeeEditor;
