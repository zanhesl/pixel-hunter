
import GreetingView from './greeting-view';
import Application from '../application';


class GreetingPresenter {
  constructor() {
    this._view = new GreetingView();
  }

  get element() {
    return this._view.element;
  }

  destroy() {
    this._view.onContinueButtonClick = null;
    this._view.remove();
  }

  show(viewport) {

    this._view.show(viewport);

    this._view.onContinueButtonClick = () => {
      Application.showRules();
    };
  }
}

export default () => new GreetingPresenter();
