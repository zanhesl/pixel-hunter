
import AbstractView from '../view';
import {rules} from '../data/data';
import header from '../header';
import footer from '../footer';


export default class RulesView extends AbstractView {

  _getUserName(input) {
    return input.value.trim().replace(/[#//]/g, ``);
  }

  get template() {
    return `\
      ${header()}
      <div class="rules">
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай ${rules.levelsCount} раз для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt="">.<br>
          Фотографиями или рисунками могут быть оба изображения.<br>
          На каждую попытку отводится ${rules.gameTime} секунд.<br>
          Ошибиться можно не более ${rules.maxLives} раз.<br>
          <br>
          Готовы?
        </p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </div>
      ${footer()}`;
  }

  bind() {

    const backButton = this.element.querySelector(`.header__back`);
    const rulesForm = this.element.querySelector(`.rules__form`);
    const rulesInput = rulesForm.querySelector(`.rules__input`);

    this.rulesButton = rulesForm.querySelector(`.rules__button`);

    rulesForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      rulesInput.disabled = true;
      this.rulesButton.disabled = true;

      this.onContinueButtonClick(this._getUserName(rulesInput));
    });

    rulesInput.addEventListener(`input`, () => {
      this.rulesButton.disabled = (rulesInput.value.length === 0);
    });

    backButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onBackButtonClick();
    });
  }

  setProgress(progress) {
    this.rulesButton.textContent = `${progress}%`;
  }

  onContinueButtonClick(userName) {

  }

  onBackButtonClick() {

  }
}
