import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import config from 'config';
import routes from '../shared/routes';
import configureStore from '../shared/app/store';
import sagaFactory from '../shared/app/sagas';

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(sagaFactory(config));

const rootElement = document.getElementById('react-root');

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    rootElement,
);
