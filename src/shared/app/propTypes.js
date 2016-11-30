import { PropTypes } from 'react';

export const boardPropType = PropTypes.shape({
    cells: PropTypes.array.isRequired,
});

export const cellPropType = PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
});

export const playerPropType = PropTypes.shape({
    cellType: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
});

export const gamePropType = PropTypes.shape({
    board: PropTypes.object,
});
