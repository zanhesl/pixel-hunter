import {levels} from '../screens/levels.js';

const FAST_ANSWER_TIME = 10;
const SLOW_ANSWER_TIME = 20;

export const calculateLength = (levelsArr) => {
  let maxAnswers = 0;
  for (let level of levelsArr) {
    if (level.type === `game-2`) {
      maxAnswers += 2;
    } else if (level.type.indexOf(`game`) >= 0) {
      maxAnswers += 1;
    }
  }
  return maxAnswers;
};

export const handleGame = (answers, lives) => {
  let points = 0;
  let pointsTotal = 0;
  let answersFast = 0;
  let answersSlow = 0;

  if ((answers.length < calculateLength(levels)) || (typeof lives === `undefined`)) {
    return -1;
  }
  for (let answer of answers) {
    pointsTotal += (answer[`value`]) ? 100 : 0;
    points += (answer[`value`]) ? 100 : 0;
    if ((answer[`value`]) && (answer[`time`] <= FAST_ANSWER_TIME)) {
      points += 50;
      answersFast += 1;
    }

    if ((answer[`value`]) && (answer[`time`] >= SLOW_ANSWER_TIME)) {
      points -= 50;
      answersSlow += 1;
    }
  }

  points += lives * 50;

  return {
    'pointsTotal': pointsTotal,
    'pointsFinal': points,
    'answersFast': answersFast,
    'answersSlow': answersSlow,
  };
};
