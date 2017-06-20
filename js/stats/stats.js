
import {renderScreen} from '../data/data';
import dataResults from '../data/data-results';
import StatsView from './stats-view';
import Application from '../application';


class StatsPresenter {
  constructor(stats) {
    this.view = new StatsView([stats, ...dataResults]);
  }

  init() {

    renderScreen(this.view);

    this.view.onBackButtonClick = () => {
      Application.showGreeting();
    };
  }
}

export default new StatsPresenter();
