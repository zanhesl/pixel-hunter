import introElement from './intro';
import greetingElement from './greeting';
import rulesElement from './rules';
import gameOneElement from './game-1';
import gameTwoElement from './game-2';
import gameThreeElement from './game-3';
import statsElement from './stats';


const isAltLeftKeysDown = (evt) => {
  const leftKey = 37;
  return evt.altKey && evt.keyCode === leftKey;
};

const isAltRightKeysDown = (evt) => {
  const rightKey = 39;
  return evt.altKey && evt.keyCode === rightKey;
};


const viewport = document.querySelector(`.viewport`);

const screens = [
  introElement,
  greetingElement,
  rulesElement,
  gameOneElement,
  gameTwoElement,
  gameThreeElement,
  statsElement
];

let screenIndex = 0;


const showScreen = (index) => {
  if (viewport.hasChildNodes()) {
    viewport.replaceChild(screens[index], viewport.firstChild);
  } else {
    viewport.appendChild(screens[index]);
  }
};

const shiftScreen = (offset = 0) => {

  screenIndex = ((screenIndex + offset) < 0)
    ? screens.length - 1
    : (screenIndex + offset) % screens.length;

  showScreen(screenIndex);
};


showScreen(screenIndex);


window.addEventListener(`keydown`, (evt) => {

  if (isAltLeftKeysDown(evt)) {
    shiftScreen(-1);
  }

  if (isAltRightKeysDown(evt)) {
    shiftScreen(1);
  }
});
