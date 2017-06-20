

import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import gameScreen from './game/game';
import statsScreen from './stats/stats';


export default class Application {

  static showIntro() {
    introScreen.init();
  }

  static showGreeting() {
    greetingScreen.init();
  }

  static showRules() {
    rulesScreen.init();
  }

  static showGame(state) {
    gameScreen.init(state);
  }

  static showStats(stats) {
    statsScreen.init(stats);
  }
}
