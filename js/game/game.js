
import gameModel from '../models/game-model';
import {Result} from '../data/data';
import {getLevelResult} from '../data/data';
import {state as initState} from '../data/data';
import {rules} from '../data/data';
import GameView from './game-view';
import ConfirmView from './confirm-view';
import Application from '../application';


class GamePresenter {
  constructor(userName) {

    this.TIMER_DELAY = 1000;

    this._state = Object.assign({}, initState, {
      name: userName,
      results: initState.results.slice()
    });

    this._gameTimer = null;

    this._level = gameModel.getLevel(this._state.level);

    this._viewGame = new GameView(this._state, this._level);

    this._viewConfirm = new ConfirmView();

    this._onTimeTickHandler = this._onTimeTickHandler.bind(this);
  }

  get element() {
    return this._viewGame.element;
  }

  destroy() {
    clearInterval(this._gameTimer);

    this._viewGame.onAnswered = null;
    this._viewGame.onChosen = null;
    this._viewGame.onBackButtonClick = null;
    this._viewConfirm.onConfirm = null;
    this._viewGame.remove();
  }

  show(viewport = this._viewport) {

    this._viewport = viewport;

    this._viewGame.show(viewport);

    this._viewGame.onAnswered = (time, answers) => {
      this._endGame(rules.gameTime - time, this._isQuestionsAnswerRight(answers));
    };

    this._viewGame.onChosen = (time, answer) => {
      this._endGame(rules.gameTime - time, this._isChoosenAnswerRight(answer));
    };

    this._viewGame.onBackButtonClick = () => {
      clearInterval(this._gameTimer);

      this._viewGame.hide();
      this._viewConfirm.show(this._viewport);
    };

    this._viewConfirm.onConfirm = (result) => {

      this._viewConfirm.hide();
      this._viewGame.show(viewport);

      if (result) {
        Application.showGreeting();
      } else {
        this._gameTimer = setInterval(this._onTimeTickHandler, this.TIMER_DELAY);
      }
    };

    this._startGame();
  }

  _onTimeTickHandler() {

    if (this._viewGame.gameTime <= 0) {
      this._endGame();
    } else {
      this._viewGame.gameTime = this._viewGame.gameTime - 1;
    }
  }

  _startGame() {

    this._viewGame.gameTime = rules.gameTime - 1;

    this._gameTimer = setInterval(this._onTimeTickHandler, this.TIMER_DELAY);
  }

  _endGame(time = 0, passed = false) {

    clearInterval(this._gameTimer);

    const result = getLevelResult(time, passed);

    this._state.lives = (result === Result.WRONG)
        ? this._state.lives - 1
        : this._state.lives;

    this._state.results[this._state.level] = result;

    this._nextGame();
  }

  _nextGame() {

    if ((this._state.lives > 0) && ((this._state.level + 1) < gameModel.levelsCount)) {

      this._level = gameModel.getLevel(++this._state.level);

      this.destroy();

      this._viewGame = new GameView(this._state, this._level);

      this.show();

    } else {

      const name = this._state.name;
      const lives = this._state.lives;
      const results = this._state.results;

      Application.showStats({name, lives, results});
    }
  }

  _isQuestionsAnswerRight(answers) {
    return answers.map((answer, index) => {
      return answer === this._level.answers[index].type;
    }).every((answer) => answer);
  }

  _isChoosenAnswerRight(answer) {

    const isShouldChoosePhoto = this._level.answers.filter((item) => {
      return item.type === `photo`;
    }).length === 1;

    return answer === ((isShouldChoosePhoto) ? `photo` : `painting`);
  }
}

export default (args = {name: `Unknown`}) => new GamePresenter(args.name);
