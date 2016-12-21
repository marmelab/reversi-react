import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { getReversePlayer } from '../../reversi/game/Game';

import gameActionFactory, {
    REQUEST_GAME,
    REQUEST_NEW_GAME,
    PLACE_CELL_CHANGE,
    ATTEMPT_COMPUTER_TURN,
} from '../actions/Game';

export default (config) => {
    const {
        receiveGame: receiveGameAction,
        requestGame: requestGameAction,
        attemptComputerTurn: attemptComputerTurnAction,
    } = gameActionFactory(config.shared.apiBaseUrl);

    function* requestGame({ uri }) {
        const gameGetRequest = (reqUri) => {
            return axios.get(reqUri).then(({ data }) => data);
        };

        try {
            const gameEntry = yield call(gameGetRequest, uri);
            yield put(receiveGameAction(gameEntry));
        } catch (error) {
            console.log('Request failed', error);
        }
    }

    function* attemptComputerTurn({ uri, gameHash }) {
        const attemptComputerTurnRequest = (reqUri) => {
            return axios.get(reqUri);
        };

        try {
            yield call(attemptComputerTurnRequest, uri);
            yield put(requestGameAction(gameHash));
        } catch (error) {
            console.log('Request failed', error);
        }

    }

    function* requestNewGame({ uri, againstComputer = false }) {
        const gameNewRequest = (reqUri) => {
            return axios.post(reqUri, { againstComputer }).then(({ data }) => data);
        };

        try {
            const gameEntry = yield call(gameNewRequest, uri);
            yield put(receiveGameAction(gameEntry));
        } catch (error) {
            console.log('Request failed', error);
        }
    }

    function* requestPlaceCellChange({ uri, cellChange, gameHash }) {
        const cellChangeRequest = (reqUri) => {
            return axios.post(reqUri, { cell: cellChange }, { maxRedirects: 0 });
        };

        try {
            yield call(cellChangeRequest, uri);
            yield put(requestGameAction(gameHash));

            const game = yield select(state => state.game);

            if (!getReversePlayer(game).isHuman) {
                yield put(attemptComputerTurnAction(gameHash));
            }
        } catch (error) {
            console.log('Request failed', error);
        }
    }

    const watchRequestGame = function* () {
        yield* takeLatest(REQUEST_GAME, requestGame);
    };

    const watchRequestNewGame = function* () {
        yield* takeLatest(REQUEST_NEW_GAME, requestNewGame);
    };

    const watchPlaceCellChange = function* () {
        yield* takeLatest(PLACE_CELL_CHANGE, requestPlaceCellChange);
    };

    const watchAttemptComputerTurn = function* () {
        yield* takeLatest(ATTEMPT_COMPUTER_TURN, attemptComputerTurn);
    };

    return {
        watchPlaceCellChange,
        watchRequestNewGame,
        watchRequestGame,
        watchAttemptComputerTurn,
    };
};
