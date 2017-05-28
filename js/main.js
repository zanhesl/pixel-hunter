
const screenIds = [
  `loading`,     // Экран загрузки
  `greeting`,    // Приветственный экран
  `rules`,       // Начало игры
  `game-1`,      // Игровой шаг
  `game-2`,      // Игровой шаг
  `game-3`,      // Игровой шаг
  `stats`        // Результаты игры
];

const getScreens = (ids) => {
  return ids.map((item) => {

    const template = document.getElementById(item);

    return (template.content)
      ? template.content.querySelector(`.central`)
      : template.querySelector(`.central`);
  });
};

const showScreen = (index) => {
  if (viewport.hasChildNodes()) {
    viewport.replaceChild(screens[index], viewport.firstChild);
  } else {
    viewport.appendChild(screens[index]);
  }
};

const shiftScreen = (offset = 0) => {

  screenIndex = ((screenIndex + offset) < 0)
    ? screens.length - 1
    : (screenIndex + offset) % screens.length;

  showScreen(screenIndex);
};

const isAltLeftKeysDown = (evt) => {
  const leftKey = 37;
  return evt.altKey && evt.keyCode === leftKey;
};

const isAltRightKeysDown = (evt) => {
  const rightKey = 39;
  return evt.altKey && evt.keyCode === rightKey;
};


const viewport = document.querySelector(`.viewport`);
const screens = getScreens(screenIds);

let screenIndex = 0;


showScreen(screenIndex);


window.addEventListener(`keydown`, (evt) => {

  if (isAltLeftKeysDown(evt)) {
    shiftScreen(-1);
  }

  if (isAltRightKeysDown(evt)) {
    shiftScreen(1);
  }
});
