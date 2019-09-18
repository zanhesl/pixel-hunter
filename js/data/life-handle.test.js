import {assert} from 'chai';
import {lifeChange} from './life-handle.js';

const UNDEFINED = [];

describe(`Life handler`, () => {
  it(`should return decreased by 1 value if false, else the same value`, () => {
    assert.equal(3, lifeChange(true, 3));
    assert.equal(2, lifeChange(false, 3));
  });

  it(`should return 0 when negative number given`, () => {
    assert.equal(0, lifeChange(true, -2));
    assert.equal(0, lifeChange(false, -6));
  });

  it(`should return 0 when wrong format`, () => {
    assert.equal(0, lifeChange(false, NaN));
    assert.equal(0, lifeChange(false, UNDEFINED[0]));
    assert.equal(0, lifeChange(`123`, UNDEFINED[0]));
  });
});
