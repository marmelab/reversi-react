import { RECEIVE_GAME } from '../actions/Game';

export default (game = null, action = {}) => {
    switch (action.type) {
    case RECEIVE_GAME:
        return action.game;
    default:
        return game;
    }
};
