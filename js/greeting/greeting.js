
import * as game from '../game/game';
import GreetingView from './greeting-view';
import rulesScreen from '../rules/rules';


const greetingScreen = new GreetingView();

greetingScreen.onContinueButtonClick = () => {
  game.renderScreen(rulesScreen());
};

export default () => greetingScreen;
