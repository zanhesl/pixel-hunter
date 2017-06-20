
import {renderScreen} from '../data/data';
import {state} from '../data/data';
import RulesView from './rules-view';
import Application from '../application';
import {loadLevels} from '../data/data-levels';
import {getLevel} from '../data/data-levels';

class RulesPresenter {
  constructor() {
    this.view = new RulesView();
  }

  init() {

    renderScreen(this.view);

    this.view.onContinueButtonClick = (userName) => {

      loadLevels((levels) => {

        Application.showGame(Object.assign({}, state, {
          name: userName,
          levels: levels,
          results: state.results.slice()
        }));
      });
    };

    this.view.onBackButtonClick = () => {
      Application.showGreeting();
    };;
  }
}

export default new RulesPresenter();
