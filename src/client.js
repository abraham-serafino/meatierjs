import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import employeeList from './reducers/employeeList';
import appState from './reducers/appState';
import { createSimpleStore } from './reducers/SimpleStore';
import io from 'socket.io-client';

const socket = io();

socket.on('reconnect', () => {
  window.location.reload();
});

const store = createSimpleStore(employeeList, appState);

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('app')
);
