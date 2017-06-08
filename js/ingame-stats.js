
export default (results) => `\
  <ul class="stats">
    ${results.map((result) => {
      return `<li class="stats__result stats__result--${result}"></li>`;
    }).join(``)}
  </ul>`;
