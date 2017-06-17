
import * as utils from './utils';
import * as game from './game';

import ingameHeader from './ingame-header';
import stats from './ingame-stats';
import footer from './footer';


const types = [
  {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    formClass: `game__content`,
    frame: {width: 468, height: 458},
    questions: [`question1`, `question2`]
  }, {
    title: `Угадай, фото или рисунок?`,
    formClass: `game__content  game__content--wide`,
    frame: {width: 705, height: 455},
    questions: [`question1`]
  }, {
    title: `Найдите рисунок среди изображений`,
    formClass: `game__content  game__content--triple`,
    frame: {width: 304, height: 455},
    questions: [],
    choose: `paint`
  }, {
    title: `Найдите фото среди изображений`,
    formClass: `game__content  game__content--triple`,
    frame: {width: 304, height: 455},
    questions: [],
    choose: `photo`
  }];

const templateQuestion = (question) => `\
  <label class="game__answer game__answer--photo">
    <input name="${question}" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer game__answer--paint">
    <input name="${question}" type="radio" value="paint">
    <span>Рисунок</span>
  </label>`;

const templateOption = (question) => `\
  <div class="game__option">
    <img>
    ${(question) ? templateQuestion(question) : ``}
  </div>`;

const templateGame = (level, results) => `\
  <div class="game">
    <p class="game__task">${level.title}</p>
    <form class="${level.formClass}">
      ${level.options.map((option, index) => {
        return templateOption(level.questions[index]);
      }).join(``)}
    </form>
    <div class="stats">
      ${stats(results)}
    </div>
  </div>`;

const template = (level, state) => `\
  ${ingameHeader(state)}
  ${templateGame(level, state.results)}
  ${footer()}`;


export default (state, options) => {

  const level = Object.assign({}, options, types[options.type]);

  const element = utils.getScreenFromTemplate(template(level, state));

  const backButton = element.querySelector(`.header__back`);
  const gameContent = element.querySelector(`.game__content`);
  const gameOptions = gameContent.querySelectorAll(`.game__option`);
  const gameTimer = element.querySelector(`.game__timer`);

  const getElements = (question) => {
    return Array.from(gameContent.elements[question]);
  };

  const getLevelTime = () => {
    return game.rules.levelTime - parseInt(gameTimer.textContent, 10);
  };


  const isAnswered = () => {
    return level.questions.every((question) => {
      return getElements(question).some((item) => item.checked);
    });
  };

  const hasQuestions = () => {
    return level.questions.length;
  };

  const isQuestionsAnswerRight = () => {
    return level.questions.map((question, index) => {
      return getElements(question)
        .find((item) => item.checked)
        .value === level.options[index];
    }).every((answer) => answer);
  };

  const isChoosenAnswerRight = (optionIndex) => {
    return level.options[optionIndex] === level.choose;
  };

  const getOptionImage = (optionIndex) => {

    const img = level.img[optionIndex];

    const actualSize = utils.resizeImage(level.frame, {
      width: img.naturalWidth,
      height: img.naturalHeight
    });

    img.width = actualSize.width;
    img.height = actualSize.height;

    return img;
  };


  Array.from(gameOptions).forEach((option, optionIndex) => {

    const optionImgTag = option.querySelector(`img`);
    const optionImg = getOptionImage(optionIndex);

    optionImgTag.parentNode.replaceChild(optionImg, optionImgTag);

    option.addEventListener(`click`, (evt) => {

      if (hasQuestions() && isAnswered()) {
        game.finishLevel(state, getLevelTime(), isQuestionsAnswerRight());
      }

      if (!hasQuestions()) {
        game.finishLevel(state, getLevelTime(), isChoosenAnswerRight(optionIndex));
      }
    });

  });


  backButton.addEventListener(`click`, () => game.reset());


  game.startLevel(state, (timerTiks) => {
    gameTimer.textContent = timerTiks;
  });

  return element;
};
