
import * as utils from './utils';
import * as game from './game';

import ingameHeader from './ingame-header';
import stats from './ingame-stats';
import footer from './footer';


const templateGameOption = (option, index) => `\
  <div class="game__option">
    <img alt="Option ${index}" data-src="${option.src}">
    <label class="game__answer game__answer--photo">
      <input name="question${index}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input name="question${index}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;

const templateGame = (state, options) => `\
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
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

const IMG_WIDTH = 705, IMG_HEIGHT = 455;


export default (state, options) => {

  const element = utils.getScreenFromTemplate(template(state, options));

  const backButton = element.querySelector(`.header__back`);
  const gameContent = element.querySelector(`.game__content`);
  const gameTimer = element.querySelector(`.game__timer`);

  const questions = options.map((option, index) => `question${index + 1}`);

  const getElements = (question) => {
    return Array.from(gameContent.elements[question]);
  };

  const isAnswered = (question) => {
    return getElements(question).some((item) => item.checked);
  };


  gameContent.addEventListener(`click`, () => {

    if (questions.every((question) => isAnswered(question))) {

      const answers = options.map((option, index) => {
        return getElements(`question${index + 1}`)
          .find((item) => item.checked)
          .value === option.answer;
      });

      const levelTime = game.rules.levelTime - parseInt(gameTimer.textContent);
      const levelPassed = answers.every((answer) => answer);

      game.finishLevel(state, levelTime, levelPassed);
    }
  });

  backButton.addEventListener(`click`, () => game.reset());

  utils.uploadImages(gameContent, IMG_WIDTH, IMG_HEIGHT, () => {
    game.startLevel(state, (timerTiks) => {
      gameTimer.textContent = timerTiks;
    });
  });

  return element;
};
