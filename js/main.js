import {gameState} from './screens/data.js';
import {GameModel} from './oop/game-model.js';
import {levelsArray} from './create-game.js';
import {GameScreen} from './oop/game-screen.js';


const newState = Object.assign({}, gameState);
const newModel = new GameModel(newState, levelsArray());
const newScreen = new GameScreen(newModel);
//
newScreen.init();


// document.addEventListener(`click`, () => console.log(gameState));
