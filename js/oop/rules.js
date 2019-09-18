import {AbstractView} from './abstract-view.js';
import {gameState} from '../screens/data.js';


export class RulesView extends AbstractView {

  template(currentState) {
    const currentLevel = this.render(`<div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>`);

    return currentLevel;
  }

  bind(currentLevel, currentState) {
    const goButton = currentLevel.querySelector(`.rules__button`);
    const nameField = currentLevel.querySelector(`.rules__input`);

    nameField.addEventListener(`input`, (evt) => {
      evt.preventDefault();
      if (nameField.value) {
        goButton.disabled = false;
      } else {
        goButton.disabled = true;
      }
    });

    goButton.addEventListener(`click`, () => {
      currentState.change = true;
    });
  }

  get element() {
    const gameTemplate = this.template(this.currentState);
    this.bind(gameTemplate, this.currentState);

    return gameTemplate;
  }
}
