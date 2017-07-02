
import {DefaultAdapter} from '../adapter';


export default new class extends DefaultAdapter {

  preprocess(data) {

    const dateDesc = (first, second) => (second.date - first.date);

    return data.sort(dateDesc).map((item) => {
      return {stats: item.stats, lives: parseInt(item.lives, 10)};
    });
  }

}();
