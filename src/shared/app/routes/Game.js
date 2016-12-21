import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import injectSheet from 'react-jss';
import { StyleSheet } from 'jss';
import Board from '../components/Board';
import PlayerBadge from '../components/PlayerBadge';
import { gamePropType } from '../propTypes';
import { getCellTypeDistribution } from '../../reversi/board/Board';
import { getCurrentAvailableCellChanges, getWinner, getCurrentPlayer } from '../../reversi/game/Game';

const styles = {
    header: {
        textAlign: 'center',
        color: 'white',
        position: 'relative',
    },
    content: {
        width: '600px',
        margin: '0 auto',
    },
    players: {
        display: 'table',
        width: '100%',
    },
    playerBadgeContainer: {
        display: 'table-cell',
        width: '50%',
        textAlign: 'center',
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
    close: {
        position: 'absolute',
        right: 40,
        top: 5,
    },
};

class Game extends Component {
    componentWillMount() {
        this.props.requestGame();
    }

    render() {
        const { game, sheet, placeCellChange } = this.props;
        const cellProposals = game ? getCurrentAvailableCellChanges(game) : [];
        const winner = game ? getWinner(game) : null;
        const cellTypeDistribution = game ? getCellTypeDistribution(game.board) : null;

        return (
            <div>
                <div className={sheet.classes.header}>
                    <Helmet title={'Game'} />
                    <h1>Game</h1>
                    <Link className={sheet.classes.close} to="/">
                        <i style={{ fontSize: '30px', color: 'white' }} className="fa fa-window-close" />
                    </Link>
                </div>
                { game ?
                    <div className={sheet.classes.content}>
                        <Board
                            width={600}
                            game={game}
                            cellProposals={cellProposals}
                            onCellClick={placeCellChange}
                        />
                        <div className={sheet.classes.players}>
                            {game.players.map((player, pidx) => (
                                <div key={`player_${pidx}`} className={sheet.classes.playerBadgeContainer}>
                                    <PlayerBadge
                                        player={player}
                                        isCurrent={getCurrentPlayer(game) === player}
                                        count={cellTypeDistribution ? cellTypeDistribution[player.cellType] : 0}
                                    />
                                </div>
                            ))}
                        </div>
                        {game.isFinished ?
                            <div className={sheet.classes.overlay}>
                                { winner ? `${winner.name} win!` : 'It\'s a draw!' }<br />
                                <i style={{ fontSize: '100px', marginTop: 50 }} className="fa fa-hand-peace-o" />
                            </div> : ''
                        }
                    </div>
                : '' }
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
