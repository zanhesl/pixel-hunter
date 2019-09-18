import {calculateLength} from '../data/game-data.js';
import {levels} from './levels.js';


const FAST_ANSWER_TIME = 10;
const SLOW_ANSWER_TIME = 20;
const ANSWERS_QUANTITY = calculateLength(levels);

export const stats = (answers) => {
  const statsValues = [];
  for (let i = 0; i < ANSWERS_QUANTITY; i++) {
    if (!answers[i]) {
      statsValues.push(`unknown`);
    } else if (answers[i].value === false) {
      statsValues.push(`wrong`);
    } else if (answers[i].value === true) {
      if (answers[i].time <= FAST_ANSWER_TIME) {
        statsValues.push(`fast`);
      } else if (answers[i].time >= SLOW_ANSWER_TIME) {
        statsValues.push(`slow`);
      } else {
        statsValues.push(`correct`);
      }
    }
  }

  return `<div class="stats">
    <ul class="stats">
      ${statsValues.map((answer) =>
        `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
    </ul>
  </div>`;
};
