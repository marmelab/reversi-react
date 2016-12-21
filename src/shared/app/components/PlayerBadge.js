import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { StyleSheet } from 'jss';
import { playerPropType } from '../propTypes';
import { getColor } from '../../reversi/cell/Cell';

const styles = {
    view: {
        backgroundColor: '#079153',
        fontSize: '50px',
        color: '#222',
        borderRadius: '3px',
    },
    bullet: {
        width: '40px',
        height: '40px',
        borderRadius: '100%',
        display: 'inline-block',
        marginRight: '10px',
    },
    count: {

    },
    name: {
        fontSize: '30px',
    }
};

const PlayerBadge = ({ sheet, player, isCurrent, count }) => {

    return (
        <div className={sheet.classes.view} style={isCurrent ? { border: '1px solid #333' } : {}}>
            <div className={sheet.classes.count}>
                <span className={sheet.classes.bullet} style={{ backgroundColor: getColor(player.cellType) }} />
                <span>{count}</span>
            </div>
            <div className={sheet.classes.name}>{player.name}</div>
        </div>
    );
};

PlayerBadge.propTypes = {
    isCurrent: PropTypes.bool.isRequired,
    player: playerPropType.isRequired,
    sheet: PropTypes.instanceOf(StyleSheet),
    count: PropTypes.number.isRequired,
};

export default injectSheet(styles)(PlayerBadge);
