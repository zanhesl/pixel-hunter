(function () {
'use strict';

class DefaultAdapter {
  constructor() {
    if (new.target === DefaultAdapter) {
      throw new Error(`Can't be instantiated with new DefaultAdapter`);
    }
  }

  preprocess(data) {
    return data;
  }

  toServer(data) {
    return data;
  }
}

var defaultAdapter = new class extends DefaultAdapter {}();

class Model {
  get urlRead() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  get urlWrite() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  load(adapter = defaultAdapter) {
    return fetch(this.urlRead)
      .then((response) => response.json())
      .then(adapter.preprocess);
  }

  send(data, adapter = defaultAdapter) {

    const requestSettings = {
      body: JSON.stringify(adapter.toServer(data)),
      headers: {'Content-Type': `application/json`},
      method: `POST`
    };

    return fetch(this.urlWrite, requestSettings);
  }
}

const Result = Object.freeze({
  CORRECT: `correct`,
  WRONG: `wrong`,
  FAST: `fast`,
  SLOW: `slow`,
  UNKNOWN: `unknown`
});

const rules = {
  gameTime: 30,
  warningTime: 5,
  slowTime: 20,
  quickTime: 10,
  points: {
    [Result.CORRECT]: 100,
    [Result.WRONG]: 0,
    [Result.FAST]: 100,
    [Result.SLOW]: 100,
    [Result.UNKNOWN]: 0
  },
  extra: [{
    key: `fast`,
    label: `Бонус за скорость:`,
    points: 50,
    count: (data) => countValue(data.stats, Result.FAST)
  }, {
    key: `heart`,
    label: `Бонус за жизни:`,
    points: 50,
    count: (data) => data.lives
  }, {
    key: `slow`,
    label: `Штраф за медлительность:`,
    points: -50,
    count: (data) => countValue(data.stats, Result.SLOW)
  }],
  maxLives: 3,
  levelsCount: 10
};

const state = Object.freeze({
  level: 0,
  lives: rules.maxLives,
  name: `Unknown`,
  results: Object.freeze(new Array(rules.levelsCount).fill(Result.UNKNOWN))
});

const typeOptions = {
  'two-of-two': {
    formClass: `game__content`,
    hasAnswers: true
  },
  'tinder-like': {
    formClass: `game__content  game__content--wide`,
    hasAnswers: true
  },
  'one-of-three': {
    formClass: `game__content  game__content--triple`,
    hasAnswers: false
  }
};

function countValue(arr, value) {
  return arr.filter((item) => item === value).length;
}

function getLevelResult(levelTime, levelPassed) {

  let result = Result.UNKNOWN;

  if (!levelPassed || levelTime < 0) {
    result = Result.WRONG;
  } else if (levelPassed && levelTime < rules.quickTime) {
    result = Result.FAST;
  } else if (levelPassed && levelTime > rules.slowTime) {
    result = Result.SLOW;
  } else if (levelPassed) {
    result = Result.CORRECT;
  } else {
    result = Result.WRONG;
  }

  return result;
}

function getPoints(stats) {

  return stats.reduce((sum, value) => {
    return sum + rules.points[value];
  }, 0);
}

function getExtraPoints(data) {

  return rules.extra.map((item) => {
    return {
      key: item.key,
      label: item.label,
      count: item.count(data),
      points: Math.abs(item.points),
      total: item.count(data) * item.points
    };
  });
}

function getTotalPoints(data) {

  const extraPoints = rules.extra.reduce((sum, item) => {
    return sum + item.points * item.count(data);
  }, 0);

  return getPoints(data.stats) + extraPoints;
}

function resizeImage(frame, given) {

  const ratio = given.width / given.height;

  const actualWidth = ((frame.width / ratio) < frame.height)
    ? frame.width
    : frame.height * ratio;

  const actualHeight = ((frame.width / ratio) < frame.height)
    ? frame.width / ratio
    : frame.height;

  return {
    width: actualWidth,
    height: actualHeight
  };
}

function loadImage(src) {
  return new Promise((resolve, reject) => {

    let timeout = null;

    const img = new Image();
    const LOAD_TIMEOUT = 10000;

    img.onload = () => {
      clearTimeout(timeout);
      resolve(img);
    };

    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error(`Loading of image [${src}] is aborted with error`));
    };

    timeout = setTimeout(() => {
      clearTimeout(timeout);

      img.src = ``;
      reject(new Error(`Loading timeout of image [${src}] is expired`));

    }, LOAD_TIMEOUT);

    img.src = src;
  });
}

