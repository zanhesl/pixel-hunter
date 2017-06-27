
import {renderScreen} from '../data/data';
import IntroView from '../intro/intro-view';
import StatsView from './stats-view';
import Application from '../application';
import Model from '../model.js';
import statsAdapter from '../models/stats-adapter';


class StatsPresenter {
  constructor(userName, results) {

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


  init() {

    renderScreen(this.view);

    this.model.send(this.results, statsAdapter).then(() => {

      console.log('Start to load stats!');

      this.model.load(statsAdapter).then((stats) => {

        console.log('Finish load!');

        this.view = new StatsView(stats);

        renderScreen(this.view);

        this.view.onBackButtonClick = () => {
          Application.showGreeting();
        };

      }).catch(window.console.error);

    }).catch(window.console.error);
  }
}

export default (args = {name: `Unknown`, results: ``}) => {

  return new StatsPresenter(args.name, args.results.split(`,`));
};
