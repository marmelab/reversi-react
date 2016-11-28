import { expect } from 'chai';

import {
    create,
} from './Player';

import {
    TYPE_BLACK,
} from '../cell/Cell';

describe('Player', () => {
    it('create should return valid player', () => {
        expect(create('john', TYPE_BLACK)).to.eql({
            name: 'john',
            cellType: TYPE_BLACK,
            isHuman: true,
        });
    });
});
