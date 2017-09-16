import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';
import { noop } from '../lib/util';

describe('App component', () => {
  it('should render', () => {
    const props = {
      employeeList: [
        { name: 'Jane', rank: 'CEO', sn: 1 },
        { name: 'John', rank: 'Manager', sn: 2 },
        { name: 'Alice', rank: 'Sales Rep', sn: 3 },
        { name: 'Bob', rank: 'Janitor', sn: 4 }
      ],

      addEmployee: noop,
      removeEmployee: noop,
      resetEmployees: noop
    };

    expect(shallow(<App {...props} />)).toMatchSnapshot();
  });
});
