import React from 'react';
import { AppComponent } from './App';
import { shallow } from 'enzyme';

test('App component should render', () => {
  const noop = () => {};

  const props = {
    appState: { name: 'Jane', rank: 'CEO' },
    employeeList: [
      { name: 'Jane', rank: 'CEO', sn: 1 },
      { name: 'John', rank: 'Manager', sn: 2 },
      { name: 'Alice', rank: 'Sales Rep', sn: 3 },
      { name: 'Bob', rank: 'Janitor', sn: 4 }
    ],

    addEmployee: noop,
    removeEmployee: noop,
    updateName: noop,
    updateRank: noop,
    reset: noop
  };

  expect(shallow(<AppComponent {...props} />)).toMatchSnapshot();
});
