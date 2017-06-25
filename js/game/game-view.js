
import AbstractView from '../view';
import {resizeImage} from '../utils';
import {rules} from '../data/data';
import header from './game-header';
import footer from '../footer';


export default class GameView extends AbstractView {

  constructor(state, data) {
    super();

    this.state = state;
    this.data = data;
  }

  _getElements(question) {
    return Array.from(this.gameContent.elements[question]);
  }

  _isAnswered() {
    return this.data.answers.every((answer, index) => {
      return this._getElements(`question${index + 1}`)
        .some((item) => item.checked);
    });
  }

  _hasAnswers() {
    return this.data.hasAnswers;
  }

  _getAnswers() {
    return this.data.answers.map((answer, index) => {
      return this._getElements(`question${index + 1}`)
        .find((item) => item.checked)
        .value;
    });
  }

  _getChoice(optionIndex) {
    return this.data.answers[optionIndex].type;
  }

  _setOptionImage(option, optionIndex) {

    const imgTag = option.querySelector(`img`);
    const image = this.data.answers[optionIndex].image;
    const img = image.img;
    const frame = {width: image.width, height: image.height};

    const actualSize = resizeImage(frame, {
      width: img.naturalWidth,
      height: img.naturalHeight
    });

    img.width = actualSize.width;
    img.height = actualSize.height;
    img.alt = `Option ${optionIndex + 1}`;

    imgTag.parentNode.replaceChild(img, imgTag);
  }

  _templateAnswer(index) {
    return `\
      <label class="game__answer game__answer--photo">
        <input name="question${index}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question${index}" type="radio" value="painting">
        <span>Рисунок</span>
      </label>`;
  }

  _templateOption(index) {
    return `\
      <div class="game__option">
        <img>
        ${(this.data.hasAnswers) ? this._templateAnswer(index + 1) : ``}
      </div>`;
  }


  get template() {
    return `\
      ${header(this.state)}
      <div class="game">
        <p class="game__task">${this.data.question}</p>
        <form class="${this.data.formClass}">
          ${this.data.answers.map((answer, index) => {
            return this._templateOption(index);
          }).join(``)}
        </form>
        <div class="stats">
          <ul class="stats">
            ${this.state.results.map((result) => {
              return `<li class="stats__result stats__result--${result}"></li>`;
            }).join(``)}
          </ul>
        </div>
      </div>
      ${footer()}`;
  }

  get gameTime() {
    return rules.gameTime - parseInt(this.gameTimer.textContent, 10);
  }

  set gameTime(time) {
    this.gameTimer.textContent = time;
  }

  bind() {

    this.gameContent = this.element.querySelector(`.game__content`);
    this.gameTimer = this.element.querySelector(`.game__timer`);

    const gameOptions = this.gameContent.querySelectorAll(`.game__option`);

    Array.from(gameOptions).forEach((option, optionIndex) => {

      this._setOptionImage(option, optionIndex);

      option.addEventListener(`click`, (evt) => {

        if (this._hasAnswers() && this._isAnswered()) {
          this.onAnswered(this.gameTime, this._getAnswers());
        }

        if (!this._hasAnswers()) {
          this.onChosen(this.gameTime, this._getChoice(optionIndex));
        }
      });
    });

    const backButton = this.element.querySelector(`.header__back`);

    backButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onBackButtonClick();
    });
  }

  onAnswered(time, answers) {

  }

  onChosen(time, answer) {

  }

  onBackButtonClick() {

  }
}
