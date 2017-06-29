
import RulesView from './rules-view';
import Application from '../application';


class RulesPresenter {
  constructor() {
    this.view = new RulesView();
  }

  get element() {
    return this.view.element;
  }

  destroy() {
    this.view.onContinueButtonClick = null;
    this.view.onBackButtonClick = null;
    this.view.remove();
  }

  show(viewport) {

    this.view.show(viewport);

    this.view.onContinueButtonClick = (userName) => {
      Application.showGame({name: userName});
    };

    this.view.onBackButtonClick = () => {
      Application.showGreeting();
    };
  }
}

export default () => new RulesPresenter();
