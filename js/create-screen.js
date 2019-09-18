import {switchScreen, switchConditions} from './screens/change-screen.js';

export const buildScreen = (currentState, levels) => {
  levels[currentState.level].currentState = currentState;

  const mainScreen = document.querySelector(`.central`);
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(levels[currentState.level].element);

  document.addEventListener(`click`, () => {
    if (switchConditions(levels[currentState.level].currentState)) {
      currentState = switchScreen(levels[currentState.level].currentState);
      buildScreen(currentState, levels);
    }
  });
};
