import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Board from '../components/Board';
import { gamePropType } from '../propTypes';

const Game = ({ game }) => (
    <div>
        <Helmet title={'Game'} />
        <h1>Game</h1>
        <div>
            <Link to="/">Return to home</Link>
        </div>
        <div>
            <Board board={game.board} />
        </div>
    </div>
);

Game.propTypes = {
    game: gamePropType.isRequired,
};

export default connect(
    state => ({ game: state.game }),
)(Game);
