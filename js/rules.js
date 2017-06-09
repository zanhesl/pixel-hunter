
import * as utils from './utils';
import * as game from './game';

import header from './header';
import footer from './footer';


const templateRules = (rules) => `\
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай ${rules.numberOfLevels} раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится ${rules.timePerLevel} секунд.<br>
      Ошибиться можно не более ${rules.maxLives} раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>`;

const template = (rules) => `\
  ${header()}
  ${templateRules(rules)}
  ${footer()}`;


export default () => {

  const element = utils.getScreenFromTemplate(template(game.rules));

  const rulesForm = element.querySelector(`.rules__form`);
  const rulesInput = rulesForm.querySelector(`.rules__input`);
  const rulesButton = rulesForm.querySelector(`.rules__button`);
  const backButton = element.querySelector(`.header__back`);


  rulesForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    game.start(rulesInput.value);
  });

  rulesInput.addEventListener(`input`, () => {
    rulesButton.disabled = (rulesInput.value.length === 0);
  });

  backButton.addEventListener(`click`, () => {
    game.reset();
  });

  return element;
};
