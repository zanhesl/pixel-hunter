
import AbstractView from '../view';
import {rules} from '../data/data';
import header from '../header';
import footer from '../footer';


export default class RulesView extends AbstractView {
  constructor() {
    super();

    this._onInputChangeHandler = this._onInputChangeHandler.bind(this);
    this._onContinueButtonClickHandler = this._onContinueButtonClickHandler.bind(this);
    this._onBackButtonClickHandler = this._onBackButtonClickHandler.bind(this);
  }

  get template() {
    return `\
      ${header()}
      <div class="rules">
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай ${rules.levelsCount} раз для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt="">.<br>
          Фотографиями или рисунками могут быть оба изображения.<br>
          На каждую попытку отводится ${rules.gameTime} секунд.<br>
          Ошибиться можно не более ${rules.maxLives} раз.<br>
          <br>
          Готовы?
        </p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </div>
      ${footer()}`;
  }

  _getUserName() {
    return this._rulesInput.value.replace(/[#//]/g, ``).trim();
  }

  _onInputChangeHandler() {
    this._rulesButton.disabled = (this._getUserName().length === 0);
  }

  _onContinueButtonClickHandler(evt) {
    evt.preventDefault();

    this._rulesInput.disabled = true;
    this._rulesButton.disabled = true;

    this.onContinueButtonClick(this._getUserName());
  }

  _onBackButtonClickHandler(evt) {
    evt.preventDefault();
    this.onBackButtonClick();
  }

  remove() {
    this._rulesInput.removeEventListener(`input`, this._onInputChangeHandler);
    this._rulesForm.removeEventListener(`submit`, this._onContinueButtonClickHandler);
    this._backButton.removeEventListener(`click`, this._onBackButtonClickHandler);
    super.remove();
  }

  bind() {

    this._backButton = this.element.querySelector(`.header__back`);
    this._rulesForm = this.element.querySelector(`.rules__form`);

    this._rulesInput = this._rulesForm.querySelector(`.rules__input`);
    this._rulesButton = this._rulesForm.querySelector(`.rules__button`);

    this._rulesInput.addEventListener(`input`, this._onInputChangeHandler);
    this._rulesForm.addEventListener(`submit`, this._onContinueButtonClickHandler);
    this._backButton.addEventListener(`click`, this._onBackButtonClickHandler);
  }

  onContinueButtonClick(userName) {

  }

  onBackButtonClick() {

  }
}
