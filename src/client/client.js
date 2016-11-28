import React from 'react';
import ReactDOM from 'react-dom/server';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../shared/routes';
import configureStore from '../shared/app/configureStore';

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('react-root')
);
