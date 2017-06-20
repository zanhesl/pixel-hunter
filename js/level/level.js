
import * as game from '../game/game';
import LevelView from './level-view';


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


export default (state, options) => {

  const level = Object.assign({}, options, types[options.type]);

  const levelScreen = new LevelView(state, level);

  levelScreen.onLevelFinished = (curState, levelTime, isAnswerRight) => {
    game.finishLevel(curState, levelTime, isAnswerRight);
  };

  levelScreen.onBackButtonClick = () => {
    game.reset();
  };

  return levelScreen;
};
