import { expect } from 'chai';

import {
    create,
    add,
    addGenerator,
} from './Vector';

describe('Vector', () => {
    it('add should return a sum of vector', () => {
        expect(add(create(-1, 4), create(1, 3))).to.eql(create(0, 7));
    });

    it('addGenerator should return a valid add generator', () => {
        const myAddGenerator = addGenerator(create(-3, 4), create(1, 3));
        expect(myAddGenerator.next().value).to.eql(create(-2, 7));
        expect(myAddGenerator.next().value).to.eql(create(-1, 10));
        expect(myAddGenerator.next().value).to.eql(create(0, 13));
    });
});