var gameAdapter = new class extends DefaultAdapter {

  preprocess(data) {

    const imageLoaders = [];

    for (const item of data) {

      item.formClass = typeOptions[item.type].formClass;
      item.hasAnswers = typeOptions[item.type].hasAnswers;

      for (const answer of item.answers) {

        const loader = loadImage(answer.image.url).then((img) => {
          answer.image.tag = img;
        });

        imageLoaders.push(loader);
      }
    }

    return Promise.all(imageLoaders).then(() => data);
  }

  toServer(data) {
    return data;
  }
}();

class GameModel extends Model {

  get urlRead() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
  }

  get urlWrite() {
    return ``;
  }

  get levels() {
    return this._data;
  }

  get levelsCount() {
    return this._data.length;
  }

  getLevel(index) {
    return this._data[index];
  }

  load(adapter = gameAdapter) {
    return super.load(adapter)
      .then((data) => {
        this._data = data;
      });
  }
}

const instance$1 = new GameModel();

class AbstractView {

  get element() {

    if (!this._element) {
      this._element = this.render();
      this.bind();
    }

    return this._element;
  }

  get template() {
    throw new Error(`You have to define template for view`);
  }

  render() {

    const screen = document.createElement(`section`);

    screen.classList.add(`central`);
    screen.insertAdjacentHTML(`afterbegin`, this.template);

    return screen;
  }

  show(parentNode) {
    parentNode.appendChild(this.element);
  }

  hide() {
    this.element.parentNode.removeChild(this.element);
  }

  remove() {
    this.element.parentNode.removeChild(this.element);
  }

  bind() {

  }
}

var footer = () => `\
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>`;

class IntroView extends AbstractView {

  get template() {
    return `\
      <div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
      ${footer()}`;
  }
}

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

var introPresenter = () => new IntroPresenter();

class GreetingView extends AbstractView {
  constructor() {
    super();

    this._onContinueButtonClickHandler = this._onContinueButtonClickHandler.bind(this);
  }

  get template() {
    return `\
      <div class="greeting">
        <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
          <p>Правила игры просты.<br>
              Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
              Задача кажется тривиальной, но не думай, что все так просто.<br>
              Фотореализм обманчив и коварен.<br>
              Помни, главное — смотреть очень внимательно.</p>
        </div>
        <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
      </div>
      ${footer()}`;
  }

  _onContinueButtonClickHandler(evt) {
    evt.preventDefault();
    this.onContinueButtonClick();
  }

  remove() {
    this._greetingContinue.removeEventListener(`click`, this._onContinueButtonClickHandler);
    super.remove();
  }

  bind() {
    this._greetingContinue = this.element.querySelector(`.greeting__continue`);

    this._greetingContinue.addEventListener(`click`, this._onContinueButtonClickHandler);
  }

  onContinueButtonClick() {

  }
}

class GreetingPresenter {
  constructor() {
    this._view = new GreetingView();
  }

  get element() {
    return this._view.element;
  }

  destroy() {
    this._view.onContinueButtonClick = null;
    this._view.remove();
  }

  show(viewport) {

    this._view.show(viewport);

    this._view.onContinueButtonClick = () => {
      instance.showRules();
    };
  }
}

var greetingPresenter = () => new GreetingPresenter();

var header = () => `\
  <header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
  </header>`;

class RulesView extends AbstractView {
  constructor() {
    super();

    this._onInputChangeHandler = this._onInputChangeHandler.bind(this);
    this._onContinueButtonClickHandler = this._onContinueButtonClickHandler.bind(this);
    this._onBackButtonClickHandler = this._onBackButtonClickHandler.bind(this);
  }

