
import * as utils from './utils';
import * as game from './game';

import header from './header';
import ingameStats from './ingame-stats';
import footer from './footer';


const countResults = (results, result) => {
  return results.filter((item) => item === result).length;
};

const getPoints = (results) => {

  const count = results.filter((result) => {
    return game.isCorrectResult(result);
  }).length;

  return count * game.rules.pointsPerResult;
};


const templateSpeedBonus = (count) => {

  return (count === 0) ? `` : `\
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">×&nbsp;${game.rules.speedBonusPoints}</td>
      <td class="result__total">${count * game.rules.speedBonusPoints}</td>
    </tr>`;
};

const templateLivesBonus = (count) => {

  return (count === 0) ? `` : `\
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--heart"></span></td>
      <td class="result__points">×&nbsp;${game.rules.livesBonusPoints}</td>
      <td class="result__total">${count * game.rules.livesBonusPoints}</td>
    </tr>`;
};

const templateSpeedPenalty = (count) => {

  return (count === 0) ? `` : `\
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">×&nbsp;${-game.rules.speedPenaltyPoints}</td>
      <td class="result__total">${count * game.rules.speedPenaltyPoints}</td>
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

    let totalPoints = getPoints(results);

    templateTableStat = `\
      <td class="result__points">×&nbsp;${game.rules.pointsPerResult}</td>
      <td class="result__total">${totalPoints}</td>`;

    const speedBonusCounts = countResults(results, `fast`);
    const speedPenaltyCounts = countResults(results, `slow`);

    totalPoints += livesCount * game.rules.livesBonusPoints +
      speedBonusCounts * game.rules.speedBonusPoints +
      speedPenaltyCounts * game.rules.speedPenaltyPoints;

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
    <h1>Победа!</h1>
    ${stats.map((stat, index) => {
      return templateTableResults(index + 1, stat.results);
    }).join(``)}
  </div>`;

const template = (stats) => `\
  ${header()}
  ${templateResults(stats)}
  ${footer()}`;


export default (stats) => {

  const element = utils.getScreenFromTemplate(template(stats));

  const backButton = element.querySelector(`.header__back`);


  backButton.addEventListener(`click`, () => {
    game.reset();
  });

  return element;
};
