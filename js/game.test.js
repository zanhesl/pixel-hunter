
import assert from 'assert';

import * as game from './game';


describe(`Game`, () => {

  describe(`Initial game state`, () => {

    it(`should start from first level`, () => {
      assert.equal(game.state.level, 0);
    });

    it(`should have 3 live on start`, () => {
      assert.equal(game.state.lives, 3);
    });
  });

  describe(`Level results`, () => {

    it(`should give wrong level result`, () => {

      assert.equal(game.getLevelResult(0, false), `wrong`);
      assert.equal(game.getLevelResult(0, true), `wrong`);
      assert.equal(game.getLevelResult(-5, true), `wrong`);
      assert.equal(game.getLevelResult(0, false), `wrong`);
      assert.equal(game.getLevelResult(-5, false), `wrong`);
      assert.equal(game.getLevelResult(0, false), `wrong`);
      assert.equal(game.getLevelResult(5, false), `wrong`);
      assert.equal(game.getLevelResult(10, false), `wrong`);
      assert.equal(game.getLevelResult(15, false), `wrong`);
      assert.equal(game.getLevelResult(20, false), `wrong`);
      assert.equal(game.getLevelResult(25, false), `wrong`);
      assert.equal(game.getLevelResult(30, false), `wrong`);
      assert.equal(game.getLevelResult(35, false), `wrong`);
    });

    it(`should give fast level result`, () => {

      assert.equal(game.getLevelResult(5, true), `fast`);
    });

    it(`should give correct level result`, () => {

      assert.equal(game.getLevelResult(10, true), `correct`);
      assert.equal(game.getLevelResult(15, true), `correct`);
      assert.equal(game.getLevelResult(20, true), `correct`);
    });

    it(`should give slow level result`, () => {

      assert.equal(game.getLevelResult(25, true), `slow`);
      assert.equal(game.getLevelResult(30, true), `slow`);
      assert.equal(game.getLevelResult(35, true), `slow`);
    });

    it(`should give numbers of given result`, () => {

      const results = [`wrong`, `unknown`, `slow`, `fast`, `correct`, `wrong`, `slow`, `slow`, `slow`, `fast`, `fast`, `unknown`];

      assert.equal(game.countResults(results, `wrong`), 2);
      assert.equal(game.countResults(results, `slow`), 4);
      assert.equal(game.countResults(results, `fast`), 3);
      assert.equal(game.countResults(results, `correct`), 1);
      assert.equal(game.countResults(results, `unknown`), 2);
      assert.equal(game.countResults(results, `random`), 0);
    });

    it(`should give correct lives left`, () => {

      assert.equal(game.getLivesCount(
        [`correct`, `slow`, `fast`, `correct`, `correct`, `unknown`, `slow`, `unknown`, `fast`, `unknown`]
      ), 3);

      assert.equal(game.getLivesCount(
        [`correct`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`]
      ), 2);

      assert.equal(game.getLivesCount(
        [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`]
      ), 1);

      assert.equal(game.getLivesCount(
        [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `wrong`, `fast`, `unknown`]
      ), 0);

      assert.equal(game.getLivesCount(
        [`wrong`, `slow`, `wrong`, `correct`, `wrong`, `unknown`, `wrong`, `unknown`, `wrong`, `unknown`]
      ), 0);
    });
  });

  describe(`Calculation of points`, () => {

    it(`should give correct level's points (without extra points)`, () => {

      assert.equal(game.getPoints(
        [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`]
      ), 0);

      assert.equal(game.getPoints(
        [`correct`, `wrong`, `fast`, `wrong`, `wrong`, `correct`, `wrong`, `correct`, `correct`, `wrong`]
      ), 500);

      assert.equal(game.getPoints(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `unknown`, `slow`, `wrong`, `wrong`, `fast`]
      ), 700);

      assert.equal(game.getPoints(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `correct`, `slow`, `correct`, `correct`, `fast`]
      ), 1000);
    });

    it(`should give correct total level's points (with extra points)`, () => {

      assert.equal(game.getTotalPoints(
        [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`]
      ), 0);

      assert.equal(game.getTotalPoints(
        [`correct`, `wrong`, `fast`, `wrong`, `slow`, `correct`, `slow`, `correct`, `correct`, `wrong`]
      ), 650);

      assert.equal(game.getTotalPoints(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `correct`, `slow`, `wrong`, `wrong`, `fast`]
      ), 850);

      assert.equal(game.getTotalPoints(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`]
      ), 1100);

      assert.equal(game.getTotalPoints(
        [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`]
      ), 1150);
    });

    it(`should give correct fast answer extra points`, () => {

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`]
      )[0].count, 0);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`]
      )[0].totalPoints, 0);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `fast`, `slow`, `correct`, `correct`, `fast`]
      )[0].count, 3);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `fast`, `slow`, `correct`, `correct`, `fast`]
      )[0].totalPoints, 150);

      assert.equal(game.getExtraPointsList(
        [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`]
      )[0].count, 10);

      assert.equal(game.getExtraPointsList(
        [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`]
      )[0].totalPoints, 500);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`]
      )[0].count, 2);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`]
      )[0].totalPoints, 100);
    });

    it(`should give correct lives extra points`, () => {

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`]
      )[1].count, 3);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`]
      )[1].totalPoints, 150);

      assert.equal(game.getExtraPointsList(
        [`correct`, `wrong`, `fast`, `slow`, `correct`, `fast`, `slow`, `wrong`, `correct`, `fast`]
      )[1].count, 1);

      assert.equal(game.getExtraPointsList(
        [`correct`, `wrong`, `fast`, `slow`, `correct`, `fast`, `slow`, `wrong`, `correct`, `fast`]
      )[1].totalPoints, 50);

      assert.equal(game.getExtraPointsList(
        [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`]
      )[1].count, 0);

      assert.equal(game.getExtraPointsList(
        [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`]
      )[1].totalPoints, 0);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`]
      )[1].count, 3);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`]
      )[1].totalPoints, 150);
    });

    it(`should give correct slow answer extra points`, () => {

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`]
      )[2].count, 0);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`]
      )[2].totalPoints, 0);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `fast`, `slow`, `correct`, `correct`, `fast`]
      )[2].count, 2);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `fast`, `slow`, `correct`, `correct`, `fast`]
      )[2].totalPoints, -100);

      assert.equal(game.getExtraPointsList(
        [`slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`]
      )[2].count, 10);

      assert.equal(game.getExtraPointsList(
        [`slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`]
      )[2].totalPoints, -500);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`]
      )[2].count, 3);

      assert.equal(game.getExtraPointsList(
        [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`]
      )[2].totalPoints, -150);
    });
  });
});
