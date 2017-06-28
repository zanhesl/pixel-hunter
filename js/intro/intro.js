
import IntroView from './intro-view';


class IntroPresenter {
  constructor() {
    this.view = new IntroView();
  }

  get element() {
    return this.view.element;
  }

  destroy() {
    this.view.remove();
  }

  show(viewport) {
    this.view.show(viewport);
  }
}

export default () => new IntroPresenter();
