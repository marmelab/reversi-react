import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { StyleSheet } from 'jss';
import { getColor } from '../../reversi/cell/Cell';
import { cellPropType } from '../propTypes';

const styles = {
    cell: {
        borderRadius: '20px',
        padding: 0,
        border: 'none',
        width: '40px',
        height: '40px',
        display: 'inline-block',
        lineHeight: '40px',
        boxShadow: 'inset 0px 0px 5px 0px rgba(0, 0, 0, 0.4)',
    },
    proposal: {
        display: 'inline-block',
        width: '25px',
        height: '25px',
        borderRadius: '13px',
        verticalAlign: 'middle',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
};

const getBgColor = cellType => ({ backgroundColor: getColor(cellType) });

const Cell = ({ sheet, cell, onClick, gameHash, isProposal }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        onClick(cell, gameHash);
    };

    if (isProposal) {
        return (
            <form onSubmit={onSubmit} action={`/games/place/${gameHash}`} method="POST">
                <input type="hidden" value={cell.x} name="cell[x]" />
                <input type="hidden" value={cell.y} name="cell[y]" />
                <input type="hidden" value={cell.type} name="cell[type]" />
                <button className={sheet.classes.cell} style={getBgColor()}>
                    <span className={sheet.classes.proposal} style={getBgColor(cell.type)} />
                </button>
            </form>
        );
    }
    return <div className={sheet.classes.cell} style={getBgColor(cell.type)} />;
};

Cell.propTypes = {
    cell: cellPropType.isRequired,
    sheet: PropTypes.instanceOf(StyleSheet),
    onClick: PropTypes.func,
    gameHash: PropTypes.string,
    isProposal: PropTypes.bool,
};

export default injectSheet(styles)(Cell);
