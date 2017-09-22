import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App';
import { createSimpleStore } from '../lib/SimpleStore';
import employeeList from '../reducers/employeeList';

const store = createSimpleStore(employeeList);

function app(router) {
  router.get('/', () => {
    ReactDOM.render(
      <App store={store} />,
      document.getElementById('app')
    );
  });
}

export default app;
