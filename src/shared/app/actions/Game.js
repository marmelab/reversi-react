export const REQUEST_GAME = 'REQUEST_GAME';
export const RECEIVE_GAME = 'RECEIVE_GAME';
export const REQUEST_NEW_GAME = 'REQUEST_NEW_GAME';
export const PLACE_CELL_CHANGE = 'PLACE_CELL_CHANGE';

export default (apiBaseUrl) => {
    const requestGame = (hash) => {
        return {
            type: REQUEST_GAME,
            uri: `${apiBaseUrl}/games/${hash}`,
            hash,
        };
    };

    const receiveGame = (game) => {
        return {
            type: RECEIVE_GAME,
            game,
        };
    };

    const requestNewGame = () => {
        return {
            type: REQUEST_NEW_GAME,
            uri: `${apiBaseUrl}/games/new`,
        };
    };

    const placeCellChange = (cellChange, gameHash) => {
        return {
            type: PLACE_CELL_CHANGE,
            uri: `${apiBaseUrl}/games/place/${gameHash}`,
            cellChange,
            gameHash,
        };
    };

    return {
        requestGame,
        receiveGame,
        requestNewGame,
        placeCellChange,
    };
};
