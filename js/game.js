
import introElement from './intro';
import greetingElement from './greeting';
import rulesElement from './rules';
import gameOneElement from './game-1';
import gameTwoElement from './game-2';
import gameThreeElement from './game-3';
import statsElement from './stats';


const viewport = document.querySelector(`.viewport`);

const screens = {
  'intro' : introElement,
  'greeting' : greetingElement,
  'rules' : rulesElement,
  'game-1' : gameOneElement,
  'game-2' : gameTwoElement,
  'game-3' : gameThreeElement,
  'stats' : statsElement
};


export function getScreenWrapper() {

  const wrapper = document.createElement(`section`);

  wrapper.classList.add(`central`);

  return wrapper;
}

export function showScreen(screenName) {

  if (viewport.hasChildNodes()) {
    viewport.replaceChild(screens[screenName], viewport.firstChild);
  } else {
    viewport.appendChild(screens[screenName]);
  }
}
