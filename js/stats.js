
import * as utils from './utils';
import * as game from './game';
import * as data from './data';

import header from './header';
import stats from './ingame-stats';
import footer from './footer';

import greetingScreen from './greeting';


const countResults = (results, result) => {
  return results.filter((item) => item === result).length;
}

const getPoints = (results) => {

  const count = results.filter((result) => {
    return game.isCorrectResult(result);
  }).length;

  return count * game.POINTS_PER_RESULT;
}


const templateSpeedBonus = (count) => {

  return (count === 0) ? `` : `\
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">×&nbsp;${game.SPEED_BONUS_POINTS}</td>
      <td class="result__total">${count * game.SPEED_BONUS_POINTS}</td>
    </tr>`;
}

const templateLivesBonus = (count) => {

  return (count === 0) ? `` : `\
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--heart"></span></td>
      <td class="result__points">×&nbsp;${game.LIVES_BONUS_POINTS}</td>
      <td class="result__total">${count * game.LIVES_BONUS_POINTS}</td>
    </tr>`;
}

const templateSpeedPenalty = (count) => {

  return (count === 0) ? `` : `\
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">×&nbsp;${-game.SPEED_PENALTY_POINTS}</td>
      <td class="result__total">${count * game.SPEED_PENALTY_POINTS}</td>
    </tr>`;
}

const templateTableResults = (index, results) => {

  const livesCount = (game.MAX_LIVES - countResults(results, `wrong`));

  let templateTableStat = ``;
  let templateTableExtra = ``;

  if (livesCount < 0) {

    templateTableStat = `\
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>`;
  } else {

    let totalPoints = getPoints(results);

    templateTableStat = `\
      <td class="result__points">×&nbsp;${game.POINTS_PER_RESULT}</td>
      <td class="result__total">${totalPoints}</td>`;

    const speedBonusCounts = countResults(results, `fast`);
    const speedPenaltyCounts = countResults(results, `slow`);

    totalPoints += livesCount * game.LIVES_BONUS_POINTS +
      speedBonusCounts * game.SPEED_BONUS_POINTS +
      speedPenaltyCounts * game.SPEED_PENALTY_POINTS;

    templateTableExtra = `\
      ${templateSpeedBonus(speedBonusCounts)}
      ${templateLivesBonus(livesCount)}
      ${templateSpeedPenalty(speedPenaltyCounts)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${totalPoints}</td>
      </tr>`;
  }

  return `\
    <table class="result__table">
      <tr>
        <td class="result__number">${index}.</td>
        <td colspan="2">
          ${stats(results)}
        </td>
        ${templateTableStat}
      </tr>
      ${templateTableExtra}
    </table>`;
}

const templateResults = (stats) => `\
  <div class="result">
    <h1>Победа!</h1>
    ${stats.map((stat, index) => {
      return templateTableResults(index + 1, stat.results)
    }).join(``)}
  </div>`;

const template = (data) => `\
  ${header()}
  ${templateResults(data.stats)}
  ${footer()}`;

const element = utils.getScreenFromTemplate(template(data));

const backButton = element.querySelector(`.header__back`);


backButton.addEventListener(`click`, () => {
  game.renderScreen(greetingScreen);
});


export default element;
