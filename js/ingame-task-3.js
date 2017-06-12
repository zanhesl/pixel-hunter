
import * as utils from './utils';
import * as game from './game';

import ingameHeader from './ingame-header';
import stats from './ingame-stats';
import footer from './footer';


const templateGameOption = (option, index) => `\
  <div class="game__option">
    <img alt="Option ${index}" data-src="${option.src}" >
  </div>`;

const templateGame = (state, options) => `\
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${options.map((option, index) => templateGameOption(option, index + 1)).join(``)}
    </form>
    <div class="stats">
      ${stats(state.results)}
    </div>
  </div>`;

const template = (state, options) => `\
  ${ingameHeader(state)}
  ${templateGame(state, options)}
  ${footer()}`;

const IMG_WIDTH = 304, IMG_HEIGHT = 455;


export default (state, options) => {

  const element = utils.getScreenFromTemplate(template(state, options));

  const backButton = element.querySelector(`.header__back`);
  const gameContent = element.querySelector(`.game__content`);
  const gameAnswers = gameContent.querySelectorAll(`.game__option`);
  const gameTimer = element.querySelector(`.game__timer`);


  Array.from(gameAnswers).forEach((answer, index) => {
    answer.addEventListener(`click`, () => {

      const levelTime = game.rules.levelTime - parseInt(gameTimer.textContent);
      const levelPassed = options[index].answer === `paint`;

      game.finishLevel(state, levelTime, levelPassed);
    });
  });

  backButton.addEventListener(`click`, () => game.reset());

  utils.uploadImages(gameContent, IMG_WIDTH, IMG_HEIGHT, () => {
    game.startLevel(state, (timerTiks) => {
      gameTimer.textContent = timerTiks;
    });
  });

  return element;
};
