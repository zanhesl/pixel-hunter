
import levels from './data-levels';

import ingameTask1 from './ingame-task-1';
import ingameTask2 from './ingame-task-2';
import ingameTask3 from './ingame-task-3';

import greetingScreen from './greeting';
import statsScreen from './stats';


const ingameTasks = Object.freeze({
  'task-1': ingameTask1,
  'task-2': ingameTask2,
  'task-3': ingameTask3
});

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

export function renderLevel(curState = state) {

  const level = levels[curState.level];

  renderScreen(ingameTasks[level.task](curState, level.options));
}

export function renderNextLevel(curState = state) {

  if ((curState.lives >= 0) && (curState.level + 1) < rules.levelsCount) {
    renderLevel(Object.assign({}, curState, {
      level: curState.level + 1
    }));
  } else {
    renderScreen(statsScreen(curState));
  }
}

export function applyLevelResults(curState = state, levelTime = 0, levelPassed = false) {

  let results = `unknown`;
  let livePenalty = 0;

  if (!levelPassed || levelTime <= 0) {
    results = `wrong`;
    livePenalty = 1;
  } else if (levelPassed && levelTime <= rules.quickTime) {
    results = `fast`;
  } else if (levelPassed && levelTime >= rules.slowTime) {
    results = `slow`;
  } else if (levelPassed) {
    results = `correct`;
  }

  const newState = Object.assign({}, curState, {
    lives: curState.lives - livePenalty,
    results: curState.results.slice()
  });

  newState.results[curState.level] = results;

  return newState;
}

export function startLevel(curState = state, onLevelTime) {

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

export function finishLevel(curState = state, levelTime = 0, levelPassed = false) {

  clearInterval(levelTimer);

  renderNextLevel(applyLevelResults(curState, levelTime, levelPassed));
}

export function countResults(results, value) {
  return results.filter((result) => result === value).length;
}

export function getLivesCount(results) {
  return rules.maxLives - countResults(results, `wrong`);
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

export function start(curState = state, userName = `Unknown`) {
  renderLevel(Object.assign({}, curState, {
    name: userName,
    results: curState.results.slice()
  }));
}

export function reset() {

  clearInterval(levelTimer);

  renderScreen(greetingScreen());
}
