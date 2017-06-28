
import Model from '../model.js';
import gameAdapter from './game-adapter';


class GameModel extends Model {
  contructor() {
    this._data = [];
  }

  get urlRead() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
  }

  get urlWrite() {
    return ``;
  }

  get levels() {
    return this._data;
  }

  get levelsCount() {
    return this._data.length;
  }

  getLevel(index) {
    return this._data[index];
  }

  load(adapter = gameAdapter) {
    return super.load(adapter)
      .then((data) => {
        this._data = data;
      });
  }
}

const instance = new GameModel();

export default instance;
