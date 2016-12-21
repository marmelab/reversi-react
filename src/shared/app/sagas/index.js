import { fork } from 'redux-saga/effects';
import gameSagaFactory from './Game';

export default (config) => {
    const {
        watchRequestGame,
        watchRequestNewGame,
        watchPlaceCellChange,
    } = gameSagaFactory(config);

    return function* root() {
        yield [
            fork(watchRequestGame),
            fork(watchRequestNewGame),
            fork(watchPlaceCellChange),
        ];
    };
};
