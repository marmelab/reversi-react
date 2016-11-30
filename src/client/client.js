import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../shared/routes';
import configureStore from '../shared/app/store';
import sagas from '../shared/app/sagas';

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(sagas);

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('react-root')
);
