import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import EmployeeList from './stores/EmployeeList';
import AppState from './stores/AppState';
import { createReducer, createSimpleStore } from './stores/SimpleStore';
import io from 'socket.io-client';

const socket = io();

socket.on('reconnect', () => {
  window.location.reload();
});

const store = createSimpleStore(
    createReducer(EmployeeList),
    createReducer(AppState)
);

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('app')
);
