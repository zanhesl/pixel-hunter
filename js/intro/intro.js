
import {renderScreen} from '../data/data';
import IntroView from './intro-view';


class IntroPresenter {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    renderScreen(this.view);
  }
}

const instance = new IntroPresenter();

export default () => instance;
