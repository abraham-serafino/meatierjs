import React from 'react';
import ReactDOM from 'react-dom';

import edit from './edit';
import EmployeeList from '../components/EmployeeList';

function app(router) {
  router.get(`/`, () => {
    ReactDOM.render(
      <EmployeeList router={router} />,
      document.getElementById(`app`)
    );
  });

  edit(router);
}

export default app;
