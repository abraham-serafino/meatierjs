import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App';

function app(router) {
  router.get('/', () => {
    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
  });
}

export default app;
