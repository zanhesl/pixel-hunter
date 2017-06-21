

import IntroPresenter from './intro/intro';
import GreetingPresenter from './greeting/greeting';
import RulesPresenter from './rules/rules';
import GamePresenter from './game/game';
import StatsPresenter from './stats/stats';


export default class Application {

  static showIntro() {
    (new IntroPresenter()).init();
  }

  static showGreeting() {
    (new GreetingPresenter()).init();
  }

  static showRules() {
    (new RulesPresenter()).init();
  }

  static showGame(state) {
    (new GamePresenter(state)).init();
  }

  static showStats(state) {
    (new StatsPresenter(state)).init();
  }
}
