
import IntroView from '../intro/intro-view';
import StatsView from './stats-view';
import Application from '../application';
import Model from '../model.js';
import statsAdapter from '../models/stats-adapter';


class StatsPresenter {
  constructor(userName, lives, results) {

    this.lives = lives;
    this.results = results;

    this.view = new IntroView();

    this.model = new class extends Model {
      constructor(name) {
        super();

        this._username = name;
      }

      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${this._username}`;
      }

      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${this._username}`;
      }
    }(userName);
  }

  get element() {
    return this.view.element;
  }

  destroy() {
    this.view.onBackButtonClick = null;
    this.view.remove();
  }

  show(viewport) {

    this.view.show(viewport);
/*
    this.model.send({stats: this.results, lives: this.lives}, statsAdapter).then(() => {
      this.model.load(statsAdapter).then((stats) => {

        this.view.remove();
        this._showStatsView(stats);

      }).catch(window.console.error);
    }).catch(window.console.error);*/
  }

  _showStatsView(stats) {

    this.view = new StatsView(stats);

    this.view.show(viewport);

    this.view.onBackButtonClick = () => {
      Application.showGreeting();
    };
  }
}

export default (args = {name: `Unknown`, lives: 0, results: ``}) => {
  return new StatsPresenter(args.name, args.lives, args.results.split(`,`));
};
