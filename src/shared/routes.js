import React from 'react';
import { Route } from 'react-router';
import App from './app/App';
import Welcome from './app/routes/Welcome';
import Game from './app/containers/Game';

const Routes = (
    <Route component={App}>
        <Route path="/" components={{ content: Welcome }} />
        <Route path="/game" components={{ content: Game }} />
        <Route path="/game/:hash" components={{ content: Game }} />
    </Route>
);

export default Routes;
