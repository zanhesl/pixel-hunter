
import * as utils from './utils';
import * as game from './game';

import header from './header';
import resultsTable from './data-results';
import ingameStats from './ingame-stats';
import footer from './footer';


const templateBonus = (bonus) => {
  return (bonus.count === 0) ? `` : `\
    <tr>
      <td></td>
      <td class="result__extra">${bonus.title}</td>
      <td class="result__extra">${bonus.count}&nbsp;<span class="stats__result stats__result--${bonus.name}"></span></td>
      <td class="result__points">×&nbsp;${bonus.points}</td>
      <td class="result__total">${bonus.totalPoints}</td>
    </tr>`;
};

const templateTableResults = (index, results) => {

  let templateTableStat = ``;
  let templateTableExtra = ``;

  if (game.getLivesCount(results) < 0) {

    templateTableStat = `\
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>`;
  } else {

    templateTableStat = `\
      <td class="result__points">×&nbsp;${game.rules.points.correct}</td>
      <td class="result__total">${game.getPoints(results)}</td>`;

    templateTableExtra = `\
      ${game.getExtraPointsList(results).map((item) => templateBonus(item)).join(``)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${game.getTotalPoints(results)}</td>
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
    <h1>${(stats.lives >= 0) ? `Победа!` : `Fail`}</h1>
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
