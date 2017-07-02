
export const Result = Object.freeze({
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
    [Result.CORRECT]: 100,
    [Result.WRONG]: 0,
    [Result.FAST]: 100,
    [Result.SLOW]: 100,
    [Result.UNKNOWN]: 0
  },
  extra: [{
    key: `fast`,
    label: `Бонус за скорость:`,
    points: 50,
    count: (data) => countValue(data.stats, Result.FAST)
  }, {
    key: `heart`,
    label: `Бонус за жизни:`,
    points: 50,
    count: (data) => data.lives
  }, {
    key: `slow`,
    label: `Штраф за медлительность:`,
    points: -50,
    count: (data) => countValue(data.stats, Result.SLOW)
  }],
  maxLives: 3,
  levelsCount: 10
};

export const state = Object.freeze({
  level: 0,
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

export function countValue(arr, value) {
  return arr.filter((item) => item === value).length;
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

export function getPoints(stats) {

  return stats.reduce((sum, value) => {
    return sum + rules.points[value];
  }, 0);
}

export function getExtraPoints(data) {

  return rules.extra.map((item) => {
    return {
      key: item.key,
      label: item.label,
      count: item.count(data),
      points: Math.abs(item.points),
      total: item.count(data) * item.points
    };
  });
}

export function getTotalPoints(data) {

  const extraPoints = rules.extra.reduce((sum, item) => {
    return sum + item.points * item.count(data);
  }, 0);

  return getPoints(data.stats) + extraPoints;
}
