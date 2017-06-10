
import levels from './levels';

import ingameTask1 from './ingame-task-1';
import ingameTask2 from './ingame-task-2';
import ingameTask3 from './ingame-task-3';

import greetingScreen from './greeting';
import statsScreen from './stats';


export const rules = {
  timePerLevel: 30,
  slowTime: 25,
  quickTime: 8,
  pointsPerResult: 100,
  speedBonusPoints: 50,
  speedPenaltyPoints: -50,
  livesBonusPoints: 50,
  maxLives: 3,
  numberOfLevels: levels.length
};

export const stats = [
  {
    name: `Mary`,
    results: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`]
  }, {
    name: `Finn`,
    results: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `wrong`, `fast`, `wrong`]
  }, {
    name: `Alice`,
    results: [`wrong`, `fast`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `wrong`, `slow`, `slow`]
  }, {
    name: `Bob`,
    results: [`correct`, `fast`, `correct`, `correct`, `fast`, `correct`, `correct`, `slow`, `correct`, `correct`]
  }
];

export const initialState = Object.freeze({
  level: 0,
  lives: rules.maxLives,
  name: ``,
  results: Object.freeze(new Array(rules.numberOfLevels).fill(`unknown`))
});

const taskTypes = {
  'task-1': ingameTask1,
  'task-2': ingameTask2,
  'task-3': ingameTask3
};

const correctResults = new Set([`slow`, `fast`, `correct`]);

const viewport = document.querySelector(`.viewport`);


export function renderScreen(screen) {
  viewport.innerHTML = ``;
  viewport.appendChild(screen);
}

export function isCorrectResult(result) {
  return correctResults.has(result);
}

export function renderLevel(state) {

  const type = levels[state.level].type;
  const options = levels[state.level].options;

  const screen = taskTypes[type](state, options);

  renderScreen(screen);
}

export function renderNextLevel(state) {

  state.level++;

  if (state.level < rules.numberOfLevels) {

    renderLevel(state);

  } else {

    stats.unshift({
      name: state.name,
      results: state.results
    });

    renderScreen(statsScreen(stats));
  }
}

export function start(userName = `Unknown`) {
  renderLevel(Object.assign({},
      initialState, {
        'name': userName,
        'results': initialState.results.slice(0)
      }));
}

export function reset() {
  renderScreen(greetingScreen());
}
