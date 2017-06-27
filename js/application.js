
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

    this.showIntro();

    this.routes = {
      [PresenterID.GREETING]: greetingPresenter,
      [PresenterID.RULES]: rulesPresenter,
      [PresenterID.GAME]: gamePresenter,
      [PresenterID.STATS]: statsPresenter
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
    //this.presenter.destroy();
    //let previous = this.presenter;
    this.presenter = this.routes[hash.route](hash.args);
    this.presenter.init();
  }


  showIntro() {
    introPresenter().init();
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
