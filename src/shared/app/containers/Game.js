import { connect } from 'react-redux';
import config from 'config';
import gameActionFactory from '../actions/Game';
import Game from '../routes/Game';

const mapStateToProps = state => ({
    game: state.game,
});

const mapDispatchToProps = (dispatch, { params: { hash }, location: { query } }) => {
    const {
        requestGame,
        requestNewGame,
        placeCellChange,
    } = gameActionFactory(config.shared.apiBaseUrl);

    return {
        requestGame: () => dispatch(hash ? requestGame(hash) : requestNewGame(query.computer === '1')),
        placeCellChange: (cell, gameHash) => dispatch(placeCellChange(cell, gameHash)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
