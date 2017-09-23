import React from 'react';
import ReactDOM from 'react-dom';

import EmployeeEditor from '../components/EmployeeEditor';

function edit(router) {
  router.get('/edit', () => {
    ReactDOM.render(
      <EmployeeEditor router={router} />,
      document.getElementById('app')
    );
  });
}

export default edit;
