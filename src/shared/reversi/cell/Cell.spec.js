import { expect } from 'chai';

import {
    TYPE_WHITE,
    TYPE_BLACK,
    TYPE_EMPTY,
    create,
    getTypes,
    getColor,
} from './Cell';

describe('Cell', () => {
    it('create should return valid cell', () => {
        expect(create(0, 4, TYPE_WHITE)).to.eql({
            x: 0,
            y: 4,
            type: TYPE_WHITE,
        });
    });

    it('getTypes should return valid cellTypes', () => {
        expect(getTypes()).to.eql([TYPE_EMPTY, TYPE_WHITE, TYPE_BLACK]);
    });

    it('getColor should return valid color for cell type', () => {
        expect(getColor(TYPE_WHITE)).to.eql('#FFFFFF');
        expect(getColor(TYPE_BLACK)).to.eql('#000000');
        expect(getColor(TYPE_EMPTY)).to.eql('#079153');
    });
});
