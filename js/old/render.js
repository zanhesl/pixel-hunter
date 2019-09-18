import {default as init} from './greeting.js';

const mainScreen = document.querySelector(`#main`);

const renderScreen = (number) => {
  mainScreen.innerHTML = ``;
  const cloneScreen = number.cloneNode(true);
  const backArrow = cloneScreen.querySelector(`.back`);
  if (backArrow) {
    backArrow.addEventListener(`click`, () => {
      renderScreen(init.introTemplate);
      init.initialize();
    });
  }
  mainScreen.appendChild(cloneScreen);
};

export default renderScreen;
