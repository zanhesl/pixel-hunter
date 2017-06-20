
import {renderScreen} from '../data/data';
import {loadLevels} from '../data/data';
import {getLevelResult} from '../data/data';
import {state as initState} from '../data/data';
import {rules} from '../data/data';
import {types} from '../data/data';
import {levels} from '../data/data-levels';
import GameView from './game-view';
import Application from '../application';


class GamePresenter {
  constructor(state) {
    //loadLevels(levels, () => {});

    this.state = state;
    this.level = levels[state.level];

    this.view = new GameView(this.state, Object.assign({},
      this.level,
      types[this.level.type]
    ));

    this.gameTimer = null;
  }

  _startGame() {

    const TIMER_DELAY = 1000;

    let timerTiks = rules.levelTime;

    this.gameTimer = setInterval(() => {

      this.view.levelTime = timerTiks--;

      if (!timerTiks) {
        this._endGame(this.state);
      }
    }, TIMER_DELAY);
  }

  _endGame(curState, levelTime = 0, levelPassed = false) {

    clearInterval(this.gameTimer);

    const result = getLevelResult(levelTime, levelPassed);

    const newState = Object.assign({}, curState, {
      lives: (result === `wrong`)
        ? curState.lives - 1
        : curState.lives,
      results: curState.results.slice()
    });

    newState.results[curState.level] = result;

    this._nextGame(newState);
  }

  _nextGame(curState) {

    if ((curState.lives >= 0) && (curState.level + 1) < rules.levelsCount) {

      this.state = Object.assign({}, curState, {
        level: curState.level + 1
      });

      this.level = levels[this.state.level];

      this.view = new GameView(this.state, Object.assign({},
        this.level,
        types[this.level.type]
      ));

      this.init();

    } else {
      Application.showStats(curState.results);
    }
  }

  init() {

    renderScreen(this.view);

    this.view.onLevelFinished = (curState, levelTime, isAnswerRight) => {
      this._endGame(curState, levelTime, isAnswerRight);
    };

    this.view.onBackButtonClick = () => {
      clearInterval(this.gameTimer);
      Application.showGreeting();
    };
  }
}

export default new GamePresenter(initState);
