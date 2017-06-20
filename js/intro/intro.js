
import * as game from '../game/game';
import IntroView from './intro-view';
import greetingScreen from '../greeting/greeting';


const introScreen = new IntroView();

introScreen.onContinueButtonClick = () => {
  game.renderScreen(greetingScreen());
};

export default () => introScreen;
