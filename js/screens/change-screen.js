import {levels} from './levels.js';

export const MAX_LEVELS = levels.length - 1;

export const switchScreen = (currentState) => {

  currentState.level += 1;
  currentState.level %= (MAX_LEVELS + 1);
  return currentState;
};

export const switchConditions = (currentState) => {
  if (currentState.change) {
    currentState.change = false;
    return true;
  }
  return false;
};
