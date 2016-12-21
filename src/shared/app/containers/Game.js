import { connect } from 'react-redux';
import config from 'config';
import gameActionFactory from '../actions/Game';
import Game from '../routes/Game';

const mapStateToProps = state => ({
    game: state.game,
});

const mapDispatchToProps = (dispatch, { params: { hash } }) => {
    const { requestGame, placeCellChange } = gameActionFactory(config.shared.apiBaseUrl);
    return {
        requestGame: () => dispatch(requestGame(hash)),
        placeCellChange: (cell, gameHash) => dispatch(placeCellChange(cell, gameHash)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
