
import * as utils from './utils';
import * as game from './game';
import footer from './footer';
import greetingScreen from './greeting';


const template = `\
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
  ${footer()}`;


export default () => {

  const element = utils.getScreenFromTemplate(template);
  const introAsterisk = element.querySelector(`.intro__asterisk`);


  introAsterisk.addEventListener(`click`, () => {
    game.renderScreen(greetingScreen());
  });

  return element;
};
