
import gameModel from '../models/game-model';
import {Result} from '../data/data';
import {getLevelResult} from '../data/data';
import {state as initState} from '../data/data';
import {rules} from '../data/data';
import GameView from './game-view';
import viewConfirm from './confirm-view';
import Application from '../application';


class GamePresenter {
  constructor(userName) {

    this.TIMER_DELAY = 1000;

    this.state = Object.assign({}, initState, {
      name: userName,
      results: initState.results.slice()
    });

    this.gameTimer = null;

    this.level = gameModel.getLevel(this.state.level);

    this.viewGame = new GameView(this.state, this.level);

    this.viewConfirm = new viewConfirm();

    this._onTimeTickHandler = this._onTimeTickHandler.bind(this);
  }

  get element() {
    return this.viewGame.element;
  }

  destroy() {
    clearInterval(this.gameTimer);

    this.viewGame.onAnswered = null;
    this.viewGame.onChosen = null;
    this.viewGame.onBackButtonClick = null;
    this.viewConfirm.onConfirm = null;
    this.viewGame.remove();
  }

  show(viewport = this.viewport) {

    this.viewport = viewport;

    this.viewGame.show(viewport);

    this.viewGame.onAnswered = (time, answers) => {
      this._endGame(rules.gameTime - time, this._isQuestionsAnswerRight(answers));
    };

    this.viewGame.onChosen = (time, answer) => {
      this._endGame(rules.gameTime - time, this._isChoosenAnswerRight(answer));
    };

    this.viewGame.onBackButtonClick = () => {
      clearInterval(this.gameTimer);

      this.viewGame.hide();
      this.viewConfirm.show(this.viewport);
    };

    this.viewConfirm.onConfirm = (result) => {

      this.viewConfirm.hide();
      this.viewGame.show(viewport);

      if (result) {
        Application.showGreeting();
      } else {
        this.gameTimer = setInterval(this._onTimeTickHandler, this.TIMER_DELAY);
      }
    };

    this._startGame();
  }

  _onTimeTickHandler() {

    if (this.viewGame.gameTime <= 0) {
      this._endGame();
    } else {
      this.viewGame.gameTime = this.viewGame.gameTime - 1;
    }
  }

  _startGame() {

    this.viewGame.gameTime = rules.gameTime - 1;

    this.gameTimer = setInterval(this._onTimeTickHandler, this.TIMER_DELAY);
  }

  _endGame(time = 0, passed = false) {

    clearInterval(this.gameTimer);

    const result = getLevelResult(time, passed);

    this.state.lives = (result === Result.WRONG)
        ? this.state.lives - 1
        : this.state.lives;

    this.state.results[this.state.level] = result;

    this._nextGame();
  }

  _nextGame() {

    if ((this.state.lives > 0) && ((this.state.level + 1) < gameModel.levelsCount)) {

      this.level = gameModel.getLevel(++this.state.level);

      this.destroy();

      this.viewGame = new GameView(this.state, this.level);

      this.show();

    } else {

      const name = this.state.name;
      const lives = this.state.lives;
      const results = this.state.results;

      Application.showStats({name, lives, results});
    }
  }

  _isQuestionsAnswerRight(answers) {
    return answers.map((answer, index) => {
      return answer === this.level.answers[index].type;
    }).every((answer) => answer);
  }

  _isChoosenAnswerRight(answer) {

    const isShouldChoosePhoto = this.level.answers.filter((item) => {
      return item.type === `photo`;
    }).length === 1;

    return answer === ((isShouldChoosePhoto) ? `photo` : `painting`);
  }
}

export default (args = {name: `Unknown`}) => new GamePresenter(args.name);
