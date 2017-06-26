
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

    this._onAnswerChangeHandler = this._onAnswerChangeHandler.bind(this);
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

    const isWarningTime = (time <= rules.warningTime);

    this.gameTimer.textContent = time;
    this.gameTimer.classList.toggle(`game__timer--blink`, isWarningTime);
  }

  _isAnswered() {
    return this.questions.every((question) => {
      return question.some((item) => item.checked);
    });
  }

  _getAnswers() {
    return this.questions.map((question) => {
      return question.find((item) => item.checked).value;
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

  _onAnswerChangeHandler(evt) {

    const name = evt.currentTarget.name;
    const answers = this.gameContent.elements[name];

    for (const answer of answers) {
      answer.disabled = true;
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
        ${(this.data.hasAnswers) ? this._templateAnswer(index + 1) : ``}
      </div>`;
  }


  bind() {

    this.gameTimer = this.element.querySelector(`.game__timer`);
    this.gameContent = this.element.querySelector(`.game__content`);

    if (this.data.hasAnswers) {
      this.questions = this.data.answers.map((answer, index) => {
        return Array.from(this.gameContent.elements[`question${index + 1}`]);
      });
    }


    const gameOptions = this.gameContent.querySelectorAll(`.game__option`);

    Array.from(gameOptions).forEach((option, index) => {

      this._setOptionImage(option, index);

      if (this.data.hasAnswers) {
        for (const it of this.questions[index]) {
          it.addEventListener(`change`, this._onAnswerChangeHandler);
        }
      }

      option.addEventListener(`click`, (evt) => {

        if (this.data.hasAnswers && this._isAnswered()) {
          this.onAnswered(this.gameTime, this._getAnswers());
        }

        if (!this.data.hasAnswers) {
          this.onChosen(this.gameTime, this._getChoice(index));
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
