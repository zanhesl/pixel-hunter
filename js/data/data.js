
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

export function fadeinScreenAnimate(fadeinScreen, fadeoutScreen) {
  return new Promise((resolve, reject) => {

    const ANIMATION_FPS = 25;
    const ANIMATION_DURATION = 1;
    const ANIMATION_TIMEOUT = 1000 / ANIMATION_FPS;
    const ANIMATION_DELTA = 1 / (ANIMATION_FPS * ANIMATION_DURATION);

    fadeoutScreen.classList.add(`central--absolute`);
    fadeoutScreen.style.zIndex = `2`;
    fadeinScreen.style.opacity = `1`;

    fadeinScreen.classList.add(`central--absolute`);
    fadeinScreen.style.zIndex = `1`;
    fadeinScreen.style.opacity = `0`;

    function decreaseOpacity(opacity) {

      fadeinScreen.style.opacity = (1 - opacity);
      fadeoutScreen.style.opacity = opacity;

      opacity = (opacity - ANIMATION_DELTA).toFixed(2);

      if (opacity >= 0.0) {
        setTimeout(() => {
          decreaseOpacity(opacity);
        }, ANIMATION_TIMEOUT);
      } else {
        resolve();
      }
    }

    decreaseOpacity(1.0);
  });
}

export function renderScreen(screen, appearance) {

  const viewport = document.getElementById(`main`);
  const curScreen = viewport.querySelector(`.central`);

  if (curScreen && appearance && appearance === `fadein`) {

    viewport.appendChild(screen.element);

    fadeinScreenAnimate(screen.element, curScreen).then(() => {
      viewport.removeChild(curScreen);
      screen.element.classList.remove(`central--absolute`);
    });

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
