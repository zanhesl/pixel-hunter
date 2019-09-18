
export class GameModel {
  constructor(currentState, levels) {
    this.state = Object.assign({}, currentState);
    this.levels = levels;
  }

  tick() {
    this.state.time += 1;
  }
}
