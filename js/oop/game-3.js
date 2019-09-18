import {stats} from '../screens/stats.js';
import {AbstractView} from './abstract-view.js';
import {lifeChange} from '../data/life-handle.js';
// import {gameState} from '../screens/data.js';


export class Game3View extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }

  template(currentState) {
    const currentLevel = this.render(`<p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
    </form>`);
    for (let answer of Array.from(this.answers)) {
      const answerBody = this.render(answer.content);
      answerBody.querySelector(`div`).addEventListener(`click`, () => {
        answer.time = currentState.time;
        currentState.answers.push(answer);
        lifeChange(answer, currentState);
        currentState.change = true;
      });
      currentLevel.querySelector(`form`).appendChild(answerBody);
    }

    // const returnHeader = currentLevel.querySelector(`header`);
    // returnHeader.querySelector(`.back`).addEventListener(`click`, () => {
    //   currentState = Object.assign({}, gameState);
    //   currentState.change = true;
    // });

    const gameTemplate = document.createElement(`div`);
    gameTemplate.classList.add(`game`);
    gameTemplate.appendChild(currentLevel);
    gameTemplate.appendChild(this.render(stats(currentState.answers)));

    return gameTemplate;
  }


  get element() {
    const gameTemplate = this.template(this.currentState);
    this.bind(gameTemplate, this.currentState);

    return gameTemplate;
  }
}
