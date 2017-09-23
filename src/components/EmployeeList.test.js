/* global describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';

import EmployeeList from './EmployeeList';

describe('EmployeeList component', () => {
  it('should render', () => {
    expect(shallow(<EmployeeList />)).toMatchSnapshot();
  });
});
