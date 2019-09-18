import {MAX_LEVELS} from '../screens/change-screen.js';

export const lifeChange = (answer, currentState) => {
  if (!answer.value) {
    currentState.lives -= 1;
    if (currentState.lives <= 0) {
      currentState.level = MAX_LEVELS - 1;
    }
  }
};
