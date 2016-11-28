import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';

const styles = {
    container: {
        backgroundColor: 'green',
    },
};

const App = ({ sheet, content }) => (
    <div className={sheet.classes.container}>{content}</div>
);

App.propTypes = {
    content: PropTypes.element,
};

export default injectSheet(styles)(App);
