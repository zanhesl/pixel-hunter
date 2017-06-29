
import IntroView from './intro-view';


class IntroPresenter {
  constructor() {
    this._view = new IntroView();
  }

  get element() {
    return this._view.element;
  }

  destroy() {
    this._view.remove();
  }

  show(viewport) {
    this._view.show(viewport);
  }
}

export default () => new IntroPresenter();
