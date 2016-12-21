import { fork } from 'redux-saga/effects';
import gameSagaFactory from './Game';

export default (config) => {
    const {
        watchRequestGame,
        watchRequestNewGame,
        watchPlaceCellChange,
        watchAttemptComputerTurn,
    } = gameSagaFactory(config);

    return function* root() {
        yield [
            fork(watchRequestGame),
            fork(watchRequestNewGame),
            fork(watchPlaceCellChange),
            fork(watchAttemptComputerTurn),
        ];
    };
};
