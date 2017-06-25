
export const rules = Object.freeze({
  gameTime: 30,
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
  levelsCount: 10
});

export const state = Object.freeze({
  level: 0,
  levels: [],
  lives: rules.maxLives,
  name: `Unknown`,
  results: Object.freeze(new Array(rules.levelsCount).fill(`unknown`))
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

export function renderScreen(screen) {

  const viewport = document.getElementById(`main`);

  viewport.innerHTML = ``;
  viewport.appendChild(screen.element);
}

export function countResults(results, value) {
  return results.filter((result) => result === value).length;
}

export function getLevelResult(levelTime, levelPassed) {

  if (!levelPassed || levelTime < 0) {
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

export function getLivesCount(results) {

  const lives = rules.maxLives - countResults(results, `wrong`);

  return (lives < 0) ? 0 : lives;
}

export function getPoints(results) {
  return results.filter((result) => {
    return Math.abs(rules.points[result]);
  }).length * rules.points.correct;
}


const extraPoints = {
  fast: `Бонус за скорость:`,
  heart: `Бонус за жизни:`,
  slow: `Штраф за медлительность:`
};

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
