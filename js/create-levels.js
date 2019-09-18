import {Game1View} from './oop/game-1.js';
import {Game2View} from './oop/game-2.js';
import {Game3View} from './oop/game-3.js';
import {IntroView} from './oop/intro.js';
import {RulesView} from './oop/rules.js';
import {StatsView} from './oop/stats.js';

export const createLevel = {
  'game-1': (level) => {
    return new Game1View(level.questions);
  },

  'game-2': (level) => {
    return new Game2View(level.img, level.answers);
  },

  'game-3': (level) => {
    return new Game3View(level.answers);
  },

  'intro': (level) => {
    return new IntroView();
  },

  'stats': (level) => {
    return new StatsView();
  },

  'rules': (level) => {
    return new RulesView();
  },
};
