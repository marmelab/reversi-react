import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { all, add, get, exist, set } from '../api/games';
import { create as createCell, TYPE_BLACK, TYPE_WHITE } from '../../shared/reversi/cell/Cell';
import { create as createPlayer } from '../../shared/reversi/player/Player';

import {
    create as createGame,
    playCellChange,
    tryPlayerSwitch,
    getCurrentPlayer,
    playerCanPlay,
 } from '../../shared/reversi/game/Game';

const ApiMiddleware = express();

ApiMiddleware.use(bodyParser.urlencoded({ extended: true }));
ApiMiddleware.use(bodyParser.json());

ApiMiddleware.get('/games', (req, res) => {
    res.json(all());
});

ApiMiddleware.post('/games/new', (req, res) => {
    const { againstComputer } = req.body;
    res.json(add(createGame([
        createPlayer('Player 1', TYPE_BLACK),
        createPlayer(againstComputer ? 'Computer' : 'Player 2', TYPE_WHITE, !againstComputer),
    ]))).send();
});

ApiMiddleware.get('/games/computer-play/:hash', (req, res) => {
    const { hash } = req.params;
    const { redirect } = req.query;

    if (!exist(hash)) {
        res.status(404).send();
        return;
    }

    let game = get(hash);
    const player = getCurrentPlayer(game);

    if (player.isHuman || !playerCanPlay(player, game)) {
        return;
    }

    try {
        axios.post(
            `http://localhost:8181/?type=${player.cellType}`,
            JSON.stringify(game.board.cells),
        ).then(({ data }) => {

            game = tryPlayerSwitch(playCellChange(createCell(data.X, data.Y, data.CellType), game));

            game.hash = hash;
            set(hash, game);

            if (redirect) {
                res.redirect(`/game/${req.params.hash}`);
                return;
            }

            return res.json({}).send();

        });
    } catch (e) {
        console.log(e);
    }

});

ApiMiddleware.get('/games/:hash', (req, res) => {
    if (!exist(req.params.hash)) {
        res.status(404).send();
        return;
    }
    res.json(get(req.params.hash)).send();
});

ApiMiddleware.post('/games/place/:hash', (req, res) => {
    const { hash } = req.params;
    const { redirect } = req.query;
    const { cell } = req.body;

    if (!exist(hash)) {
        res.status(404).send();
        return;
    }

    const status = { error: false, message: '' };

    let game = playCellChange(createCell(
        parseInt(cell.x, 10),
        parseInt(cell.y, 10),
        parseInt(cell.type, 10),
    ), get(hash));

    try {
        game = tryPlayerSwitch(game);
    } catch (e) {
        status.error = true;
        status.message = e.message;
    }

    game.hash = hash;
    set(hash, game);

    if (redirect) {
        res.redirect(`/game/${req.params.hash}?error=${status.message}`);
        return;
    }

    res.json(status).send();
});

ApiMiddleware.put('/games/:hash', (req, res) => {
    if (!exist(req.params.hash)) {
        res.status(404).send();
        return;
    }
    set(req.params.hash, req.body);
    res.json(get(req.params.hash)).send();
});

export default ApiMiddleware;
