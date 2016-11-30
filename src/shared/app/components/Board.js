import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { StyleSheet } from 'jss';
import Cell from './Cell';
import { boardPropType } from '../propTypes';

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

const Board = ({ sheet, board }) => (
    <div className={sheet.classes.board}>
        {board.cells.map((row, y) =>
            <div className={sheet.classes.boardrow} key={`row-${y}`}>
                {row.map((cellType, x) =>
                    <div key={`cell-${x}-${y}`} className={sheet.classes.boardcell}>
                        <Cell type={cellType} />
                    </div>,
                )}
            </div>,
        )}
    </div>
);

Board.propTypes = {
    sheet: PropTypes.instanceOf(StyleSheet),
    board: boardPropType.isRequired,
};

export default injectSheet(styles)(Board);
