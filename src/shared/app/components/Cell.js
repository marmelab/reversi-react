import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import config from 'config';
import { StyleSheet } from 'jss';
import { getColor } from '../../reversi/cell/Cell';
import { cellPropType } from '../propTypes';

const styles = {
    cell: {
        borderRadius: '100%',
        padding: 0,
        border: 'none',
        width: '90%',
        height: '90%',
        display: 'inline-block',
        lineHeight: '90%',
        boxShadow: 'inset 0px 0px 5px 0px rgba(0, 0, 0, 0.4)',
    },
    proposal: {
        display: 'inline-block',
        width: '60%',
        height: '60%',
        borderRadius: '100%',
        verticalAlign: 'middle',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
};

const getBgColor = cellType => ({ backgroundColor: getColor(cellType) });

const Cell = ({ sheet, cell, onClick, gameHash, isProposal, isInteractive }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        onClick(cell, gameHash);
    };

    if (isProposal) {
        const apiBaseUrl = config.shared.apiBaseUrl;
        if (!isInteractive) {
            return (
                <div className={sheet.classes.cell} style={getBgColor()}>
                    <span className={sheet.classes.proposal} style={{ ...getBgColor(cell.type), marginTop: '13px' }} />
                </div>
            );
        }
        return (
            <form style={{ height: '100%' }} onSubmit={onSubmit} action={`${apiBaseUrl}/games/place/${gameHash}?redirect=1`} method="POST">
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
    isInteractive: PropTypes.bool,
};

export default injectSheet(styles)(Cell);
