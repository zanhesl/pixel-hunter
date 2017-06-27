
import gameModel from '../models/game-model';
import {renderScreen} from '../data/data';
import {getLevelResult} from '../data/data';
import {state as initState} from '../data/data';
import {rules} from '../data/data';
import GameView from './game-view';
import Application from '../application';


class GamePresenter {
  constructor(userName) {

    this.state = Object.assign({}, initState, {
      name: userName,
      results: initState.results.slice()
    });

    this.gameTimer = null;

    this.level = gameModel.getLevel(this.state.level);

    this.view = new GameView(this.state, this.level);

    this._onAsnweredHandler = this._onAsnweredHandler.bind(this);
    this._onChosenHandler = this._onChosenHandler.bind(this);
    this._onBackButtonClickHandler = this._onBackButtonClickHandler.bind(this);
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

    if ((this.state.lives >= 0) && ((this.state.level + 1) < gameModel.levelsCount)) {

      this.level = gameModel.getLevel(++this.state.level);

      this.view = new GameView(this.state, this.level);

      this.init();

    } else {
      Application.showStats({name: this.state.name, results: this.state.results});
    }
  }

  _isQuestionsAnswerRight(answers) {
    return answers.map((answer, index) => {
      return answer === this.level.answers[index].type;
    }).every((answer) => answer);
  }

  _isChoosenAnswerRight(answer) {

    const isShouldChoosePhoto = this.level.answers.filter((it) => {
      return it.type === `photo`;
    }).length === 1;

    return answer === ((isShouldChoosePhoto) ? `photo` : `painting`);
  }

  init() {

    renderScreen(this.view);

    this.view.onAnswered = this._onAsnweredHandler;
    this.view.onChosen = this._onChosenHandler;
    this.view.onBackButtonClick = this._onBackButtonClickHandler;

    this._startGame();
  }

  _onAsnweredHandler(time, answers) {
    this._endGame(time, this._isQuestionsAnswerRight(answers));
  }

  _onChosenHandler(time, answer) {
    this._endGame(time, this._isChoosenAnswerRight(answer));
  }

  _onBackButtonClickHandler() {

    if (confirm(`Вы действительно хотите закончить игру?`)) {

      clearInterval(this.gameTimer);
      Application.showGreeting();
    }
  }
}

export default (args = {name: `Unknown`}) => new GamePresenter(args.name);
