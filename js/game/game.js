
import {renderScreen} from '../data/data';
import {getLevelResult} from '../data/data';
import {state as initState} from '../data/data';
import {rules} from '../data/data';
import {types} from '../data/data';
import Levels from '../data/data-levels';
import GameView from './game-view';
import Application from '../application';


class GamePresenter {
  constructor(userName) {

    this.state = Object.assign({}, initState, {
      name: userName,
      results: initState.results.slice()
    });

    this.gameTimer = null;

    this._createGameView();
  }

  _createGameView() {

    this.level = Levels.getLevel(this.state.level);

    this.view = new GameView(this.state, Object.assign({},
        this.level,
        types[this.level.type]
    ));
  }

  _startGame() {

    const TIMER_DELAY = 1000;

    let timerTiks = rules.gameTime - 1;

    this.gameTimer = setInterval(() => {

      this.view.gameTime = --timerTiks;

      if (!timerTiks) {
        this._endGame();
      }
    }, TIMER_DELAY);
  }

  _endGame(time = 0, passed = false) {

    clearInterval(this.gameTimer);

    const result = getLevelResult(time, passed);

    this.state.lives = (result === `wrong`)
        ? this.state.lives - 1
        : this.state.lives;

    this.state.results[this.state.level] = result;

    this._nextGame();
  }

  _nextGame() {

    if ((this.state.lives >= 0) && (this.state.level + 1) < Levels.count) {

      this.state.level++;

      this._createGameView();
      this.init();

    } else {
      Application.showStats([this.state.name, ...this.state.results]);
    }
  }

  _isQuestionsAnswerRight(answers) {
    return answers.map((answer, index) => {
      return answer === this.level.options[index];
    }).every((answer) => answer);
  }

  _isChoosenAnswerRight(answer) {
    return answer === types[this.level.type].choose;
  }

  init() {

    renderScreen(this.view);

    this.view.onAnswered = (time, answers) => {
      this._endGame(time, this._isQuestionsAnswerRight(answers));
    };

    this.view.onChosen = (time, answer) => {
      this._endGame(time, this._isChoosenAnswerRight(answer));
    };

    this.view.onBackButtonClick = () => {
      clearInterval(this.gameTimer);
      Application.showGreeting();
    };

    this._startGame();
  }
}

export default (state) => new GamePresenter(state);
