
export const TIME_PER_LEVEL = 30;
export const SLOW_TIME = 25;
export const QUICK_TIME = 8;
export const POINTS_PER_RESULT = 100;
export const SPEED_BONUS_POINTS = 50;
export const SPEED_PENALTY_POINTS = -50;
export const LIVES_BONUS_POINTS = 50;
export const MAX_LIVES = 3;


const correctResults = new Set([`slow`, `fast`, `correct`]);

const viewport = document.querySelector(`.viewport`);


export function renderScreen(screen) {
  viewport.innerHTML = ``;
  viewport.appendChild(screen);
}

export function isCorrectResult(result) {
  return correctResults.has(result);
}
