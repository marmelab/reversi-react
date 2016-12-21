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
        position: 'relative',
    },
    bullet: {
        width: '40px',
        height: '40px',
        borderRadius: '100%',
        display: 'inline-block',
        marginRight: '10px',
    },
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        textAlign: 'center',
        color: 'white',
        position: 'absolute',
        lineHeight: '90px',
    },
    name: {
        fontSize: '30px',
    },
};

const PlayerBadge = ({ sheet, player, isCurrent, count }) => {
    return (
        <div className={sheet.classes.view} style={isCurrent ? { border: '1px solid #333' } : {}}>
            <div className={sheet.classes.count}>
                <span className={sheet.classes.bullet} style={{ backgroundColor: getColor(player.cellType) }} />
                <span>{count}</span>
            </div>
            <div className={sheet.classes.name}>{player.name}</div>
            { !player.isHuman && isCurrent && <div className={sheet.classes.overlay}>
                <i className="fa fa-spin fa-spinner" />
            </div>}
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
