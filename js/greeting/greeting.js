
import {renderScreen} from '../data/data';
import GreetingView from './greeting-view';
import Application from '../application';


class GreetingPresenter {
  constructor() {
    this.view = new GreetingView();
  }

  get element() {
    return this.view.element;
  }

  destroy() {
    this.view.remove();
  }

  showView(viewport) {

    this.view.show(viewport);

    this.view.onContinueButtonClick = () => {
      Application.showRules();
    };
  }
}

export default () => new GreetingPresenter();;
