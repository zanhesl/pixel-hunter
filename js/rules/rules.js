
import RulesView from './rules-view';
import Application from '../application';


class RulesPresenter {
  constructor() {
    this._view = new RulesView();
  }

  get element() {
    return this._view.element;
  }

  destroy() {
    this._view.onContinueButtonClick = null;
    this._view.onBackButtonClick = null;
    this._view.remove();
  }

  show(viewport) {

    this._view.show(viewport);

    this._view.onContinueButtonClick = (userName) => {
      Application.showGame({name: userName});
    };

    this._view.onBackButtonClick = () => {
      Application.showGreeting();
    };
  }
}

export default () => new RulesPresenter();
