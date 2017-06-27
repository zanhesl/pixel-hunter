
import {DefaultAdapter} from '../adapter';
import {getLivesCount} from '../data/data';


export default new class extends DefaultAdapter {

  preprocess(data) {
    return data.sort((left, right) => (right.date - left.date)).map((item) => {
      return item.stats;
    });
  }

  toServer(data) {
    return {
      stats: data,
      lives: getLivesCount(data)
    };
  }
}();
