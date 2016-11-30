import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { StyleSheet } from 'jss';
import Cell from './Cell';
import { boardPropType } from '../propTypes';
import { create as createCell } from '../../reversi/cell/Cell';

const styles = {
    board: {
        backgroundColor: '#079153',
    },
    boardrow: {
        display: 'table',
        width: '400px',
        tableLayout: 'fixed',
    },
    boardcell: {
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center',
        height: '50px',
    },
};

const Board = ({ sheet, board, onCellClick, gameHash, cellProposals }) => {

    const resolveCell = (x, y, cellType) => {
        const cell = createCell(x, y, cellType);
        const proposalIndex = cellProposals.findIndex(c => c.x === cell.x && c.y === cell.y);
        if (proposalIndex !== -1) {
            const proposalCell = cellProposals[proposalIndex];
            return (<Cell gameHash={gameHash} isProposal onClick={onCellClick} cell={proposalCell} />);
        }
        return (<Cell isProposal={false} cell={cell} />);
    };

    return (
        <div className={sheet.classes.board}>
            {board.cells.map((row, y) =>
                <div className={sheet.classes.boardrow} key={`row-${y}`}>
                    {row.map((cellType, x) =>
                        <div key={`cell-${x}-${y}`} className={sheet.classes.boardcell}>
                            {resolveCell(x, y, cellType)}
                        </div>,
                    )}
                </div>,
            )}
        </div>
    );
};

Board.propTypes = {
    sheet: PropTypes.instanceOf(StyleSheet),
    board: boardPropType.isRequired,
    onCellClick: PropTypes.func.isRequired,
    gameHash: PropTypes.string.isRequired,
    cellProposals: PropTypes.array,
};

export default injectSheet(styles)(Board);
