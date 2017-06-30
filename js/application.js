
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
  constructor() {

    this._viewport = document.getElementById(`main`);

    this._presenter = introPresenter();

    this._routes = {
      [PresenterID.GREETING]: greetingPresenter,
      [PresenterID.RULES]: rulesPresenter,
      [PresenterID.GAME]: gamePresenter,
      [PresenterID.STATS]: statsPresenter,
    };

    this._render = {
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

    const newPresenter = this._routes[hash.route](hash.args);
    const renderFunction = this._render[hash.route];

    renderFunction(this._presenter, newPresenter, this._viewport);

    this._presenter = newPresenter;
  }

  _renderScreen(oldPresenter, newPresenter, viewport) {
    newPresenter.show(viewport);
    oldPresenter.destroy();
  }

  _renderFadeAnimationScreen(oldPresenter, newPresenter, viewport) {

    viewport.classList.add(`main--stack-screens`);

    const onElementAnimationEnd = () => {

      viewport.classList.remove(`main--animate-screens`);
      viewport.classList.remove(`main--stack-screens`);

      oldPresenter.element.removeEventListener(`animationend`, onElementAnimationEnd);

      oldPresenter.destroy();
    };

    oldPresenter.element.addEventListener(`animationend`, onElementAnimationEnd);

    newPresenter.show(viewport);

    viewport.classList.add(`main--animate-screens`);
  }

  init() {
    this._presenter.show(this._viewport);
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

const instance = new Application();

export default instance;
