import { fork } from 'redux-saga/effects';
import { watchRequestGame, watchRequestNewGame, watchPlaceCellChange } from './Game';

export default function* root() {
    yield [
        fork(watchRequestGame),
        fork(watchRequestNewGame),
        fork(watchPlaceCellChange),
    ];
}
