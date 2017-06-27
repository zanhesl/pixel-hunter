
const Result = Object.freeze({
  CORRECT: `correct`,
  WRONG: `wrong`,
  FAST: `fast`,
  SLOW: `slow`,
  UNKNOWN: `unknown`
});

export const rules = {
  gameTime: 30,
  warningTime: 5,
  slowTime: 20,
  quickTime: 10,
  points: {
    correct: 100,
    wrong: 0,
    unknown: 0,
    extra: {
      fast: {
        label: `Бонус за скорость:`,
        points: 50
      },
      heart: {
        label: `Бонус за жизни:`,
        points: 50
      },
      slow: {
        label: `Штраф за медлительность:`,
        points: -50
      }
    }
  },
  maxLives: 3,
  levelsCount: 10
};

export const state = Object.freeze({
  level: 0,
  levels: [],
  lives: rules.maxLives,
  name: `Unknown`,
  results: Object.freeze(new Array(rules.levelsCount).fill(Result.UNKNOWN))
});

export const typeOptions = {
  'two-of-two': {
    formClass: `game__content`,
    hasAnswers: true
  },
  'tinder-like': {
    formClass: `game__content  game__content--wide`,
    hasAnswers: true
  },
  'one-of-three': {
    formClass: `game__content  game__content--triple`,
    hasAnswers: false
  }
};

export function renderScreen(screen, appearance) {

  const viewport = document.getElementById(`main`);
  const curScreen = viewport.querySelector(`.central`);

  if (curScreen && appearance && appearance === `fadein`) {

    curScreen.addEventListener("animationend", () => {
      viewport.classList.remove(`main--animate-screens`);
      viewport.classList.remove(`main--stack-screens`);
      viewport.removeChild(curScreen);
    });

    viewport.classList.add(`main--stack-screens`);
    viewport.appendChild(screen.element);
    viewport.classList.add(`main--animate-screens`);

  } else {
    viewport.innerHTML = ``;
    viewport.appendChild(screen.element);
  }
}

export function countResults(results, value) {

  let count = 0;

  if (value === `heart`) {
    count = rules.maxLives - results.filter((item) => (item === Result.WRONG)).length;
    count = (count < 0) ? 0 : count;
  } else {
    count = results.filter((item) => (item === value)).length;
  }

  return count;
}

export function getLevelResult(levelTime, levelPassed) {

  let result = Result.UNKNOWN;

  if (!levelPassed || levelTime < 0) {
    result = Result.WRONG;
  } else if (levelPassed && levelTime < rules.quickTime) {
    result = Result.FAST;
  } else if (levelPassed && levelTime > rules.slowTime) {
    result = Result.SLOW;
  } else if (levelPassed) {
    result = Result.CORRECT;
  } else {
    result = Result.WRONG;
  }

  return result;
}

export function getLivesCount(results) {
  return countResults(results, `heart`);
}

export function getPoints(results) {
  return results.filter((result) => {

    const extraItem = rules.points.extra[result];

    return rules.points[result] || (extraItem && Math.abs(extraItem.points));

  }).length * rules.points.correct;
}

export function getTotalPoints(results) {

  const extraPoints = Object.keys(rules.points.extra).map((key) => {

    const extraItem = rules.points.extra[key];
    const count = countResults(results, key);

    return count * extraItem.points;

  }).reduce((pValue, cValue) => pValue + cValue);


  return getPoints(results) + extraPoints;
}

export function getExtraPointsList(results) {

  return Object.keys(rules.points.extra).map((key) => {

    const extraItem = rules.points.extra[key];
    const count = countResults(results, key);
    const label = extraItem.label;
    const points = Math.abs(extraItem.points);
    const total = count * extraItem.points;

    return {key, count, label, points, total};
  });
}
