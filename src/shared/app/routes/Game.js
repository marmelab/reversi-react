import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import injectSheet from 'react-jss';
import { StyleSheet } from 'jss';
import Board from '../components/Board';
import { gamePropType } from '../propTypes';
import { getCurrentAvailableCellChanges, getWinner } from '../../reversi/game/Game';

const styles = {
    view: {
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.6)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: 'center',
        paddingTop: '150px',
        color: 'white',
        fontSize: '40px',
        fontWeight: 'bold',
    },
};

class Game extends Component {
    componentWillMount() {
        this.props.requestGame();
    }

    render() {
        const game = this.props.game;
        const cellProposals = game ? getCurrentAvailableCellChanges(game) : [];
        const winner = game ? getWinner(game) : null;

        return (
            <div className={this.props.sheet.classes.view}>
                <Helmet title={'Game'} />
                <h1>Game</h1>
                <div>
                    <Link to="/">Return to home</Link>
                </div>
                <div>
                    { game ?
                        <Board
                            gameHash={game.hash}
                            cellProposals={cellProposals}
                            onCellClick={this.props.placeCellChange}
                            board={game.board}
                        /> : ''
                    }
                </div>
                { game && game.isFinished ?
                    <div className={this.props.sheet.classes.overlay}>
                        { winner ? `${winner.name} win!` : 'It\'s a draw!' }<br />
                        <i style={{ fontSize: '100px', marginTop: 50 }} className="fa fa-hand-peace-o" />
                    </div> : ''
                }
            </div>
        );
    }
}

Game.propTypes = {
    sheet: PropTypes.instanceOf(StyleSheet),
    game: gamePropType,
    requestGame: PropTypes.func.isRequired,
    placeCellChange: PropTypes.func.isRequired,
};

export default injectSheet(styles)(Game);
