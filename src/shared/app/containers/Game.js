import { connect } from 'react-redux';
import { requestGame, placeCellChange } from '../actions/Game';
import Game from '../routes/Game';

const mapStateToProps = state => ({
    game: state.game,
});

const mapDispatchToProps = (dispatch, { params: { hash } }) => ({
    requestGame: () => dispatch(requestGame(hash)),
    placeCellChange: (cell, gameHash) => dispatch(placeCellChange(cell, gameHash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
