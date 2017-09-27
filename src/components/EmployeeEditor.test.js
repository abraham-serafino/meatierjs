/* global describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';

import EmployeeEditor from './EmployeeEditor';

describe(`EmployeeEditor component`, () => {
  it(`should render`, () => {
    expect(shallow(<EmployeeEditor />)).toMatchSnapshot();
  });
});
