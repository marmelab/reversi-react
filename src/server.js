import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import path from 'path';
import Helmet from 'react-helmet';
import { jss } from 'react-jss';
import routes from './routes';
import configureStore from './app/configureStore';
import StyleProvider from './app/StyleProvider';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use((req, res) => {
    const head = Helmet.rewind();

    match({ routes, location: req.url }, (error, redirectLocation, props) => {
        if (error) return res.status(500).send(error.message);
        if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        if (!props) return res.status(404).send('Not found');

        const content = renderToString(
            <StyleProvider style={jss}>
                <Provider store={configureStore()}>
                    <RouterContext {...props} />
                </Provider>
            </StyleProvider>,
        );
        return res.render('index', {
            app: content,
            css: jss.sheets.toString(),
            title: head.title.toString(),
        });
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}.`);
});
