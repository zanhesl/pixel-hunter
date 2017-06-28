
import AbstractView from '../view';
import {rules} from '../data/data';
import {countResults} from '../data/data';
import {getPoints} from '../data/data';
import {getExtraPointsList} from '../data/data';
import {getTotalPoints} from '../data/data';
import dataResults from '../data/data-results';
import header from '../header';
import footer from '../footer';


export default class StatsView extends AbstractView {

  constructor(stats) {
    super();

    this.results = stats[0] || [];
    this.stats = stats;

    this._onBackButtonClickHandler = this._onBackButtonClickHandler.bind(this);
  }

  get template() {
    return `\
      ${header()}
      <div class="result">
        <h1>${(this._isGameFailed(this.results)) ? `Fail` : `Победа!`}</h1>
        ${this.stats.map((results, index) => {
          return this._templateTableResults(index + 1, results);
        }).join(``)}
      </div>
      ${footer()}`;
  }

  _isGameFailed(results) {
    return (rules.maxLives - countResults(results, `wrong`) < 0);
  }

  _templateExtra(extra) {
    return (extra.count === 0) ? `` : `\
      <tr>
        <td></td>
        <td class="result__extra">${extra.label}</td>
        <td class="result__extra">${extra.count}&nbsp;<span class="stats__result stats__result--${extra.key}"></span></td>
        <td class="result__points">×&nbsp;${extra.points}</td>
        <td class="result__total">${extra.total}</td>
      </tr>`;
  }

  _templateTableResults(index, results) {

    let templateTableStat = ``;
    let templateTableExtra = ``;

    if (this._isGameFailed(results)) {

      templateTableStat = `\
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>`;
    } else {

      templateTableStat = `\
        <td class="result__points">×&nbsp;${rules.points.correct}</td>
        <td class="result__total">${getPoints(results)}</td>`;

      templateTableExtra = `\
        ${getExtraPointsList(results).map((item) => this._templateExtra(item)).join(``)}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${getTotalPoints(results)}</td>
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

  _onBackButtonClickHandler(evt) {
    evt.preventDefault();
    this.onBackButtonClick();
  }

  remove() {

    this.backButton.removeEventListener(`click`, this._onBackButtonClickHandler);

    super.remove();
  }

  bind() {

    this.backButton = this.element.querySelector(`.header__back`);

    this.backButton.addEventListener(`click`, this._onBackButtonClickHandler);
  }

  onBackButtonClick() {

  }
}
