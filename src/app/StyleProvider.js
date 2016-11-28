import React, { Component, Children, PropTypes } from 'react';

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
};

StyleProvider.childContextTypes = {
    style: PropTypes.object,
};

export default StyleProvider;
