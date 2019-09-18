import {assert} from 'chai';
import {handleGame} from './game-data.js';

const FEW_ANSWERS = [
  {value: true, time: 15000},
  {value: true, time: 15000},
  {value: true, time: 15000},
  {value: true, time: 15000},
  {value: true, time: 15000},
  {value: true, time: 15000},
  {value: true, time: 15000},
  {value: true, time: 15000},
  {value: true, time: 15000},
  {value: true, time: 15000},
];

const FEW_INSORRECT_ANSWERS = [
  {value: true, time: 15000},
  {value: true, time: 15000},
  {value: false, time: 15000},
  {value: true, time: 15000},
  {value: true, time: 15000},
  {value: false, time: 15000},
  {value: true, time: 15000},
  {value: true, time: 15000},
  {value: false, time: 15000},
  {value: true, time: 15000},
];

describe(`Gaming function`, () => {
  it(`should return 1150 when given ten right answers and three lives`, () => {
    assert.equal(1150, handleGame(FEW_ANSWERS, 3));
    assert.equal(700, handleGame(FEW_INSORRECT_ANSWERS, 0));
  });

  it(`should return -1 when an amount of answers is lower, than 10`, () => {
    assert.equal(-1, handleGame([{value: true, time: 2500}], 3));
  });

  it(`should return -1 when no lives/ no answers given`, () => {
    assert.equal(-1, handleGame(FEW_ANSWERS));
  });
});
