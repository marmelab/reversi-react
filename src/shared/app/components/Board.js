import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { StyleSheet } from 'jss';
import Cell from './Cell';
import { boardPropType } from '../propTypes';
import { create as createCell } from '../../reversi/cell/Cell';

const styles = {
    board: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '0 auto',
        padding: '10px',
    },
    boardcell: {
        flex: '0 0 auto',
        textAlign: 'center',
    },
};

const Board = ({ sheet, board, width, onCellClick, gameHash, cellProposals }) => {

    const resolveCell = (x, y, cellType) => {
        const cell = createCell(x, y, cellType);
        const proposalIndex = cellProposals.findIndex(c => c.x === cell.x && c.y === cell.y);
        if (proposalIndex !== -1) {
            const proposalCell = cellProposals[proposalIndex];
            return (<Cell gameHash={gameHash} isProposal onClick={onCellClick} cell={proposalCell} />);
        }
        return (<Cell isProposal={false} cell={cell} />);
    };

    const cells = [];

    board.cells.map((row, y) => {
        row.map((cellType, x) => {
            cells.push(
                <div key={`cell-${x}-${y}`} style={{ width: width / (row.length), height: width / (row.length) }} className={sheet.classes.boardcell}>
                    {resolveCell(x, y, cellType)}
                </div>
            );
        });
    });

    return (
        <div className={sheet.classes.board} style={{ width }}>
            {cells}
        </div>
    );
};

Board.propTypes = {
    sheet: PropTypes.instanceOf(StyleSheet),
    board: boardPropType.isRequired,
    width: PropTypes.number.isRequired,
    onCellClick: PropTypes.func.isRequired,
    gameHash: PropTypes.string.isRequired,
    cellProposals: PropTypes.array,
};

export default injectSheet(styles)(Board);
