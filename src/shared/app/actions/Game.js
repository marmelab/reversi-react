export const REQUEST_GAME = 'REQUEST_GAME';
export const RECEIVE_GAME = 'RECEIVE_GAME';
export const REQUEST_NEW_GAME = 'REQUEST_NEW_GAME';
export const PLACE_CELL_CHANGE = 'PLACE_CELL_CHANGE';

export function requestGame(hash) {
    return {
        type: REQUEST_GAME,
        uri: `http://localhost:8080/api/games/${hash}`,
        hash,
    };
}

export function receiveGame(game) {
    return {
        type: RECEIVE_GAME,
        game,
    };
}

export function requestNewGame() {
    return {
        type: REQUEST_NEW_GAME,
        uri: 'http://localhost:8080/api/games/new',
    };
}

export function placeCellChange(cellChange, gameHash) {
    return {
        type: PLACE_CELL_CHANGE,
        uri: `http://localhost:8080/api/games/place/${gameHash}`,
        cellChange,
        gameHash,
    };
}
