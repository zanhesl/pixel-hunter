
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
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${options.map((option, index) => templateGameOption(option, index + 1)).join(``) }
    </form>
    <div class="stats">
      ${stats(state.results)}
    </div>
  </div>`;

const template = (state, options) => `\
  ${ingameHeader(state)}
  ${templateGame(state, options)}
  ${footer()}`;

const questions = [`question1`, `question2`];
const IMG_WIDTH = 468;
const IMG_HEIGHT = 458;


export default (state, options) => {

  const element = utils.getScreenFromTemplate(template(state, options));

  const gameContent = element.querySelector(`.game__content`);


  utils.loadImages(gameContent, IMG_WIDTH, IMG_HEIGHT);

  const isAnswered = (question) => {
    return Array.from(gameContent.elements[question])
      .some((answer) => answer.checked);
  };


  gameContent.addEventListener(`click`, () => {
    if (questions.every((question) => isAnswered(question))) {
      game.renderNextLevel(state);
    }
  });


  const backButton = element.querySelector(`.header__back`);

  backButton.addEventListener(`click`, () => {
    game.reset();
  });

  return element;
};
