export const levels = [
  {
    type: `intro`,
  },

  {
    type: `rules`,
  },

  {
    type: `game-1`,

    questions: [
      {
        index: 1,
        img: `<img src="https://gdb.rferl.org/9D95DD8B-3122-4FBC-828B-C22FDEFA13DD_cx3_cy23_cw95_w1023_r1_s.jpg" alt="Option 1" width="468" height="458">`,
        answers: new Set([
          {
            name: `photo`,
            value: false,
            time: 0,
          },
          {
            name: `picture`,
            value: true,
            time: 0,
          }
        ]
          ),
      },

      {
        index: 2,
        img: `<img src="http://anysite.ru/img/publication/sezann/3b.jpg" alt="Option 2" width="468" height="458">`,
        answers: new Set(
            [{
              name: `photo`,
              value: false,
              time: 0,
            },
            {
              name: `picture`,
              value: true,
              time: 0,
            }
            ]
          ),
      },
    ],
  },

  {
    type: `game-2`,

    img: `<img src="https://safiullin.su/wp-content/uploads/2015/11/Gora-Sent-Viktuar-vid-s-holma-Lov.jpg" alt="Option 1" width="705" height="455">`,

    answers: new Set(
        [{
          name: `photo`,
          value: true,
          time: 0,
        },

        {
          name: `picture`,
          value: false,
          time: 0,
        }]
    ),
  },

  {
    type: `game-3`,

    answers: new Set(
        [
          {
            name: `photo`,
            value: false,
            time: 0,
            content: `<div class="game__option">
            <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
          </div>`,
          },

          {
            name: `picture`,
            value: true,
            time: 0,
            content: `<div class="game__option  game__option--selected">
            <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
          </div>`,
          },

          {
            name: `photo`,
            value: false,
            time: 0,
            content: `<div class="game__option">
            <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
          </div>`,
          }
        ]
    ),
  },

  {
    type: `stats`,

    content: `<header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
  </header>
  <div class="result">
    <h1>Победа!</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">1&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">50</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--heart"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--heart"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
  </div>
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>`,
  },
];
