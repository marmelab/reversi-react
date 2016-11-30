import {
    PLACE_CELL_CHANGE,
    START_NEW_GAME,
} from '../actions/GameActions';

import { create as createPlayer } from '../../reversi/player/Player';
import { create as createGame, playCellChange, tryPlayerSwitch } from '../../reversi/game/Game';
import { TYPE_WHITE, TYPE_BLACK } from '../../reversi/cell/Cell';

const initGame = (againstComputer) => {
    if (againstComputer) {
        return createGame([
            createPlayer('You', TYPE_BLACK),
            createPlayer('Computer', TYPE_WHITE, false),
        ]);
    }
    return createGame([
        createPlayer('Player 1', TYPE_BLACK),
        createPlayer('Player 2', TYPE_WHITE),
    ]);
};

export default (game = initGame(false), action = {}) => {
    switch (action.type) {
    case PLACE_CELL_CHANGE:
        return tryPlayerSwitch(playCellChange(action.cellChange, game));
    case START_NEW_GAME:
        return initGame(action.againstComputer);
    default:
        return game;
    }
};
