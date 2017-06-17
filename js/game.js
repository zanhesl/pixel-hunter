
import * as utils from './utils';

import levels from './data-levels';

import ingameLevel from './ingame-level';
import greetingScreen from './greeting';
import statsScreen from './stats';


const extraPoints = {
  fast: `Бонус за скорость:`,
  heart: `Бонус за жизни:`,
  slow: `Штраф за медлительность:`
};

let levelTimer = null;


export const rules = Object.freeze({
  levelTime: 30,
  slowTime: 20,
  quickTime: 10,
  points: Object.freeze({
    correct: 100,
    fast: 50,
    slow: -50,
    wrong: 0,
    unknown: 0,
    heart: 50
  }),
  maxLives: 3,
  levelsCount: levels.length
});

export const state = Object.freeze({
  level: 0,
  lives: rules.maxLives,
  name: `Unknown`,
  results: Object.freeze(new Array(rules.levelsCount).fill(`unknown`))
});

export function renderScreen(screen) {

  const viewport = document.querySelector(`.viewport`);

  viewport.innerHTML = ``;
  viewport.appendChild(screen);
}

export function loadLevels(onLoadCompleted) {

  let count = levels.length;

  levels.forEach((level, index) => {

    utils.loadImages(level.src, (imgs) => {

      levels[index].img = imgs;
      count--;

      // console.log(`Imgs of level ${index} is loaded, ${count} left`);

      if (!count && typeof onLoadCompleted === `function`) {
        onLoadCompleted();
      }
    })
  });
}

export function renderLevel(curState) {

  const level = ingameLevel(curState, levels[curState.level]);

  renderScreen(level);
}

export function renderNextLevel(curState) {

  if ((curState.lives >= 0) && (curState.level + 1) < rules.levelsCount) {
    renderLevel(Object.assign({}, curState, {
      level: curState.level + 1
    }));
  } else {
    renderScreen(statsScreen(curState));
  }
}

export function getLevelResult(levelTime, levelPassed) {

  if (!levelPassed || levelTime <= 0) {
    return `wrong`;
  } else if (levelPassed && levelTime < rules.quickTime) {
    return `fast`;
  } else if (levelPassed && levelTime > rules.slowTime) {
    return `slow`;
  } else if (levelPassed) {
    return `correct`;
  } else {
    return `wrong`;
  }
}

export function startLevel(curState, onLevelTime) {

  const TIMER_DELAY = 1000;

  let timerTiks = rules.levelTime;

  levelTimer = setInterval(() => {

    timerTiks--;

    if (typeof onLevelTime === `function`) {
      onLevelTime(timerTiks);
    }

    if (!timerTiks) {
      finishLevel(curState);
    }

  }, TIMER_DELAY);
}

export function finishLevel(curState, levelTime, levelPassed) {

  clearInterval(levelTimer);

  const result = getLevelResult(levelTime, levelPassed);

  const newState = Object.assign({}, curState, {
    lives: (result === `wrong`)
      ? curState.lives - 1
      : curState.lives,
    results: curState.results.slice()
  });

  newState.results.splice(curState.level, 1, result);

  renderNextLevel(newState);
}

export function countResults(results, value) {
  return results.filter((result) => result === value).length;
}

export function getLivesCount(results) {

  const lives = rules.maxLives - countResults(results, `wrong`);

  return (lives >= 0) ? lives : 0;
}

export function getPoints(results) {
  return results.filter((result) => {
    return Math.abs(rules.points[result]);
  }).length * rules.points.correct;
}

export function getTotalPoints(results) {
  return getPoints(results) + Object.keys(extraPoints).map((key) => {

    const keyCount = (key === `heart`)
      ? getLivesCount(results)
      : countResults(results, key);

    return keyCount * rules.points[key];

  }).reduce((pValue, cValue) => pValue + cValue);
}

export function getExtraPointsList(results) {

  return Object.keys(extraPoints).map((key) => {

    const keyCount = (key === `heart`)
      ? getLivesCount(results)
      : countResults(results, key);

    return {
      name: key,
      title: extraPoints[key],
      count: keyCount,
      points: Math.abs(rules.points[key]),
      totalPoints: keyCount * rules.points[key]
    };
  });
}

export function start(curState, userName) {

  loadLevels(() => {
    renderLevel(Object.assign({}, curState, {
      name: userName,
      results: curState.results.slice()
    }));
  });
}

export function reset() {

  clearInterval(levelTimer);

  renderScreen(greetingScreen());
}
