
const viewport = document.querySelector(`.viewport`);


export function renderScreen(screen) {
  viewport.innerHTML = ``;
  viewport.appendChild(screen);
}
