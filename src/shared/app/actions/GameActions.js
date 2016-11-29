export const PLACE_CELL_CHANGE = 'PLACE_CELL_CHANGE';
export const START_NEW_GAME = 'START_NEW_GAME';

export function placeCellChange(cellChange) {
    return {
        type: PLACE_CELL_CHANGE,
        cellChange,
    };
}

export function startNewGame(againstComputer) {
    return {
        type: START_NEW_GAME,
        againstComputer,
    };
}
