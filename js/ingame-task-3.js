
import * as utils from './utils';
import * as game from './game';
import * as data from './data';

import header from './ingame-header';
import stats from './ingame-stats';
import footer from './footer';

import statsScreen from './stats';
import greetingScreen from './greeting';


const templateGame = (data) => `\
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
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
const gameAnswers = gameContent.querySelectorAll(`.game__option`);
const backButton = element.querySelector(`.header__back`);


Array.from(gameAnswers).forEach((answer) => {
  answer.addEventListener(`click`, () => {
    game.renderScreen(statsScreen);
  });
});


backButton.addEventListener(`click`, () => {
  game.renderScreen(greetingScreen);
});


export default element;
