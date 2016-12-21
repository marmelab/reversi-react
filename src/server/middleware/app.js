import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { jss } from 'react-jss';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../../shared/app/store';
import StyleProvider from '../../shared/utils/StyleProvider';
import routes from '../../shared/routes';
import sagas from '../../shared/app/sagas';

const AppMiddleware = (req, res) => {
    const head = Helmet.rewind();

    match({ routes, location: req.url }, (error, redirectLocation, props) => {
        if (error) return res.status(500).send(error.message);
        if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        if (!props) return res.status(404).send('Not found');

        const store = configureStore();

        const rootComponent = (
            <StyleProvider style={jss}>
                <Provider store={store}>
                    <RouterContext {...props} />
                </Provider>
            </StyleProvider>
        );

        store.runSaga(sagas).done.then(() => {
            return res.render('index', {
                app: renderToString(rootComponent),
                css: jss.sheets.toString(),
                title: head.title.toString(),
                stateString: JSON.stringify(store.getState()),
            });
        });

        // Trigger sagas for component to run
        // https://github.com/yelouafi/redux-saga/issues/255#issuecomment-210275959
        renderToString(rootComponent);

        // Dispatch a close event so sagas stop listening after they're resolved
        store.close();
    });
};

export default AppMiddleware;
