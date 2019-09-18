import {AbstractView} from './abstract-view.js';
import {levels as levelsArr} from '../screens/levels.js';

export class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  template(state, levels) {
    const livesArray = [];
    const MAX_LIVES = 3;
    for (let i = 0; i < MAX_LIVES; i++) {
      livesArray.push((i >= state.lives - 1) ? `empty` : `full`);
    }
    if (levels[state.level].type === `intro`) {
      return this.render(`<header class="header"></header>`);
    }

    let returnHeader = this.render(`<header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
    </header>`);

    returnHeader.querySelector(`.back`).addEventListener(`click`, () => {

    })

    if (levels[state.level].type.indexOf(`game`) >= 0) {
      returnHeader.querySelector(`header`).appendChild(this.render(`
      <h1 class="game__timer">${state.time}</h1>
      <div class="game__lives">
        ${livesArray.map((item) =>
          `<img src="img/heart__${item}.svg" class="game__heart" alt="Life" width="32" height="32">`
        ).join(``)}
      </div>`));
    }

    return returnHeader;
  }

  bind(currentLevel) {
  }

  get element() {
    const gameTemplate = this.template(this.state, levelsArr);
    this.bind(gameTemplate);

    return gameTemplate;
  }
}
