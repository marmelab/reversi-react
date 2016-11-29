import React from 'react';
import { create } from '../../../reversi/board/Board';

const board = create(8, 8);

const Board = () => (
    <div>
        {board.cells.map((row, y) =>
            <div key={`row-${y}`}>
                {row.map((cellType, x) => <div key={`cell-${x}-${y}`}>{x}</div>)}
            </div>,
        )}
    </div>
);

export default Board;
