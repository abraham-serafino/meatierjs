import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import employeeList from './reducers/employeeList';
import appState from './reducers/appState';
import { createSimpleStore } from './reducers/SimpleStore';
import express from 'browser-express';

const app = express({
  interceptLinks: true
});

app.get('/', (req, res) => {
  const store = createSimpleStore(employeeList, appState);
  app.render()
  app.renderApp(<App store={store} />);
});
