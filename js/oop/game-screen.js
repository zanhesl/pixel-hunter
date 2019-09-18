import {HeaderView} from './header.js';
import {FooterView} from './footer.js';
import {switchScreen, switchConditions} from '../screens/change-screen.js';


const ONE_SECOND = 1000;

export class GameScreen {

  constructor(model) {
    this.model = model;
    this.header = new HeaderView(model.state);
    this.content = model.levels[model.state.level];
    this.content.currentState = this.model.state;

    this.root = document.createElement(`div`);
    this.root.classList.add(`root`);
    this.root.appendChild(this.header.element);

    const contentPage = document.createElement(`div`);
    contentPage.classList.add(`content`);

    contentPage.appendChild(this.content.element);
    contentPage.appendChild(new FooterView().element);

    this.root.appendChild(contentPage);

    this._timer = null;
  }

  get element() {
    return this.root;
  }

  init() {
    document.querySelector(`.central`).innerHTML = ``;
    document.querySelector(`.central`).appendChild(this.element);

    this.startGame();
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    const mainHeader = this.root.querySelector(`.header`);
    this.root.replaceChild(header.element, mainHeader);
    this.header = header;
  }

  _tick() {
    this.model.tick();
    this.updateHeader();
    this._timer = setTimeout(() => this._tick(), ONE_SECOND);
  }

  stopGame() {
    clearTimeout(this._timer);
  }

  startGame() {
    this.model.levels[this.model.state.level].currentState = this.model.state;

    document.addEventListener(`click`, () => {
      if (switchConditions(this.model.state)) {
        this.stopGame();
        this.model.state.time = 0;

        this.changeLevel();
        this.startGame();
      }
    });
    this._tick();
  }

  changeContentView(view) {
    this.root.querySelector(`.content`).innerHTML = ``;
    this.root.querySelector(`.content`).appendChild(view.element);
    this.content = view;

    document.querySelector(`.central`).innerHTML = ``;
    document.querySelector(`.central`).appendChild(this.element);
  }

  changeLevel() {
    switchScreen(this.model.state);
    const level = this.model.levels[this.model.state.level];
    level.currentState = this.model.state;
    this.updateHeader();
    this.changeContentView(level);
  }
}
