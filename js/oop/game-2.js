import {stats} from '../screens/stats.js';
import {AbstractView} from './abstract-view.js';
import {lifeChange} from '../data/life-handle.js';
// import {gameState} from '../screens/data.js';


export class Game2View extends AbstractView {
  constructor(img, answers) {
    super();
    this.img = img;
    this.answers = answers;
  }

  template(currentState) {
    const currentLevel = this.render(`<p class="game__task">Угадайте, фото или рисунок?</p>
    <form class="game__content game__content--wide">
    </form>`);

    const answerBody = this.render(
        `<div class="game__option">
        ${this.img}
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`);
    currentLevel.querySelector(`form`).appendChild(answerBody);

    const gameTemplate = document.createElement(`div`);
    gameTemplate.classList.add(`game`);
    gameTemplate.appendChild(currentLevel);
    gameTemplate.appendChild(this.render(stats(currentState.answers)));

    return gameTemplate;
  }

  bind(currentLevel, currentState) {
    const answerBody = currentLevel.querySelector(`.game__option`);
    let userAnswers = {};

    answerBody.querySelector(`.game__answer--photo`).addEventListener(`click`,
        (evt) => {
          userAnswers = Array.from(this.answers).filter((elem) => elem.name === `photo`)[0];
          userAnswers.time = currentState.time;
        });

    answerBody.querySelector(`.game__answer--paint`).addEventListener(`click`,
        (evt) => {
          userAnswers = Array.from(this.answers).filter((elem) => elem.name === `picture`)[0];
          userAnswers.time = currentState.time;
        });

    // const returnHeader = currentLevel.querySelector(`header`);
    // returnHeader.querySelector(`.back`).addEventListener(`click`, () => {
    //   userAnswers = {};
    //   this.currentState = Object.assign({}, gameState);
    //   this.currentState.change = true;
    //   document.removeEventListener(`click`, changeScreen);
    // });

    const changeScreen = () => {
      const checkedButtons = document.querySelectorAll(`input:checked`);
      if (checkedButtons.length === 1) {
        currentState.answers.push(userAnswers);
        lifeChange(userAnswers, this.currentState);
        currentState.change = true;
        document.removeEventListener(`click`, changeScreen);
      }
    };

    document.addEventListener(`click`, changeScreen);
  }

  get element() {
    const gameTemplate = this.template(this.currentState);
    this.bind(gameTemplate, this.currentState);

    return gameTemplate;
  }
}
