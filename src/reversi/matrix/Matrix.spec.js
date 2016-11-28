import { expect } from 'chai';

import {
    create,
} from './Matrix';

describe('Matrix', () => {
    it('create should return valid matrix', () => {
        expect(create(3, 2)).to.eql([
            [0, 0, 0],
            [0, 0, 0],
        ]);
    });
});
