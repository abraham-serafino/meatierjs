const { AppComponent } = require('./App');
const React = require('react');
const ReactDOM = require('react-dom');
const renderer = require('react-test-renderer');
const { shallow } = require('enzyme');

test('App component should render', () => {
  const props = {
    employeeList: [
      {
        name: 'Bob',
        rank: 'Manager',
        sn: (new Date()).valueOf(),
      },
    ],

    appState: {
      name: '',
      rank: '',
    },

    addEmployee: () => {},
    removeEmployee: () => {},
    updateName: () => {},
    updateRank: () => {},
    reset: () => {},
  };

  expect(shallow(<AppComponent {...props} />)).toMatchSnapshot();
});
