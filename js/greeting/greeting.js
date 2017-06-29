
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
    this.view.onContinueButtonClick = null;
    this.view.remove();
  }

  show(viewport) {

    this.view.show(viewport);

    this.view.onContinueButtonClick = () => {
      Application.showRules();
    };
  }
}

export default () => new GreetingPresenter();
