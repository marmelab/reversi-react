import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { StyleSheet } from 'jss';
import { Link } from 'react-router';
import { cellPropType } from '../propTypes';
import { getColor } from '../../reversi/cell/Cell';

const styles = {
    cell: {
        borderRadius: '20px',
        width: '40px',
        height: '40px',
        display: 'inline-block',
        lineHeight: '40px',
        boxShadow: 'inset 0px 0px 5px 0px rgba(0, 0, 0, 0.4)',
    },
};

const Cell = ({ sheet, cell }) => (
    <Link to="/" className={sheet.classes.cell} style={{ backgroundColor: getColor(cell.type) }}>
    </Link>
);

Cell.propTypes = {
    cell: cellPropType.isRequired,
    sheet: PropTypes.instanceOf(StyleSheet),
};

export default injectSheet(styles)(Cell);
