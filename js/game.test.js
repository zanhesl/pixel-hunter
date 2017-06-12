
import assert from 'assert';

import * as game from './game';


describe(`Game`, () => {

  describe(`Initial state`, () => {

    it(`should start from first level`, () => {
      assert.equal(game.state.level, 0);
    });

    it(`should have 3 live on start`, () => {
      assert.equal(game.state.lives, 3);
    });
  });
});
