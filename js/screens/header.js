import {getElementFromTemplate} from '../create-element.js';
import {gameState} from './data.js';
import {levels} from './levels.js';

const MAX_LIVES = 3;

export const header = (state) => {
  const livesArray = [];
  for (let i = 0; i < MAX_LIVES; i++) {
    livesArray.push((i >= state.lives - 1) ? `empty` : `full`);
  }
  let returnHeader = getElementFromTemplate(`<header class="header">
  <div class="header__back">
    <span class="back">
      <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
      <img src="img/logo_small.png" width="101" height="44">
    </span>
  </div>
  </header>`);

  returnHeader.querySelector(`.back`).addEventListener(`click`, () => {
    state = Object.assign({}, gameState);
    state.change = true;
  });

  if (levels[state.level].type.indexOf(`game`) >= 0) {
    returnHeader.querySelector(`header`).appendChild(getElementFromTemplate(`
    <h1 class="game__timer">${state.time}</h1>
    <div class="game__lives">
      ${livesArray.map((item) =>
        `<img src="img/heart__${item}.svg" class="game__heart" alt="Life" width="32" height="32">`
      ).join(``)}
    </div>`));
  }

  return returnHeader;
};
