import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { employeeList } from './stores/employeeList';
import { appState } from './stores/appState';
import { createSimpleStore } from './stores/SimpleStore';

const store = createSimpleStore(employeeList, appState);

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('app')
);
