
import * as game from '../game/game';
import RulesView from './rules-view';


const rulesScreen = new RulesView();

rulesScreen.onContinueButtonClick = (userName) => {
  game.start(game.state, userName);
};

rulesScreen.onBackButtonClick = () => {
  game.reset();
};

export default () => rulesScreen;
