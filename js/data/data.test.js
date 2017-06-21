
import assert from 'assert';

import * as data from './data';


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
      assert.equal(game.getLevelResult(0, true), `fast`);
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
      ), -2);
    });
  });

  describe(`Calculation of points`, () => {

    it(`should give correct level's points (without extra points)`, () => {

      const tests = [{
        results: [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`],
        points: 0
      }, {
        results: [`correct`, `wrong`, `fast`, `wrong`, `wrong`, `correct`, `wrong`, `correct`, `correct`, `wrong`],
        points: 500
      }, {
        results: [`correct`, `correct`, `fast`, `slow`, `correct`, `unknown`, `slow`, `wrong`, `wrong`, `fast`],
        points: 700
      }, {
        results: [`correct`, `correct`, `fast`, `slow`, `correct`, `correct`, `slow`, `correct`, `correct`, `fast`],
        points: 1000
      }];

      function runTest(test) {
        const points = game.getPoints(test.results);

        assert.equal(points, test.points);
      }

      tests.forEach(runTest);
    });

    it(`should give correct total level's points (with extra points)`, () => {

      const tests = [{
        results: [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`],
        points: 0
      }, {
        results: [`correct`, `wrong`, `fast`, `wrong`, `slow`, `correct`, `slow`, `correct`, `correct`, `wrong`],
        points: 650
      }, {
        results: [`correct`, `correct`, `fast`, `slow`, `correct`, `correct`, `slow`, `wrong`, `wrong`, `fast`],
        points: 850
      }, {
        results: [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`],
        points: 1100
      }, {
        results: [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`],
        points: 1150
      }];

      function runTest(test) {
        const points = game.getTotalPoints(test.results);

        assert.equal(points, test.points);
      }

      tests.forEach(runTest);
    });

    it(`should give correct fast answer extra points`, () => {

      const tests = [{
        results: [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`],
        count: 0,
        totalPoints: 0
      }, {
        results: [`correct`, `correct`, `fast`, `slow`, `correct`, `fast`, `slow`, `correct`, `correct`, `fast`],
        count: 3,
        totalPoints: 150
      }, {
        results: [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`],
        count: 10,
        totalPoints: 500
      }, {
        results: [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`],
        count: 2,
        totalPoints: 100
      }];

      function runTest(test) {
        const pointsList = game.getExtraPointsList(test.results);

        assert.equal(pointsList[0].count, test.count);
        assert.equal(pointsList[0].totalPoints, test.totalPoints);
      }

      tests.forEach(runTest);
    });

    it(`should give correct lives extra points`, () => {

      const tests = [{
        results: [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`],
        count: 3,
        totalPoints: 150
      }, {
        results: [`correct`, `wrong`, `fast`, `slow`, `correct`, `fast`, `slow`, `wrong`, `correct`, `fast`],
        count: 1,
        totalPoints: 50
      }, {
        results: [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`],
        count: 0,
        totalPoints: 0
      }, {
        results: [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`],
        count: 3,
        totalPoints: 150
      }];

      function runTest(test) {
        const pointsList = game.getExtraPointsList(test.results);

        assert.equal(pointsList[1].count, test.count);
        assert.equal(pointsList[1].totalPoints, test.totalPoints);
      }

      tests.forEach(runTest);
    });

    it(`should give correct slow answer extra points`, () => {

      const tests = [{
        results: [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`],
        count: 0,
        totalPoints: 0
      }, {
        results: [`correct`, `correct`, `fast`, `slow`, `correct`, `fast`, `slow`, `correct`, `correct`, `fast`],
        count: 2,
        totalPoints: -100
      }, {
        results: [`slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`],
        count: 10,
        totalPoints: -500
      }, {
        results: [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`],
        count: 3,
        totalPoints: -150
      }];

      function runTest(test) {
        const pointsList = game.getExtraPointsList(test.results);

        assert.equal(pointsList[2].count, test.count);
        assert.equal(pointsList[2].totalPoints, test.totalPoints);
      }

      tests.forEach(runTest);
    });
  });
});
