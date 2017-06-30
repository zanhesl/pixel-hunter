
import IntroView from '../intro/intro-view';
import StatsView from './stats-view';
import Application from '../application';
import Model from '../model.js';
import statsAdapter from '../models/stats-adapter';


class StatsPresenter {
  constructor(userName, lives, results) {

    this._lives = lives;
    this._results = results;

    this._view = new IntroView();

    this._model = new class extends Model {
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
    return this._view.element;
  }

  destroy() {
    this._view.onBackButtonClick = null;
    this._view.remove();
  }

  show(viewport) {

    this._view.show(viewport);

    this._model.send({stats: this._results, lives: this._lives}, statsAdapter).then(() => {

      this._model.load(statsAdapter).then((data) => {

        this._view.remove();

        this._view = new StatsView(data);

        this._view.show(viewport);

        this._view.onBackButtonClick = () => {
          Application.showGreeting();
        };

      }).catch(window.console.error);

    }).catch(window.console.error);
  }
}

export default (args = {name: `Unknown`, lives: 0, results: ``}) => {
  return new StatsPresenter(args.name, args.lives, args.results.split(`,`));
};
