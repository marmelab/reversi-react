import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
    REQUEST_GAME,
    REQUEST_NEW_GAME,
    PLACE_CELL_CHANGE,
    receiveGame as receiveGameAction,
    requestNewGame as requestNewGameAction,
    requestGame as requestGameAction,
} from '../actions/Game';

function* requestGame({ uri, hash }) {
    const gameGetRequest = (reqUri) => {
        return axios.get(reqUri).then(({ data }) => data);
    };

    if (!hash) {
        yield put(requestNewGameAction());
        return;
    }

    try {
        const gameEntry = yield call(gameGetRequest, uri);
        yield put(receiveGameAction(gameEntry));
    } catch (error) {
        console.log('Request failed', error);
    }
}

function* requestNewGame({ uri }) {
    const gameNewRequest = (reqUri) => {
        return axios.post(reqUri).then(({ data }) => data);
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
    } catch (error) {
        console.log('Request failed', error);
    }
}

export function* watchRequestGame() {
    yield* takeLatest(REQUEST_GAME, requestGame);
}

export function* watchRequestNewGame() {
    yield* takeLatest(REQUEST_NEW_GAME, requestNewGame);
}

export function* watchPlaceCellChange() {
    yield* takeLatest(PLACE_CELL_CHANGE, requestPlaceCellChange);
}
