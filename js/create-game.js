import {levels} from './screens/levels.js';
import {createLevel} from './create-levels.js';

export const levelsArray = () => {
  const arr = [];

  for (let level of levels) {
    arr.push(createLevel[level.type](level));
  }

  return arr;
};
