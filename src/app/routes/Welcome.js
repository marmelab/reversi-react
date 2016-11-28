import React from 'react';
import Helmet from 'react-helmet';
import { Link, Router, Route } from 'react-router';

const Welcome = () => (
    <div>
        <Helmet title={'Welcome'} />
        <div>
            <h1>Welcome to reversi</h1>
            <div>
                <Link to={'/game'}>Start a new game</Link>
            </div>
        </div>
    </div>
);

export default Welcome;
