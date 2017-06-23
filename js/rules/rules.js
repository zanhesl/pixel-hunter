
import {renderScreen} from '../data/data';
import RulesView from './rules-view';
import Application from '../application';
import Levels from '../data/data-levels';


class RulesPresenter {
  constructor() {
    this.view = new RulesView();
  }

  init() {

    renderScreen(this.view);

    this.view.onContinueButtonClick = (userName) => {

      Levels.onLoad = () => {
        Application.showGame([userName]);
      };

      Levels.onProgress = (progress) => {
        this.view.setProgress(Math.round(progress));
      };

      Levels.load();
    };

    this.view.onBackButtonClick = () => {
      Application.showGreeting();
    };
  }
}

export default () => new RulesPresenter();
