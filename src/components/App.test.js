import React from 'react';
import { AppComponent } from './App';
import { shallow } from 'enzyme';

test('App component should render', () => {
  const noop = () => {};

  const props = {
    appState: { name: 'Jane', rank: 'CEO' },
    employeeList: [
      { name: 'Jane', rank: 'CEO', sn: (new Date()).valueOf() },
      { name: 'John', rank: 'Manager', sn: (new Date()).valueOf() },
      { name: 'Alice', rank: 'Sales Rep', sn: (new Date()).valueOf() },
      { name: 'Bob', rank: 'Janitor', sn: (new Date()).valueOf() }
    ],

    addEmployee: noop,
    removeEmployee: noop,
    updateName: noop,
    updateRank: noop,
    reset: noop
  }

  expect(shallow(<AppComponent {...props} />)).toMatchSnapshot();
});
