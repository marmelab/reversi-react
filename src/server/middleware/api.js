import express from 'express';
import bodyParser from 'body-parser';
import { all, add, get, exist, set } from '../api/games';
import { create as createGame, playCellChange, tryPlayerSwitch } from '../../shared/reversi/game/Game';
import { create as createCell, TYPE_BLACK, TYPE_WHITE } from '../../shared/reversi/cell/Cell';
import { create as createPlayer } from '../../shared/reversi/player/Player';

const ApiMiddleware = express();

ApiMiddleware.use(bodyParser.urlencoded({ extended: true }));
ApiMiddleware.use(bodyParser.json());

ApiMiddleware.get('/games', (req, res) => {
    res.json(all());
});

ApiMiddleware.post('/games/new', (req, res) => {
    res.json(add(createGame([
        createPlayer('Player 1', TYPE_BLACK),
        createPlayer('Player 2', TYPE_WHITE),
    ]))).send();
});

ApiMiddleware.get('/games/:hash', (req, res) => {
    if (!exist(req.params.hash)) {
        res.status(404).send();
        return;
    }
    res.json(get(req.params.hash)).send();
});

ApiMiddleware.post('/games/place/:hash', (req, res) => {
    if (!exist(req.params.hash)) {
        res.status(404).send();
        return;
    }
    const reqCell = req.body.cell;
    let game = get(req.params.hash);
    let error = '';
    game = playCellChange(createCell(parseInt(reqCell.x), parseInt(reqCell.y), parseInt(reqCell.type)), game);
    try {
        game = tryPlayerSwitch(game);
    } catch (e) {
        error = e.message;
    }
    game.hash = req.params.hash;
    set(req.params.hash, game);
    res.redirect(`/game/${req.params.hash}?error=${error}`);
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
