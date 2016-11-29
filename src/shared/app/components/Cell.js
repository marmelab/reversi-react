import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { StyleSheet } from 'jss';
import { Link } from 'react-router';
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

const Cell = ({ sheet, type }) => (
    <Link to="/" className={sheet.classes.cell} style={{ backgroundColor: getColor(type) }}>
    </Link>
);

Cell.propTypes = {
    type: PropTypes.number.isRequired,
    sheet: PropTypes.instanceOf(StyleSheet),
};

export default injectSheet(styles)(Cell);
