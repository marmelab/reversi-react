import hashGenerator from '../../shared/utils/hashGenerator';

const games = [];

export const all = () => games;

export const get = hash => games.find(game => game.hash === hash);

export const getIndex = hash => games.findIndex(game => game.hash === hash);

export const exist = hash => getIndex(hash) !== -1;

export const set = (hash, newgame) => {
    games[getIndex(hash)] = { hash, ...newgame };
};

const resolveNewHash = () => {
    let newhash;
    do {
        newhash = hashGenerator();
    } while (exist(newhash));
    return newhash;
};

const newGameEntry = game => ({
    hash: resolveNewHash(),
    ...game,
});

export const add = (game) => {
    const entry = newGameEntry(game);
    games.push(entry);
    return entry;
};
