
import * as utils from './utils';
import * as game from './game';

import header from './header';
import resultsTable from './data-results';
import ingameStats from './ingame-stats';
import footer from './footer';


const countResults = (results, result) => {
  return results.filter((item) => item === result).length;
};

const getGamePoints = (results) => {

  const count = results.filter((result) => {
    return Math.abs(game.rules.points[result]);
  }).length;

  return count * game.rules.points.correct;
};


const templateSpeedBonus = (count) => {

  return (count === 0) ? `` : `\
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">×&nbsp;${game.rules.points.fast}</td>
      <td class="result__total">${count * game.rules.points.fast}</td>
    </tr>`;
};

const templateLivesBonus = (count) => {

  return (count === 0) ? `` : `\
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--heart"></span></td>
      <td class="result__points">×&nbsp;${game.rules.points.live}</td>
      <td class="result__total">${count * game.rules.points.live}</td>
    </tr>`;
};

const templateSpeedPenalty = (count) => {

  return (count === 0) ? `` : `\
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">×&nbsp;${-game.rules.points.slow}</td>
      <td class="result__total">${count * game.rules.points.slow}</td>
    </tr>`;
};

const templateTableResults = (index, results) => {

  const livesCount = (game.rules.maxLives - countResults(results, `wrong`));

  let templateTableStat = ``;
  let templateTableExtra = ``;

  if (livesCount < 0) {

    templateTableStat = `\
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>`;
  } else {

    let totalPoints = getGamePoints(results);

    templateTableStat = `\
      <td class="result__points">×&nbsp;${game.rules.points.correct}</td>
      <td class="result__total">${totalPoints}</td>`;

    const speedBonusCounts = countResults(results, `fast`);
    const speedPenaltyCounts = countResults(results, `slow`);

    totalPoints += livesCount * game.rules.points.live +
      speedBonusCounts * game.rules.points.fast +
      speedPenaltyCounts * game.rules.points.slow;

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
          ${ingameStats(results)}
        </td>
        ${templateTableStat}
      </tr>
      ${templateTableExtra}
    </table>`;
};

const templateResults = (stats) => `\
  <div class="result">
    <h1>${(stats.lives >= 0) ? "Победа!" : "Fail"}</h1>
    ${templateTableResults(1, stats.results)}
    ${resultsTable.map((results, index) => {
      return templateTableResults(index + 2, results);
    }).join(``)}
  </div>`;

const template = (stats) => `\
  ${header()}
  ${templateResults(stats)}
  ${footer()}`;


export default (stats) => {

  const element = utils.getScreenFromTemplate(template(stats));

  const backButton = element.querySelector(`.header__back`);

  backButton.addEventListener(`click`, () => game.reset());

  return element;
};
