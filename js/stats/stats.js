
import {renderScreen} from '../data/data';
import StatsView from './stats-view';
import Application from '../application';


class StatsPresenter {
  constructor(state) {
    this.state = state;
    this.view = new StatsView(state);
  }

  init() {

    renderScreen(this.view);

    this.view.onBackButtonClick = () => {
      Application.showGreeting();
    };
  }
}

export default StatsPresenter;
