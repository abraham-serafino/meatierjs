import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { createSimpleStore } from './lib/SimpleStore';
import employeeList from './reducers/employeeList';

const store = createSimpleStore(employeeList);

ReactDOM.render(
    <App store={store} />,
    document.getElementById('app')
);
