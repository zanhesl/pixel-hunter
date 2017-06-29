
import AbstractView from '../view';
import {resizeImage} from '../utils';
import {rules} from '../data/data';
import header from './game-header';
import footer from '../footer';


export default class GameView extends AbstractView {

  constructor(state, data) {
    super();

    this._state = state;

    this._question = data.question;
    this._answers = data.answers;
    this._formClass = data.formClass;
    this._hasAnswers = data.hasAnswers;

    this._onAnswerChangeHandler = this._onAnswerChangeHandler.bind(this);
    this._onOptionClickHandler = this._onOptionClickHandler.bind(this);
    this._onBackButtonClickHandler = this._onBackButtonClickHandler.bind(this);
  }


  get template() {
    return `\
      ${header(this._state)}
      <div class="game">
        <p class="game__task">${this._question}</p>
        <form class="${this._formClass}">
          ${this._answers.map((answer, index) => {
            return this._templateOption(index);
          }).join(``)}
        </form>
        <div class="stats">
          <ul class="stats">
            ${this._state.results.map((result) => {
              return `<li class="stats__result stats__result--${result}"></li>`;
            }).join(``)}
          </ul>
        </div>
      </div>
      ${footer()}`;
  }

  get gameTime() {
    return parseInt(this._gameTimer.textContent, 10);
  }

  set gameTime(time) {

    const isWarningTime = (time <= rules.warningTime);

    this._gameTimer.textContent = time;
    this._gameTimer.classList.toggle(`game__timer--blink`, isWarningTime);
  }

  _isAnswered() {
    return this._questions.every((question) => {
      return question.some((item) => item.checked);
    });
  }

  _getAnswers() {
    return this._questions.map((question) => {
      return question.find((item) => item.checked).value;
    });
  }

  _getChoice(optionIndex) {
    return this._answers[optionIndex].type;
  }

  _setOptionImage(option, optionIndex) {

    const image = this._answers[optionIndex].image;
    const frame = {width: image.width, height: image.height};

    const actualSize = resizeImage(frame, {
      width: image.tag.naturalWidth,
      height: image.tag.naturalHeight
    });

    image.tag.width = actualSize.width;
    image.tag.height = actualSize.height;
    image.tag.alt = `Option ${optionIndex + 1}`;

    const tag = option.querySelector(`img`);
    tag.parentNode.replaceChild(image.tag, tag);
  }

  _addAnswerChangeHandlers() {
    for (const question of this._questions) {
      for (const element of question) {
        element.addEventListener(`change`, this._onAnswerChangeHandler);
      }
    }
  }

  _removeAnswerChangeHandlers() {
    for (const question of this._questions) {
      for (const element of question) {
        element.removeEventListener(`change`, this._onAnswerChangeHandler);
      }
    }
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
        ${(this._hasAnswers) ? this._templateAnswer(index + 1) : ``}
      </div>`;
  }

  _onAnswerChangeHandler(evt) {

    const name = evt.currentTarget.name;
    const answers = this._gameContent.elements[name];

    for (const answer of answers) {
      answer.disabled = true;
    }

    if (this._isAnswered()) {
      this.onAnswered(this.gameTime, this._getAnswers());
    }
  }

  _onOptionClickHandler(evt) {

    const LEFT_MOUSE_BUTTON = 1;

    if (evt.which !== LEFT_MOUSE_BUTTON) {
      return;
    }

    if (!this._hasAnswers) {

      const index = Array.from(this._gameOptions).indexOf(evt.currentTarget);

      this.onChosen(this.gameTime, this._getChoice(index));
    }
  }

  _onBackButtonClickHandler(evt) {
    evt.preventDefault();
    this.onBackButtonClick();
  }

  remove() {

    if (this._hasAnswers) {
      this._removeAnswerChangeHandlers();
    }

    for (const option of this._gameOptions) {
      option.removeEventListener(`mouseup`, this._onOptionClickHandler);
    }

    this._backButton.removeEventListener(`click`, this._onBackButtonClickHandler);

    super.remove();
  }

  bind() {

    this._backButton = this.element.querySelector(`.header__back`);
    this._gameTimer = this.element.querySelector(`.game__timer`);
    this._gameContent = this.element.querySelector(`.game__content`);
    this._gameOptions = this._gameContent.querySelectorAll(`.game__option`);

    this._questions = this._answers.map((answer, index) => {
      return Array.from(this._gameContent.elements[`question${index + 1}`] || []);
    });


    let optionIndex = 0;

    for (const option of this._gameOptions) {

      const index = optionIndex++;

      this._setOptionImage(option, index);

      if (this._hasAnswers) {
        this._addAnswerChangeHandlers();
      }

      option.addEventListener(`mouseup`, this._onOptionClickHandler, true);
    }

    this._backButton.addEventListener(`click`, this._onBackButtonClickHandler);
  }

  onAnswered(time, answers) {

  }

  onChosen(time, answer) {

  }

  onBackButtonClick() {

  }
}
