import {stats} from '../screens/stats.js';
import {AbstractView} from './abstract-view.js';
import {lifeChange} from '../data/life-handle.js';


export class Game1View extends AbstractView {
  constructor(questions) {
    super();
    this.questions = questions;
  }

  template(currentState) {
    const currentLevel = this.render(`<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
    </form>`);
    for (let question of this.questions) {
      const answerBody = this.render(
          `<div class="game__option">
        ${question.img}
        <label class="game__answer game__answer--photo">
          <input name="question${question.index}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${question.index}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`);
      currentLevel.querySelector(`form`).appendChild(answerBody);
    }

    const gameTemplate = document.createElement(`div`);
    gameTemplate.classList.add(`game`);
    gameTemplate.appendChild(currentLevel);
    gameTemplate.appendChild(this.render(stats(currentState.answers)));

    return gameTemplate;
  }

  bind(currentLevel, currentState) {
    const answerButtons = currentLevel.querySelectorAll(`.game__option`);
    let userAnswers = [];

    for (let i = 0; i < answerButtons.length; i++) {
      const answerBody = answerButtons[i];
      answerBody.querySelector(`.game__answer--photo`).addEventListener(`click`,
          (evt) => {

            userAnswers[i] = Array.from(this.questions[i].answers).filter((elem) => elem.name === `photo`)[0];
            userAnswers[i].time = currentState.time;
          });

      answerBody.querySelector(`.game__answer--paint`).addEventListener(`click`,
          (evt) => {
            userAnswers[i] = Array.from(this.questions[i].answers).filter((elem) => elem.name === `picture`)[0];
            userAnswers[i].time = currentState.time;
          });
    }

    const changeScreen = () => {
      const checkedButtons = document.querySelectorAll(`input:checked`);
      if (checkedButtons.length === 2) {
        currentState.answers.push(...userAnswers);
        for (let userAnswer of userAnswers) {
          lifeChange(userAnswer, currentState);
        }
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
