
import * as utils from './utils';
import * as game from './game';
import * as data from './data';

import header from './ingame-header';
import stats from './ingame-stats';
import footer from './footer';

import greetingScreen from './greeting';
import gameThreeScreen from './ingame-task-3';


const templateGame = (data) => `\
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      ${stats(data.state.results)}
    </div>
  </div>`;

const template = (data) => `\
  ${header(data.state)}
  ${templateGame(data)}
  ${footer()}`;

const element = utils.getScreenFromTemplate(template(data));

const gameContent = element.querySelector(`.game__content`);
const questions = [`question1`];
const backButton = element.querySelector(`.header__back`);


function isAnswered(question) {

  const answers = gameContent.elements[question];

  return Array.from(answers).some((answer) => answer.checked);
}


gameContent.addEventListener(`click`, () => {

  if (questions.every((question) => isAnswered(question))) {
    game.renderScreen(gameThreeScreen);
  }
});

backButton.addEventListener(`click`, () => {
  game.renderScreen(greetingScreen);
});


export default element;
