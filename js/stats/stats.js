
import {renderScreen} from '../data/data';
import StatsView from './stats-view';
import Application from '../application';


class StatsPresenter {
  constructor(userName = `Unknown`, results) {
    this.view = new StatsView(userName, results);
  }

  init() {

    renderScreen(this.view);

    this.view.onBackButtonClick = () => {
      Application.showGreeting();
    };
  }
}

export default (userName, ...results) => new StatsPresenter(userName, results);
