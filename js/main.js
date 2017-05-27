
const screens = [
  document.querySelector(`.central`).cloneNode(true),     // Экран загрузки
  document.getElementById(`greeting`),                    // Приветственный экран
  document.getElementById(`rules`),                       // Начало игры
  document.getElementById(`game-1`),                      // Игровой шаг
  document.getElementById(`game-2`),                      // Игровой шаг
  document.getElementById(`game-3`),                      // Игровой шаг
  document.getElementById(`stats`)                        // Результаты игры
];

const viewport = document.querySelector(`.central`);

const showScreen = (index) => {

  index = (index < 0)
    ? -index % screens.length
    : index % screens.length;

  if (viewport && screens[index]) {
    viewport.innerHTML = screens[index].innerHTML;
  }
};

let screenIndex = 0;

showScreen(screenIndex);

window.addEventListener(`keydown`, (evt) => {
  const keyLeft = 37;
  const keyRight = 39;

  if (evt.altKey && evt.keyCode === keyLeft) {
    showScreen(--screenIndex);
  }

  if (evt.altKey && evt.keyCode === keyRight) {
    showScreen(++screenIndex);
  }
});
