import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { StyleSheet } from 'jss';

const styles = {
    container: {
        backgroundColor: '#079153',
        borderRadius: '3px',
        padding: '10px',
    },
};

const App = ({ sheet, content }) => (
    <div className={sheet.classes.container}>{content}</div>
);

App.propTypes = {
    content: PropTypes.element,
    sheet: PropTypes.instanceOf(StyleSheet),
};

export default injectSheet(styles)(App);
