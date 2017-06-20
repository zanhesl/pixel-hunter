
import AbstractView from '../view';
import * as game from '../game/game';
import dataResults from './data-results';
import header from '../header';
import footer from '../footer';


export default class StatsView extends AbstractView {

  constructor(state) {
    super();

    this.state = state;
  }


  _templateBonus(bonus) {
    return (bonus.count === 0) ? `` : `\
      <tr>
        <td></td>
        <td class="result__extra">${bonus.title}</td>
        <td class="result__extra">${bonus.count}&nbsp;<span class="stats__result stats__result--${bonus.name}"></span></td>
        <td class="result__points">×&nbsp;${bonus.points}</td>
        <td class="result__total">${bonus.totalPoints}</td>
      </tr>`;
  }

  _templateTableResults(index, results) {

    let templateTableStat = ``;
    let templateTableExtra = ``;

    if (game.getLivesCount(results) < 0) {

      templateTableStat = `\
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>`;
    } else {

      templateTableStat = `\
        <td class="result__points">×&nbsp;${game.rules.points.correct}</td>
        <td class="result__total">${game.getPoints(results)}</td>`;

      templateTableExtra = `\
        ${game.getExtraPointsList(results).map((item) => this._templateBonus(item)).join(``)}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${game.getTotalPoints(results)}</td>
        </tr>`;
    }

    return `\
      <table class="result__table">
        <tr>
          <td class="result__number">${index}.</td>
          <td colspan="2">
            <ul class="stats">
              ${results.map((result) => {
                return `<li class="stats__result stats__result--${result}"></li>`;
              }).join(``)}
            </ul>
          </td>
          ${templateTableStat}
        </tr>
        ${templateTableExtra}
      </table>`;
  }


  get template() {
    return `\
      ${header()}
      <div class="result">
        <h1>${(this.state.lives >= 0) ? `Победа!` : `Fail`}</h1>
        ${this._templateTableResults(1, this.state.results)}
        ${dataResults.map((results, index) => {
          return this._templateTableResults(index + 2, results);
        }).join(``)}
      </div>
      ${footer()}`;
  }

  bind() {

    const backButton = this.element.querySelector(`.header__back`);

    backButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onBackButtonClick();
    });
  }

  onBackButtonClick() {

  }
}
