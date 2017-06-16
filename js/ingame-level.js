
import * as utils from './utils';
import * as game from './game';

import ingameHeader from './ingame-header';
import stats from './ingame-stats';
import footer from './footer';


const getSingleAnswer = (answers) => {

  const isPaintAnswerSingle = answers
    .filter((answer) => answer === `paint`)
    .length === 1;

  return (isPaintAnswerSingle) ? `paint` : `photo`;
};

const types = [{
    title: () => `Угадайте для каждого изображения фото или рисунок?`,
    formClass: `game__content`,
    imgFrame: { width: 468, height: 458 },
    answers: { photo: `Фото`, paint: `Рисунок` }
  }, {
    title: () => `Угадай, фото или рисунок?`,
    formClass: `game__content  game__content--wide`,
    imgFrame: { width: 705, height: 455 },
    answers: { photo: `Фото`, paint: `Рисунок` }
  }, {
    title: (answers) => {
      return (getSingleAnswer(answers) === `paint`)
        ? `Найдите рисунок среди изображений`
        : `Найдите фото среди изображений`
    },
    formClass: `game__content  game__content--triple`,
    imgFrame: { width: 304, height: 455 },
    answers: {}
  }];

const templateAnswer = (optionIndex, answerKey, answerValue) => `\
  <label class="game__answer game__answer--${answerKey}">
    <input name="question${optionIndex}" type="radio" value="${answerKey}">
    <span>${answerValue}</span>
  </label>`;

const templateOption = (optionIndex, option) => `\
  <div class="game__option">
    <img alt="Option ${optionIndex}" data-src="${option.src}">
    ${Object.keys(option.answers).map((answerKey) => {
      return templateAnswer(optionIndex, answerKey, option.answers[answerKey]);
    }).join(``)}
  </div>`;

const templateGame = (templateOptions, results) => `\
  <div class="game">
    <p class="game__task">${templateOptions.title}</p>
    <form class="${templateOptions.formClass}">
      ${templateOptions.options.map((option, optionIndex) => {
        return templateOption(optionIndex + 1, option);
      }).join(``)}
    </form>
    <div class="stats">
      ${stats(results)}
    </div>
  </div>`;

const template = (templateOptions, state) => `\
  ${ingameHeader(state)}
  ${templateGame(templateOptions, state.results)}
  ${footer()}`;


export default (state, levelOptions) => {

  const params = types[levelOptions.type];

  const templateOptions = {
    title: params.title(levelOptions.answers),
    formClass: params.formClass,
    options: levelOptions.src.map((item) => {
      return {src: item, answers: params.answers};
    }),
  };

  const element = utils.getScreenFromTemplate(template(templateOptions, state));

  const backButton = element.querySelector(`.header__back`);
  const gameContent = element.querySelector(`.game__content`);
  const gameOptions = gameContent.querySelectorAll(`.game__option`);
  const gameTimer = element.querySelector(`.game__timer`);

  const questions = Object.keys(levelOptions.answers).map((answer, index) => `question${index + 1}`);
  console.log(questions);

  const getElements = (question) => {
    return Array.from(gameContent.elements[question]);
  };

  const getLevelTime = () => {
    return game.rules.levelTime - parseInt(gameTimer.textContent, 10);
  };


  const isAnswered = () => {
    return questions && questions.every((question) => {
      return getElements(question).some((item) => item.checked)
    });
  };

  const hasQuestions = () => {
    return questions && questions.length;
  };

  const isQuestionsAnswerRight = () => {
    return questions && levelOptions.answers.map((answer, index) => {
      return getElements(questions[index])
        .find((item) => item.checked)
        .value === answer;
    }).every((answer) => answer);
  };

  const isChoosenAnswerRight = (optionIndex) => {
    return levelOptions.answers[optionIndex] === getSingleAnswer(answers);
  };


  Array.from(gameOptions).forEach((option, optionIndex) => {
    option.addEventListener(`click`, (evt) => {

      if (hasQuestions()) {

        if (isAnswered()) {
          game.finishLevel(state, getLevelTime(), isQuestionsAnswerRight());
        }
      } else {

        game.finishLevel(state,  getLevelTime(), isChoosenAnswerRight(optionIndex));
      }
    });
  });


  backButton.addEventListener(`click`, () => game.reset());


  utils.uploadImages(gameContent,
    params.imgFrame.width,
    params.imgFrame.height,
    () => {
      game.startLevel(state, (timerTiks) => {
        gameTimer.textContent = timerTiks;
      });
  });

  return element;
};
