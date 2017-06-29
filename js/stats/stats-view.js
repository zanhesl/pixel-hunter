
import AbstractView from '../view';
import {rules} from '../data/data';
import {getPoints} from '../data/data';
import {getExtraPoints} from '../data/data';
import {getTotalPoints} from '../data/data';
import header from '../header';
import footer from '../footer';


export default class StatsView extends AbstractView {

  constructor(data) {
    super();

    this._data = data;
    this.CURRENT_USER_ID = 0;

    this._onBackButtonClickHandler = this._onBackButtonClickHandler.bind(this);
  }

  get template() {
    return `\
      ${header()}
      <div class="result">
        <h1>${this._isGameFailed(this.CURRENT_USER_ID) ? `Fail` : `Победа!`}</h1>
        ${this._data.map((item, index) => {
          return this._templateStatsItem(item, index);
        }).join(``)}
      </div>
      ${footer()}`;
  }

  _isGameFailed(userID) {
    return (this._data[userID].lives === 0);
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

  _templateStatsItem(data, index) {

    let templateTableStat = ``;
    let templateTableExtra = ``;

    if (this._isGameFailed(index)) {

      templateTableStat = `\
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>`;
    } else {

      templateTableStat = `\
        <td class="result__points">×&nbsp;${rules.points.correct}</td>
        <td class="result__total">${getPoints(data.stats)}</td>`;

      templateTableExtra = `\
        ${getExtraPoints(data).map((item) => this._templateExtra(item)).join(``)}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${getTotalPoints(data)}</td>
        </tr>`;
    }

    return `\
      <table class="result__table">
        <tr>
          <td class="result__number">${index + 1}.</td>
          <td colspan="2">
            <ul class="stats">
              ${data.stats.map((result) => {
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

    this._backButton.removeEventListener(`click`, this._onBackButtonClickHandler);

    super.remove();
  }

  bind() {

    this._backButton = this.element.querySelector(`.header__back`);

    this._backButton.addEventListener(`click`, this._onBackButtonClickHandler);
  }

  onBackButtonClick() {

  }
}
