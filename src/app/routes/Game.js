import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

const Game = () => (
    <div>
        <Helmet title={'Game'} />
        <h1>Game</h1>
        <div>
            <Link to={'/'}>Return to home</Link>
        </div>
    </div>
);

export default Game;
