import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import injectSheet from 'react-jss';
import { StyleSheet } from 'jss';

const styles = {
    view: {
        color: 'white',
        textAlign: 'center',
    },
    link: {
        color: '#333',
        background: 'white',
        borderRadius: '3px',
        textAlign: 'center',
        padding: '8px',
        textDecoration: 'none',
        display: 'block',
        marginBottom: '10px',
    },
};

const Welcome = ({ sheet }) => (
    <div className={sheet.classes.view}>
        <Helmet title={'Welcome'} />
        <h1>Welcome to reversi</h1>
        <div>
            <Link className={sheet.classes.link} to="/game">Start game against another player</Link>
            <Link className={sheet.classes.link} to="/game?computer=1">Start game against computer</Link>
        </div>
    </div>
);

Welcome.propTypes = {
    sheet: PropTypes.instanceOf(StyleSheet),
};

export default injectSheet(styles)(Welcome);
