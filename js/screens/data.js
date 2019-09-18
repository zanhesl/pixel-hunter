const START_LIVES = 4;
const START_TIME = 0;
const START_LEVEL = 0;
const START_CHANGE = true;

export const gameState = {
  lives: 4,
  answers: [],
  time: 0,
  level: 0,
  change: false,

  restart() {
    this.lives = START_LIVES;
    this.answers = [];
    this.time = START_TIME;
    this.level = START_LEVEL;
    this.change = START_CHANGE;
  }
};