  get template() {
    return `\
      ${header()}
      <div class="rules">
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай ${rules.levelsCount} раз для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt="">.<br>
          Фотографиями или рисунками могут быть оба изображения.<br>
          На каждую попытку отводится ${rules.gameTime} секунд.<br>
          Ошибиться можно не более ${rules.maxLives} раз.<br>
          <br>
          Готовы?
        </p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </div>
      ${footer()}`;
  }

  _getUserName() {
    return this._rulesInput.value.replace(/[#//]/g, ``).trim();
  }

  _onInputChangeHandler() {
    this._rulesButton.disabled = (this._getUserName().length === 0);
  }

  _onContinueButtonClickHandler(evt) {
    evt.preventDefault();

    this._rulesInput.disabled = true;
    this._rulesButton.disabled = true;

    this.onContinueButtonClick(this._getUserName());
  }

  _onBackButtonClickHandler(evt) {
    evt.preventDefault();
    this.onBackButtonClick();
  }

  remove() {
    this._rulesInput.removeEventListener(`input`, this._onInputChangeHandler);
    this._rulesForm.removeEventListener(`submit`, this._onContinueButtonClickHandler);
    this._backButton.removeEventListener(`click`, this._onBackButtonClickHandler);
    super.remove();
  }

  bind() {

    this._backButton = this.element.querySelector(`.header__back`);
    this._rulesForm = this.element.querySelector(`.rules__form`);

    this._rulesInput = this._rulesForm.querySelector(`.rules__input`);
    this._rulesButton = this._rulesForm.querySelector(`.rules__button`);

    this._rulesInput.addEventListener(`input`, this._onInputChangeHandler);
    this._rulesForm.addEventListener(`submit`, this._onContinueButtonClickHandler);
    this._backButton.addEventListener(`click`, this._onBackButtonClickHandler);
  }

  onContinueButtonClick(userName) {

  }

  onBackButtonClick() {

  }
}

class RulesPresenter {
  constructor() {
    this._view = new RulesView();
  }

  get element() {
    return this._view.element;
  }

  destroy() {
    this._view.onContinueButtonClick = null;
    this._view.onBackButtonClick = null;
    this._view.remove();
  }

  show(viewport) {

    this._view.show(viewport);

    this._view.onContinueButtonClick = (userName) => {
      instance.showGame({name: userName});
    };

    this._view.onBackButtonClick = () => {
      instance.showGreeting();
    };
  }
}

var rulesPresenter = () => new RulesPresenter();

var header$1 = (state$$1) => `\
  <header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
    <h1 class="game__timer">${rules.gameTime}</h1>
    <div class="game__lives">
      ${new Array(rules.maxLives - state$$1.lives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
        .join(``)}
      ${new Array(state$$1.lives)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
        .join(``)}
    </div>
  </header>`;

class GameView extends AbstractView {

  constructor(state$$1, data) {
    super();

    this._state = state$$1;

    this._question = data.question;
    this._answers = data.answers;
    this._formClass = data.formClass;
    this._hasAnswers = data.hasAnswers;

    this._onAnswerChangeHandler = this._onAnswerChangeHandler.bind(this);
    this._onOptionClickHandler = this._onOptionClickHandler.bind(this);
    this._onBackButtonClickHandler = this._onBackButtonClickHandler.bind(this);
  }


  get template() {
    return `\
      ${header$1(this._state)}
      <div class="game">
        <p class="game__task">${this._question}</p>
        <form class="${this._formClass}">
          ${this._answers.map((answer, index) => {
            return this._templateOption(index);
          }).join(``)}
        </form>
        <div class="stats">
          <ul class="stats">
            ${this._state.results.map((result) => {
              return `<li class="stats__result stats__result--${result}"></li>`;
            }).join(``)}
          </ul>
        </div>
      </div>
      ${footer()}`;
  }

  get gameTime() {
    return parseInt(this._gameTimer.textContent, 10);
  }

  set gameTime(time) {

    const isWarningTime = (time <= rules.warningTime);

    this._gameTimer.textContent = time;
    this._gameTimer.classList.toggle(`game__timer--blink`, isWarningTime);
  }

  _isAnswered() {
    return this._questions.every((question) => {
      return question.some((item) => item.checked);
    });
  }

  _getAnswers() {
    return this._questions.map((question) => {
      return question.find((item) => item.checked).value;
    });
  }

  _getChoice(optionIndex) {
    return this._answers[optionIndex].type;
  }

  _setOptionImage(option, optionIndex) {

    const image = this._answers[optionIndex].image;
    const frame = {width: image.width, height: image.height};

    const actualSize = resizeImage(frame, {
      width: image.tag.naturalWidth,
      height: image.tag.naturalHeight
    });

    image.tag.width = actualSize.width;
    image.tag.height = actualSize.height;
    image.tag.alt = `Option ${optionIndex + 1}`;

    const tag = option.querySelector(`img`);
    tag.parentNode.replaceChild(image.tag, tag);
  }

  _addAnswerChangeHandlers() {
    for (const question of this._questions) {
      for (const element of question) {
        element.addEventListener(`change`, this._onAnswerChangeHandler);
      }
    }
  }

  _removeAnswerChangeHandlers() {
    for (const question of this._questions) {
      for (const element of question) {
        element.removeEventListener(`change`, this._onAnswerChangeHandler);
      }
    }
  }

  _templateAnswer(index) {
    return `\
      <label class="game__answer game__answer--photo">
        <input name="question${index}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question${index}" type="radio" value="painting">
        <span>Рисунок</span>
      </label>`;
  }

  _templateOption(index) {
    return `\
      <div class="game__option">
        <img>
        ${(this._hasAnswers) ? this._templateAnswer(index + 1) : ``}
      </div>`;
  }

  _onAnswerChangeHandler(evt) {

    const name = evt.currentTarget.name;
    const answers = this._gameContent.elements[name];

    for (const answer of answers) {
      answer.disabled = true;
    }
  }

  _onOptionClickHandler(evt) {

    if (this._hasAnswers && this._isAnswered()) {
      this.onAnswered(this.gameTime, this._getAnswers());
    }

    if (!this._hasAnswers) {

      const index = Array.from(this._gameOptions).indexOf(evt.currentTarget);

      this.onChosen(this.gameTime, this._getChoice(index));
    }
  }

  _onBackButtonClickHandler(evt) {
    evt.preventDefault();
    this.onBackButtonClick();
  }

  remove() {

    if (this._hasAnswers) {
      this._removeAnswerChangeHandlers();
    }

    for (const option of this._gameOptions) {
      option.removeEventListener(`click`, this._onOptionClickHandler);
    }

    this._backButton.removeEventListener(`click`, this._onBackButtonClickHandler);

    super.remove();
  }

  bind() {

    this._backButton = this.element.querySelector(`.header__back`);
    this._gameTimer = this.element.querySelector(`.game__timer`);
    this._gameContent = this.element.querySelector(`.game__content`);
    this._gameOptions = this._gameContent.querySelectorAll(`.game__option`);

    this._questions = this._answers.map((answer, index) => {
      return Array.from(this._gameContent.elements[`question${index + 1}`] || []);
    });


    let optionIndex = 0;

    for (const option of this._gameOptions) {

      const index = optionIndex++;

      this._setOptionImage(option, index);

      if (this._hasAnswers) {
        this._addAnswerChangeHandlers();
      }

      option.addEventListener(`click`, this._onOptionClickHandler, true);
    }

    this._backButton.addEventListener(`click`, this._onBackButtonClickHandler);
  }

  onAnswered(time, answers) {

  }

  onChosen(time, answer) {

  }

  onBackButtonClick() {

  }
}

class ConfirmView extends AbstractView {
  constructor() {
    super();

    this._onConfirmFormClickHandler = this._onConfirmFormClickHandler.bind(this);
  }

  get template() {
    return `\
      <div class="confirm">
        <div class="confirm__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="confirm__asterisk">*</h1>
        <div class="confirm__challenge">
          <h3>Вы действительно хотите завершить игру?</h3>
          <p>Покинув игру сейчас, вы потеряете результаты<br>
            всех пройденных уровней!</p>
        </div>
        <form class="confirm__form">
          <button class="confirm__button  confirm__button--ok" type="button">Покинуть игру...</button>
          <button class="confirm__button  confirm__button--cancel" type="button">Продолжить игру!</button>
        </form>
      </div>
      ${footer()}`;
  }

  _onConfirmFormClickHandler(evt) {
    evt.preventDefault();
    this.onConfirm(evt.target.classList.contains(`confirm__button--ok`));
  }

  remove() {
    this._confirmForm.removeEventListener(`click`, this._onConfirmFormClickHandler);
    super.remove();
  }

  bind() {
    this._confirmForm = this.element.querySelector(`.confirm__form`);

    this._confirmForm.addEventListener(`click`, this._onConfirmFormClickHandler);
  }

  onConfirm(result) {

  }
}

class GamePresenter {
  constructor(userName) {

    this.TIMER_DELAY = 1000;

    this._state = Object.assign({}, state, {
      name: userName,
      results: state.results.slice()
    });

    this._gameTimer = null;

    this._level = instance$1.getLevel(this._state.level);

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
        instance.showGreeting();
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

    if ((this._state.lives > 0) && ((this._state.level + 1) < instance$1.levelsCount)) {

      this._level = instance$1.getLevel(++this._state.level);

      this.destroy();

      this._viewGame = new GameView(this._state, this._level);

      this.show();

    } else {

      const name = this._state.name;
      const lives = this._state.lives;
      const results = this._state.results;

      instance.showStats({name, lives, results});
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

var gamePresenter = (args = {name: `Unknown`}) => new GamePresenter(args.name);

class StatsView extends AbstractView {

  constructor(data) {
    super();

    this._data = data;
    this.CURRENT_USER_ID = 0;

    this._onBackButtonClickHandler = this._onBackButtonClickHandler.bind(this);
  }

  get template() {
    return `\
      ${header()}
      <div class="result">
        <h1>${this._isGameFailed(this.CURRENT_USER_ID) ? `Fail` : `Победа!`}</h1>
        ${this._data.map((item, index) => {
          return this._templateStatsItem(item, index);
        }).join(``)}
      </div>
      ${footer()}`;
  }

  _isGameFailed(userID) {
    return (this._data[userID].lives === 0);
  }

  _templateExtra(extra) {
    return (extra.count === 0) ? `` : `\
      <tr>
        <td></td>
        <td class="result__extra">${extra.label}</td>
        <td class="result__extra">${extra.count}&nbsp;<span class="stats__result stats__result--${extra.key}"></span></td>
        <td class="result__points">×&nbsp;${extra.points}</td>
        <td class="result__total">${extra.total}</td>
      </tr>`;
  }

  _templateStatsItem(data, index) {

    let templateTableStat = ``;
    let templateTableExtra = ``;

    if (this._isGameFailed(index)) {

      templateTableStat = `\
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>`;
    } else {

      templateTableStat = `\
        <td class="result__points">×&nbsp;${rules.points.correct}</td>
        <td class="result__total">${getPoints(data.stats)}</td>`;

      templateTableExtra = `\
        ${getExtraPoints(data).map((item) => this._templateExtra(item)).join(``)}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${getTotalPoints(data)}</td>
        </tr>`;
    }

    return `\
      <table class="result__table">
        <tr>
          <td class="result__number">${index + 1}.</td>
          <td colspan="2">
            <ul class="stats">
              ${data.stats.map((result) => {
                return `<li class="stats__result stats__result--${result}"></li>`;
              }).join(``)}
            </ul>
          </td>
          ${templateTableStat}
        </tr>
        ${templateTableExtra}
      </table>`;
  }

  _onBackButtonClickHandler(evt) {
    evt.preventDefault();
    this.onBackButtonClick();
  }

  remove() {

    this._backButton.removeEventListener(`click`, this._onBackButtonClickHandler);

    super.remove();
  }

  bind() {

    this._backButton = this.element.querySelector(`.header__back`);

    this._backButton.addEventListener(`click`, this._onBackButtonClickHandler);
  }

  onBackButtonClick() {

  }
}

var statsAdapter = new class extends DefaultAdapter {

  preprocess(data) {

    const dateDesc = (first, second) => (second.date - first.date);

    return data.sort(dateDesc).map((item) => {
      return {stats: item.stats, lives: parseInt(item.lives, 10)};
    });
  }

}();

class StatsPresenter {
  constructor(userName, lives, results) {

    this._lives = lives;
    this._results = results;

    this._view = new IntroView();

    this._model = new class extends Model {
      constructor(name) {
        super();

        this._username = name;
      }

      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${this._username}`;
      }

      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${this._username}`;
      }
    }(userName);
  }

  get element() {
    return this._view.element;
  }

  destroy() {
    this._view.onBackButtonClick = null;
    this._view.remove();
  }

  show(viewport) {

    this._view.show(viewport);

    this._model.send({stats: this._results, lives: this._lives}, statsAdapter).then(() => {

      this._model.load(statsAdapter).then((data) => {

        this._view.remove();

        this._view = new StatsView(data);

        this._view.show(viewport);

        this._view.onBackButtonClick = () => {
          instance.showGreeting();
        };

      }).catch(window.console.error);

    }).catch(window.console.error);
  }
}

var statsPresenter = (args = {name: `Unknown`, lives: 0, results: ``}) => {
  return new StatsPresenter(args.name, args.lives, args.results.split(`,`));
};

const PresenterID = {
  GREETING: ``,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};


class Application {
  constructor() {

    this._viewport = document.getElementById(`main`);

    this._presenter = introPresenter();

    this._routes = {
      [PresenterID.GREETING]: greetingPresenter,
      [PresenterID.RULES]: rulesPresenter,
      [PresenterID.GAME]: gamePresenter,
      [PresenterID.STATS]: statsPresenter,
    };

    this._render = {
      [PresenterID.GREETING]: this._renderFadeAnimationScreen,
      [PresenterID.RULES]: this._renderScreen,
      [PresenterID.GAME]: this._renderScreen,
      [PresenterID.STATS]: this._renderScreen,
    };

    window.onhashchange = () => {
      this._changePresenter(this._parseLocationHash());
    };

    instance$1.load()
      .then(() => this._changePresenter(this._parseLocationHash()))
      .catch(window.console.error);
  }

  _parseLocationHash() {

    const hashArgs = location.hash.replace(`#`, ``).split(`?`);
    const route = hashArgs[0] || ``;
    const params = (hashArgs[1] && hashArgs[1].split(`&`)) || [];

    const args = params.reduce((obj, param) => {

      const arg = param.split(`=`);
      const argKey = arg[0] || ``;
      const argValue = arg[1] || ``;

      obj[argKey] = argValue;

      return obj;
    }, {});

    return {route, args};
  }

  _setLocationHash(hash) {

    const route = (hash && hash.route) || ``;

    const args = hash && hash.args && Object.keys(hash.args).map((key) => {
      return `${key}=${hash.args[key]}`;
    }).join(`&`);

    location.hash = `${route}${(route && args) ? `?${args}` : ``}`;
  }

  _changePresenter(hash) {

    const newPresenter = this._routes[hash.route](hash.args);
    const renderFunction = this._render[hash.route];

    renderFunction(this._presenter, newPresenter, this._viewport);

    this._presenter = newPresenter;
  }

  _renderScreen(oldPresenter, newPresenter, viewport) {
    newPresenter.show(viewport);
    oldPresenter.destroy();
  }

  _renderFadeAnimationScreen(oldPresenter, newPresenter, viewport) {

    viewport.classList.add(`main--stack-screens`);

    const onElementAnimationEnd = () => {

      viewport.classList.remove(`main--animate-screens`);
      viewport.classList.remove(`main--stack-screens`);

      oldPresenter.element.removeEventListener(`animationend`, onElementAnimationEnd);

      oldPresenter.destroy();
    };

    oldPresenter.element.addEventListener(`animationend`, onElementAnimationEnd);

    newPresenter.show(viewport);

    viewport.classList.add(`main--animate-screens`);
  }

  init() {
    this._presenter.show(this._viewport);
  }

  showGreeting() {
    this._setLocationHash({route: PresenterID.GREETING});
  }

  showRules() {
    this._setLocationHash({route: PresenterID.RULES});
  }

  showGame(args) {
    this._setLocationHash({route: PresenterID.GAME, args});
  }

  showStats(args) {
    this._setLocationHash({route: PresenterID.STATS, args});
  }
}

const instance = new Application();

instance.init();

}());

//# sourceMappingURL=main.js.map
