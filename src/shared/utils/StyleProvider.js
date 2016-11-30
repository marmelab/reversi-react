import React, { Component, Children, PropTypes } from 'react';
import { StyleSheet } from 'jss';

class StyleProvider extends Component {
    getChildContext() {
        return {
            style: this.props.style,
        };
    }

    render() {
        return Children.only(this.props.children);
    }
}

StyleProvider.propTypes = {
    children: PropTypes.element,
    style: PropTypes.instanceOf(StyleSheet),
};

StyleProvider.childContextTypes = {
    style: PropTypes.instanceOf(StyleSheet),
};

export default StyleProvider;
