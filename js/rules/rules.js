
import {renderScreen} from '../data/data';
import RulesView from './rules-view';
import Application from '../application';


class RulesPresenter {
  constructor() {
    this.view = new RulesView();
  }

  init() {

    renderScreen(this.view);

    this.view.onContinueButtonClick = (userName) => {
      Application.showGame({name: userName});
    };

    this.view.onBackButtonClick = () => {
      Application.showGreeting();
    };
  }
}

export default () => new RulesPresenter();
