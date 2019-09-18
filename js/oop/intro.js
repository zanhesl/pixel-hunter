import {AbstractView} from './abstract-view.js';

export class IntroView extends AbstractView {

  template() {
    const currentLevel = this.render(`<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`);

    return currentLevel;
  }

  bind(currentLevel) {
    currentLevel.querySelector(`.intro__asterisk`).addEventListener(`click`, () => {
      this.currentState.change = true;
    });
  }

  get element() {
    const gameTemplate = this.template();
    this.bind(gameTemplate);

    return gameTemplate;
  }

}
