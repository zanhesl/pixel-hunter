
import * as utils from './utils';
import * as game from './game';
import * as data from './data';

import header from './ingame-header';
import stats from './ingame-stats';
import footer from './footer';

import greetingScreen from './greeting';
import gameTwoScreen from './ingame-task-2';


const templateGameOption = (index, img) => `\
  <div class="game__option">
    <img src="${img}" alt="Option ${index}" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input name="question${index}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input name="question${index}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;

const templateGame = (options) => `\
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
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
const questions = [`question1`, `question2`];
const backButton = element.querySelector(`.header__back`);


function isAnswered(question) {

  const answers = gameContent.elements[question];

  return Array.from(answers).some((answer) => answer.checked);
}


gameContent.addEventListener(`click`, () => {

  if (questions.every((question) => isAnswered(question))) {
    game.renderScreen(gameTwoScreen);
  }
});

backButton.addEventListener(`click`, () => {
  game.renderScreen(greetingScreen);
});


export default element;
