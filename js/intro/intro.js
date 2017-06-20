
import {renderScreen} from '../data/data';
import IntroView from './intro-view';
import Application from '../application';


class IntroPresenter {
  constructor() {
    this.view = new IntroView();
  }

  init() {

    renderScreen(this.view);

    this.view.onContinueButtonClick = () => {
      Application.showGreeting();
    };
  }
}

export default new IntroPresenter();
