

import IntroPresenter from './intro/intro';
import GreetingPresenter from './greeting/greeting';
import RulesPresenter from './rules/rules';
import GamePresenter from './game/game';
import StatsPresenter from './stats/stats';


const PresenterID = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};


class Application {
  constructor() {
    this.routes = {
      [PresenterID.INTRO]: IntroPresenter,
      [PresenterID.GREETING]: GreetingPresenter,
      [PresenterID.RULES]: RulesPresenter,
      [PresenterID.GAME]: GamePresenter,
      [PresenterID.STATS]: StatsPresenter
    };

    window.onhashchange = () => {
      this._changePresenter(this._parseLocationHash());
    };
  }

  _parseLocationHash() {

    const hashArgs = location.hash.replace(`#`, ``).split(`/`);

    return {
      route: hashArgs[0] || ``,
      args: hashArgs.slice(1)
    };
  }

  _setLocationHash(hash) {

    const route = (hash && hash.route) || ``;
    const args = hash && hash.args && hash.args.map((arg) => `/${arg}`).join(``);

    location.hash = `${route}${(route && args) || ``}`;
  }

  _changePresenter(hash) {
    this.routes[hash.route](...hash.args).init();
  }

  init() {
    this._changePresenter(this._parseLocationHash());
  }

  showIntro() {
    this._setLocationHash({route: PresenterID.INTRO});
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

instance.init();

export default instance;
