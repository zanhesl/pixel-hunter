
import {renderScreen} from '../data/data';
import GreetingView from './greeting-view';
import Application from '../application';


class GreetingPresenter {
  constructor() {
    this.view = new GreetingView();
  }

  init() {

    renderScreen(this.view);

    this.view.onContinueButtonClick = () => {
      Application.showRules();
    };
  }
}

export default GreetingPresenter;
