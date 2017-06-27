
import gameModel from './models/game-model';
import introPresenter from './intro/intro';
import greetingPresenter from './greeting/greeting';
import rulesPresenter from './rules/rules';
import gamePresenter from './game/game';
import statsPresenter from './stats/stats';


const PresenterID = {
  GREETING: ``,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};


class Application {
  constructor(viewport) {

    this.viewport = viewport;

    this.routes = {
      [PresenterID.GREETING]: greetingPresenter,
      [PresenterID.RULES]: rulesPresenter,
      [PresenterID.GAME]: gamePresenter,
      [PresenterID.STATS]: statsPresenter,
    };

    this.render = {
      [PresenterID.GREETING]: this._renderFadeAnimationScreen,
      [PresenterID.RULES]: this._renderScreen,
      [PresenterID.GAME]: this._renderScreen,
      [PresenterID.STATS]: this._renderScreen,
    };

    window.onhashchange = () => {
      this._changePresenter(this._parseLocationHash());
    };

    gameModel.load()
      .then(() => this._changePresenter(this._parseLocationHash()))
      .catch(window.console.error);
  }

  _parseLocationHash() {

    const hashArgs = location.hash.replace(`#`, ``).split(`?`);
    const route = hashArgs[0] || ``;
    const params = (hashArgs[1] && hashArgs[1].split(`&`)) || [];

    const args = params.reduce((obj, param) => {

      const arg = param.split(`=`);
      const argKey = arg[0] || ``;
      const argValue = arg[1] || ``;

      obj[argKey] = argValue;

      return obj;
    }, {});

    return {route, args};
  }

  _setLocationHash(hash) {

    const route = (hash && hash.route) || ``;

    const args = hash && hash.args && Object.keys(hash.args).map((key) => {
      return `${key}=${hash.args[key]}`;
    }).join(`&`);

    location.hash = `${route}${(route && args) ? `?${args}` : ``}`;
  }

  _changePresenter(hash) {

    const newPresenter = this.routes[hash.route](hash.args);
    const renderFunction = this.render[hash.route];

    renderFunction(this.presenter, newPresenter, this.viewport);

    this.presenter = newPresenter;
  }

  _renderScreen(oldPresenter, newPresenter, viewport) {
    newPresenter.showView(viewport);
    oldPresenter.destroy();
  }

  _renderFadeAnimationScreen(oldPresenter, newPresenter, viewport) {

    viewport.classList.add(`main--stack-screens`);

    oldPresenter.element.addEventListener("animationend", () => {

      viewport.classList.remove(`main--animate-screens`);
      viewport.classList.remove(`main--stack-screens`);
      oldPresenter.destroy();
    });

    newPresenter.showView(viewport);

    viewport.classList.add(`main--animate-screens`);
  }

  showIntro() {
    this.presenter = introPresenter();
    this.presenter.showView(this.viewport);
  }

  showGreeting() {
    this._setLocationHash({route: PresenterID.GREETING});
  }

  showRules() {
    this._setLocationHash({route: PresenterID.RULES});
  }

  showGame(args) {
    this._setLocationHash({route: PresenterID.GAME, args});
  }

  showStats(args) {
    this._setLocationHash({route: PresenterID.STATS, args});
  }
}

const viewport = document.getElementById(`main`);

const instance = new Application(viewport);

export default instance;
