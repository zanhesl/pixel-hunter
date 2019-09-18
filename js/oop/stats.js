import {stats} from '../screens/stats.js';
import {AbstractView} from './abstract-view.js';
import {handleGame} from '../data/game-data.js';

export class StatsView extends AbstractView {

  template(currentState) {
    const currentLevel = this.render(`<div class="result"></div>`);
    if (!currentState.lives) {
      currentLevel.querySelector(`div`).appendChild(this.render(`<table class="result__table">
        <tr>
          <td class="result__number"></td>
          <td class="stats__list">
          ${stats(currentState.answers)}
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>`));

      return currentLevel;
      // currentLevel.querySelector(`.stats__list`).appendChild(stats(currentState.answers));
    }
    const statsInfo = handleGame(currentState.answers, currentState.lives);
    currentLevel.querySelector(`div`).appendChild(this.render(`<h1>Победа!</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2" class="stats__list">
        ${stats(currentState.answers)}
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${statsInfo.pointsTotal}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${statsInfo.answersFast}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${statsInfo.answersFast * 50}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${currentState.lives}&nbsp;<span class="stats__result stats__result--heart"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${currentState.lives * 50}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${statsInfo.answersSlow}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${-statsInfo.answersSlow * 50}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${statsInfo.pointsFinal}</td>
      </tr>
    </table>`));
    return currentLevel;
  }

  bind(currentLevel, currentState) {
    // const returnHeader = currentLevel.querySelector(`header`);
    // returnHeader.querySelector(`.back`).addEventListener(`click`, () => {
    //   currentState = Object.assign({}, gameState);
    //   currentState.change = true;
    // });
  }

  get element() {
    const gameTemplate = this.template(this.currentState);
    this.bind(gameTemplate, this.currentState);

    return gameTemplate;
  }
}
