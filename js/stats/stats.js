
import * as game from '../game/game';

import StatsView from './stats-view';


export default (state) => {

  const statsScreen = new StatsView(state);

  statsScreen.onBackButtonClick = () => {
    game.reset();
  };

  return statsScreen;
};
