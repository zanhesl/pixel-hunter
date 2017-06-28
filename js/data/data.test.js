
import assert from 'assert';

import * as data from './data';
import {Result} from './data';

describe(`Game`, () => {

  describe(`Initial game state`, () => {

    it(`should start from first level`, () => {
      assert.equal(data.state.level, 0);
    });
  });

  describe(`Level results`, () => {

    it(`should give wrong level result`, () => {

      assert.equal(data.getLevelResult(0, false), `wrong`);
      assert.equal(data.getLevelResult(-5, true), `wrong`);
      assert.equal(data.getLevelResult(0, false), `wrong`);
      assert.equal(data.getLevelResult(-5, false), `wrong`);
      assert.equal(data.getLevelResult(0, false), `wrong`);
      assert.equal(data.getLevelResult(5, false), `wrong`);
      assert.equal(data.getLevelResult(10, false), `wrong`);
      assert.equal(data.getLevelResult(15, false), `wrong`);
      assert.equal(data.getLevelResult(20, false), `wrong`);
      assert.equal(data.getLevelResult(25, false), `wrong`);
      assert.equal(data.getLevelResult(30, false), `wrong`);
      assert.equal(data.getLevelResult(35, false), `wrong`);
    });

    it(`should give fast level result`, () => {
      assert.equal(data.getLevelResult(0, true), `fast`);
      assert.equal(data.getLevelResult(5, true), `fast`);
    });

    it(`should give correct level result`, () => {

      assert.equal(data.getLevelResult(10, true), `correct`);
      assert.equal(data.getLevelResult(15, true), `correct`);
      assert.equal(data.getLevelResult(20, true), `correct`);
    });

    it(`should give slow level result`, () => {

      assert.equal(data.getLevelResult(25, true), `slow`);
      assert.equal(data.getLevelResult(30, true), `slow`);
      assert.equal(data.getLevelResult(35, true), `slow`);
    });

    it(`should give numbers of given result`, () => {

      const results = [`wrong`, `unknown`, `slow`, `fast`, `correct`, `wrong`, `slow`, `slow`, `slow`, `fast`, `fast`, `unknown`];

      assert.equal(data.countValue(results, Result.WRONG), 2);
      assert.equal(data.countValue(results, Result.SLOW), 4);
      assert.equal(data.countValue(results, Result.FAST), 3);
      assert.equal(data.countValue(results, Result.CORRECT), 1);
      assert.equal(data.countValue(results, Result.UNKNOWN), 2);
    });
  });

  describe(`Calculation of points`, () => {

    it(`should give correct level's points (without extra points)`, () => {

      const tests = [{
        stats: [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`],
        points: 0
      }, {
        stats: [`correct`, `wrong`, `fast`, `wrong`, `wrong`, `correct`, `wrong`, `correct`, `correct`, `wrong`],
        points: 500
      }, {
        stats: [`correct`, `correct`, `fast`, `slow`, `correct`, `unknown`, `slow`, `wrong`, `wrong`, `fast`],
        points: 700
      }, {
        stats: [`correct`, `correct`, `fast`, `slow`, `correct`, `correct`, `slow`, `correct`, `correct`, `fast`],
        points: 1000
      }];

      function runTest(test) {
        const points = data.getPoints(test.stats);

        assert.equal(points, test.points);
      }

      tests.forEach(runTest);
    });

    it(`should give correct total level's points (with extra points)`, () => {

      const tests = [{
        data: {stats: [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`], lives: 0},
        points: 0
      }, {
        data: {stats: [`correct`, `wrong`, `fast`, `wrong`, `slow`, `correct`, `slow`, `correct`, `correct`, `wrong`], lives: 0},
        points: 650
      }, {
        data: {stats: [`correct`, `correct`, `fast`, `slow`, `correct`, `correct`, `slow`, `wrong`, `wrong`, `fast`], lives: 1},
        points: 850
      }, {
        data: {stats: [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`], lives: 3},
        points: 1100
      }, {
        data: {stats: [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`], lives: 3},
        points: 1150
      }];

      function runTest(test) {
        const points = data.getTotalPoints(test.data);

        assert.equal(points, test.points);
      }

      tests.forEach(runTest);
    });

    it(`should give correct fast answer extra points`, () => {

      const tests = [{
        data: {stats: [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`], lives: 3},
        count: 0,
        total: 0
      }, {
        data: {stats: [`correct`, `correct`, `fast`, `slow`, `correct`, `fast`, `slow`, `correct`, `correct`, `fast`], lives: 3},
        count: 3,
        total: 150
      }, {
        data: {stats: [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`], lives: 3},
        count: 10,
        total: 500
      }, {
        data: {stats: [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`], lives: 3},
        count: 2,
        total: 100
      }];

      function runTest(test) {
        const EXTRA_FAST_INDEX = 0;
        const pointsList = data.getExtraPoints(test.data);

        assert.equal(pointsList[EXTRA_FAST_INDEX].count, test.count);
        assert.equal(pointsList[EXTRA_FAST_INDEX].total, test.total);
      }

      tests.forEach(runTest);
    });

    it(`should give correct lives extra points`, () => {

      const tests = [{
        data: {stats: [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`], lives: 3},
        count: 3,
        total: 150
      }, {
        data: {stats: [`correct`, `wrong`, `fast`, `slow`, `correct`, `fast`, `slow`, `wrong`, `correct`, `fast`], lives: 1},
        count: 1,
        total: 50
      }, {
        data: {stats: [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`], lives: 0},
        count: 0,
        total: 0
      }, {
        data: {stats: [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`], lives: 3},
        count: 3,
        total: 150
      }];

      function runTest(test) {
        const EXTRA_LIVES_INDEX = 1;
        const pointsList = data.getExtraPoints(test.data);

        assert.equal(pointsList[EXTRA_LIVES_INDEX].count, test.count);
        assert.equal(pointsList[EXTRA_LIVES_INDEX].total, test.total);
      }

      tests.forEach(runTest);
    });

    it(`should give correct slow answer extra points`, () => {

      const tests = [{
        data: {stats: [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`], lives: 3},
        count: 0,
        total: 0
      }, {
        data: {stats: [`correct`, `correct`, `fast`, `slow`, `correct`, `fast`, `slow`, `correct`, `correct`, `fast`], lives: 3},
        count: 2,
        total: -100
      }, {
        data: {stats: [`slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`], lives: 3},
        count: 10,
        total: -500
      }, {
        data: {stats: [`correct`, `correct`, `fast`, `slow`, `correct`, `slow`, `slow`, `correct`, `correct`, `fast`], lives: 3},
        count: 3,
        total: -150
      }];

      function runTest(test) {
        const EXTRA_SLOW_INDEX = 2;
        const pointsList = data.getExtraPoints(test.data);

        assert.equal(pointsList[EXTRA_SLOW_INDEX].count, test.count);
        assert.equal(pointsList[EXTRA_SLOW_INDEX].total, test.total);
      }

      tests.forEach(runTest);
    });
  });
});
